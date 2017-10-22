import {EventEmitter} from "events";
import {linkEvent} from "inferno";
import Component from "inferno-component";
import {connect} from "inferno-mobx";
import {Config} from "../../config/config";
import {clampIndex} from "../../math/util";
import {Store} from "../../storage/store";
import {RoundButtonWidget} from "../../widget/round-button-widget";
import {Widget} from "../../widget/widget";
import {Event} from "../event";
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
@connect([Store.Config, Store.Events])
export class EditWidgetFieldsetComponent extends Component<Props, State> {
	public state: State = {index: 0};
	private listener: () => void;

	constructor(props: Props, state: State) {
		super(props, state);
		this.listener = () => this.selectLast();
	}

	get index(): number {
		return this.state.index;
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

		const hasMultipleWidgets = this.props.config.widgets.length > 1;
		return (
			<fieldset>
				<div className="form-group">
					<label className="sr-only" for="config-edit-widget">
						Widget to edit
					</label>
					<select
						className="form-control"
						id="config-edit-widget"
						value={this.index}
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
					events={this.props.events}
					widget={this.props.config.widgets[this.index]}
				/>
				<div className="form-group">
					{hasMultipleWidgets && this.index > 0 && [
						<button
							className="btn btn-secondary"
							onClick={linkEvent(this, handleClickMoveUp)}
						>
							Move up
						</button>,
						" ",
					]}
					{hasMultipleWidgets && this.index < this.props.config.widgets.length - 1 &&
						<button
							className="btn btn-secondary"
							onClick={linkEvent(this, handleClickMoveDown)}
						>
							Move down
						</button>
					}
					<button
						className="btn btn-danger float-right"
						onClick={linkEvent(this, handleClickDelete)}
					>
						Delete
					</button>
				</div>
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

function handleClickMoveUp(component: EditWidgetFieldsetComponent) {
	swap(component.props.config.widgets, component.index - 1, component.index);
	component.index--;
}

function handleClickMoveDown(component: EditWidgetFieldsetComponent) {
	swap(component.props.config.widgets, component.index, component.index + 1);
	component.index++;
}

function swap(widgets: Widget[], x: number, y: number) {
	[widgets[x], widgets[y]] = [widgets[y], widgets[x]];
}

function handleClickDelete(component: EditWidgetFieldsetComponent) {
	const index = component.index;
	if (component.index === component.props.config.widgets.length - 1) {
		// Keep in bounds if deleting last widget.
		component.index--;
	}
	component.props.config.widgets.splice(index, 1);
}
