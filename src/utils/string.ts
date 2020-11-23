import queryString, { ParseOptions, StringifyOptions } from 'query-string-for-all';
import { LinkParams, QueryParams } from '@routes/type';

interface PropsBuildPath {
    to: string,
    params?: LinkParams,
    query?: QueryParams,
}

/**
 * Example: buildPath({ to: '/path-url/:id', params: { id: 1 }, query: { page: 1 } })
 */
function buildPath(props: PropsBuildPath): string {
    const { to, params, query } = props;

    let target = to;
    
    if (params) {
        const keysParam = Object.keys(params);

        for (let i = 0; i < keysParam.length; i += 1) {
            const keyParam = keysParam[i];
            const valParam = params[keyParam];

            if (typeof valParam === 'string' || typeof valParam === 'number') {
                target = target.replace(`:${ keyParam }`, `${ valParam }`);
            }
        }
    }

    if (query) {
        const stringified = queryString.stringify(query, {
            skipNull: true,
            skipEmptyString: true,
            arrayFormat: 'bracket',
        });

        target = `${ target }?${ stringified }`;
    }

    return target;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseSearch(search: string, option?: ParseOptions): any {
    const options: ParseOptions = {
        arrayFormat: 'bracket',
        parseNumbers: true,
        parseBooleans: true,
        ...option,
    };

    return queryString.parse(search, options);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function stringify(obj: { [key: string]: any }, option?: StringifyOptions): string {
    const options: StringifyOptions = {
        arrayFormat: 'bracket',
        skipNull: true,
        skipEmptyString: true,
        ...option,
    };

    return queryString.stringify(obj, options);
}

function snakeCase(str: string): string {
    const arr = str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[?[0-9?\]]*|[A-Z]|[0-9]+/g);
    if (arr === null) {
        return str;
    }
    return arr.map((x) => x.toLowerCase()).join('_');
}

function camelCase(str: string): string {
    return str.replace(/([-_][a-z])/ig, (v) => (v.toUpperCase()
        .replace('-', '')
        .replace('_', '')
    ));
}

function formatNumber(num: number): string {
    const parts = num.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
}

function getHostnameFromUrl(path: string): string {
    const url = new URL(path);
    return url.hostname;
}

function uid(): string {
    return performance.now().toString(36) + Math.random().toString(36).substr(2);
}

export {
    buildPath,
    parseSearch,
    stringify,
    snakeCase,
    camelCase,
    formatNumber,
    getHostnameFromUrl,
    uid,
};
