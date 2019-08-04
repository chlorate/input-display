import {ChangeEvent, Component, InfernoNode} from "inferno";
import {Input} from "inferno-bootstrap";
import {inject, observer} from "inferno-mobx";
import {Controller} from "../../../controller/controller";
import {Store} from "../../../storage/store";

interface Props {
	className?: string;
	id: string;
	value?: number;
	required?: boolean;
	onChange: (index?: number) => void;
}

interface InjectedProps extends Props {
	controller: Controller;
}

/**
 * A field for selecting an axis. Used by other components that involve
 * selecting an axis.
 */
@inject(Store.Controller)
@observer
export class AxisSelect extends Component<Props> {
	private get injected(): InjectedProps {
		return this.props as InjectedProps;
	}

	public render(): InfernoNode {
		const {className, id, value} = this.props;
		return (
			<Input
				className={`form-control-axis-select ${className || ""}`}
				id={id}
				type="select"
				value={value !== undefined ? value : ""}
				required
				onChange={this.handleChange}
			>
				{this.options}
			</Input>
		);
	}

	private get options(): InfernoNode[] {
		const {controller, required, value} = this.injected;

		const options: InfernoNode[] = [];
		if (!required || value === undefined) {
			options.push(<option value="">None</option>);
		}
		options.push(
			...controller.axes.map((axis, i) => (
				<option value={i}>Axis {i + 1}</option>
			)),
		);
		if (value !== undefined && value >= controller.axes.length) {
			options.push(<option value={value}>Axis {value + 1}</option>);
		}
		return options;
	}

	private handleChange = (event: ChangeEvent<HTMLSelectElement>): void => {
		const {value} = event.target;

		let index: number | undefined;
		if (value) {
			index = parseInt(value, 10);
		}

		this.props.onChange(index);
	};
}
