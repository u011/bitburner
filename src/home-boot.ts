import { NS } from "@ns";

let doRestart = false;

function parseArgs(ns: NS) {
    if (ns.args.includes('restart')) {
        doRestart = true;
    }
}

const reserveRAM = 14
const hostname = "home"
let hackingScript = "early-hack-template.js"

export async function main(ns: NS): Promise<void> {
    parseArgs(ns)
    if (doRestart) { ns.killall(hostname) }
    const freeRam = ns.getServerMaxRam(hostname) - ns.getServerUsedRam(hostname) - reserveRAM
    const scriptRam = ns.getScriptRam(hackingScript)
    const threads = Math.floor(freeRam / scriptRam)
    ns.exec(hackingScript, hostname, threads);
}
