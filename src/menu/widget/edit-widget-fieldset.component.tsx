import {EventEmitter} from "events";
import {linkEvent} from "inferno";
import Component from "inferno-component";
import {connect} from "inferno-mobx";
import {Config} from "../../config/config";
import {clampIndex} from "../../math/util";
import {Store} from "../../storage/store";
import {RoundButtonWidget} from "../../widget/round-button-widget";
import {Event} from "../config/event";
import {WidgetFieldsetComponent} from "./widget-fieldset.component";

interface Props {
	config: Config;
	events: EventEmitter;
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
	private listener: () => void;

	constructor(props: Props, state: State) {
		super(props, state);
		this.listener = () => this.selectLast();
	}

	set index(index: number) {
		this.setState({index: clampIndex(index)});
	}

	public componentDidMount(): void {
		this.props.events.addListener(Event.AddWidget, this.listener);
	}

	public componentWillUnmount(): void {
		this.props.events.removeListener(Event.AddWidget, this.listener);
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

	private selectLast(): void {
		this.index = this.props.config.widgets.length - 1;
	}
}

function handleChange(component: EditWidgetFieldsetComponent, event) {
	component.index = event.target.value;
}
