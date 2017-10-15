import {linkEvent} from "inferno";
import {connect} from "inferno-mobx";
import {ButtonReference} from "../../config/button-reference";
import {ButtonWidget} from "../../widget/button-widget";
import {Widget} from "../../widget/widget";
import {ButtonReferenceSelectComponent} from "../config/button-reference-select.component";
import {NumberInputComponent} from "../config/number-input.component";
import {TextInputComponent} from "../config/text-input.component";

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
			id={`config-widget-name`}
			label="Name"
			value={widget.name}
			maxLength={maxNameLength}
			onChange={linkEvent(widget, handleChangeName)}
		/>

		<div className="form-row">
			{widget instanceof ButtonWidget &&
				<ButtonReferenceSelectComponent
					className="col"
					id={`config-widget-button`}
					reference={widget.button}
					onChange={linkEvent(widget, handleChangeButton)}
				/>
			}
		</div>

		<div className="form-row">
			<NumberInputComponent
				className="col"
				id={`config-widget-x`}
				label="X"
				suffix="px"
				value={widget.x}
				min={minX}
				max={maxX}
				onChange={linkEvent(widget, handleChangeX)}
			/>
			<NumberInputComponent
				className="col"
				id={`config-widget-y`}
				label="Y"
				suffix="px"
				value={widget.y}
				min={minY}
				max={maxY}
				onChange={linkEvent(widget, handleChangeY)}
			/>
		</div>

		<div className="form-row">
			{widget instanceof ButtonWidget && [
				<NumberInputComponent
					className="col"
					id={`config-widget-width`}
					label="Width"
					suffix="px"
					value={widget.width}
					min={minWidth}
					max={maxWidth}
					onChange={linkEvent(widget, handleChangeWidth)}
				/>,
				<NumberInputComponent
					className="col"
					id={`config-widget-height`}
					label="Height"
					suffix="px"
					value={widget.height}
					min={minHeight}
					max={maxHeight}
					onChange={linkEvent(widget, handleChangeHeight)}
				/>,
			]}
		</div>

		<div class="form-row">
			{widget instanceof ButtonWidget &&
				<NumberInputComponent
					className="col"
					id={`config-widget-border-width`}
					label="Border width"
					suffix="px"
					value={widget.borderWidth}
					min={minBorderWidth}
					max={maxBorderWidth}
					step={0.1}
					onChange={linkEvent(widget, handleChangeBorderWidth)}
				/>
			}
		</div>
	</fieldset>
));

function handleChangeName(widget: Widget, event): void {
	widget.name = event.target.value;
}

function handleChangeButton(widget: ButtonWidget, reference?: ButtonReference): void {
	if (reference !== undefined) {
		widget.button = reference;
	}
}

function handleChangeX(widget: Widget, event): void {
	widget.x = event.target.value;
}

function handleChangeY(widget: Widget, event): void {
	widget.y = event.target.value;
}

function handleChangeWidth(widget: ButtonWidget, event): void {
	widget.width = event.target.value;
}

function handleChangeHeight(widget: ButtonWidget, event): void {
	widget.height = event.target.value;
}

function handleChangeBorderWidth(widget: ButtonWidget, event): void {
	widget.borderWidth = event.target.value;
}
