import { NS } from "@ns";

// Self replicate to other machines
export async function main(ns: NS): Promise<void> {
    const servers = getAllServers(ns);
    findContracts(ns, servers);
}

function findContracts(ns: NS, servers: Set<string>) {
    servers.delete("home");
    for (const hostname of servers) {
        const filenames = ns.ls(hostname, 'cct');
        if (filenames.length > 0) {
            ns.tprint(hostname, filenames);
        }
    }
}

function getAllServers(ns: NS): Set<string> {
    const visited: Set<string> = new Set();
    const queue: string[] = [];
    const start =  "home"
    visited.add(start)
    queue.push(start)

    while (queue.length > 0) {
        const currentServer = queue.shift()!;
        const neighbors = ns.scan(currentServer)
        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }
    return visited
}