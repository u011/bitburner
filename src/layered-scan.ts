import { NS } from "@ns";
export async function main(ns: NS): Promise<void> {
	let target = 'home'
	let serverList: string[] = [];
	const offset = '| '
	function scanning(target: string, offsetNum: number) {
		if (!serverList.includes(target)) {
			serverList.push(target);
			ns.tprint(offset.repeat(offsetNum), '- ', target)
			offsetNum++
			let currentScan = ns.scan(target);
			currentScan.forEach(server => scanning(server, offsetNum))
		}
	}
	scanning(target, 0);
}