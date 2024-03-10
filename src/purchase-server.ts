import { NS } from "@ns";
export async function main(ns: NS): Promise<void> {
    const ram = 64;    // How much RAM each purchased server will have.

    const servers = ns.getPurchasedServers()
    let i = servers.length;  // Iterator we'll use for our loop

    // Continuously try to purchase servers until we've reached the maximum
    // amount of servers
    while (i < ns.getPurchasedServerLimit()) {
        // Check if we have enough money to purchase a server
        if (ns.getServerMoneyAvailable("home") > ns.getPurchasedServerCost(ram)) {
            let hostname = ns.purchaseServer("pserv-" + i, ram);
            runServer(ns, hostname)
            ++i;
        }
        //Make the script wait for a second before looping again.
        //Removing this line will cause an infinite loop and crash the game.
        await ns.sleep(1000);
    }

    // Upgrade ram
    const targetRam = 65536
    ns.tprint(ns.getServerMaxRam(servers[1]))
    for (let hostname of servers) {
        while (ns.getServerMaxRam(hostname) < targetRam) {
            if (ns.upgradePurchasedServer(hostname, targetRam)) {
                runServer(ns, hostname)
                ns.tprint(`upgraded ${hostname}`)
            } else {
                await ns.sleep(1000);
            }
        }
    }
}

function runServer(ns: NS, hostname: string) {
    const hackingScript = "early-hack-template.js"
    const freeRam = ns.getServerMaxRam(hostname) - ns.getServerUsedRam(hostname)
    const scriptRam = ns.getScriptRam(hackingScript)
    const threads = Math.floor(freeRam / scriptRam)
    ns.scp(hackingScript, hostname);
    //ns.killall(hostname);
    ns.exec(hackingScript, hostname, threads);
}