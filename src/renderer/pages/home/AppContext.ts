import { Context, createContext } from 'react';

export interface Game {
    rootPath: string;
}

const AppContext: Context<{ game: Game }> = createContext({
    game: null as any
});

export default AppContext;
