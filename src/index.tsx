import {render} from "inferno";

const IndexComponent = () => {
	if (!navigator.getGamepads) {
		return (
			<div class="alert alert-danger text-center m-3" role="alert">
				Your browser doesn't support the Gamepad API.
			</div>
		);
	}

	return <div>Input Display</div>;
};

render(
	<IndexComponent />,
	document.getElementsByTagName("main")[0]
);
