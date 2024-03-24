import { NS, Server, Player } from "@ns";

import { gainRootAccess, getAllServers, getHackableServers } from "/scripts/utils.js";

export async function main(ns: NS): Promise<void> {
    if (ns.args) {
        ns.tprint(`ns.args: ${ns.args}`)
    }
    analyzeHGW(ns)
    serversHackProfitability(ns)
}

function analyzeHGW(ns: NS) {
    let hostname = "n00dles"
    let threads = 1
    let hackAmount = 1000 // target amount of money from hack

    let getServerBaseSecurityLevel = ns.getServerBaseSecurityLevel(hostname)
    ns.tprint(`getServerBaseSecurityLevel ${getServerBaseSecurityLevel}`)
    let getServerMinSecurityLevel = ns.getServerMinSecurityLevel(hostname)
    ns.tprint(`getServerMinSecurityLevel ${getServerMinSecurityLevel}`)
    let getServerSecurityLevel = ns.getServerSecurityLevel(hostname)
    ns.tprint(`getServerSecurityLevel ${getServerSecurityLevel}`)
    let getServerGrowth = ns.getServerGrowth(hostname)
    ns.tprint(`getServerGrowth ${getServerGrowth}`)
    let getHackTime = ns.getHackTime(hostname)
    ns.tprint(`getHackTime ${getHackTime}`)
    let getGrowTime = ns.getGrowTime(hostname)
    ns.tprint(`getGrowTime ${getGrowTime}`)
    let getWeakenTime = ns.getWeakenTime(hostname)
    ns.tprint(`getWeakenTime ${getWeakenTime}`)
    let hackAnalyze = ns.hackAnalyze(hostname)
    ns.tprint(`hackAnalyze ${hackAnalyze}`)
    let growthAnalyze = ns.growthAnalyze(hostname, getServerGrowth)
    ns.tprint(`growthAnalyze ${growthAnalyze}`)
    let weakenAnalyze = ns.weakenAnalyze(threads)
    ns.tprint(`weakenAnalyze ${weakenAnalyze}`)
    let hackAnalyzeSecurity = ns.hackAnalyzeSecurity(threads, hostname)
    ns.tprint(`hackAnalyzeSecurity ${hackAnalyzeSecurity}`)
    let growthAnalyzeSecurity = ns.growthAnalyzeSecurity(threads, hostname)
    ns.tprint(`growthAnalyzeSecurity ${growthAnalyzeSecurity}`)
    let hackAnalyzeChance = ns.hackAnalyzeChance(hostname)
    ns.tprint(`hackAnalyzeChance ${hackAnalyzeChance}`)
    let hackAnalyzeThreads = ns.hackAnalyzeThreads(hostname, hackAmount)
    ns.tprint(`hackAnalyzeThreads ${hackAnalyzeThreads}`)
    let getHackingLevel = ns.getHackingLevel()
    ns.tprint(`getHackingLevel ${getHackingLevel}`)
    let getServerRequiredHackingLevel = ns.getServerRequiredHackingLevel(hostname)
    ns.tprint(`getServerRequiredHackingLevel ${getServerRequiredHackingLevel}`)
    let getServerMaxMoney = ns.getServerMaxMoney(hostname)
    ns.tprint(`getServerMaxMoney ${getServerMaxMoney}`)

}

// Hackable servers by max money
function serversHackProfitability(ns: NS) {
    const hostnames = getHackableServers(ns).filter(hostname => {
        if (ns.getHackingLevel() > ns.getServerRequiredHackingLevel(hostname) * 3) return true
        return false
    })
    for (let hostname of hostnames) {
        ns.tprint(ns.getServerMaxMoney(hostname) / 1000000, '\t\t\t', hostname)
    }
    for (let hostname of hostnames) {
        expectedHackReturn(ns, hostname)
    }
    ns.tprint(hostnames)
}

function expectedHackReturn(ns: NS, hostname: string) {
    const money = ns.hackAnalyze(hostname);
    const maxmoney = ns.getServerMaxMoney(hostname);
    const hacktime = ns.getHackTime(hostname) / ns.hackAnalyzeChance(hostname);
    const expectedReturn = money / hacktime;
    const expectedReturnMax = maxmoney / hacktime;
    ns.tprint(`${expectedReturn*1000000}\t${expectedReturnMax}\t${hostname}`)
}




/*  Weaken and analyze script
    At the start of the game, iteratively 
        - weaken all the servers and gain quick experience
        - find the best servers to hack */