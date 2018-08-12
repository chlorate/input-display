import {Component} from "inferno";
import {inject, observer} from "inferno-mobx";
import {Controller} from "../../controller/controller";
import {Store} from "../../storage/store";

interface Props {
	id: string;
	value?: number;
	required?: boolean;
	onChange: any;
}

interface InjectedProps extends Props {
	controller: Controller;
}

/**
 * A <select> element for selecting an axis. Used by other components that
 * involve selecting an axis.
 */
@inject(Store.Controller)
@observer
export class AxisSelectComponent extends Component<Props, {}> {
	private get injected(): InjectedProps {
		return this.props as InjectedProps;
	}

	private get options(): JSX.Element[] {
		const {controller, required, value} = this.injected;

		const options: JSX.Element[] = [];
		if (required || value === undefined) {
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

	public render(): JSX.Element {
		const {id, onChange, value} = this.props;

		return (
			<select
				className="form-control"
				id={id}
				value={value !== undefined ? value : ""}
				required
				onChange={onChange}
			>
				{this.options}
			</select>
		);
	}
}
