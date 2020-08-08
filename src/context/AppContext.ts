import { Context, createContext } from "react";
import { Octokit } from "@octokit/rest";

type AppContextType = {
    octokit: Octokit,
};

export const AppContext: Context<AppContextType> = createContext({} as AppContextType);
