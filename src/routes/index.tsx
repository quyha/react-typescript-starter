import { flattenRoutes as flatten } from './utils';

const context = require.context('../features', true, /routes.ts$/);

const routes = context.keys().reduce((acc, path) => {
    const routesSub = context(path).default;
    return [ ...acc, ...routesSub ];
}, []);
export const flattenRoutes = flatten(routes);

export default routes;
