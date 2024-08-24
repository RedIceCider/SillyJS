import { SlashCommand } from "../../../slash-commands/SlashCommand.js";
import { SlashCommandClosure } from "../../../slash-commands/SlashCommandClosure.js";
import { SlashCommandArgument } from "../../../slash-commands/SlashCommandArgument.js";
import { ARGUMENT_TYPE } from "../../../slash-commands/SlashCommandArgument.js";
import { SlashCommandParser } from "../../../slash-commands/SlashCommandParser.js";

SlashCommandParser.addCommandObject(SlashCommand.fromProps({
    name: "evaljs",
    returns: "result of eval",
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

            // Check result type and convert accordingly
            if (typeof result === 'string') {
                return result; // Directly return string results
            } else if (result !== undefined && result !== null) {
                return JSON.stringify(result); // Stringify non-string results
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
                    Creates an alert "Hello, World!"
                </li>
                <li>
                    <pre><code class="language-stscript">/evaljs {: let text = "Hello, World!"; text.replace(/World/, "Universe"); :} | /echo</code></pre>
                    Eval returns <code>Hello, Univeirse!</code> and pipes it to /echo.
                </li>
            </ul>
        </div>
    `,
}))
