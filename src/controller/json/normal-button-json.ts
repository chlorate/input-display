import {BaseButtonJSON, ButtonType} from "./button-json";

/**
 * A JSON representation of a NormalButton.
 */
export interface NormalButtonJSON extends BaseButtonJSON {
	type: ButtonType.Normal;
	index: number;
}
