import {rotatePoints} from "./point";

describe("rotatePoints", () => {
	it("should rotate an array of points", () => {
		const points = [
			{x: 5, y: 4},
			{x: 4, y: 6},
		];
		const rotated = rotatePoints(points, {x: 5, y: 5}, 45);
		expect(rotated[0].x).toBeCloseTo(5.7071, 4);
		expect(rotated[0].y).toBeCloseTo(4.2929, 4);
		expect(rotated[1].x).toBeCloseTo(3.5858, 4);
		expect(rotated[1].y).toBe(5);
	});
});
