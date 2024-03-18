import { NS } from "@ns";

const reserveRAM = 7
const hostname = "home"
let hackingScript = "early-hack-template.js"
// hackingScript = "hack-script-1-all.js"

export async function main(ns: NS): Promise<void> {
    ns.scp(hackingScript, hostname)
    //ns.killall(hostname)
    const freeRam = ns.getServerMaxRam(hostname) - ns.getServerUsedRam(hostname) - reserveRAM
    const scriptRam = ns.getScriptRam(hackingScript)
    const threads = Math.floor(freeRam / scriptRam)
    ns.exec(hackingScript, hostname, threads);
}
