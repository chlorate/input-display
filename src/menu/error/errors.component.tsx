import {linkEvent} from "inferno";
import {connect} from "inferno-mobx";
import {action} from "mobx";
import {Store} from "../../storage/store";

interface Props {
	errors: string[];
}

/**
 * A list of application errors. Errors can be dismissed.
 */
export const ErrorsComponent = connect([Store.Errors], ({errors}: Props) => {
	if (!errors.length) {
		return;
	}

	return (
		<div className="errors scroll">
			{errors.map((error, i) => (
				<div className="alert alert-warning alert-dismissible">
					{error}
					<button
						className="close"
						aria-label="Dismiss"
						onClick={linkEvent({errors, index: i}, handleClick)}
					>
						<span aria-hidden="true">×</span>
					</button>
				</div>
			))}
		</div>
	);
});

interface EventProps {
	errors: string[];
	index: number;
}

const handleClick = action((props: EventProps): void => {
	props.errors.splice(props.index, 1);
});
