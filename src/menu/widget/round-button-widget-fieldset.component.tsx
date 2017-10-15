import {linkEvent} from "inferno";
import {connect} from "inferno-mobx";
import {ButtonReference} from "../../config/button-reference";
import {RoundButtonWidget} from "../../widget/round-button-widget";
import {
	maxBorderWidth, maxHeight, maxNameLength, maxWidth, maxX, maxY,
	minBorderWidth, minHeight, minWidth, minX, minY,
} from "../../widget/widget";
import {ButtonReferenceSelectComponent} from "../config/button-reference-select.component";
import {NumberInputComponent} from "../config/number-input.component";
import {TextInputComponent} from "../config/text-input.component";

interface Props {
	widget: RoundButtonWidget;
	index: number;
}

/**
 * A set of fields for editing a RoundButtonWidget.
 */
export const RoundButtonWidgetFieldsetComponent = connect((props: Props) => (
	<fieldset>
		<h3 class="h5">
			Round button
		</h3>
		<div className="form-row">
			<TextInputComponent
				className="col"
				id={`config-widget-${props.index}-name`}
				label="Name"
				value={props.widget.name}
				maxLength={maxNameLength}
				onChange={linkEvent(props.widget, handleChangeName)}
			/>
			<ButtonReferenceSelectComponent
				className="col"
				id={`config-widget-${props.index}-button`}
				reference={props.widget.button}
				onChange={linkEvent(props.widget, handleChangeButton)}
			/>
			<NumberInputComponent
				className="col"
				id={`config-widget-${props.index}-x`}
				label="X"
				suffix="px"
				value={props.widget.x}
				min={minX}
				max={maxX}
				onChange={linkEvent(props.widget, handleChangeX)}
			/>
			<NumberInputComponent
				className="col"
				id={`config-widget-${props.index}-y`}
				label="Y"
				suffix="px"
				value={props.widget.y}
				min={minY}
				max={maxY}
				onChange={linkEvent(props.widget, handleChangeY)}
			/>
		</div>
		<div className="form-row">
			<NumberInputComponent
				className="col"
				id={`config-widget-${props.index}-width`}
				label="Width"
				suffix="px"
				value={props.widget.width}
				min={minWidth}
				max={maxWidth}
				onChange={linkEvent(props.widget, handleChangeWidth)}
			/>
			<NumberInputComponent
				className="col"
				id={`config-widget-${props.index}-height`}
				label="Height"
				suffix="px"
				value={props.widget.height}
				min={minHeight}
				max={maxHeight}
				onChange={linkEvent(props.widget, handleChangeHeight)}
			/>
			<NumberInputComponent
				className="col"
				id={`config-widget-${props.index}-border-width`}
				label="Border width"
				suffix="px"
				value={props.widget.borderWidth}
				min={minBorderWidth}
				max={maxBorderWidth}
				step={0.1}
				onChange={linkEvent(props.widget, handleChangeBorderWidth)}
			/>
		</div>
	</fieldset>
));

function handleChangeName(widget: RoundButtonWidget, event): void {
	widget.name = event.target.value;
}

function handleChangeButton(widget: RoundButtonWidget, reference?: ButtonReference): void {
	if (reference !== undefined) {
		widget.button = reference;
	}
}

function handleChangeX(widget: RoundButtonWidget, event): void {
	widget.x = event.target.value;
}

function handleChangeY(widget: RoundButtonWidget, event): void {
	widget.y = event.target.value;
}

function handleChangeWidth(widget: RoundButtonWidget, event): void {
	widget.width = event.target.value;
}

function handleChangeHeight(widget: RoundButtonWidget, event): void {
	widget.height = event.target.value;
}

function handleChangeBorderWidth(widget: RoundButtonWidget, event): void {
	widget.borderWidth = event.target.value;
}
