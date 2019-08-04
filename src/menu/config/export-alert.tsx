import {Component, InfernoNode} from "inferno";
import {Alert, Input} from "inferno-bootstrap";

interface Props {
	json?: string;
	onClose: () => void;
}

/**
 * Displays an exported config JSON string and instructions for saving it to
 * a file.
 */
export class ExportAlert extends Component<Props> {
	private input: HTMLInputElement | null = null;

	public render(): InfernoNode {
		const {json, onClose} = this.props;
		if (!json) {
			return null;
		}

		return (
			<Alert color="success" className="mt-3 mb-0" onClose={onClose}>
				<p>
					OBS Browser Source does not support file downloads. Copy and
					paste the following into a config.json file:
				</p>
				<Input
					innerRef={this.setInput}
					value={json}
					readOnly
					onClick={this.select}
					onFocus={this.select}
				/>
			</Alert>
		);
	}

	private setInput = (input: HTMLInputElement): void => {
		this.input = input;
		this.select();
	};

	private select = (): void => {
		if (this.input) {
			this.input.select();
		}
	};
}
