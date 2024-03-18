import { NS } from "@ns";

let script = "get-hack-exp.js";
let hostname = "home.js";

export async function main(ns: NS): Promise<void> {
    let scriptRam = ns.getScriptRam(script);
    let serverMaxRam = ns.getServerMaxRam(hostname);
    let threads = Math.floor(serverMaxRam / scriptRam);
    ns.tprint(`run $`)
}
