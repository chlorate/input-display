import {connect} from "inferno-mobx";
import {Controller} from "../controller/controller";
import {Store} from "../mobx/store";

interface Props {
	controller: Controller;
	id: string;
	value: number;
	onChange: any;
}

/**
 * A <select> element for selecting an axis. Used by other components that
 * involve selecting an axis.
 */
export const AxisSelectComponent = connect([Store.Controller], (props: Props) => (
	<select
		class="form-control"
		id={props.id}
		value={props.value}
		required
		onChange={props.onChange}
	>
		{props.controller.axes.map((axis, i) => (
			<option value={i}>Axis {i + 1}</option>
		))}
		{props.value >= props.controller.axes.length &&
			<option value={props.value}>Axis {props.value + 1}</option>
		}
	</select>
));
