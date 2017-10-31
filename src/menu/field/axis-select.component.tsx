import {connect} from "inferno-mobx";
import {Controller} from "../../controller/controller";
import {Store} from "../../storage/store";

interface Props {
	controller: Controller;
	id: string;
	value?: number;
	required?: boolean;
	onChange: any;
}

/**
 * A <select> element for selecting an axis. Used by other components that
 * involve selecting an axis.
 */
export const AxisSelectComponent = connect([Store.Controller], (props: Props) => (
	<select
		className="form-control"
		id={props.id}
		value={props.value !== undefined ? props.value : ""}
		required
		onChange={props.onChange}
	>
		{(!props.required || props.value === undefined) &&
			<option value="">None</option>
		}
		{props.controller.axes.map((axis, i) => (
			<option value={i}>Axis {i + 1}</option>
		))}
		{props.value !== undefined && props.value >= props.controller.axes.length &&
			<option value={props.value}>Axis {props.value + 1}</option>
		}
	</select>
));
