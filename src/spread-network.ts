// Open root access to servers and start jobs
const filename = "early-hack-template.js";

import { NS } from "@ns";
import { gainRootAccess, getAllServers } from "/scripts/utils.js";

let doRestart = false;

function parseArgs(ns: NS) {
    if (ns.args.includes('restart')) {
        doRestart = true;
    }
}

export async function main(ns: NS): Promise<void> {
    parseArgs(ns);
    const servers = getAllServers(ns);
    copyFileToServers(ns, filename, servers);
    runScripts(ns, filename, servers);
}

function runScripts(ns: NS, filename: string, servers: string[]) {
    const scriptRam = ns.getScriptRam(filename)

    for (const target of servers) {
        gainRootAccess(ns, target)
    }

    for (const target of servers) {
        const threads = Math.floor(ns.getServerMaxRam(target) / scriptRam)
        if (ns.hasRootAccess(target) && threads > 0) {
            if (doRestart) { ns.killall(target) }
            ns.exec(filename, target, threads)
        }
    }
}

function copyFileToServers(ns: NS, filename: string, servers: string[]) {
    for (const target of servers) {
        ns.scp(filename, target)
    }
}
