/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */
import { ConstantPagination } from '@constants/pagination';
import { snakeCase, camelCase } from './string';

type Obj = { [key: string]: any };

function isArray(o: any): boolean {
    return Array.isArray(o);
}

function isObject(o: any): boolean {
    return o === Object(o) && !isArray(o) && typeof o !== 'function';
}

function isEmpty(x: unknown): boolean {
    if (Array.isArray(x)
        || typeof x === 'string'
        || x instanceof String
    ) {
        return x.length === 0;
    }
    
    if (x instanceof Map || x instanceof Set) {
        return x.size === 0;
    }
    
    if (({}).toString.call(x) === '[object Object]') {
        return Object.keys(x).length === 0;
    }
    
    return false;
}

function removeNullInObject(object: Obj): Obj {
    const newObj = {};

    Object.keys(object).forEach((prop) => {
        if (object[prop] !== '' && object[prop] !== null) {
            newObj[prop] = object[prop];
        }
    })

    return newObj;
}

function getParamsSearchDefault(params?: Obj): Obj {
    if (!params) {
        return { offset: 0, size: ConstantPagination.SIZE };
    }

    const pageParam = params?.page ?? 1;
    const data = removeNullInObject(params);
    const offset = data?.size ? data.size * (pageParam - 1) : ConstantPagination.SIZE * (pageParam - 1);

    const { isGetAll, page: p, ...rest } = data;
    
    return isGetAll ? rest : {
        ...{ offset, size: ConstantPagination.SIZE },
        ...removeNullInObject(rest),
    };
}

function isNumber(val: any): boolean {
    if (typeof val !== 'number') {
        return false;
    }

    if (val !== Number(val)) {
        return false;
    }

    return Number.isFinite(val) !== false;
}

function formatNumber(no: number): string {
    const parts = no.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
}

function keysToSnake(obj: any) {
    if (isObject(obj) && !(obj instanceof File)) {
        const n = {};

        Object.keys(obj)
            .forEach((k) => {
                n[snakeCase(k)] = keysToSnake(obj[k]);
            });

        return n;
    }
    if (isArray(obj)) {
        return obj.map((i) => keysToSnake(i));
    }

    return obj;
}

function keysToCamel(obj: any) {
    if (isObject(obj)) {
        const n = {};

        Object.keys(obj)
            .forEach((k) => {
                n[camelCase(k)] = keysToCamel(obj[k]);
            });

        return n;
    }
    if (isArray(obj)) {
        return obj.map((i) => keysToCamel(i));
    }

    return obj;
}

async function retryPromise<T>(
    fn: () => Promise<T>,
    retriesLeft = 3,
    interval = 3000,
): Promise<T> {
    try {
        const val = await fn();
        return val;
    } catch (error) {
        if (retriesLeft) {
            await new Promise((r) => setTimeout(r, interval));
            return retryPromise(
                fn,
                retriesLeft - 1,
                interval,
            );
        }
        
        return Promise.reject(error);
    }
}

export {
    isArray,
    isObject,
    isNumber,
    getParamsSearchDefault,
    formatNumber,
    keysToSnake,
    keysToCamel,
    isEmpty,
    retryPromise,
}
