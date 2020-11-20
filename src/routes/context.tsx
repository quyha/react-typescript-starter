/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { createContext, useContext, ReactNode } from 'react';
import { Routes } from './type';
import { flattenRoutes } from './index';

interface Provider {
    children: ReactNode;
}

const ContextRoutes = createContext<Routes>([]);

function useRoutes() {
    const context = useContext(ContextRoutes);

    if (!context) {
        throw new Error('useRoutes must be used within a RoutesProvider');
    }

    return context;
}

function RoutesProvider({ children }: Provider) {
    const value = flattenRoutes;
    return <ContextRoutes.Provider value={ value }>{ children }</ContextRoutes.Provider>
}

export { useRoutes, RoutesProvider };
