import { useDetermineLanguage } from "./helpers/language-determinor";
const { getSection } = require("./lang-support");


export function useTranslationsFetcher() {
    
    const language = useDetermineLanguage();
    return (section:string) =>  getSection(language, section);
}
