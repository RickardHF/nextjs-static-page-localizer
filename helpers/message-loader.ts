import Config from "../interfaces/Config";
import Messages from "../interfaces/Messages";

export default function loadMessages(config: Config): Messages {

    const messages: Messages = {};
    
    for (const lang of config.languages) {
        messages[lang.code] = require(`@/messages/${lang.code}.json`);
    }

    return messages;
}
