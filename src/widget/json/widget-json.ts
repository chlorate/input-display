import {ButtonReferenceJSON, isButtonReferenceJSON} from "../../config/json/button-reference-json";

/**
 * Type values for distinguishing Widget subclass JSON representations.
 */
export enum WidgetType {
	RoundButton = "roundButton",
}

/**
 * JSON representations of all Widget subclasses.
 */
export type WidgetJSON = RoundButtonWidgetJSON;

/**
 * A JSON representation of a RoundButtonWidget.
 */
export interface RoundButtonWidgetJSON extends BaseWidgetJSON {
	type: WidgetType.RoundButton;
}

/**
 * Common properties for all Widget JSON representations.
 */
export interface BaseWidgetJSON {
	name: string;
	button?: ButtonReferenceJSON;
	x: number;
	y: number;
	width: number;
	height: number;
	borderWidth: number;
	showName: boolean;
	showPresses: boolean;
	showMashSpeed: boolean;
}

/**
 * Returns true if some value is a WidgetJSON object.
 */
export function isWidgetJSON(input: any): input is WidgetJSON {
	return (
		typeof input === "object" &&
		typeof input.name === "string" &&
		(input.button === undefined || isButtonReferenceJSON(input.button)) &&
		typeof input.x === "number" &&
		typeof input.y === "number" &&
		typeof input.width === "number" &&
		typeof input.height === "number" &&
		typeof input.borderWidth === "number" &&
		typeof input.showName === "boolean" &&
		typeof input.showPresses === "boolean" &&
		typeof input.showMashSpeed === "boolean" &&
		(
			input.type === WidgetType.RoundButton // || ...
		)
	);
}
