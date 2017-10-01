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
	[Direction.Up]: [1, -1, -0.714],
	[Direction.Right]: [-0.714, -0.429, -0.143],
	[Direction.Down]: [-0.143, 0.143, 0.429],
	[Direction.Left]: [0.429, 0.714, 1],
};
