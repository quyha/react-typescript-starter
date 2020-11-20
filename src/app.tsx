import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ScrollToTop from '@elements/scroll-top';
import routes from '@routes/index';
import { RoutesProvider } from '@routes/context';

function App(): React.ReactElement {
    return (
        <RoutesProvider>
            <BrowserRouter>
                <ScrollToTop />
                <Switch>
                    {
                        routes.map(({
                            component: Component,
                            ...rest
                        }, index) => (
                            <Route
                                key={ `route-${ index }` }
                                component={ Component }
                                { ...rest }
                            />
                        ))
                    }
                </Switch>
            </BrowserRouter>
        </RoutesProvider>
    );
}

export default App;
