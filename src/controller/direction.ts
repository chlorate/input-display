export const dpadNeutralValue = -9 / 7;

export enum Direction {
	Up = "up",
	Right = "right",
	Down = "down",
	Left = "left",
}

export const orderedDirections: Direction[] = [
	Direction.Up,
	Direction.Right,
	Direction.Down,
	Direction.Left,
];

export const directionAxisValues: {[id: string]: number[]} = {
	[Direction.Up]: [1, -1, -5 / 7],
	[Direction.Right]: [-5 / 7, -3 / 7, -1 / 7],
	[Direction.Down]: [-1 / 7, 1 / 7, 3 / 7],
	[Direction.Left]: [3 / 7, 5 / 7, 1],
};
