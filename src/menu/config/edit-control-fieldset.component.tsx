import {EventEmitter} from "events";
import {linkEvent} from "inferno";
import Component from "inferno-component";
import {connect} from "inferno-mobx";
import {action} from "mobx";
import {Config} from "../../config/config";
import {Control} from "../../control/control";
import {cloneControl} from "../../control/control.factory";
import {DpadButtonControl} from "../../control/dpad-button-control";
import {EllipseButtonControl} from "../../control/ellipse-button-control";
import {RectangleButtonControl} from "../../control/rectangle-button-control";
import {TriangleControl} from "../../control/triangle-control";
import {Event} from "../../event";
import {clampIndex} from "../../math/util";
import {Store} from "../../storage/store";
import {ControlFieldsetComponent} from "./control-fieldset.component";

interface Props {
	config: Config;
	events: EventEmitter;
}

interface State {
	index: number;
}

/**
 * A set of fields for selecting a control to edit and editing it.
 */
@connect([Store.Config, Store.Events])
export class EditControlFieldsetComponent extends Component<Props, State> {
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
		this.props.events.addListener(Event.AddControl, this.listener);
	}

	public componentWillUnmount(): void {
		this.props.events.removeListener(Event.AddControl, this.listener);
	}

	public render() {
		if (!this.props.config.controls.length) {
			return;
		}

		const hasMultipleControls = this.props.config.controls.length > 1;
		return (
			<fieldset>
				<div className="form-group">
					<label className="sr-only" for="config-edit-control">
						Control to edit
					</label>
					<select
						className="form-control"
						id="config-edit-control"
						value={this.index}
						onChange={linkEvent(this, handleChange)}
					>
						{this.props.config.controls.map((control, i) => (
							<option value={i}>
								{`${i + 1}. `}
								{control instanceof DpadButtonControl && "Button (d-pad)"}
								{control instanceof EllipseButtonControl && control.width === control.height && "Button (circle)"}
								{control instanceof EllipseButtonControl && control.width !== control.height && "Button (ellipse)"}
								{control instanceof RectangleButtonControl && control.width === control.height && "Button (square)"}
								{control instanceof RectangleButtonControl && control.width !== control.height && "Button (rectangle)"}
								{control instanceof TriangleControl && "Button (triangle)"}
								{control.name ? ` - ${control.name}` : ""}
							</option>
						))}
					</select>
				</div>
				<hr />
				<ControlFieldsetComponent
					events={this.props.events}
					control={this.props.config.controls[this.index]}
				/>
				<button
					className="btn btn-primary"
					onClick={linkEvent(this, handleClickClone)}
				>
					Clone
				</button>{" "}
				{hasMultipleControls && [
					<button
						className="btn btn-secondary"
						onClick={linkEvent(this, handleClickMoveUp)}
						disabled={this.index <= 0}
					>
						Move up
					</button>,
					" ",
				]}
				{hasMultipleControls &&
					<button
						className="btn btn-secondary"
						onClick={linkEvent(this, handleClickMoveDown)}
						disabled={this.index >= this.props.config.controls.length - 1}
					>
						Move down
					</button>
				}
				<button
					className="btn btn-danger float-right ml-1"
					onClick={linkEvent(this, handleClickDelete)}
				>
					Delete
				</button>
			</fieldset>
		);
	}

	private selectLast(): void {
		this.index = this.props.config.controls.length - 1;
	}
}

function handleChange(component: EditControlFieldsetComponent, event): void {
	component.index = event.target.value;
}

const handleClickClone = action((component: EditControlFieldsetComponent): void => {
	const controls = component.props.config.controls;
	controls.push(cloneControl(controls[component.index]));
	component.props.events.emit(Event.AddControl);
});

const handleClickMoveUp = action((component: EditControlFieldsetComponent): void => {
	swap(component.props.config.controls, component.index - 1, component.index);
	component.index--;
});

const handleClickMoveDown = action((component: EditControlFieldsetComponent): void => {
	swap(component.props.config.controls, component.index, component.index + 1);
	component.index++;
});

const swap = action((controls: Control[], x: number, y: number): void => {
	[controls[x], controls[y]] = [controls[y], controls[x]];
});

const handleClickDelete = action((component: EditControlFieldsetComponent): void => {
	const index = component.index;
	if (component.index === component.props.config.controls.length - 1) {
		// Keep in bounds if deleting last control.
		component.index--;
	}
	component.props.config.controls.splice(index, 1);
});
