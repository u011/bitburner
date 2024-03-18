import { NS } from "@ns";

// Self replicate to other machines
export async function main(ns: NS): Promise<void> {
    const servers = getAllServers(ns);
    const filename = "early-hack-template.js";
    // analyzeServers(ns, servers);
    //collectFiles(ns, servers)
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
        ns.tprint(maxMoney, '\t', hackAnalyze, '\t', hackAnalyzeChance, '\t', target)
        ns.tprint('time:\t', hackTime, '\t', growTime, '\t', weakenTime)
        ns.tprint(hackAnalyze / hackTime * 1000000000)
        //ns.hackAnalyzeSecurity(1, target)
        //ns.hackAnalyzeThreads
    }
}

function getAllServers(ns: NS): Set<string> {
    const visited: Set<string> = new Set();
    const queue: string[] = [];
    const start = "home"
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