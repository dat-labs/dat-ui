"use client";

import React from "react";

const initialState = { state: { breadcrumbData: [], padding: "6" } };

export const BreadcrumbContext = React.createContext(initialState);

const BreadcrumbContextProvider = ({ children }: { children: any }) => {
    const [state, setState] = React.useState(initialState.state);

    const updateState = (key: any, value: any) => {
        setState({
            ...state,
            [key]: value,
        });
    };

    return (
        <BreadcrumbContext.Provider
            value={{ state, updateState: updateState as React.Dispatch<React.SetStateAction<typeof initialState>> }}
        >
            {children}
        </BreadcrumbContext.Provider>
    );
};

export default BreadcrumbContextProvider;
