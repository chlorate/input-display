import {ChangeEvent, Component, VNode} from "inferno";
import {Input} from "inferno-bootstrap";
import {observer} from "inferno-mobx";
import {action, observable} from "mobx";
import {clamp} from "../../../math/util";

interface Props {
	className?: string;
	id: string;
	value?: number;
	min: number;
	max: number;
	placeholder: number;
	describedBy?: string;
	onChange: (value?: number) => void;
}

/**
 * A number input field with extra error handling for invalid values.
 */
@observer
export class NumberInput extends Component<Props> {
	@observable
	private dirtyValue?: string;

	public render(): VNode {
		const {className, id, min, max, describedBy} = this.props;
		return (
			<Input
				className={className}
				id={id}
				type="number"
				value={this.value}
				min={`${min}`}
				max={`${max}`}
				placeholder={this.placeholder}
				required
				aria-describedby={describedBy}
				onBlur={this.handleBlur}
				onInput={this.handleInput}
			/>
		);
	}

	private get value(): string | undefined {
		if (this.dirtyValue !== undefined) {
			return this.dirtyValue;
		}
		if (this.props.value !== undefined) {
			return `${this.props.value}`;
		}
	}

	private get placeholder(): string | undefined {
		if (this.props.placeholder !== undefined) {
			return `${this.props.placeholder}`;
		}
	}

	@action
	private handleBlur = (): void => {
		this.dirtyValue = undefined;
	};

	@action
	private handleInput = (event: ChangeEvent<HTMLInputElement>): void => {
		const {min, max, onChange} = this.props;
		const {value: dirtyValue} = event.target;

		const value = parseFloat(dirtyValue);
		if (isNaN(value)) {
			onChange(undefined);
		} else {
			onChange(clamp(value, min, max));
		}

		this.dirtyValue = dirtyValue;
	};
}
