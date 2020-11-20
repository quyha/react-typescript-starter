import loadable from '@loadable/component';
import { Routes } from '@routes/type';
import routeNames from './route.names';

const HomeLoadable = loadable(() => import('./index'));

const routes: Routes = [
    {
        path: routeNames.home,
        exact: true,
        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
        layout: () => null,
        component: HomeLoadable,
    },
];

export default routes;
