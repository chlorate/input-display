import EventEmitter from "events";
import {linkEvent} from "inferno";
import Component from "inferno-component";
import {connect} from "inferno-mobx";
import {action} from "mobx";
import {ButtonReference} from "../../config/button-reference";
import {Control} from "../../control/control";
import {defaultDirection as defaultDpadDirection, DpadControl} from "../../control/dpad-control";
import {EllipseControl} from "../../control/ellipse-control";
import {RectangleControl} from "../../control/rectangle-control";
import {defaultRotation, maxRotation, minRotation, RotatableControl} from "../../control/rotatable-control";
import {defaultDirection as defaultTriangleDirection, TriangleControl} from "../../control/triangle-control";
import {Store} from "../../storage/store";
import {Event} from "../event";
import {ButtonReferenceSelectComponent} from "../field/button-reference-select.component";
import {Direction4SelectComponent} from "../field/direction4-select.component";
import {Direction8SelectComponent} from "../field/direction8-select.component";
import {LabelSelectComponent} from "../field/label-select.component";
import {NumberInputComponent} from "../field/number-input.component";
import {TextInputComponent} from "../field/text-input.component";

import {
	defaultBorderRadius, defaultBorderWidth, defaultPosition, defaultSize,
	maxBorderRadius, maxBorderWidth, maxHeight, maxNameLength, maxWidth, maxX, maxY,
	minBorderRadius, minBorderWidth, minHeight, minWidth, minX, minY,
} from "../../control/control";

const borderStep = 0.25;

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

		const extraInputs: any[] = [];
		const isCircle = control instanceof EllipseControl && control.width === control.height;
		if (control instanceof DpadControl) {
			extraInputs.push(
				<NumberInputComponent
					className="col"
					id="config-control-border-radius"
					label="Border radius"
					suffix="px"
					value={control.borderRadius}
					min={minBorderRadius}
					max={maxBorderRadius}
					step={borderStep}
					placeholder={defaultBorderRadius}
					onChange={linkEvent(control, handleChangeBorderRadius)}
				/>,
			);
		}
		if (control instanceof RectangleControl) {
			extraInputs.push(
				<NumberInputComponent
					className="col"
					id="config-control-top-border-radius"
					label="Top radius"
					suffix="px"
					value={control.topBorderRadius}
					min={minBorderRadius}
					max={maxBorderRadius}
					step={borderStep}
					placeholder={defaultBorderRadius}
					onChange={linkEvent(control, handleChangeTopBorderRadius)}
				/>,
				<NumberInputComponent
					className="col"
					id="config-control-bottom-border-radius"
					label="Bottom radius"
					suffix="px"
					value={control.bottomBorderRadius}
					min={minBorderRadius}
					max={maxBorderRadius}
					step={borderStep}
					placeholder={defaultBorderRadius}
					onChange={linkEvent(control, handleChangeBottomBorderRadius)}
				/>,
			);
		}
		if (control instanceof RotatableControl && !isCircle) {
			// Rotation won't have any effect if control is a circle.
			extraInputs.push(
				<NumberInputComponent
					className="col"
					id="config-control-rotation"
					label="Rotation"
					suffix="°"
					value={control.rotation}
					min={minRotation}
					max={maxRotation}
					placeholder={defaultRotation}
					onChange={linkEvent(control, handleChangeRotation)}
				/>,
			);
		}
		if (control instanceof DpadControl) {
			extraInputs.push(
				<Direction4SelectComponent
					className="col"
					id="config-control-direction"
					direction={control.direction}
					onChange={linkEvent(control, handleChangeDpadDirection)}
				/>,
			);
		}
		if (control instanceof TriangleControl) {
			extraInputs.push(
				<Direction8SelectComponent
					className="col"
					id="config-control-direction"
					direction={control.direction}
					onChange={linkEvent(control, handleChangeTriangleDirection)}
				/>,
			);
		}

		const spacer3 = <div className="col-3 col-spacer"></div>;
		const spacer6 = <div className="col-6 col-spacer"></div>;
		switch (extraInputs.length) {
			case 0:
				extraInputs.push(spacer6, spacer3);
				break;
			case 1:
				extraInputs.push(spacer6);
				break;
			case 2:
				extraInputs.push(spacer3, spacer3);
				break;
		}

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
						step={borderStep}
						placeholder={defaultBorderWidth}
						onChange={linkEvent(control, handleChangeBorderWidth)}
					/>
					{extraInputs}
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

const handleInputName = action((control: Control, event): void => {
	control.name = event.target.value;
});

const handleChangeButton = action((control: Control, reference?: ButtonReference): void => {
	control.button = reference;
});

const handleChangeX = action((control: Control, event): void => {
	control.x = event.target.value || defaultPosition;
});

const handleChangeY = action((control: Control, event): void => {
	control.y = event.target.value || defaultPosition;
});

const handleChangeWidth = action((control: Control, event): void => {
	control.width = event.target.value || defaultSize;
});

const handleChangeHeight = action((control: Control, event): void => {
	control.height = event.target.value || defaultSize;
});

const handleChangeBorderWidth = action((control: Control, event): void => {
	control.borderWidth = event.target.value || defaultBorderWidth;
});

const handleChangeBorderRadius = action((control: DpadControl, event): void => {
	control.borderRadius = event.target.value || defaultBorderRadius;
});

const handleChangeTopBorderRadius = action((control: RectangleControl, event): void => {
	control.topBorderRadius = event.target.value || defaultBorderRadius;
});

const handleChangeBottomBorderRadius = action((control: RectangleControl, event): void => {
	control.bottomBorderRadius = event.target.value || defaultBorderRadius;
});

const handleChangeRotation = action((control: RotatableControl, event): void => {
	control.rotation = event.target.value || defaultRotation;
});

const handleChangeDpadDirection = action((control: DpadControl, event): void => {
	control.direction = event.target.value || defaultDpadDirection;
});

const handleChangeTriangleDirection = action((control: TriangleControl, event): void => {
	control.direction = event.target.value || defaultTriangleDirection;
});

const handleChangeNameLabel = action((control: Control, event): void => {
	control.nameLabel = event.target.value || undefined;
});

const handleChangePressesLabel = action((control: Control, event): void => {
	control.pressesLabel = event.target.value || undefined;
});

const handleChangeMashSpeedLabel = action((control: Control, event): void => {
	control.mashSpeedLabel = event.target.value || undefined;
});
