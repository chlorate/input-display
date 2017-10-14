import {ButtonType} from "../../controller/json/button-json";

/**
 * A JSON representation of a NormalButtonReference.
 */
export interface NormalButtonReferenceJSON {
	type: ButtonType.Normal;
	index: number;
}
