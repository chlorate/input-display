import {Component, MouseEvent, VNode} from "inferno";
import {Input} from "inferno-bootstrap";

interface Props {
	id: string;
	checked: boolean;
	describedBy?: string;
	onChange: (checked: boolean) => void;
}

/**
 * A checkbox field.
 */
export class Checkbox extends Component<Props> {
	public render(): VNode {
		const {id, checked, describedBy} = this.props;
		return (
			<Input
				id={id}
				type="checkbox"
				checked={checked}
				aria-describedby={describedBy}
				onClick={this.handleClick}
			/>
		);
	}

	private handleClick = (event: MouseEvent<HTMLInputElement>): void => {
		if (event.target instanceof HTMLInputElement) {
			this.props.onChange(event.target.checked);
		}
	};
}
