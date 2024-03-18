import { NS } from "@ns";

export async function main(ns: NS): Promise<void> {
    const target = "n00dles";

    while(true) {
        const securityThresh = ns.getServerMinSecurityLevel(target);
        const securityLevel = ns.getServerSecurityLevel(target)
        const moneyThresh = ns.getServerMaxMoney(target);
        const moneyAvailable = ns.getServerMoneyAvailable(target)

        if (securityLevel > securityThresh) {
            await ns.weaken(target);
        } else if (moneyAvailable < moneyThresh) {
            await ns.grow(target);
        } else {
            await ns.hack(target);
        }
    }
}
