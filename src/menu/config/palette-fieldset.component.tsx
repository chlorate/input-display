import {linkEvent} from "inferno";
import {connect} from "inferno-mobx";
import {Palette} from "../../config/palette";
import {ColorInputComponent} from "../field/color-input.component";

interface Props {
	id: string;
	palette: Palette;
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

function handleChangeBorder(palette: Palette, event): void {
	palette.border = event.target.value;
}

function handleChangeFill(palette: Palette, event): void {
	palette.fill = event.target.value;
}

function handleChangeLabel(palette: Palette, event): void {
	palette.label = event.target.value;
}
