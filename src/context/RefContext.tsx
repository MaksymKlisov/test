/*

import React, {createContext, useRef, useContext, ReactNode} from 'react';

interface RefType {
    cardUserRef: React.MutableRefObject<HTMLDivElement | null>;
    registerFormRef: React.MutableRefObject<HTMLDivElement | null>;
}

const RefContext = createContext<RefType | null>(null);

export const useRefContext = (): RefType | null => useContext(RefContext);

interface RefProviderProps {
    children: ReactNode;
}

export const RefProvider: React.FC<RefProviderProps> = ({ children }) => {
    const cardUserRef = useRef<HTMLDivElement | null>(null);
    const registerFormRef = useRef<HTMLDivElement | null>(null);

    const refs: RefType = {
        cardUserRef,
        registerFormRef,
    };


    return <RefContext.Provider value={refs }>{children}</RefContext.Provider>;
};


*/
