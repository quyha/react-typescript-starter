import React, { useEffect } from 'react';
import { Link, Redirect, matchPath } from 'react-router-dom';
import { LoadableComponent } from '@loadable/component';
import { buildPath } from '@utils/string';
import { useRoutes } from '@routes/context';
import { PLink, PRedirect } from './type';

export const NamedLink: React.FC<PLink> = (props) => {
    const { to, params, state, ...rest } = props;

    const toLink = buildPath({ to, params });

    const routes = useRoutes();

    useEffect(() => {
        const targetRoutes = routes.filter((route) => matchPath(to, route));
        const targetCount = targetRoutes?.length ?? 0;
        
        if (targetCount > 0) {
            targetRoutes.forEach(({ component }) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const asyncComponent = component as LoadableComponent<any>;
                if (asyncComponent?.preload) {
                    asyncComponent.preload();
                }
            });
        }
    }, [])

    return (
        <Link
            to={ {
                pathname: toLink,
                ...state && { state },
            } }
            { ...rest }
        />
    )
};

export const NameRedirect: React.FC<PRedirect> = (props) => {
    const { to, params, state, ...rest } = props;

    const toLink = buildPath({ to, params });
    
    return (
        <Redirect
            to={ {
                pathname: toLink,
                ...state && { state },
            } }
            { ...rest }
        />
    )
};
