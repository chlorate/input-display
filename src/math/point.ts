export interface Point {
	x: number;
	y: number;
}

/**
 * Rotates an array of points around some origin some number of degrees and
 * returns a new array of points.
 */
export function rotatePoints(points: Point[], origin: Point, degrees: number): Point[] {
	const radians = degrees * Math.PI / 180;
	return points.map((point) => {
		const x = point.x - origin.x;
		const y = point.y - origin.y;
		return {
			x: x * Math.cos(radians) - y * Math.sin(radians) + origin.x,
			y: x * Math.sin(radians) + y * Math.cos(radians) + origin.y,
		};
	});
}
