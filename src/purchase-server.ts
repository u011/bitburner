import { NS } from "@ns";

let hackingScript = "early-hack-template.js"
// hackingScript = "hack-script-1-all.js"

export async function main(ns: NS): Promise<void> {
    let ram = 4;    // How much RAM each purchased server will have.

    let servers = ns.getPurchasedServers()
    let i = servers.length;  // Iterator we'll use for our loop

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

    // Continuously try to upgrade servers ram
    servers = ns.getPurchasedServers()
    while (ram <= ns.getPurchasedServerMaxRam()) {
        for (let hostname of servers) {
            while (ns.getServerMaxRam(hostname) < ram) {
                if (ns.upgradePurchasedServer(hostname, ram)) {
                    runServer(ns, hostname)
                    ns.tprint(`upgraded ${hostname} to ${ram}`)
                } else {
                    await ns.sleep(1000);
                }
            }
        }
        ram *= 2;
    }
}

function runServer(ns: NS, hostname: string) {
    const freeRam = ns.getServerMaxRam(hostname) - ns.getServerUsedRam(hostname)
    const scriptRam = ns.getScriptRam(hackingScript)
    const threads = Math.floor(freeRam / scriptRam)
    ns.scp(hackingScript, hostname);
    //ns.killall(hostname);
    ns.exec(hackingScript, hostname, threads);
}