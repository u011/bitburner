import { NS } from "@ns";

import { formatNumberLeftAlign } from "/scripts/utils.js";

const alignWidth = 15; // Adjust the width as needed

export async function main(ns: NS): Promise<void> {
    let ram = 2

    // Purchase cost
    while (ram <= ns.getPurchasedServerMaxRam()) {
        let serverCost = ns.getPurchasedServerCost(ram);
        ns.tprint(`Server cost for ${ram}GB\tof RAM: `, formatNumberLeftAlign(serverCost, alignWidth));
        ram *= 2;
    }

    // Upgrade cost
    const hostname = 'pserv-0'
    ram = ns.getServerMaxRam(hostname)
    ns.tprint(`\n ${hostname} has ${ram}GB or RAM`)
    while (ram < ns.getPurchasedServerMaxRam()) {
        ram *= 2;
        let serverCost = ns.getPurchasedServerUpgradeCost(hostname, ram)
        ns.tprint(`Upgrade cost for ${ram}GB\tof RAM: `, formatNumberLeftAlign(serverCost, alignWidth));
    }

}