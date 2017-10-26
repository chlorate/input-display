/**
 * Represents cardinal and intermediate directions.
 */
export enum Direction8 {
	Up = "up",
	UpRight = "upRight",
	Right = "right",
	DownRight = "downRight",
	Down = "down",
	DownLeft = "downLeft",
	Left = "left",
	UpLeft = "upLeft",
}

/**
 * A sorted array of cardinal and intermediate directions.
 */
export const sortedDirection8s: Direction8[] = [
	Direction8.Up,
	Direction8.UpRight,
	Direction8.Right,
	Direction8.DownRight,
	Direction8.Down,
	Direction8.DownLeft,
	Direction8.Left,
	Direction8.UpLeft,
];
