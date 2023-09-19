import { ConfigurationInterface, Language, Messages } from "../interfaces";

export default class Configuration implements ConfigurationInterface {
    default: string;
    languages: Language[];
    messages: Messages;
    

    constructor(defaultLanguage: string, languages: Language[], messages: Messages) {
        this.default = defaultLanguage;
        this.languages = languages;
        this.messages = messages;
    }

    checkIfLanguageSupported(lang: string): boolean {
        return this.languages.some((language) => language.code === lang);
    }

    getSection(lang:string, section: string): (section: string) => string {
        return (key: string) => {

            if (!this.checkIfLanguageSupported(lang)) {
                console.warn(`Language ${lang} not supported. Using default language.`);
                lang = this.default;
            }

            const translation = this.messages[lang];
            if (!translation) return undefined;
            const selected_section = translation[section];
            if (!selected_section) return undefined;
            return selected_section[key];
        }
    }

} 
