import { spawn } from "node:child_process";
import { accessSync, constants } from "node:fs";
import path from "node:path";

const [nodeEnv, command, ...args] = process.argv.slice(2);

if (!nodeEnv || !command) {
  console.error("Usage: node scripts/run-with-node-env.mjs <NODE_ENV> <command> [...args]");
  process.exit(1);
}

function canExecute(filePath) {
  try {
    accessSync(filePath, constants.X_OK);
    return true;
  } catch {
    return false;
  }
}

function resolveCommand(commandName) {
  if (process.platform !== "win32" || commandName.includes(path.sep)) {
    return commandName;
  }

  const pathValue = process.env.PATH ?? process.env.Path ?? "";
  const pathExt = process.env.PATHEXT ?? ".COM;.EXE;.BAT;.CMD";
  const extensions = [...pathExt.split(";"), ""];

  for (const directory of pathValue.split(path.delimiter)) {
    for (const extension of extensions) {
      const candidate = path.join(directory, `${commandName}${extension}`);
      if (canExecute(candidate)) {
        return candidate;
      }
    }
  }

  return commandName;
}

function quoteForCmd(value) {
  const text = String(value);
  if (!/[\s"]/u.test(text)) {
    return text;
  }

  return `"${text.replace(/"/g, '""')}"`;
}

const commandPath = resolveCommand(command);
const spawnCommand = process.platform === "win32" ? (process.env.ComSpec ?? "cmd.exe") : commandPath;
const spawnArgs =
  process.platform === "win32"
    ? ["/d", "/s", "/c", [command, ...args].map(quoteForCmd).join(" ")]
    : args;

const child = spawn(spawnCommand, spawnArgs, {
  env: {
    ...process.env,
    NODE_ENV: nodeEnv,
  },
  stdio: "inherit",
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 1);
});

child.on("error", error => {
  console.error(error);
  process.exit(1);
});
