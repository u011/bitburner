import { NS, BasicHGWOptions } from "@ns";

export async function main(ns: NS, hostname: string): Promise<void> {
    const options: BasicHGWOptions = {
        threads: 5, // Example value for threads
    };    
    ns.hack(hostname, options)
}
