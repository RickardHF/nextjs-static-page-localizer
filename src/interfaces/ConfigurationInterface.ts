import { Language } from "./Language";
import { Messages } from "./Messages";

export interface ConfigurationInterface {
    default: string,
    languages: Language[],
    messages: Messages,
    getSection(lang:string, section: string): (section: string) => string,
    checkIfLanguageSupported(lang:string): boolean,
    
}