import { NS } from "@ns";
export async function main(ns: NS): Promise<void> {
    
    let targets = ["n00dles","foodnstuff","sigma-cosmetics","joesguns","hong-fang-tea","harakiri-sushi","iron-gym"]
    targets = ["n00dles","foodnstuff","sigma-cosmetics","joesguns","hong-fang-tea","harakiri-sushi"]
    targets = ["n00dles","foodnstuff","max-hardware","sigma-cosmetics","nectar-net","joesguns","zer0","neo-net","silver-helix","phantasy","hong-fang-tea","harakiri-sushi","iron-gym"]
    targets = ["n00dles","foodnstuff"]
    targets = ["n00dles","foodnstuff","sigma-cosmetics","joesguns","zer0","neo-net","hong-fang-tea","nectar-net","harakiri-sushi","iron-gym","max-hardware","phantasy"]
    targets = ["n00dles","foodnstuff","sigma-cosmetics","joesguns"]

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