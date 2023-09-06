import useDetermineLanguage from "../helpers/language-determinor";
const { getSection } = require("./lang-support");


export default function useTranslationsFetcher() {
    
    const language = useDetermineLanguage();
    return (section:string) =>  getSection(language, section);
}
