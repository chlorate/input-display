import {linkEvent} from "inferno";
import {connect} from "inferno-mobx";
import {ButtonReference} from "../../config/button-reference";
import {Widget} from "../../widget/widget";
import {ButtonReferenceSelectComponent} from "../config/button-reference-select.component";
import {CheckboxInputComponent} from "../config/checkbox-input.component";
import {NumberInputComponent} from "../config/number-input.component";
import {TextInputComponent} from "../config/text-input.component";
import {LabelSelectComponent} from "./label-select.component";

import {
	maxBorderWidth, maxHeight, maxNameLength, maxWidth, maxX, maxY,
	minBorderWidth, minHeight, minWidth, minX, minY,
} from "../../widget/widget";

interface Props {
	widget: Widget;
}

/**
 * A set of fields for editing a widget.
 */
export const WidgetFieldsetComponent = connect(({widget}: Props) => (
	<fieldset>
		<TextInputComponent
			id="config-widget-name"
			label="Name"
			value={widget.name}
			maxLength={maxNameLength}
			onChange={linkEvent(widget, handleChangeName)}
		/>

		<div className="form-row">
			<ButtonReferenceSelectComponent
				className="col"
				id="config-widget-button"
				reference={widget.button}
				onChange={linkEvent(widget, handleChangeButton)}
			/>
		</div>

		<div className="form-row">
			<NumberInputComponent
				className="col"
				id="config-widget-x"
				label="X"
				suffix="px"
				value={widget.x}
				min={minX}
				max={maxX}
				onChange={linkEvent(widget, handleChangeX)}
			/>
			<NumberInputComponent
				className="col"
				id="config-widget-y"
				label="Y"
				suffix="px"
				value={widget.y}
				min={minY}
				max={maxY}
				onChange={linkEvent(widget, handleChangeY)}
			/>
		</div>

		<div className="form-row">
			<NumberInputComponent
				className="col"
				id="config-widget-width"
				label="Width"
				suffix="px"
				value={widget.width}
				min={minWidth}
				max={maxWidth}
				onChange={linkEvent(widget, handleChangeWidth)}
			/>
			<NumberInputComponent
				className="col"
				id="config-widget-height"
				label="Height"
				suffix="px"
				value={widget.height}
				min={minHeight}
				max={maxHeight}
				onChange={linkEvent(widget, handleChangeHeight)}
			/>
		</div>

		<div className="form-row">
			<NumberInputComponent
				className="col"
				id="config-widget-border-width"
				label="Border width"
				suffix="px"
				value={widget.borderWidth}
				min={minBorderWidth}
				max={maxBorderWidth}
				step={0.1}
				onChange={linkEvent(widget, handleChangeBorderWidth)}
			/>
		</div>

		<div className="form-row">
			<CheckboxInputComponent
				className="col mb-3"
				id="config-widget-show-name"
				label="Show name"
				checked={widget.showName}
				onClick={linkEvent(widget, handleClickShowName)}
			/>
			<CheckboxInputComponent
				className="col mb-3"
				id="config-widget-show-presses"
				label="Show press count"
				checked={widget.showPresses}
				onClick={linkEvent(widget, handleClickShowPresses)}
			/>
			<CheckboxInputComponent
				className="col mb-3"
				id="config-widget-show-mash-speed"
				label="Show mash speed"
				checked={widget.showMashSpeed}
				onClick={linkEvent(widget, handleClickShowMashSpeed)}
			/>
		</div>

		<div className="form-row">
			<LabelSelectComponent
				className="col"
				id="config-widget-name-label"
				label="Name label"
				value={widget.nameLabel}
				onChange={linkEvent(widget, handleChangeNameLabel)}
			/>
			<LabelSelectComponent
				className="col"
				id="config-widget-presses-label"
				label="Press count label"
				value={widget.pressesLabel}
				onChange={linkEvent(widget, handleChangePressesLabel)}
			/>
			<LabelSelectComponent
				className="col"
				id="config-widget-mash-speed-label"
				label="Mash speed label"
				value={widget.mashSpeedLabel}
				replacement={true}
				onChange={linkEvent(widget, handleChangeMashSpeedLabel)}
			/>
		</div>
	</fieldset>
));

function handleChangeName(widget: Widget, event): void {
	widget.name = event.target.value;
}

function handleChangeButton(widget: Widget, reference?: ButtonReference): void {
	widget.button = reference;
}

function handleChangeX(widget: Widget, event): void {
	widget.x = event.target.value;
}

function handleChangeY(widget: Widget, event): void {
	widget.y = event.target.value;
}

function handleChangeWidth(widget: Widget, event): void {
	widget.width = event.target.value;
}

function handleChangeHeight(widget: Widget, event): void {
	widget.height = event.target.value;
}

function handleChangeBorderWidth(widget: Widget, event): void {
	widget.borderWidth = event.target.value;
}

function handleClickShowName(widget: Widget, event): void {
	widget.showName = event.target.checked;
}

function handleClickShowPresses(widget: Widget, event): void {
	widget.showPresses = event.target.checked;
}

function handleClickShowMashSpeed(widget: Widget, event): void {
	widget.showMashSpeed = event.target.checked;
}

function handleChangeNameLabel(widget: Widget, event): void {
	widget.nameLabel = event.target.value || undefined;
}

function handleChangePressesLabel(widget: Widget, event): void {
	widget.pressesLabel = event.target.value || undefined;
}

function handleChangeMashSpeedLabel(widget: Widget, event): void {
	widget.mashSpeedLabel = event.target.value || undefined;
}
