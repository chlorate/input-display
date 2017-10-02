import {connect} from "inferno-mobx";
import {Gamepad} from "../gamepad";

interface Props {
	gamepad: Gamepad;
	id: string;
	label: string;
	value: number | null;
	help?: boolean;
	onChange: any;
}

export const AxisInputComponent = connect(["gamepad"], (props: Props) => (
	<div>
		<label for={props.id}>
			{props.label}
		</label>
		<select
			class="form-control id-form-control-axis"
			id={props.id}
			aria-describedby={props.help ? `${props.id}-help` : null}
			value={props.value === null ? "" : props.value}
			onChange={props.onChange}
		>
			<option value="">None</option>
			{props.gamepad.axes.map((axis, i) => (
				<option value={i}>Axis {i + 1}</option>
			))}
			{props.value !== null && props.value >= props.gamepad.axes.length &&
				<option value={props.value}>Axis {props.value}</option>
			}
		</select>
	</div>
));
