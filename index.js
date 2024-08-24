import { SlashCommand } from "../../../slash-commands/SlashCommand.js";
import { SlashCommandClosure } from "../../../slash-commands/SlashCommandClosure.js";
import { SlashCommandArgument } from "../../../slash-commands/SlashCommandArgument.js";
import { ARGUMENT_TYPE } from "../../../slash-commands/SlashCommandArgument.js";
import { SlashCommandParser } from "../../../slash-commands/SlashCommandParser.js";

SlashCommandParser.addCommandObject(SlashCommand.fromProps({
    name: "evaljs",
    returns: "string, void",
    /**
     * @param {(string|SlashCommandClosure)[]} value
     */
    callback: async (_, value) => {
        try {
            let result;
            if (value instanceof SlashCommandClosure) {
                result = eval(value.rawText);
            } else {
                result = eval(`${value}`);
            }

            // Convert result to string if it's not undefined or null
            if (result !== undefined && result !== null) {
                return JSON.stringify(result);
            }
            return result;
        } catch (e) {
            console.log(`Error executing JS code: ${e.message}`);
            return toastr.error(e.message);
        }
    },
    unnamedArgumentList: [
        SlashCommandArgument.fromProps({
            description: 'JS code to execute',
            typeList: [ARGUMENT_TYPE.CLOSURE, ARGUMENT_TYPE.STRING],
            isRequired: true
        })
    ],
    helpString: `
        <div>
            Execute given JS code through closure or string.
        </div>
        <div>
            <strong>Example:</strong>
            <ul>
                <li>
                    <pre><code class="language-stscript">/evaljs {: alert("Hello, World!"); :}</code></pre>
                    creates an alert "Hello, World!"
                </li>
                <li>
                    <pre><code class="language-stscript">/evaljs "alert('Hello, World!');" console.log('Execution done.')</code></pre>
                    creates an alert "Hello, World!" and logs "Execution done."
                </li>
            </ul>
        </div>
    `,
}))
