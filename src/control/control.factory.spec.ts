import {AxisReference} from "../config/axis-reference";
import {NormalButtonReference} from "../config/normal-button-reference";
import {ButtonType} from "../controller/json/button-json";
import {Direction4} from "../direction/direction4";
import {Direction8} from "../direction/direction8";
import {CircleStickControl} from "./circle-stick-control";
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

	describe("DpadButtonControl", () => {
		it("can be created", () => {
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

		it("can be created with a button reference", () => {
			json.button = {
				type: ButtonType.Normal,
				index: 5,
			};
			const control = parseControlJSON(json);
			expect(control.button instanceof NormalButtonReference).toBe(true);
		});
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

	describe("CircleStickControl", () => {
		beforeEach(() => {
			json.type = ControlType.CircleStick;
			json.outerSize = 5;
			json.innerSize = 6;
		});

		it("can be created", () => {
			const control = parseControlJSON(json) as CircleStickControl;
			expect(control.xAxis).toBeUndefined();
			expect(control.yAxis).toBeUndefined();
			expect(control.outerSize).toBe(5);
			expect(control.innerSize).toBe(6);
		});

		it("can be created with axis references", () => {
			json.xAxis = {
				index: 0,
				inverted: false,
			};
			json.yAxis = {
				index: 1,
				inverted: true,
			};
			const control = parseControlJSON(json) as CircleStickControl;
			expect(control.xAxis instanceof AxisReference).toBe(true);
			expect(control.yAxis instanceof AxisReference).toBe(true);
			if (control.xAxis) {
				expect(control.xAxis.index).toBe(0);
			}
			if (control.yAxis) {
				expect(control.yAxis.index).toBe(1);
			}
		});
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
