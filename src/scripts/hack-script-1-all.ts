import { NS } from "@ns";

export async function main(ns: NS): Promise<void> {

    const targets = ["n00dles","foodnstuff","sigma-cosmetics","max-hardware","omega-net","netlink","neo-net","computek","johnson-ortho","rothman-uni","aevum-police","aerocorp","millenium-fitness","syscore","catalyst","phantasy","crush-fitness","summit-uni","joesguns","hong-fang-tea","harakiri-sushi","zer0","iron-gym","nectar-net","silver-helix","the-hub","zb-institute","alpha-ent","global-pharm","unitalife","lexo-corp","galactic-cyber","rho-construction","snap-fitness","omnia","icarus","infocomm","microdyne","fulcrumtech","stormtech","kuai-gong","b-and-a","ecorp","fulcrumassets","applied-energetics","vitalife","omnitek","nwo","powerhouse-fitness","clarkinc","megacorp","nova-med","titan-labs","helios","4sigma","blade","zeus-med","deltaone","defcomm","univ-energy","solaris","taiyang-digital","zb-def"]

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
