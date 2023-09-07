import useDetermineLanguage from "./helpers/language-determinor";
const { setLocalizedMetadata } = require("./lang-support");

export default function useMetadataSetter(title_key:string, description_key:string, metadata_section_key:string = "metadata") {
    const language = useDetermineLanguage();

    setLocalizedMetadata(language, title_key, description_key, metadata_section_key);

}
