import { NS } from "@ns";

// Self replicate to other machines
export async function main(ns: NS): Promise<void> {
  
    // Find all the machines
    const servers = getAllServers(ns);
    const filename = "early-hack-template.js";
    //copyFileToServers(ns, filename, servers);
    //runScripts(ns, filename, servers);
    // analyzeServers(ns, servers);
    collectFiles(ns, servers)

}

function collectFiles(ns: NS, servers: Set<string>) {
    const excludeFilenames = ["early-hack-template.js"];
    servers.delete("home");
    for (const hostname of servers) {
        const filenames = filterFilenames(ns.ls(hostname, 'cct'), excludeFilenames);
        if (filenames.length > 0) {
            ns.tprint(hostname, filenames);
            for (let file of filenames) {
                const savePath = `downloads/${hostname}/${file}`
                // ns.tprint(savePath)
                // ns.scp(file, "home", hostname)
            }
        }
    }
}

function filterFilenames(filenames: string[], excludeFilenames: string[]): string[] {
    // Filter filenames array to exclude filenames present in excludeFilenames array
    return filenames.filter(filename => !excludeFilenames.includes(filename));
}

function runScripts(ns: NS, filename: string, servers: Set<string>) {
    ns.killall('home')
    ns.exec(filename, 'home', 840)

    const scriptRam = ns.getScriptRam(filename)
    for (const target of servers) {
        const threads = Math.floor(ns.getServerMaxRam(target) / scriptRam)
        ns.tprint(ns.getServerMaxRam(target), '\t', scriptRam, '\t', threads, '\t', target)
        if (threads > 0) {
            let portsOpen = 0;
            if (ns.fileExists("BruteSSH.exe", "home")) {
                ns.brutessh(target);
                portsOpen++
            }
            if (ns.fileExists("FTPCrack.exe", "home")) {
                ns.ftpcrack(target);
                portsOpen++
            }
            if (ns.fileExists("relaySMTP.exe", "home")) {
                ns.relaysmtp(target);
                portsOpen++
            }
            if (ns.fileExists("HTTPWorm.exe", "home")) {
                ns.httpworm(target);
                portsOpen++
            }
            if (ns.fileExists("SQLInject.exe", "home")) {
                ns.sqlinject(target);
                portsOpen++
            }
            if (ns.getServerNumPortsRequired(target) <= portsOpen) {
                ns.tprint('nukable')
                ns.nuke(target)
                //ns.killall(target)
                ns.tprint(ns.exec(filename, target, threads))
            }
        }
    }
}

function analyzeServers(ns: NS, servers: Set<string>) {
    //ns.tprint(ns.getScriptRam("early-hack-template.js"))
    for (const target of servers) {
        //ns.tprint('###\t', target)
        //ns.tprint(ns.getServerMaxRam(target))
        const hackAnalyze = ns.hackAnalyze(target)
        const hackAnalyzeChance = ns.hackAnalyzeChance(target)
        const maxMoney = ns.getServerMaxMoney(target)
        const hackTime = ns.getHackTime(target)
        const growTime = ns.getGrowTime(target)
        const weakenTime = ns.getWeakenTime(target)
        ns.tprint('-------')
        ns.tprint(maxMoney,'\t',hackAnalyze,'\t',hackAnalyzeChance,'\t',target)
        ns.tprint('time:\t',hackTime,'\t',growTime,'\t',weakenTime)
        ns.tprint(hackAnalyze/hackTime * 1000000000)
        //ns.hackAnalyzeSecurity(1, target)
        //ns.hackAnalyzeThreads
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