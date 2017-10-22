import {NormalButtonReference} from "../config/normal-button-reference";
import {ButtonType} from "../controller/json/button-json";
import {EllipseControl} from "./ellipse-control";
import {ControlType} from "./json/control-json";
import {LabelPosition} from "./label-position";
import {LabelReplacement} from "./label-replacement";

describe("EllipseControl", () => {
	let control;

	beforeEach(() => {
		control = new EllipseControl();
	});

	describe("toJSON", () => {
		it("can return a JSON representation", () => {
			expect(control.toJSON()).toEqual({
				type: ControlType.Ellipse,
				name: "",
				button: undefined,
				x: 5,
				y: 5,
				width: 24,
				height: 24,
				borderWidth: 1.5,
				nameLabel: LabelPosition.Center,
				pressesLabel: undefined,
				mashSpeedLabel: LabelReplacement.Name,
			});
		});

		it("can include button reference", () => {
			control.button = new NormalButtonReference(1);
			expect(control.toJSON().button).toEqual({
				type: ButtonType.Normal,
				index: 1,
			});
		});
	});
});
