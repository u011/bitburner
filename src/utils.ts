import { NS } from "@ns";

// Self replicate to other machines
export async function main(ns: NS): Promise<void> {
  ns.tprint("Hello Remote API!");
  
    // Find all the machines
    const servers = getAllServers(ns);
    const filename = "early-hack-template.js";
    copyFileToServers(ns, filename, servers);
    //analyzeServers(ns, servers);
    runScripts(ns, filename, servers);
}

function runScripts(ns: NS, filename: string, servers: Set<string>) {
    // home
    // ns.killall('home')
    ns.exec(filename, 'home', 40)

    const scriptRam = ns.getScriptRam(filename)
    for (const target of servers) {
        const threads = Math.floor(ns.getServerMaxRam(target) / scriptRam)
        ns.tprint(ns.getServerMaxRam(target), '\t', scriptRam, '\t', threads, '\t', target)
        if (threads > 0) {
            let portsOpen = 0;
            if (ns.fileExists("FTPCrack.exe", "home")) {
                ns.ftpcrack(target);
                portsOpen++
            }
            if (ns.fileExists("BruteSSH.exe", "home")) {
                ns.brutessh(target);
                portsOpen++
            }
            if (ns.getServerNumPortsRequired(target) <= portsOpen) {
                ns.tprint('nukable')
                ns.nuke(target)
                // ns.killall(target)
                ns.tprint(ns.exec(filename, target, threads))
            }
        }
    }
}

function analyzeServers(ns: NS, servers: Set<string>) {
    ns.tprint(ns.getScriptRam("early-hack-template.js"))
    for (const server of servers) {
        ns.tprint('###\t', server)
        ns.tprint(ns.getServerMaxRam(server))
    }
}

function copyFileToServers(ns: NS, filename: string, servers: Set<string>) {
    for (const target of servers) {
        ns.scp(filename, target)
    }
}

function getAllServers(ns: NS): Set<string> {
    const visited: Set<string> = new Set();
    const queue: string[] = [];
    const start =  "home"
    visited.add(start)
    queue.push(start)

    while (queue.length > 0) {
        const currentServer = queue.shift()!;
        const neighbors = ns.scan(currentServer)
        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }
    return visited
}