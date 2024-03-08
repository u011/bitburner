/** @param {NS} ns */
export async function main(ns) {
    const moneyUnits = 1000000
    const servers = ns.scan()
    ns.tprint(servers)

    ns.tprint('Money: Available | Max | Server')
    for (let i in servers) {
        let target = servers[i]
        let tMaxMoney = ns.getServerMaxMoney(target) / moneyUnits
        let tMoneyAvailable = ns.getServerMoneyAvailable(target) / moneyUnits

        let formattedOutput = `${tMoneyAvailable.toFixed(0)}\t${tMaxMoney.toFixed(0)}\t${target}`;

        ns.tprint(formattedOutput)
    }

    for (let ram = 8; ram <= 256; ram++) {
        let serverCost = ns.getPurchasedServerCost(ram);
        ns.tprint(`Server cost for ${ram}GB of RAM: ${serverCost}`);
    }

    while (false) {
        await ns.sleep(1000);
    }
}