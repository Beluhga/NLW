export interface GameParams {
    id: string;
    title: string;
    bannerUrl: string;
}

export declare global {
    namespace ReactNavigation {
        interface RootParamList {
            // rotas disponiveis na aplicação
            home: undefined; //undefined: vai dizer q não vai precisar de nenhum parametro
            game: GameParams;
        }
    }
}