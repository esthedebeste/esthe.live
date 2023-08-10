import data from "./minis.json"

export interface Mini {
	uuid: string
	date: Date
	title: string
	text: string
}

export type RawMini = (typeof data)[0]

export const minis = data.map(
	(m): Mini => ({
		...m,
		uuid: m.mini_uuid,
		title: "mini #" + BigInt("0x" + m.mini_uuid.replaceAll("-", "")).toString(),
		date: new Date(m.date),
	})
)

export function getMini(uuid: string): Mini | undefined {
	return minis.find(m => m.uuid === uuid)
}
