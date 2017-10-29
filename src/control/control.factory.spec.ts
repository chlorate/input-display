import {NormalButtonReference} from "../config/normal-button-reference";
import {ButtonType} from "../controller/json/button-json";
import {Direction4} from "../direction/direction4";
import {Direction8} from "../direction/direction8";
import {cloneControl, parseControlJSON} from "./control.factory";
import {DpadButtonControl} from "./dpad-button-control";
import {EllipseButtonControl} from "./ellipse-button-control";
import {ControlJSON, ControlType} from "./json/control-json";
import {LabelPosition} from "./label-position";
import {RectangleButtonControl} from "./rectangle-button-control";
import {TriangleButtonControl} from "./triangle-button-control";

function makeJSON(): ControlJSON {
	return {
		type: ControlType.DpadButton,
		name: "name",
		x: 0,
		y: 1,
		width: 2,
		height: 3,
		borderWidth: 4,
		radius: 5,
		direction: Direction4.Down,
		nameLabel: LabelPosition.Above,
		pressesLabel: LabelPosition.Below,
		mashSpeedLabel: LabelPosition.Center,
	};
}

describe("parseControlJSON", () => {
	let json;

	beforeEach(() => {
		json = makeJSON();
	});

	it("can create a DpadButtonControl", () => {
		const control = parseControlJSON(json) as DpadButtonControl;
		expect(control.name).toBe("name");
		expect(control.button).toBeUndefined();
		expect(control.x).toBe(0);
		expect(control.y).toBe(1);
		expect(control.width).toBe(2);
		expect(control.height).toBe(3);
		expect(control.borderWidth).toBe(4);
		expect(control.radius).toBe(5);
		expect(control.direction).toBe(Direction4.Down);
		expect(control.nameLabel).toBe(LabelPosition.Above);
		expect(control.pressesLabel).toBe(LabelPosition.Below);
		expect(control.mashSpeedLabel).toBe(LabelPosition.Center);
	});

	it("can create a control with a button reference", () => {
		json.button = {
			type: ButtonType.Normal,
			index: 5,
		};
		const control = parseControlJSON(json);
		expect(control.button instanceof NormalButtonReference).toBe(true);
	});

	it("can create a EllipseButtonControl", () => {
		json.type = ControlType.EllipseButton;
		json.rotation = 5;
		const control = parseControlJSON(json) as EllipseButtonControl;
		expect(control instanceof EllipseButtonControl).toBe(true);
		expect(control.rotation).toBe(5);
	});

	it("can create a RectangleButtonControl", () => {
		json.type = ControlType.RectangleButton;
		json.topRadius = 5;
		json.bottomRadius = 6;
		json.rotation = 7;
		const control = parseControlJSON(json) as RectangleButtonControl;
		expect(control instanceof RectangleButtonControl).toBe(true);
		expect(control.topRadius).toBe(5);
		expect(control.bottomRadius).toBe(6);
		expect(control.rotation).toBe(7);
	});

	it("can create a TriangleButtonControl", () => {
		json.type = ControlType.TriangleButton;
		json.direction = Direction8.Down;
		const control = parseControlJSON(json) as TriangleButtonControl;
		expect(control instanceof TriangleButtonControl).toBe(true);
		expect(control.direction).toBe(Direction8.Down);
	});
});

describe("cloneControl", () => {
	it("clones a control", () => {
		const json = makeJSON();
		const control = parseControlJSON(json);
		const clone = cloneControl(control);
		expect(clone).not.toBe(control);
		expect(clone.name).toBe(control.name);
	});
});
