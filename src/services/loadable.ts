import loadable, { DefaultComponent, LoadableComponent } from '@loadable/component';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (fn: () => Promise<DefaultComponent<any>>): LoadableComponent<any> => loadable(fn, {
    fallback: null,
    ssr: false,
});
