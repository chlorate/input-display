import {linkEvent} from "inferno";
import Component from "inferno-component";
import {connect} from "inferno-mobx";
import {Config} from "../../config/config";
import {Store} from "../../storage/store";
import {WidgetType} from "../../widget/json/widget-json";
import {RoundButtonWidget} from "../../widget/round-button-widget";
import {RoundButtonWidgetFieldsetComponent} from "./round-button-widget-fieldset.component";

interface Props {
	config: Config;
}

interface State {
	value: string;
}

/**
 * A set of fields for editing all widgets and a dropdown for adding new
 * widgets.
 */
@connect([Store.Config])
export class WidgetFieldsetComponent extends Component<Props, State> {
	public state: State = {value: WidgetType.RoundButton};

	set value(value: string) {
		this.setState({value});
	}

	public render() {
		return (
			<fieldset>
				{this.props.config.widgets.map((widget, i) => [
					(widget instanceof RoundButtonWidget &&
						<RoundButtonWidgetFieldsetComponent
							widget={widget}
							index={i}
						/>
					),
				])}
				{this.props.config.widgets.length > 0 &&
					<hr className="mt-0" />
				}
				<div className="input-group">
					<select
						className="form-control"
						value={this.state.value}
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
					<span className="input-group-btn">
						<button
							type="button"
							className="btn btn-primary"
							onClick={linkEvent(this, handleClick)}
						>
							Add
						</button>
					</span>
				</div>
			</fieldset>
		);
	}
}

function handleChange(component: WidgetFieldsetComponent, event) {
	component.value = event.target.value;
}

function handleClick(component: WidgetFieldsetComponent) {
	switch (component.state.value) {
		case WidgetType.RoundButton:
			component.props.config.widgets.push(new RoundButtonWidget());
			break;
	}
}
