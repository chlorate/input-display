import {AxisReferenceJSON, isAxisReferenceJSON} from "../../config/json/axis-reference-json";
import {ButtonReferenceJSON, isButtonReferenceJSON} from "../../config/json/button-reference-json";
import {Direction4, sortedDirection4s} from "../../direction/direction4";
import {Direction8, sortedDirection8s} from "../../direction/direction8";
import {LabelPosition, sortedLabelPositions} from "../label-position";
import {LabelReplacement, sortedLabelReplacements} from "../label-replacement";

/**
 * Type values for distinguishing Control subclass JSON representations.
 */
export enum ControlType {
	DpadButton = "dpadButton",
	EllipseButton = "ellipseButton",
	RectangleButton = "rectangleButton",
	TriangleButton = "triangleButton",
	CircleStick = "circleStick",
	OctagonStick = "octagonStick",
}

/**
 * JSON representations of all Control subclasses.
 */
export type ControlJSON = (
	DpadButtonControlJSON |
	EllipseButtonControlJSON |
	RectangleButtonControlJSON |
	TriangleButtonControlJSON |
	CircleStickControlJSON |
	OctagonStickControlJSON
);

/**
 * A JSON representation of a DpadButtonControl.
 */
export interface DpadButtonControlJSON extends BaseButtonControlJSON {
	type: ControlType.DpadButton;
	radius: number;
	direction: Direction4;
}

/**
 * A JSON representation of a EllipseButtonControl.
 */
export interface EllipseButtonControlJSON extends BaseButtonControlJSON {
	type: ControlType.EllipseButton;
	rotation: number;
}

/**
 * A JSON representation of a RectangleButtonControl.
 */
export interface RectangleButtonControlJSON extends BaseButtonControlJSON {
	type: ControlType.RectangleButton;
	topRadius: number;
	bottomRadius: number;
	rotation: number;
}

/**
 * A JSON representation of a TriangleButtonControl.
 */
export interface TriangleButtonControlJSON extends BaseButtonControlJSON {
	type: ControlType.TriangleButton;
	direction: Direction8;
}

/**
 * Common properties for all ButtonControl JSON representations.
 */
export interface BaseButtonControlJSON extends BaseControlJSON {
	width: number;
	height: number;
}

/**
 * A JSON representation of a CircleStickControl.
 */
export interface CircleStickControlJSON extends BaseStickControlJSON {
	type: ControlType.CircleStick;
}

/**
 * A JSON representation of an OctagonStickControl.
 */
export interface OctagonStickControlJSON extends BaseStickControlJSON {
	type: ControlType.OctagonStick;
}

/**
 * Common properties for all StickControl JSON representations.
 */
export interface BaseStickControlJSON extends BaseControlJSON {
	xAxis?: AxisReferenceJSON;
	yAxis?: AxisReferenceJSON;
	outerSize: number;
	innerSize: number;
}

/**
 * Common properties for all Control JSON representations.
 */
export interface BaseControlJSON {
	name: string;
	button?: ButtonReferenceJSON;
	x: number;
	y: number;
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

		// Control properties
		typeof input.name === "string" &&
		(input.button === undefined || isButtonReferenceJSON(input.button)) &&
		typeof input.x === "number" &&
		typeof input.y === "number" &&
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

		// Button control properties
		(
			(
				typeof input.width === "number" &&
				typeof input.height === "number"
			) ||
			(
				input.type !== ControlType.DpadButton &&
				input.type !== ControlType.EllipseButton &&
				input.type !== ControlType.RectangleButton &&
				input.type !== ControlType.TriangleButton
			)
		) &&

		// Stick control properties
		(
			(
				(input.xAxis === undefined || isAxisReferenceJSON(input.xAxis)) &&
				(input.yAxis === undefined || isAxisReferenceJSON(input.yAxis)) &&
				typeof input.outerSize === "number" &&
				typeof input.innerSize === "number"
			) ||
			(
				input.type !== ControlType.CircleStick &&
				input.type !== ControlType.OctagonStick
			)
		) &&

		// Control subclass type and properties
		(
			(
				input.type === ControlType.DpadButton &&
				typeof input.radius === "number" &&
				sortedDirection4s.indexOf(input.direction) >= 0
			) ||
			(
				input.type === ControlType.EllipseButton &&
				typeof input.rotation === "number"
			) ||
			(
				input.type === ControlType.RectangleButton &&
				typeof input.topRadius === "number" &&
				typeof input.bottomRadius === "number" &&
				typeof input.rotation === "number"
			) ||
			(
				input.type === ControlType.TriangleButton &&
				sortedDirection8s.indexOf(input.direction) >= 0
			) ||
			input.type === ControlType.CircleStick ||
			input.type === ControlType.OctagonStick
		)
	);
}
