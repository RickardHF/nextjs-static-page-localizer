import { Config } from "../interfaces/Config";
const path = require("path");
const fs = require("fs");

export function loadConfig() : Config {
    const defaultLanguage = "en";
    const config_path = path.resolve(process.cwd(), "./messages/config.json");
    const config_data = fs.readFileSync(config_path, "utf8");
    const raw_config = JSON.parse(config_data);

    const config: Config = {
        default: defaultLanguage,
        languages: []
    };

    if (!raw_config) {
        console.warn("No config.json found in messages folder. Using default language.");
    } else {
        const defLang = raw_config.default;
        const raw_langs = raw_config.languages;

        if (!defLang) throw new Error("No default language specified in config.json");
        if (!raw_langs) throw new Error("No languages specified in config.json");

        config.default = defLang;
        config.languages = raw_langs.map((lang: { code: any; name: any; }) => {
            return {
                code: lang.code,
                name: lang.name
            }
        });
    }

    return config;
}
