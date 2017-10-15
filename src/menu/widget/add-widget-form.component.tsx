import {EventEmitter} from "events";
import {linkEvent} from "inferno";
import Component from "inferno-component";
import {connect} from "inferno-mobx";
import {Config} from "../../config/config";
import {Store} from "../../storage/store";
import {WidgetType} from "../../widget/json/widget-json";
import {RoundButtonWidget} from "../../widget/round-button-widget";
import {Event} from "../config/event";

interface Props {
	config: Config;
	events: EventEmitter;
}

interface State {
	type: WidgetType;
}

/**
 * A form for creating a new widget.
 */
@connect([Store.Config])
export class AddWidgetFormComponent extends Component<Props, State> {
	public state: State = {type: WidgetType.RoundButton};

	set type(type: WidgetType) {
		this.setState({type});
	}

	public render() {
		return (
			<form onSubmit={linkEvent(this, handleSubmit)}>
				<h3 className="h5">
					Add widget
				</h3>
				<div className="form-group">
					<label for="config-add-widget">
						Type
					</label>
					<select
						className="form-control"
						id="config-add-widget"
						value={this.state.type}
						onChange={linkEvent(this, handleChange)}
					>
						<option value={WidgetType.RoundButton}>Round button</option>
						<option value="">Square button</option>
						<option value="">Angled button</option>
						<option value="">Triangular button</option>
						<option value="">Trigger button</option>
						<option value="">D-pad button</option>
						<option value="">Analog stick</option>
					</select>
				</div>
				<div class="form-group">
					<button className="btn btn-primary">
						Add
					</button>
				</div>
			</form>
		);
	}
}

function handleChange(component: AddWidgetFormComponent, event): void {
	component.type = event.target.value;
}

function handleSubmit(component: AddWidgetFormComponent, event): void {
	event.preventDefault();
	switch (component.state.type) {
		case WidgetType.RoundButton:
			component.props.config.widgets.push(new RoundButtonWidget());
			break;
	}
	component.props.events.emit(Event.AddWidget);
}
