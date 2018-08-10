import {Direction4, direction4Names, sortedDirection4s} from "../../direction/direction4";

interface Props {
	className?: string;
	id: string;
	direction: Direction4;
	onChange;
}

/**
 * A field for selecting a cardinal direction.
 */
export const Direction4SelectComponent = (props: Props) => (
	<div class={`form-group form-group-direction4 ${props.className || ""}`}>
		<label htmlFor={props.id}>
			Direction
		</label>
		<select
			className="form-control"
			id={props.id}
			value={props.direction}
			onChange={props.onChange}
		>
			{sortedDirection4s.map((direction) => (
				<option value={direction}>{direction4Names[direction]}</option>
			))}
		</select>
	</div>
);
