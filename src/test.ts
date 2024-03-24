import { NS, Server, Player } from "@ns";

import { getHackableServers, formatNumberLeftAlign } from "/scripts/utils.js";

const alignWidth = 15; // Adjust the width as needed

export async function main(ns: NS): Promise<void> {
    for (let server of getHackableServers(ns)) {
        //ns.tprint(server, '\t', ns.hasRootAccess(server), '\t', ns.getServerMaxMoney(server))
        //hackAnalyzeCompare(ns, server)
    }
    //ns.tprint(getHackableServers(ns))
    let server = ns.getServer("iron-gym")

    hackAnalyzeCompare(ns, server.hostname)
}

function analyzeHGW(ns: NS) {
    let hostname = "n00dles"
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
}

function understandMockServer(ns: NS) {
    const player = ns.getPlayer()
    let server = ns.getServer("phantasy")

    hackAnalyzeFormulas(ns, server, player)
    server.moneyAvailable = server.moneyMax
    server.hackDifficulty = server.minDifficulty
    hackAnalyzeFormulas(ns, server, player)
}

function hackAnalyzeCompare(ns: NS, hostname: string) {
    const player = ns.getPlayer()
    let server = ns.getServer(hostname)

    hackAnalyzeFormulas(ns, server, player)
    server.moneyAvailable = server.moneyMax
    server.hackDifficulty = server.minDifficulty
    hackAnalyzeFormulas(ns, server, player)
}

/*
Server base security level: 1
Server current security level: 4.271999999999999
Server growth rate: 3000
Netscript hack() execution time: 3.834 seconds
Netscript grow() execution time: 12.271 seconds
Netscript weaken() execution time: 15.339 seconds
*/
function hackAnalyzeFormulas(ns: NS, server: Server, player: Player) {
    //printProperties(ns, server)
    if (server.moneyMax && server.moneyAvailable) {
        let threads = 1
        let growPercent = ns.formulas.hacking.growPercent(server, threads, player)
        let growTime = ns.formulas.hacking.growTime(server, player)
        let hackPercent = ns.formulas.hacking.hackPercent(server, player)
        let hackTime = ns.formulas.hacking.hackTime(server, player)
        let growThreads = ns.formulas.hacking.growThreads(server, player, server.moneyMax)
        ns.tprint(formatNumberLeftAlign(hackPercent * server.moneyAvailable, alignWidth))
    }
}

function printProperties(ns: NS, server: Server) {
    const properties: { [key: string]: any } = server;

    // Iterate over the properties
    for (let key in properties) {
        ns.tprint(`${key}: ${properties[key]}`);
    }
}