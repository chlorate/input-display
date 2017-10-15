import {linkEvent} from "inferno";
import Component from "inferno-component";
import {connect} from "inferno-mobx";
import {Config} from "../../config/config";
import {clampIndex} from "../../math/util";
import {Store} from "../../storage/store";
import {RoundButtonWidget} from "../../widget/round-button-widget";
import {WidgetFieldsetComponent} from "./widget-fieldset.component";

interface Props {
	config: Config;
}

interface State {
	index: number;
}

/**
 * A set of fields for selecting a widget to edit and editing it.
 */
@connect([Store.Config])
export class EditWidgetFieldsetComponent extends Component<Props, State> {
	public state: State = {index: 0};

	set index(index: number) {
		this.setState({index: clampIndex(index)});
	}

	public render() {
		if (!this.props.config.widgets.length) {
			return;
		}

		return (
			<fieldset>
				<h3 className="h5">
					Edit widget
				</h3>
				<div className="form-group">
					<label for="config-edit-widget">
						Widget
					</label>
					<select
						className="form-control"
						id="config-edit-widget"
						value={this.state.index}
						onChange={linkEvent(this, handleChange)}
					>
						{this.props.config.widgets.map((widget, i) => (
							<option value={i}>
								{`${i + 1} - `}
								{widget.name ? `${widget.name} - ` : ""}
								{widget instanceof RoundButtonWidget && "Round button"}
							</option>
						))}
					</select>
				</div>
				<hr />
				<WidgetFieldsetComponent
					widget={this.props.config.widgets[this.state.index]}
				/>
			</fieldset>
		);
	}
}

function handleChange(component: EditWidgetFieldsetComponent, event) {
	component.index = event.target.value;
}
