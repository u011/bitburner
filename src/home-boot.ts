import { NS } from "@ns";

let reserveRAM = 22;
let doRestart = false;

function parseArgs(ns: NS) {
    if (ns.args.includes('restart')) {
        doRestart = true;
    }
    if (ns.args.includes('max')) {
        reserveRAM = 0;
    }
}

const hostname = "home"
let hackingScript = "early-hack-template.js"

export async function main(ns: NS): Promise<void> {
    parseArgs(ns)
    ns.tprint(reserveRAM);
    if (doRestart) { ns.killall(hostname) }
    let freeRam = ns.getServerMaxRam(hostname) - ns.getServerUsedRam(hostname) - reserveRAM;
    const scriptRam = ns.getScriptRam(hackingScript)
    let threads = Math.floor(freeRam / scriptRam)
    ns.tprint(threads)
    ns.exec(hackingScript, hostname, threads);

    while (false && freeRam >= reserveRAM + scriptRam) {
        //threads = 1;
        ns.exec(hackingScript, hostname, threads);
        freeRam = ns.getServerMaxRam(hostname) - ns.getServerUsedRam(hostname)
    }
}
