/**
 * Represents the contents of a label. The class name can be used by custom CSS
 * for targeting specific types of labels.
 */
export interface Label {
	className: LabelClass;
	text: string;
}

export enum LabelClass {
	Name = "widget-label-name",
	Presses = "widget-label-presses",
	MashSpeed = "widget-label-mash-speed",
}
