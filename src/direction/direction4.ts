/**
 * Represents cardinal directions.
 */
export enum Direction4 {
	Up = "up",
	Right = "right",
	Down = "down",
	Left = "left",
}

/**
 * A sorted array of cardinal directions.
 */
export const sortedDirection4s: Direction4[] = [
	Direction4.Up,
	Direction4.Right,
	Direction4.Down,
	Direction4.Left,
];

/**
 * Readable names for each cardinal direction.
 */
export const direction4Names: {[key: string]: string} = {
	[Direction4.Up]: "Up",
	[Direction4.Right]: "Right",
	[Direction4.Down]: "Down",
	[Direction4.Left]: "Left",
};
