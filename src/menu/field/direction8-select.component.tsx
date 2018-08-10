import {Direction8, direction8Names, sortedDirection8s} from "../../direction/direction8";

interface Props {
	className?: string;
	id: string;
	direction: Direction8;
	onChange;
}

/**
 * A field for selecting a cardinal or intermediate direction.
 */
export const Direction8SelectComponent = (props: Props) => (
	<div class={`form-group form-group-direction8 ${props.className || ""}`}>
		<label htmlFor={props.id}>
			Direction
		</label>
		<select
			className="form-control"
			id={props.id}
			value={props.direction}
			onChange={props.onChange}
		>
			{sortedDirection8s.map((direction) => (
				<option value={direction}>{direction8Names[direction]}</option>
			))}
		</select>
	</div>
);
