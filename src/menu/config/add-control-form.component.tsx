import {EventEmitter} from "events";
import {linkEvent} from "inferno";
import Component from "inferno-component";
import {connect} from "inferno-mobx";
import {Config} from "../../config/config";
import {ControlType} from "../../control/json/control-json";
import {RoundButtonControl} from "../../control/round-button-control";
import {Store} from "../../storage/store";
import {Event} from "../event";

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
	public state: State = {type: ControlType.RoundButton};

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
							<option value={ControlType.RoundButton}>Round button</option>
							<option value="">Square button</option>
							<option value="">Angled button</option>
							<option value="">Triangular button</option>
							<option value="">Trigger button</option>
							<option value="">D-pad button</option>
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

function handleSubmit(component: AddControlFormComponent, event): void {
	event.preventDefault();
	switch (component.state.type) {
		case ControlType.RoundButton:
			component.props.config.controls.push(new RoundButtonControl());
			break;
	}
	component.props.events.emit(Event.AddControl);
}
