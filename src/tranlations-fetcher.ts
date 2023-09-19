'use client';

import { useDetermineLanguage } from "./helpers/language-determinor";
import { useLocalization } from "./components/Contexts";
import Configuration from "./classes/Configuration";


export function useTranslationsFetcher() {
    
    const language = useDetermineLanguage();
    const { configuration } = useLocalization();

    const conf = new Configuration(configuration.default, configuration.languages, configuration.messages)

    return (section:string) =>  conf.getSection(language, section);
}
