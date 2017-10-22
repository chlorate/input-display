import {NormalButtonReference} from "../config/normal-button-reference";
import {ButtonType} from "../controller/json/button-json";
import {cloneControl, parseControlJSON} from "./control.factory";
import {ControlType} from "./json/control-json";
import {LabelPosition} from "./label-position";

function makeJSON() {
	return {
		type: ControlType.RoundButton,
		name: "name",
		x: 0,
		y: 1,
		width: 2,
		height: 3,
		borderWidth: 4,
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

	it("can create a RoundButtonControl", () => {
		const control = parseControlJSON(json);
		expect(control.name).toBe("name");
		expect(control.button).toBeUndefined();
		expect(control.x).toBe(0);
		expect(control.y).toBe(1);
		expect(control.width).toBe(2);
		expect(control.height).toBe(3);
		expect(control.borderWidth).toBe(4);
		expect(control.nameLabel).toBe(LabelPosition.Above);
		expect(control.pressesLabel).toBe(LabelPosition.Below);
		expect(control.mashSpeedLabel).toBe(LabelPosition.Center);
	});

	it("can create a RoundButtonControl with a button reference", () => {
		json.button = {
			type: ButtonType.Normal,
			index: 5,
		};
		const control = parseControlJSON(json);
		expect(control.button instanceof NormalButtonReference).toBe(true);
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
