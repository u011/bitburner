import { NS } from "@ns";
export async function main(ns: NS): Promise<void> {
    
    let targets = ["n00dles","foodnstuff","sigma-cosmetics","joesguns","hong-fang-tea","harakiri-sushi","iron-gym"]
    targets = ["n00dles","foodnstuff","sigma-cosmetics","joesguns","hong-fang-tea","harakiri-sushi"]

    // Infinite loop that continously hacks/grows/weakens the target server
    while(true) {
        let target = getRandomElement(targets)
        let securityThresh = ns.getServerMinSecurityLevel(target);
        let securityLevel = ns.getServerSecurityLevel(target)
        let moneyThresh = ns.getServerMaxMoney(target);
        let moneyAvailable = ns.getServerMoneyAvailable(target)

        if (securityLevel > securityThresh) {
            await ns.weaken(target);
        } else if (moneyAvailable < moneyThresh) {
            await ns.grow(target);
        } else {
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