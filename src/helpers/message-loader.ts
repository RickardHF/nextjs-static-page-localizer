import { Config } from "../interfaces/Config";
import { Messages } from "../interfaces/Messages";
const path = require("path");
const fs = require("fs");

export function loadMessages(config: Config): Messages {

    const messages: Messages = {};
    
    for (const lang of config.languages) {
        const message_path = path.resolve(process.cwd(), `./messages/${lang.code}.json`);
        const message_data = fs.readFileSync(message_path, "utf8");
        messages[lang.code] = JSON.parse(message_data);
    }

    return messages;
}
