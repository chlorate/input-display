import {isControllerJSON} from "./controller-json";

describe("isControllerJSON", () => {
	[
		{
			input: {},
			output: true,
		},
		{
			input: {
				axes: [
					{
						neutralValue: 0.1,
						minValue: -0.2,
						maxValue: 0.2,
					},
				],
			},
			output: true,
		},
		{
			input: "bad",
			output: false,
		},
		{
			input: {
				axes: "bad",
			},
			output: false,
		},
		{
			input: {
				axes: ["bad"],
			},
			output: false,
		},
	].forEach((test) => {
		it(`should return ${test.output} for ${JSON.stringify(test.input)}`, () => {
			expect(isControllerJSON(test.input)).toBe(test.output);
		});
	});
});
