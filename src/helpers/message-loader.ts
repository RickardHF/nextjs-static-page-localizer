import { Config } from "../interfaces/Config";
import { Messages } from "../interfaces/Messages";
const path = require("path");

export function loadMessages(config: Config): Messages {

    const messages: Messages = {};
    
    for (const lang of config.languages) {
        const message_path = path.resolve(process.cwd(), `./messages/${lang.code}`);
        const message_data = require(message_path).default;
        messages[lang.code] = message_data;// JSON.parse(message_data);
    }

    return messages;
}
