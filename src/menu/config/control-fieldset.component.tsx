import EventEmitter from "events";
import {linkEvent} from "inferno";
import Component from "inferno-component";
import {connect} from "inferno-mobx";
import {action} from "mobx";
import {AxisReference} from "../../config/axis-reference";
import {ButtonReference} from "../../config/button-reference";
import {ButtonControl, defaultSize, maxHeight, maxWidth, minHeight, minWidth} from "../../control/button-control";
import {Control} from "../../control/control";
import {defaultDirection as defaultDpadDirection, DpadButtonControl} from "../../control/dpad-button-control";
import {EllipseButtonControl} from "../../control/ellipse-button-control";
import {RectangleButtonControl} from "../../control/rectangle-button-control";
import {defaultInnerSize, defaultOuterSize, maxSize, minSize, StickControl} from "../../control/stick-control";
import {Event} from "../../event";
import {Store} from "../../storage/store";
import {AxisReferenceSelectComponent} from "../field/axis-reference-select.component";
import {ButtonReferenceSelectComponent} from "../field/button-reference-select.component";
import {Direction4SelectComponent} from "../field/direction4-select.component";
import {Direction8SelectComponent} from "../field/direction8-select.component";
import {LabelSelectComponent} from "../field/label-select.component";
import {NumberInputComponent} from "../field/number-input.component";
import {TextInputComponent} from "../field/text-input.component";

import {
	defaultBorderWidth, defaultPosition, defaultRadius,
	maxBorderWidth, maxNameLength, maxRadius, maxX, maxY,
	minBorderWidth, minRadius, minX, minY,
} from "../../control/control";

import {
	defaultRotation, maxRotation, minRotation, RotatableButtonControl,
} from "../../control/rotatable-button-control";

import {
	defaultDirection as defaultTriangleDirection, TriangleButtonControl,
} from "../../control/triangle-button-control";

const borderWidthStep = 0.25;

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

		let extraInputs: any[] = [
			<NumberInputComponent
				className="col"
				id="config-control-border-width"
				label="Border width"
				suffix="px"
				value={control.borderWidth}
				min={minBorderWidth}
				max={maxBorderWidth}
				step={borderWidthStep}
				placeholder={defaultBorderWidth}
				onChange={linkEvent(control, handleChangeBorderWidth)}
			/>,
		];
		const isCircle = control instanceof EllipseButtonControl && control.width === control.height;
		if (control instanceof RotatableButtonControl && !isCircle) {
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
		if (control instanceof DpadButtonControl) {
			extraInputs.push(
				<NumberInputComponent
					className="col"
					id="config-control-radius"
					label="Radius"
					suffix="px"
					value={control.radius}
					min={minRadius}
					max={maxRadius}
					placeholder={defaultRadius}
					onChange={linkEvent(control, handleChangeRadius)}
				/>,
			);
		}
		if (control instanceof RectangleButtonControl) {
			extraInputs.push(
				<NumberInputComponent
					className="col"
					id="config-control-top-radius"
					label="Top radius"
					suffix="px"
					value={control.topRadius}
					min={minRadius}
					max={maxRadius}
					placeholder={defaultRadius}
					onChange={linkEvent(control, handleChangeTopRadius)}
				/>,
				<NumberInputComponent
					className="col"
					id="config-control-bottom-radius"
					label="Bottom radius"
					suffix="px"
					value={control.bottomRadius}
					min={minRadius}
					max={maxRadius}
					placeholder={defaultRadius}
					onChange={linkEvent(control, handleChangeBottomRadius)}
				/>,
			);
		}
		if (control instanceof DpadButtonControl) {
			extraInputs.push(
				<Direction4SelectComponent
					className="col"
					id="config-control-direction"
					direction={control.direction}
					onChange={linkEvent(control, handleChangeDpadDirection)}
				/>,
			);
		}
		if (control instanceof TriangleButtonControl) {
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
			case 1:
				extraInputs.push(spacer6, spacer3);
				break;
			case 2:
				extraInputs.push(spacer6);
				break;
			case 3:
				extraInputs.push(spacer3, spacer3);
				break;
			case 4:
				extraInputs = [
					<div className="col">
						<div className="form-row flex-nowrap">
							{extraInputs[0] || spacer6}
							{extraInputs[1] || spacer6}
						</div>
					</div>,
					<div className="col">
						<div className="form-row flex-nowrap">
							{extraInputs[2] || spacer6}
							{extraInputs[3] || spacer6}
						</div>
					</div>,
				];
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
						onChange={(reference: ButtonReference?) => control.button = reference)}
					/>
				</div>

				{control instanceof StickControl &&
					<div className="form-row">
						<AxisReferenceSelectComponent
							className="col"
							id="config-control-x-axis"
							label="X axis"
							reference={control.xAxis}
							onChange={linkEvent(control, handleChangeXAxis)}
						/>
						<AxisReferenceSelectComponent
							className="col"
							id="config-control-y-axis"
							label="Y axis"
							reference={control.yAxis}
							onChange={linkEvent(control, handleChangeYAxis)}
						/>
					</div>
				}

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
							{control instanceof ButtonControl && [
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
								/>,
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
								/>,
							]}
							{control instanceof StickControl && [
								<NumberInputComponent
									className="col"
									id="config-control-outer-size"
									label="Outer size"
									suffix="px"
									value={control.outerSize}
									min={minSize}
									max={maxSize}
									placeholder={defaultOuterSize}
									onChange={linkEvent(control, handleChangeOuterSize)}
								/>,
								<NumberInputComponent
									className="col"
									id="config-control-inner-size"
									label="Inner size"
									suffix="px"
									value={control.innerSize}
									min={minSize}
									max={maxSize}
									placeholder={defaultInnerSize}
									onChange={linkEvent(control, handleChangeInnerSize)}
								/>,
							]}
						</div>
					</div>
				</div>

				<div className="form-row">
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

const handleChangeWidth = action((control: ButtonControl, event): void => {
	control.width = event.target.value || defaultSize;
});

const handleChangeHeight = action((control: ButtonControl, event): void => {
	control.height = event.target.value || defaultSize;
});

const handleChangeOuterSize = action((control: StickControl, event): void => {
	control.outerSize = event.target.value || defaultOuterSize;
});

const handleChangeInnerSize = action((control: StickControl, event): void => {
	control.innerSize = event.target.value || defaultInnerSize;
});

const handleChangeXAxis = action((control: StickControl, reference?: AxisReference): void => {
	control.xAxis = reference;
});

const handleChangeYAxis = action((control: StickControl, reference?: AxisReference): void => {
	control.yAxis = reference;
});

const handleChangeBorderWidth = action((control: Control, event): void => {
	control.borderWidth = event.target.value || defaultBorderWidth;
});

const handleChangeRadius = action((control: DpadButtonControl, event): void => {
	control.radius = event.target.value || defaultRadius;
});

const handleChangeTopRadius = action((control: RectangleButtonControl, event): void => {
	control.topRadius = event.target.value || defaultRadius;
});

const handleChangeBottomRadius = action((control: RectangleButtonControl, event): void => {
	control.bottomRadius = event.target.value || defaultRadius;
});

const handleChangeRotation = action((control: RotatableButtonControl, event): void => {
	control.rotation = event.target.value || defaultRotation;
});

const handleChangeDpadDirection = action((control: DpadButtonControl, event): void => {
	control.direction = event.target.value || defaultDpadDirection;
});

const handleChangeTriangleDirection = action((control: TriangleButtonControl, event): void => {
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
