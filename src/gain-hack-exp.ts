import { NS } from "@ns";

export async function main(ns: NS): Promise<void> {
    while (true) ns.weaken("foodnstuff");
}
