export const has = Function.prototype.call.bind(Object.prototype.hasOwnProperty) as <T>(
	o: unknown,
	p: keyof T
) => o is T
