import {ChangeEvent, Component, InfernoNode} from "inferno";
import {Input} from "inferno-bootstrap";

interface Props {
	id: string;
	value: string;
	maxLength: number;
	onChange: (value: string) => void;
}

/**
 * A text input field.
 */
export class TextInput extends Component<Props> {
	public render(): InfernoNode {
		const {id, value, maxLength} = this.props;
		return (
			<Input
				id={id}
				value={value}
				maxLength={maxLength}
				onInput={this.handleInput}
			/>
		);
	}

	private handleInput = (event: ChangeEvent<HTMLInputElement>): void => {
		this.props.onChange(event.target.value);
	};
}
