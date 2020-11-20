import { Routes } from './type';

function flattenRoutes(routes: Routes): Routes {
    let flattenedRoutes = [];
    routes.forEach((route) => {
        flattenedRoutes.push(route);
        if (route?.routes) {
            flattenedRoutes = flattenedRoutes.concat(route.routes);
        }
    });
    
    return flattenedRoutes;
}

export { flattenRoutes };
