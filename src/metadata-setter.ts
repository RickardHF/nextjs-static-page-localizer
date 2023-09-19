'use client';

import Configuration from "./classes/Configuration";
import { useLocalization } from "./components/Contexts";
import { useDetermineLanguage } from "./helpers/language-determinor";

export function useMetadataSetter(title_key: string, description_key: string, metadata_section_key: string = "metadata") {
    const language = useDetermineLanguage();
    const { configuration } = useLocalization();

    const conf = new Configuration(configuration.default, configuration.languages, configuration.messages)

    const metadata_section = conf.getSection(language, metadata_section_key);
    
    if(! metadata_section) return;

    const title = metadata_section(title_key);
    const description = metadata_section(description_key);

    if(! document) {
        console.warn("Document not found. Metadata not set.");
        return;
    }

    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);

    // if description is not set, create it
    if (! document.querySelector('meta[name="description"]')) {
        const meta = document.createElement("meta");
        meta.name = "description";
        meta.content = description;
        document.head.appendChild(meta);
    }

}
