import {EventEmitter} from "events";
import {linkEvent} from "inferno";
import Component from "inferno-component";
import {connect} from "inferno-mobx";
import {action} from "mobx";
import {Config} from "../config/config";
import {CircleStickControl} from "../control/circle-stick-control";
import {Control} from "../control/control";
import {DpadButtonControl} from "../control/dpad-button-control";
import {EllipseButtonControl} from "../control/ellipse-button-control";
import {RectangleButtonControl} from "../control/rectangle-button-control";
import {TriangleButtonControl} from "../control/triangle-button-control";
import {Controller} from "../controller/controller";
import {Event} from "../event";
import {Store} from "../storage/store";
import {CircleStickControlComponent} from "./circle-stick-control.component";
import {DpadButtonControlComponent} from "./dpad-button-control.component";
import {EllipseButtonControlComponent} from "./ellipse-button-control.component";
import {RectangleButtonControlComponent} from "./rectangle-button-control.component";
import {TriangleButtonControlComponent} from "./triangle-button-control.component";

enum Key {
	Up = 38,
	Right = 39,
	Down = 40,
	Left = 37,
}

interface Props {
	config: Config;
	controller: Controller;
	events: EventEmitter;
}

interface Item {
	key: number;
	zIndex: number;
	control: Control;
}

/**
 * Draws the entire input display.
 *
 * This also implements drag-and-drop. When left-click is held on
 * a ControlGroupComponent, its control is selected and can be moved with the
 * mouse until the mouse button is released or the cursor leaves this component.
 *
 * When a control is selected, the arrow keys will also move the control by
 * a pixel. Clicking outside of a ControlGroupComponent will deselect the
 * current control.
 */
@connect([Store.Config, Store.Controller, Store.Events])
export class DisplayComponent extends Component<Props, {}> {
	public control?: Control;
	public lastX?: number;
	public lastY?: number;
	private listener: (control: Control, x: number, y: number) => void;

	constructor(props: Props) {
		super(props);
		this.listener = (control: Control, x: number, y: number) => {
			this.control = control;
			this.lastX = x;
			this.lastY = y;
		};
	}

	public componentDidMount(): void {
		this.props.events.addListener(Event.SelectControl, this.listener);
	}

	public componentWillUnmount(): void {
		this.props.events.removeListener(Event.SelectControl, this.listener);
	}

	public render() {
		const config = this.props.config;

		// Sort controls so pressed and mashing controls are drawn above
		// unpressed controls.
		const items: Item[] = config.controls.map((control, i) => ({
			key: i,
			zIndex: this.zIndex(control),
			control,
		}));
		items.sort((x: Item, y: Item) => x.zIndex - y.zIndex);

		return (
			<svg
				hasKeyedChildren
				className={config.displayOutline ? "display-outline" : undefined}
				width={config.displayWidth}
				height={config.displayHeight}
				tabindex="0"
				onClick={linkEvent(this, handleClick)}
				onKeyDown={linkEvent(this, handleKeyDown)}
				onMouseMove={linkEvent(this, handleMouseMove)}
				onMouseUp={linkEvent(this, handleMouseLeaveOrUp)}
				onMouseLeave={linkEvent(this, handleMouseLeaveOrUp)}
			>
				{items.map((item) => {
					if (item.control instanceof DpadButtonControl) {
						return <DpadButtonControlComponent key={item.key} control={item.control} />;
					} else if (item.control instanceof EllipseButtonControl) {
						return <EllipseButtonControlComponent key={item.key} control={item.control} />;
					} else if (item.control instanceof RectangleButtonControl) {
						return <RectangleButtonControlComponent key={item.key} control={item.control} />;
					} else if (item.control instanceof TriangleButtonControl) {
						return <TriangleButtonControlComponent key={item.key} control={item.control} />;
					} else if (item.control instanceof CircleStickControl) {
						return <CircleStickControlComponent key={item.key} control={item.control} />;
					}
				})}
			</svg>
		);
	}

	/**
	 * Returns a number representing the z-index of a control:
	 * Pressed + mashing > Pressed > Mashing > Unpressed
	 */
	private zIndex(control: Control): number {
		if (!control.button) {
			return 0;
		}

		const button = control.button.resolve(this.props.controller);
		if (!button) {
			return 0;
		}

		let z = 0;
		if (button.pressed) {
			z += 2;
		}
		if (button.mashing) {
			z++;
		}
		return z;
	}
}

const handleMouseMove = action((component: DisplayComponent, event): void => {
	if (component.control && component.lastX !== undefined && component.lastY !== undefined) {
		component.control.x += event.clientX - component.lastX;
		component.control.y += event.clientY - component.lastY;
		component.lastX = event.clientX;
		component.lastY = event.clientY;
	}
});

function handleClick(component: DisplayComponent): void {
	component.control = undefined;
}

function handleMouseLeaveOrUp(component: DisplayComponent): void {
	component.lastX = undefined;
	component.lastY = undefined;
}

const handleKeyDown = action((component: DisplayComponent, event): void => {
	if (component.control) {
		switch (event.keyCode) {
			case Key.Up:
				component.control.y--;
				break;
			case Key.Right:
				component.control.x++;
				break;
			case Key.Down:
				component.control.y++;
				break;
			case Key.Left:
				component.control.x--;
				break;
		}
	}
});
