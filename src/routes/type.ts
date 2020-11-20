/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentType, ReactNode } from 'react';
import { LinkProps, RedirectProps, RouteProps } from 'react-router-dom';

export type LinkParams = { [key: string]: string | number };

export type QueryParams = {
    [key: string]: string | number | boolean | null | undefined | Array<string | number | boolean>
};

export interface PLink extends LinkProps {
    to: string;
    params?: LinkParams;
    state?: { [key: string]: any };
}

export interface PRedirect extends RedirectProps {
    to: string;
    params?: LinkParams;
    state?: { [key: string]: any };
}

export interface SubRoute extends RouteProps {
    name?: string;
}

interface Route extends RouteProps {
    layout: ComponentType<any>;
    routes?: SubRoute[];
    sidebar?: {
        name: string;
        icon?: ReactNode;
    },
}

export type Routes = Route[];
