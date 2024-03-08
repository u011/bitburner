/** @param {NS} ns */
export async function main(ns) {
    let ram = 2
    while (ram <= 1024) {
        let serverCost = ns.getPurchasedServerCost(ram);
        ns.tprint(`Server cost for ${ram}GB\tof RAM: ${serverCost}`);
        ram *= 2;
    }

    while (false) {
        await ns.sleep(1000);
    }
}