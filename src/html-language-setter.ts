'use client';

import { useDetermineLanguage } from "./helpers/language-determinor";
import { useLocalization } from "./components/Contexts";
import Configuration from "./classes/Configuration";

export function useLanguageSetter() {
    const language = useDetermineLanguage();
    const { configuration } = useLocalization();
    
    const conf = new Configuration(configuration.default, configuration.languages, configuration.messages)

    let lang = conf.default;
    if (conf.checkIfLanguageSupported(language)) {
        lang = language;
    } else {
        console.warn(`Language ${language} not supported. Using default language.`);
    }

    if(! document) {
        console.warn("Document not found. Language not set.");
        return;
    }

    document.documentElement.lang = lang;
}
