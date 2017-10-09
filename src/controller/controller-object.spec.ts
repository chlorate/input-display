import {isControllerObject} from "./controller-object";

describe("isControllerObject", () => {
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
			expect(isControllerObject(test.input)).toBe(test.output);
		});
	});
});
