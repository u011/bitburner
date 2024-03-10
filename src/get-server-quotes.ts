import { NS } from "@ns";

const alignWidth = 15; // Adjust the width as needed

export async function main(ns: NS): Promise<void> {
    let ram = 2

    // Purchase cost
    while (ram <= ns.getPurchasedServerMaxRam()) {
        let serverCost = ns.getPurchasedServerCost(ram);
        ns.tprint(`Server cost for ${ram}GB\tof RAM: `, formatNumberLeftAlign(serverCost, alignWidth));
        ram *= 2;
    }

    // Upgrade cost
    const hostname = 'pserv-0'
    ram = ns.getServerMaxRam(hostname)
    ns.tprint(`\n ${hostname} has ${ram}GB or RAM`)
    while (ram < ns.getPurchasedServerMaxRam()) {
        ram *= 2;
        let serverCost = ns.getPurchasedServerUpgradeCost(hostname, ram)
        ns.tprint(`Upgrade cost for ${ram}GB\tof RAM: `, formatNumberLeftAlign(serverCost, alignWidth));
    }

}


// Function to format numbers
function formatNumber(number: number): string {
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
function formatNumberLeftAlign(number: number, width: number): string {
    // Format the number
    const formattedNumber = formatNumber(number);

    // Calculate the padding needed for left alignment
    const padding = " ".repeat(Math.max(0, width - formattedNumber.length));

    // Left-align the formatted number
    return padding + formattedNumber;
}
