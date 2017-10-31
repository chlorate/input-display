import {EventEmitter} from "events";
import {linkEvent} from "inferno";
import Component from "inferno-component";
import {connect} from "inferno-mobx";
import {Config} from "../config/config";
import {Control} from "../control/control";
import {StickControl} from "../control/stick-control";
import {Controller} from "../controller/controller";
import {Event} from "../event";
import {Store} from "../storage/store";

interface Props {
	config: Config;
	controller: Controller;
	events: EventEmitter;
	control: Control;
	children;
}

/**
 * Wraps all elements of a control into a group. All elements can then be drawn
 * relative to the group and then the group itself is translated to its proper
 * position. Class names are added for the control's index and its button state
 * which can be targeted with custom CSS.
 */
@connect([Store.Config, Store.Controller, Store.Events])
export class ControlGroupComponent extends Component<Props, {}> {
	public lastX?: number;
	public lastY?: number;

	public render() {
		const control = this.props.control;

		const classNames: string[] = [];
		if (control instanceof StickControl) {
			const xAxis = control.xAxis ? control.xAxis.resolveAxis(this.props.controller) : undefined;
			const yAxis = control.yAxis ? control.yAxis.resolveAxis(this.props.controller) : undefined;
			if ((xAxis && xAxis.moved) || (yAxis && yAxis.moved)) {
				classNames.push("control-axis-moved");
			}
		}
		if (control.button) {
			const button = control.button.resolve(this.props.controller);
			if (button && button.mashing) {
				classNames.push("control-button-mashing");
			}
			if (button && button.pressed) {
				classNames.push("control-button-pressed");
			}
		}

		return (
			<g
				className={`control-${this.props.config.controls.indexOf(control) + 1} ${classNames.join(" ")}`}
				transform={`translate(${control.x} ${control.y})`}
				onClick={linkEvent(this, handleClick)}
				onMouseDown={linkEvent(this, handleMouseDown)}
			>
				{this.props.children}
			</g>
		);
	}
}

function handleClick(_, event): void {
	// Prevent click from deselecting control in DisplayComponent.
	event.stopPropagation();
}

function handleMouseDown(component: ControlGroupComponent, event): void {
	component.props.events.emit(Event.SelectControl, component.props.control, event.clientX, event.clientY);
}
