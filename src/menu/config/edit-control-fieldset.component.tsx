import {EventEmitter} from "events";
import {linkEvent} from "inferno";
import Component from "inferno-component";
import {connect} from "inferno-mobx";
import {Config} from "../../config/config";
import {Control} from "../../control/control";
import {cloneControl} from "../../control/control.factory";
import {EllipseControl} from "../../control/ellipse-control";
import {clampIndex} from "../../math/util";
import {Store} from "../../storage/store";
import {Event} from "../event";
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
								{`${i + 1} - `}
								{control.name ? `${control.name} - ` : ""}
								{control instanceof EllipseControl && "Ellipse button"}
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

function handleClickClone(component: EditControlFieldsetComponent): void {
	const controls = component.props.config.controls;
	controls.push(cloneControl(controls[component.index]));
	component.props.events.emit(Event.AddControl);
}

function handleClickMoveUp(component: EditControlFieldsetComponent): void {
	swap(component.props.config.controls, component.index - 1, component.index);
	component.index--;
}

function handleClickMoveDown(component: EditControlFieldsetComponent): void {
	swap(component.props.config.controls, component.index, component.index + 1);
	component.index++;
}

function swap(controls: Control[], x: number, y: number): void {
	[controls[x], controls[y]] = [controls[y], controls[x]];
}

function handleClickDelete(component: EditControlFieldsetComponent): void {
	const index = component.index;
	if (component.index === component.props.config.controls.length - 1) {
		// Keep in bounds if deleting last control.
		component.index--;
	}
	component.props.config.controls.splice(index, 1);
}
