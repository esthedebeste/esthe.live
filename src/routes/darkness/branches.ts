export interface Ending {
	ENDING: string
}

export type Text = {
	sender: string
	text: string
}

const speaker =
	<const T>(sender: T) =>
	([text]: TemplateStringsArray) => ({ sender, text })

const narrator = speaker("narrator")
const umbra = speaker("umbra")
const player = speaker("player")

export type ChoiceResult = [response: Text[], result: Choices | Ending]

export interface Choices {
	[choiceText: string]: ChoiceResult
}

let ppp: Choices
let zzz: ChoiceResult
let ggg: Choices

// todo write an actual dialogue lmaooo
export default [
	[narrator`!!!`, narrator`???`],
	{
		"???": [
			[umbra`$*#()`],
			(ppp = {
				"#&@*": [
					[umbra`#*(!)`],
					{
						"@#*($!": [
							[umbra`!$*@($)`],
							{
								...(ggg = {
									"@$!*(": [[player`!!!@$!*(`, player`::@$!*(`], {}],
								}),
								get "!!!!!!!!!?"() {
									return zzz
								},
							},
						],
						"!@)(#": (zzz = [
							[
								umbra`!@$(**(@!*(*!!!!!!!)))`,
								umbra`!@$}{}}}!%%%%%%`,
								umbra`*(#@!*$())`,
								umbra`{"}""}??"}`,
							],
							ggg,
						]),
						">:>:>>>>?": zzz,
					},
				],
			}),
		],
		"!!!": [[umbra`@@@`], ppp],
	},
] satisfies ChoiceResult
