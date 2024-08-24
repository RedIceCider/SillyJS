# SillyJS

Registers a slash command `/evaljs` that executes JavaScript code passed through a closure or string.

Examples:
```
/evaljs {: alert("Hello, World!"); :}
```
```
/evaljs "alert('Hello, World!');"
```

Based on [LenAnderson/SillyTavern-EvilSlashCommand](https://github.com/LenAnderson/SillyTavern-EvilSlashCommand), adding closure support so you don't have to escape every single quote mark.
