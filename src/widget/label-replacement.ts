/**
 * Additional positions for the mash speed label that replace other labels.
 */
export enum LabelReplacement {
	Name = "name",
	Presses = "presses",
}

/**
 * A sorted array of label replacement values.
 */
export const sortedLabelReplacements: LabelReplacement[] = [
	LabelReplacement.Name,
	LabelReplacement.Presses,
];

/**
 * Readable names for each label replacement value.
 */
export const labelReplacementNames: {[key: string]: string} = {
	[LabelReplacement.Name]: "Replace name",
	[LabelReplacement.Presses]: "Replace press count",
};
