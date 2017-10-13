import {linkEvent} from "inferno";
import {connect} from "inferno-mobx";
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
		<div class="errors scroll">
			{errors.map((error, i) => (
				<div class="alert alert-warning">
					<button
						class="close"
						aria-label="Dismiss"
						onClick={linkEvent({errors, index: i}, handleClick)}
					>
						<span aria-hidden="true">×</span>
					</button>
					{error}
				</div>
			))}
		</div>
	);
});

interface EventProps {
	errors: string[];
	index: number;
}

function handleClick(props: EventProps) {
	props.errors.splice(props.index, 1);
}
