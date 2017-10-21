import {linkEvent} from "inferno";
import {connect} from "inferno-mobx";
import {ButtonReference} from "../../config/button-reference";
import {Widget} from "../../widget/widget";
import {ButtonReferenceSelectComponent} from "../field/button-reference-select.component";
import {LabelSelectComponent} from "../field/label-select.component";
import {NumberInputComponent} from "../field/number-input.component";
import {TextInputComponent} from "../field/text-input.component";

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
		<div className="form-row">
			<TextInputComponent
				className="col"
				id="config-widget-name"
				label="Name"
				value={widget.name}
				maxLength={maxNameLength}
				onChange={linkEvent(widget, handleChangeName)}
			/>
			<ButtonReferenceSelectComponent
				className="col-auto"
				id="config-widget-button"
				reference={widget.button}
				onChange={linkEvent(widget, handleChangeButton)}
			/>
		</div>

		{/* Nested rows make it so the fields wrap in pairs. */}
		<div className="form-row">
			<div className="col">
				<div className="form-row flex-nowrap">
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
			</div>
			<div className="col">
				<div className="form-row flex-nowrap">
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
			</div>
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
			<div className="col-6 col-spacer"></div>
			<div className="col-3 col-spacer"></div>
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

function handleChangeNameLabel(widget: Widget, event): void {
	widget.nameLabel = event.target.value || undefined;
}

function handleChangePressesLabel(widget: Widget, event): void {
	widget.pressesLabel = event.target.value || undefined;
}

function handleChangeMashSpeedLabel(widget: Widget, event): void {
	widget.mashSpeedLabel = event.target.value || undefined;
}
