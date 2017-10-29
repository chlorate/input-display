import {linkEvent} from "inferno";
import {connect} from "inferno-mobx";
import {action} from "mobx";
import {ButtonPalette} from "../../config/button-palette";
import {ColorInputComponent} from "../field/color-input.component";

interface Props {
	id: string;
	palette: ButtonPalette;
}

/**
 * A set of fields for customizing the colors of a single palette.
 */
export const PaletteFieldsetComponent = connect((props: Props) => (
	<fieldset>
		<div className="form-row">
			<ColorInputComponent
				className="col"
				id={`${props.id}-border`}
				label="Border"
				value={props.palette.border}
				placeholder={props.palette.defaultBorder}
				onChange={linkEvent(props.palette, handleChangeBorder)}
			/>
			<ColorInputComponent
				className="col"
				id={`${props.id}-fill`}
				label="Fill"
				value={props.palette.fill}
				placeholder={props.palette.defaultFill}
				onChange={linkEvent(props.palette, handleChangeFill)}
			/>
			<ColorInputComponent
				className="col"
				id={`${props.id}-label`}
				label="Label"
				value={props.palette.label}
				placeholder={props.palette.defaultLabel}
				onChange={linkEvent(props.palette, handleChangeLabel)}
			/>
			<div className="col-6 col-spacer"></div>
		</div>
	</fieldset>
));

const handleChangeBorder = action((palette: ButtonPalette, event): void => {
	palette.border = event.target.value;
});

const handleChangeFill = action((palette: ButtonPalette, event): void => {
	palette.fill = event.target.value;
});

const handleChangeLabel = action((palette: ButtonPalette, event): void => {
	palette.label = event.target.value;
});
