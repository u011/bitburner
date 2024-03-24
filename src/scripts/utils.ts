import { NS } from "@ns";

export function gainRootAccess(ns: NS, server: string) {
    const serverData = ns.getServer(server);

    if (ns.fileExists('brutessh.exe')) {
        ns.brutessh(server);
    }
    if (ns.fileExists('ftpcrack.exe')) {
        ns.ftpcrack(server);
    }
    if (ns.fileExists('relaysmtp.exe')) {
        ns.relaysmtp(server);
    }
    if (ns.fileExists('httpworm.exe')) {
        ns.httpworm(server);
    }
    if (ns.fileExists('sqlinject.exe')) {
        ns.sqlinject(server);
    }
    if (serverData.openPortCount  
        && ns.getServerNumPortsRequired(server) <= serverData.openPortCount) {
        ns.nuke(server);
    }
}

export function getAllServers(ns: NS): string[] {
    let server = 'home';
    let serverList: string[] = [];
    function scanning(server: string) {
        let currentScan = ns.scan(server);
        currentScan.forEach(server => {
            if (!serverList.includes(server)) {
                serverList.push(server);
                scanning(server);
            }
        })
    }
    scanning(server);
    return serverList;
}


export function getHackableServers(ns: NS): string[] {
    let servers = getAllServers(ns)
    return servers.filter(server => {
        if (server === 'home') return false
        if (ns.getPurchasedServers().includes(server)) return false
        const serverObj = ns.getServer(server)
        if (!serverObj.moneyMax) return false
        if (!serverObj.hasAdminRights) return false
        return true
    })
}

// Function to format numbers
export function formatNumber(number: number): string {
    // Create a NumberFormat object
    let formatter = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });

    formatter = new Intl.NumberFormat();

    // Format the number
    return formatter.format(number);
}

// Function to format numbers with left alignment
export function formatNumberLeftAlign(number: number, width: number): string {
    // Format the number
    const formattedNumber = formatNumber(number);

    // Calculate the padding needed for left alignment
    const padding = " ".repeat(Math.max(0, width - formattedNumber.length));

    // Left-align the formatted number
    return padding + formattedNumber;
}