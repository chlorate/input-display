import {connect} from "inferno-mobx";
import {Controller} from "../controller/controller";

interface Props {
	gamepad: Controller;
	id: string;
	value: number;
	onChange: any;
}

export const AxisSelectComponent = connect(["gamepad"], (props: Props) => (
	<select
		class="form-control"
		id={props.id}
		value={props.value}
		required
		onChange={props.onChange}
	>
		{props.gamepad.axes.map((axis, i) => (
			<option value={i}>Axis {i + 1}</option>
		))}
		{props.value >= props.gamepad.axes.length &&
			<option value={props.value}>Axis {props.value + 1}</option>
		}
	</select>
));
