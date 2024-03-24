import { NS, BasicHGWOptions } from "@ns";

export async function main(ns: NS): Promise<void> {

    if (typeof ns.args[0] === 'string' &&
        typeof ns.args[1] === 'number') {

        const hostname = ns.args[0]
        const threads = ns.args[1]

        const options: BasicHGWOptions = {
            threads: threads,
        };

        grow(ns, hostname, options)
    }
}

function grow(ns: NS, hostname: string, options: BasicHGWOptions) {
    ns.grow(hostname, options)
}
