import {EventEmitter} from "events";
import {linkEvent} from "inferno";
import Component from "inferno-component";
import {connect} from "inferno-mobx";
import {action} from "mobx";
import {Config} from "../../config/config";
import {DpadControl} from "../../control/dpad-control";
import {EllipseControl} from "../../control/ellipse-control";
import {ControlType} from "../../control/json/control-json";
import {RectangleControl} from "../../control/rectangle-control";
import {TriangleControl} from "../../control/triangle-control";
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
	public state: State = {type: ControlType.Ellipse};

	set type(type: ControlType) {
		this.setState({type});
	}

	public render() {
		return (
			<form onSubmit={linkEvent(this, handleSubmit)}>
				<div className="form-group">
					<label className="sr-only" for="config-add-control">
						Control type
					</label>
					<div className="input-group">
						<select
							className="form-control"
							id="config-add-control"
							value={this.state.type}
							onChange={linkEvent(this, handleChange)}
						>
							<option value={ControlType.Ellipse}>Button (circle/ellipse)</option>
							<option value={ControlType.Rectangle}>Button (square/rectangle)</option>
							<option value={ControlType.Triangle}>Button (triangle)</option>
							<option value={ControlType.Dpad}>Button (d-pad)</option>
							<option value="">Analog stick</option>
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
		case ControlType.Dpad:
			controls.push(new DpadControl());
			break;
		case ControlType.Ellipse:
			controls.push(new EllipseControl());
			break;
		case ControlType.Rectangle:
			controls.push(new RectangleControl());
			break;
		case ControlType.Triangle:
			controls.push(new TriangleControl());
			break;
	}
	component.props.events.emit(Event.AddControl);
});
