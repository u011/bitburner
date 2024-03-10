import { NS } from "@ns";
export async function main(ns: NS): Promise<void> {
    // Defines the "target server", which is the server that we're going to hack. 
    const target = "foodnstuff";
    const targets = ["n00dles","foodnstuff","sigma-cosmetics","joesguns","hong-fang-tea","harakiri-sushi","iron-gym"]

    // Infinite loop that continously hacks/grows/weakens the target server
    while(true) {
        let target = getRandomElement(targets)
        let securityThresh = ns.getServerMinSecurityLevel(target);
        let securityLevel = ns.getServerSecurityLevel(target)
        let moneyThresh = ns.getServerMaxMoney(target);
        let moneyAvailable = ns.getServerMoneyAvailable(target)
        ns.print(target, ' security: ', securityLevel,  '\t', securityThresh)
        ns.print(target, ' money: ', moneyAvailable, '\t', moneyThresh)
        if (securityLevel > securityThresh) {
            // If the server's security level is above our threshold, weaken it
            await ns.weaken(target);
        } else if (moneyAvailable < moneyThresh) {
            // If the server's money is less than our threshold, grow it
            await ns.grow(target);
        } else {
            // Otherwise, hack it
            await ns.hack(target);
        }
    }
}

function getRandomElement(array: string[]): string {
    if (array.length === 0) {
        return ""; // Return undefined if the array is empty
    }
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}