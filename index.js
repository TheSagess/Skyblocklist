import request from "RequestV2";

// Define the prefix
const prefix = "&f[&5SBL&f]";

// Functions / logic

// Lookup somebody via Discord - Sage 1/1/25
function lookupDiscord(discordId) {
    request(`https://list.vajeservices.com/lookup/discord/${discordId}`).then((data) => {
        try {
            let response = JSON.parse(data);

            // Ensure the response is an array and take the first element
            if (!Array.isArray(response) || response.length === 0) {
                return ChatLib.chat(`${prefix} &cNo data found for Discord ID &e${discordId}&c!`);
            }
            let scammerDetails = response[0];

            // Ensure all fields have default values
            let amount = scammerDetails.amount || "undefined";
            let discordUserId = scammerDetails.discord_user_id || "undefined";
            let minecraftAccounts = scammerDetails.minecraft_accounts || "undefined";
            let reason = scammerDetails.reason || "undefined";

            // Format the response
            let message = `${prefix} &eScammer Details:\n`
                + `&eAmount: &a${amount}\n`
                + `&eDiscord User ID: &a${discordUserId}\n`
                + `&eMinecraft Accounts: &a${minecraftAccounts}\n`
                + `&eReason: &a${reason}`;

            ChatLib.chat(message);
        } catch (e) {
            ChatLib.chat(`${prefix} &cError parsing response: &e${e.message}`);
        }
    }).catch((err) => {
        ChatLib.chat(`${prefix} &cRequest failed: &e${err}`);
    });
}

// Lookup somebody via their Minecraft name - Sage 1/1/25
function lookupMinecraft(minecraftName) {
    request(`https://list.vajeservices.com/lookup/mc/${minecraftName}`).then((data) => {
        try {
            let response = JSON.parse(data);

            // Ensure the response is an array and take the first element
            if (!Array.isArray(response) || response.length === 0) {
                return ChatLib.chat(`${prefix} &cNo data found for Minecraft username &e${minecraftName}&c!`);
            }
            let scammerDetails = response[0];

            // Ensure all fields have default values
            let amount = scammerDetails.amount || "undefined";
            let discordUserId = scammerDetails.discord_user_id || "undefined";
            let minecraftAccounts = scammerDetails.minecraft_accounts || "undefined";
            let reason = scammerDetails.reason || "undefined";

            // Format the response
            let message = `${prefix} &eScammer Details:\n`
                + `&eAmount: &a${amount}\n`
                + `&eDiscord User ID: &a${discordUserId}\n`
                + `&eMinecraft Accounts: &a${minecraftAccounts}\n`
                + `&eReason: &a${reason}`;

            ChatLib.chat(message);
        } catch (e) {
            ChatLib.chat(`${prefix} &cError parsing response: &e${e.message}`);
        }
    }).catch((err) => {
        ChatLib.chat(`${prefix} &cRequest failed: &e${err}`);
    });
}

// Command Registration - Sage 1/1/25
register("command", (type, identifier) => {
    if (!type || !identifier) {
        ChatLib.chat(`${prefix} &cUsage: /lookup {discord|minecraft} {id|username}`);
        return;
    }

    if (type.toLowerCase() === "discord") {
        lookupDiscord(identifier);
    } else if (type.toLowerCase() === "minecraft") {
        lookupMinecraft(identifier);
    } else {
        ChatLib.chat(`${prefix} &cInvalid type! Use 'discord' or 'minecraft'.`);
    }
}).setName("lookup");
