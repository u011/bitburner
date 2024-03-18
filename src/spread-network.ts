// Open root access to servers and start jobs
const filename = "early-hack-template.js";

import { NS } from "@ns";

import { gainRootAccess, getAllServers } from "utils.js";

// Self replicate to other machines
export async function main(ns: NS): Promise<void> {
    const servers = getAllServers(ns);
    copyFileToServers(ns, filename, servers);
    runScripts(ns, filename, servers);
}

function runScripts(ns: NS, filename: string, servers: string[]) {
    const scriptRam = ns.getScriptRam(filename)
    for (const target of servers) {
        const threads = Math.floor(ns.getServerMaxRam(target) / scriptRam)
        gainRootAccess(ns, target)
        if (ns.hasRootAccess(target) && threads > 0) {
            ns.exec(filename, target, threads)
        }
    }
}

function copyFileToServers(ns: NS, filename: string, servers: string[]) {
    for (const target of servers) {
        ns.scp(filename, target)
    }
}