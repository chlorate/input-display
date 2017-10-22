import {ButtonReferenceJSON, isButtonReferenceJSON} from "../../config/json/button-reference-json";
import {LabelPosition, sortedLabelPositions} from "../label-position";
import {LabelReplacement, sortedLabelReplacements} from "../label-replacement";

/**
 * Type values for distinguishing Control subclass JSON representations.
 */
export enum ControlType {
	RoundButton = "roundButton",
}

/**
 * JSON representations of all Control subclasses.
 */
export type ControlJSON = RoundButtonControlJSON;

/**
 * A JSON representation of a RoundButtonControl.
 */
export interface RoundButtonControlJSON extends BaseControlJSON {
	type: ControlType.RoundButton;
}

/**
 * Common properties for all Control JSON representations.
 */
export interface BaseControlJSON {
	name: string;
	button?: ButtonReferenceJSON;
	x: number;
	y: number;
	width: number;
	height: number;
	borderWidth: number;
	nameLabel?: LabelPosition;
	pressesLabel?: LabelPosition;
	mashSpeedLabel?: LabelPosition | LabelReplacement;
}

/**
 * Returns true if some value is a ControlJSON object.
 */
export function isControlJSON(input: any): input is ControlJSON {
	return (
		typeof input === "object" &&
		typeof input.name === "string" &&
		(input.button === undefined || isButtonReferenceJSON(input.button)) &&
		typeof input.x === "number" &&
		typeof input.y === "number" &&
		typeof input.width === "number" &&
		typeof input.height === "number" &&
		typeof input.borderWidth === "number" &&
		(
			input.nameLabel === undefined ||
			sortedLabelPositions.indexOf(input.nameLabel) >= 0
		) &&
		(
			input.pressesLabel === undefined ||
			sortedLabelPositions.indexOf(input.pressesLabel) >= 0
		) &&
		(
			input.mashSpeedLabel === undefined ||
			sortedLabelPositions.indexOf(input.mashSpeedLabel) >= 0 ||
			sortedLabelReplacements.indexOf(input.mashSpeedLabel) >= 0
		) &&
		(
			input.type === ControlType.RoundButton // || ...
		)
	);
}
