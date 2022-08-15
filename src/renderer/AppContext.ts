import { Context, createContext } from 'react';

export interface UserData {
    localeName: string;
}

export const AppContext: Context<{ userData: UserData, setUserDataInternal: (userData: UserData) => void }> = createContext({
    userData: null as any,
    setUserDataInternal: null as any
});
