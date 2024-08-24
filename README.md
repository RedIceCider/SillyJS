# SillyJS

Registers a slash command `/evaljs` that executes JavaScript code passed through a closure or string using `eval()`.

Examples:

```
/evaljs "alert('Hello, World!');"
```
creates an alert box.

```
/evaljs {: let text = "Hello, World!"; text.replace(/World/, "Universe"); :} | /echo 
```
returns `Hello, Universe!` and pipes it to `/echo`


Based on [LenAnderson/SillyTavern-EvilSlashCommand](https://github.com/LenAnderson/SillyTavern-EvilSlashCommand), adding closure support so you don't have to escape every single quote mark.
