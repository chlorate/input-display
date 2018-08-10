import {EventEmitter} from "events";
import {linkEvent} from "inferno";
import Component from "inferno-component";
import {connect} from "inferno-mobx";
import {action} from "mobx";
import {Config} from "../../config/config";
import {CircleStickControl} from "../../control/circle-stick-control";
import {DpadButtonControl} from "../../control/dpad-button-control";
import {EllipseButtonControl} from "../../control/ellipse-button-control";
import {ControlType} from "../../control/json/control-json";
import {OctagonStickControl} from "../../control/octagon-stick-control";
import {RectangleButtonControl} from "../../control/rectangle-button-control";
import {TriangleButtonControl} from "../../control/triangle-button-control";
import {Event} from "../../event";
import {Store} from "../../storage/store";

interface Props {
	config: Config;
	events: EventEmitter;
}

interface State {
	type: ControlType;
}

/**
 * A form for creating a new control.
 */
@connect([Store.Config, Store.Events])
export class AddControlFormComponent extends Component<Props, State> {
	public state: State = {type: ControlType.EllipseButton};

	set type(type: ControlType) {
		this.setState({type});
	}

	public render() {
		return (
			<form onSubmit={linkEvent(this, handleSubmit)}>
				<div className="form-group">
					<label className="sr-only" htmlFor="config-add-control">
						Control type
					</label>
					<div className="input-group">
						<select
							className="form-control"
							id="config-add-control"
							value={this.state.type}
							onChange={linkEvent(this, handleChange)}
						>
							<option value={ControlType.EllipseButton}>Button (circle/ellipse)</option>
							<option value={ControlType.RectangleButton}>Button (square/rectangle)</option>
							<option value={ControlType.TriangleButton}>Button (triangle)</option>
							<option value={ControlType.DpadButton}>Button (d-pad)</option>
							<option value={ControlType.CircleStick}>Analog stick (circle)</option>
							<option value={ControlType.OctagonStick}>Analog stick (octagon)</option>
						</select>
						<span className="input-group-btn">
							<button className="btn btn-primary">
								Add
							</button>
						</span>
					</div>
				</div>
			</form>
		);
	}
}

function handleChange(component: AddControlFormComponent, event): void {
	component.type = event.target.value;
}

const handleSubmit = action((component: AddControlFormComponent, event): void => {
	event.preventDefault();

	const controls = component.props.config.controls;
	switch (component.state.type) {
		case ControlType.DpadButton:
			controls.push(new DpadButtonControl());
			break;
		case ControlType.EllipseButton:
			controls.push(new EllipseButtonControl());
			break;
		case ControlType.RectangleButton:
			controls.push(new RectangleButtonControl());
			break;
		case ControlType.TriangleButton:
			controls.push(new TriangleButtonControl());
			break;
		case ControlType.CircleStick:
			controls.push(new CircleStickControl());
			break;
		case ControlType.OctagonStick:
			controls.push(new OctagonStickControl());
			break;
	}
	component.props.events.emit(Event.AddControl);
});
