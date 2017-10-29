import {NormalButtonReference} from "../config/normal-button-reference";
import {ButtonType} from "../controller/json/button-json";
import {ControlJSON, ControlType} from "./json/control-json";
import {LabelPosition} from "./label-position";
import {LabelReplacement} from "./label-replacement";

import {
	Control,
	defaultBorderWidth, defaultPosition,
	maxBorderWidth, maxNameLength, maxX, maxY,
	minBorderWidth, minX, minY,
} from "./control";

class TestControl extends Control {
	public get centerX(): number {
		throw new Error("not implemented");
	}

	public get rightX(): number {
		throw new Error("not implemented");
	}

	public get centerY(): number {
		throw new Error("not implemented");
	}

	public get bottomY(): number {
		throw new Error("not implemented");
	}

	public toJSON(): ControlJSON {
		const json = {
			type: ControlType.EllipseButton,
			width: 10,
			height: 10,
		};
		return Object.assign(json, super.toBaseJSON()) as ControlJSON;
	}

	protected getRightX(): number {
		throw new Error("not implemented");
	}

	protected getBottomY(): number {
		throw new Error("not implemented");
	}
}

describe("Control", () => {
	let control;

	beforeEach(() => {
		control = new TestControl();
	});

	it("should truncate name", () => {
		control.name = "x".repeat(200);
		expect(control.name.length).toBe(maxNameLength);
	});

	it("should clamp x-position", () => {
		control.x = -1;
		expect(control.x).toBe(minX);
		control.x = 5000;
		expect(control.x).toBe(maxX);
	});

	it("should clamp y-position", () => {
		control.y = -1;
		expect(control.y).toBe(minY);
		control.y = 5000;
		expect(control.y).toBe(maxY);
	});

	it("should clamp border width", () => {
		control.borderWidth = -1;
		expect(control.borderWidth).toBe(minBorderWidth);
		control.borderWidth = 5000;
		expect(control.borderWidth).toBe(maxBorderWidth);
	});

	it("can return a nudge value", () => {
		control.borderWidth = 0;
		expect(control.nudge).toBe(0);
		control.borderWidth = 0.5;
		expect(control.nudge).toBe(0.25);
		control.borderWidth = 1;
		expect(control.nudge).toBe(0.5);
		control.borderWidth = 1.5;
		expect(control.nudge).toBe(0.25);
		control.borderWidth = 2;
		expect(control.nudge).toBe(0);
		control.borderWidth = 11;
		expect(control.nudge).toBe(0.5);
	});

	it("can return x-position of control left", () => {
		control.borderWidth = 11;
		expect(control.leftX).toBe(-5.5);
	});

	it("can return y-position of control top", () => {
		control.borderWidth = 11;
		expect(control.topY).toBe(-5.5);
	});

	describe("toBaseJSON", () => {
		it("can return a partial JSON representation", () => {
			expect(control.toJSON()).toEqual({
				type: ControlType.EllipseButton,
				name: "",
				button: undefined,
				x: defaultPosition,
				y: defaultPosition,
				width: 10,
				height: 10,
				borderWidth: defaultBorderWidth,
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
