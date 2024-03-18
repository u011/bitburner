import { NS, Server, Player } from "@ns";

import { getHackableServers, formatNumberLeftAlign } from "utils.js";

const alignWidth = 15; // Adjust the width as needed

export async function main(ns: NS): Promise<void> {
    for (let server of getHackableServers(ns)) {
        ns.tprint(server, '\t', ns.hasRootAccess(server), '\t', ns.getServerMaxMoney(server))
        //hackAnalyzeCompare(ns, server)
    }
    ns.tprint(getHackableServers(ns))
    let server = ns.getServer("iron-gym")

    //understandMockServer(ns)
}

function understandMockServer(ns: NS) {
    const player = ns.getPlayer()
    let server = ns.getServer("phantasy")

    hackAnalyze(ns, server, player)
    server.moneyAvailable = server.moneyMax
    server.hackDifficulty = server.minDifficulty
    hackAnalyze(ns, server, player)
}

function hackAnalyzeCompare(ns: NS, hostname: string) {
    const player = ns.getPlayer()
    let server = ns.getServer(hostname)

    hackAnalyze(ns, server, player)
    server.moneyAvailable = server.moneyMax
    server.hackDifficulty = server.minDifficulty
    hackAnalyze(ns, server, player)
}

function hackAnalyze(ns: NS, server: Server, player: Player) {
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