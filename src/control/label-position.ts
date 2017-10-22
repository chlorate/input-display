/**
 * Possible positions where a label can be placed.
 */
export enum LabelPosition {
	Above = "above",
	Left = "left",
	Center = "center",
	Right = "right",
	Below = "below",
}

/**
 * A sorted array of label positions.
 */
export const sortedLabelPositions: LabelPosition[] = [
	LabelPosition.Above,
	LabelPosition.Left,
	LabelPosition.Center,
	LabelPosition.Right,
	LabelPosition.Below,
];

/**
 * Readable names for each label position.
 */
export const labelPositionNames: {[key: string]: string} = {
	[LabelPosition.Above]: "Above",
	[LabelPosition.Left]: "Left",
	[LabelPosition.Center]: "Center",
	[LabelPosition.Right]: "Right",
	[LabelPosition.Below]: "Below",
};
