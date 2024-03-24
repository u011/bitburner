import { NS } from "@ns";

let scriptname = "get-hack-exp.js";
let hostname = "home.js";

export async function main(ns: NS): Promise<void> {
    let scriptRam = ns.getScriptRam(scriptname);
    let availableRam = ns.getServerMaxRam(hostname) - ns.getServerUsedRam(hostname)
    let threads = Math.floor(availableRam / scriptRam);
    ns.tprint(`run ${scriptname} -t ${threads}`)
}
