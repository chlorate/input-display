import EventEmitter from "events";
import {linkEvent} from "inferno";
import Component from "inferno-component";
import {connect} from "inferno-mobx";
import {ButtonReference} from "../../config/button-reference";
import {Control} from "../../control/control";
import {Store} from "../../storage/store";
import {Event} from "../event";
import {ButtonReferenceSelectComponent} from "../field/button-reference-select.component";
import {LabelSelectComponent} from "../field/label-select.component";
import {NumberInputComponent} from "../field/number-input.component";
import {TextInputComponent} from "../field/text-input.component";

import {
	defaultBorderWidth, defaultPosition, defaultSize,
	maxBorderWidth, maxHeight, maxNameLength, maxWidth, maxX, maxY,
	minBorderWidth, minHeight, minWidth, minX, minY,
} from "../../control/control";

interface Props {
	events: EventEmitter;
	control: Control;
}

/**
 * A set of fields for editing a control.
 */
@connect([Store.Events])
export class ControlFieldsetComponent extends Component<Props, {}> {
	private listener: () => void;
	private nameInput?: HTMLInputElement;

	constructor(props: Props) {
		super(props);
		this.listener = () => this.selectName();
	}

	public componentDidMount(): void {
		this.props.events.addListener(Event.AddControl, this.listener);
	}

	public componentWillUnmount(): void {
		this.props.events.removeListener(Event.AddControl, this.listener);
	}

	public render() {
		const control = this.props.control;
		return (
			<fieldset>
				<div className="form-row">
					<TextInputComponent
						className="col"
						id="config-control-name"
						inputRef={(input) => this.nameInput = input}
						label="Name"
						value={control.name}
						maxLength={maxNameLength}
						onInput={linkEvent(control, handleInputName)}
					/>
					<ButtonReferenceSelectComponent
						className="col-auto"
						id="config-control-button"
						reference={control.button}
						onChange={linkEvent(control, handleChangeButton)}
					/>
				</div>

				{/* Nested rows make it so the fields wrap in pairs. */}
				<div className="form-row">
					<div className="col">
						<div className="form-row flex-nowrap">
							<NumberInputComponent
								className="col"
								id="config-control-x"
								label="X"
								suffix="px"
								value={control.x}
								min={minX}
								max={maxX}
								placeholder={defaultPosition}
								onChange={linkEvent(control, handleChangeX)}
							/>
							<NumberInputComponent
								className="col"
								id="config-control-y"
								label="Y"
								suffix="px"
								value={control.y}
								min={minY}
								max={maxY}
								placeholder={defaultPosition}
								onChange={linkEvent(control, handleChangeY)}
							/>
						</div>
					</div>
					<div className="col">
						<div className="form-row flex-nowrap">
							<NumberInputComponent
								className="col"
								id="config-control-width"
								label="Width"
								suffix="px"
								value={control.width}
								min={minWidth}
								max={maxWidth}
								placeholder={defaultSize}
								onChange={linkEvent(control, handleChangeWidth)}
							/>
							<NumberInputComponent
								className="col"
								id="config-control-height"
								label="Height"
								suffix="px"
								value={control.height}
								min={minHeight}
								max={maxHeight}
								placeholder={defaultSize}
								onChange={linkEvent(control, handleChangeHeight)}
							/>
						</div>
					</div>
				</div>

				<div className="form-row">
					<NumberInputComponent
						className="col"
						id="config-control-border-width"
						label="Border width"
						suffix="px"
						value={control.borderWidth}
						min={minBorderWidth}
						max={maxBorderWidth}
						step={0.1}
						placeholder={defaultBorderWidth}
						onChange={linkEvent(control, handleChangeBorderWidth)}
					/>
					<div className="col-6 col-spacer"></div>
					<div className="col-3 col-spacer"></div>
				</div>

				<div className="form-row">
					<LabelSelectComponent
						className="col"
						id="config-control-name-label"
						label="Name label"
						value={control.nameLabel}
						onChange={linkEvent(control, handleChangeNameLabel)}
					/>
					<LabelSelectComponent
						className="col"
						id="config-control-presses-label"
						label="Press count label"
						value={control.pressesLabel}
						onChange={linkEvent(control, handleChangePressesLabel)}
					/>
					<LabelSelectComponent
						className="col"
						id="config-control-mash-speed-label"
						label="Mash speed label"
						value={control.mashSpeedLabel}
						replacement={true}
						onChange={linkEvent(control, handleChangeMashSpeedLabel)}
					/>
				</div>
			</fieldset>
		);
	}

	private selectName() {
		if (this.nameInput) {
			this.nameInput.select();
		}
	}
}

function handleInputName(control: Control, event): void {
	control.name = event.target.value;
}

function handleChangeButton(control: Control, reference?: ButtonReference): void {
	control.button = reference;
}

function handleChangeX(control: Control, event): void {
	control.x = event.target.value === "" ? defaultPosition : event.target.value;
}

function handleChangeY(control: Control, event): void {
	control.y = event.target.value === "" ? defaultPosition : event.target.value;
}

function handleChangeWidth(control: Control, event): void {
	control.width = event.target.value || defaultSize;
}

function handleChangeHeight(control: Control, event): void {
	control.height = event.target.value || defaultSize;
}

function handleChangeBorderWidth(control: Control, event): void {
	control.borderWidth = event.target.value === "" ? defaultBorderWidth : event.target.value;
}

function handleChangeNameLabel(control: Control, event): void {
	control.nameLabel = event.target.value || undefined;
}

function handleChangePressesLabel(control: Control, event): void {
	control.pressesLabel = event.target.value || undefined;
}

function handleChangeMashSpeedLabel(control: Control, event): void {
	control.mashSpeedLabel = event.target.value || undefined;
}
