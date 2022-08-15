import { Context, createContext } from 'react';

export interface UserData {
    localeName: string;
}

const AppContext: Context<{ userData: UserData | null, setUserData: Function }> = createContext({
    userData: null as any,
    setUserData: null as any
});
