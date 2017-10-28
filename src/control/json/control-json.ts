import {ButtonReferenceJSON, isButtonReferenceJSON} from "../../config/json/button-reference-json";
import {Direction4, sortedDirection4s} from "../../direction/direction4";
import {Direction8, sortedDirection8s} from "../../direction/direction8";
import {LabelPosition, sortedLabelPositions} from "../label-position";
import {LabelReplacement, sortedLabelReplacements} from "../label-replacement";

/**
 * Type values for distinguishing Control subclass JSON representations.
 */
export enum ControlType {
	Dpad = "dpad",
	Ellipse = "ellipse",
	Rectangle = "rectangle",
	Triangle = "triangle",
}

/**
 * JSON representations of all Control subclasses.
 */
export type ControlJSON = DpadControlJSON | EllipseControlJSON | RectangleControlJSON | TriangleControlJSON;

/**
 * A JSON representation of a DpadControl.
 */
export interface DpadControlJSON extends BaseControlJSON {
	type: ControlType.Dpad;
	radius: number;
	direction: Direction4;
}

/**
 * A JSON representation of a EllipseControl.
 */
export interface EllipseControlJSON extends BaseControlJSON {
	type: ControlType.Ellipse;
	rotation: number;
}

/**
 * A JSON representation of a RectangleControl.
 */
export interface RectangleControlJSON extends BaseControlJSON {
	type: ControlType.Rectangle;
	topRadius: number;
	bottomRadius: number;
	rotation: number;
}

/**
 * A JSON representation of a TriangleControl.
 */
export interface TriangleControlJSON extends BaseControlJSON {
	type: ControlType.Triangle;
	direction: Direction8;
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
			(
				input.type === ControlType.Dpad &&
				typeof input.radius === "number" &&
				sortedDirection4s.indexOf(input.direction) >= 0
			) ||
			(
				input.type === ControlType.Ellipse &&
				typeof input.rotation === "number"
			) ||
			(
				input.type === ControlType.Rectangle &&
				typeof input.topRadius === "number" &&
				typeof input.bottomRadius === "number" &&
				typeof input.rotation === "number"
			) ||
			(
				input.type === ControlType.Triangle &&
				sortedDirection8s.indexOf(input.direction) >= 0
			)
		)
	);
}
