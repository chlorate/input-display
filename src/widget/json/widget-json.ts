import {ButtonReferenceJSON, isButtonReferenceJSON} from "../../config/json/button-reference-json";

/**
 * Type values for distinguishing Widget subclass JSON representations.
 */
export enum WidgetType {
	CircleButton = "circleButton",
}

/**
 * JSON representations of all Widget subclasses.
 */
export type WidgetJSON = CircleButtonWidgetJSON;

/**
 * A JSON representation of a CircleButtonWidget.
 */
export interface CircleButtonWidgetJSON extends BaseWidgetJSON {
	type: WidgetType.CircleButton;
	width: number;
	height: number;
	borderWidth: number;
	button: ButtonReferenceJSON;
}

/**
 * Common properties for all Widget JSON representations.
 */
export interface BaseWidgetJSON {
	x: number;
	y: number;
}

/**
 * Returns true if some value is a WidgetJSON object.
 */
export function isWidgetJSON(input: any): input is WidgetJSON {
	return (
		typeof input === "object" &&
		typeof input.x === "number" &&
		typeof input.y === "number" &&
		(
			(
				input.type === WidgetType.CircleButton &&
				typeof input.width === "number" &&
				typeof input.height === "number" &&
				typeof input.borderWidth === "number" &&
				isButtonReferenceJSON(input.button)
			)
		)
	);
}
