export interface Config {
    name: string;
    isLoggedIn: boolean;
    reload: () => void;
}