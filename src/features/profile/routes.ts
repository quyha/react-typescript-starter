import loadable from '@loadable/component';
import { Routes } from '@routes/type';
import routeNames from './route.names';

const ProfileLoadable = loadable(() => import('./index'));

const routes: Routes = [
    {
        path: routeNames.profile,
        exact: true,
        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
        layout: () => null,
        component: ProfileLoadable,
    },
];

export default routes;
