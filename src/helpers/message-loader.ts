import { Config } from "../interfaces/Config";
import { Messages } from "../interfaces/Messages";
const path = require("path");

export function loadMessages(config: Config): Messages {

    const messages: Messages = {};
    
    for (const lang of config.languages) {
        const message_path = path.resolve(process.cwd(), `./messages/${lang.code}.json`);
        const message_data = require(message_path);
        messages[lang.code] = JSON.parse(message_data);
    }

    return messages;
}
