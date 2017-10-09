import {isAxisObject} from "./axis-object";

describe("isAxisObject", () => {
	[
		{
			input: {},
			output: true,
		},
		{
			input: {
				neutralValue: 0.1,
				minValue: -0.2,
				maxValue: 0.2,
			},
			output: true,
		},
		{
			input: "bad",
			output: false,
		},
		{
			input: {neutralValue: "bad"},
			output: false,
		},
		{
			input: {minValue: "bad"},
			output: false,
		},
		{
			input: {maxValue: "bad"},
			output: false,
		},
	].forEach((test) => {
		it(`should return ${test.output} for ${JSON.stringify(test.input)}`, () => {
			expect(isAxisObject(test.input)).toBe(test.output);
		});
	});
});
