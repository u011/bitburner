import { NS } from "@ns";

const reserveRAM = 0
const hostname = "pserv-0"

let hackingScript = "hack-script-1-all.js"
hackingScript = "early-hack-template.js"

export async function main(ns: NS): Promise<void> {
    const servers = ns.getPurchasedServers()
    for (let hostname of servers) {
        runHackScripts(ns, hostname)
    }
}

export async function runHackScripts(ns: NS, hostname: string): Promise<void> {
    ns.scp(hackingScript, hostname)
    ns.killall(hostname)
    const freeRam = ns.getServerMaxRam(hostname) - ns.getServerUsedRam(hostname) - reserveRAM
    const scriptRam = ns.getScriptRam(hackingScript)
    const threads = Math.floor(freeRam / scriptRam)
    ns.exec(hackingScript, hostname, threads);
}
