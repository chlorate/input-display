import {render} from "inferno";
import {Provider} from "inferno-mobx";
import {Config} from "./config";
import {Gamepad} from "./gamepad";
import {GamepadComponent} from "./gamepad.component";
import {MenuComponent} from "./menu.component";

let config = new Config();

let gamepad = new Gamepad(config);
gamepad.poll();

const IndexComponent = () => {
	if (!navigator.getGamepads) {
		return (
			<div class="alert alert-danger text-center m-3" role="alert">
				Your browser doesn't support the Gamepad API.
			</div>
		);
	}

	return (
		<section class="d-flex justify-content-between h-100">
			<div class="id-gamepads p-3">
				<GamepadComponent />
			</div>
			<div class="id-menu p-3">
				<MenuComponent />
			</div>
		</section>
	);
};

render(
	<Provider config={config} gamepad={gamepad}>
		<IndexComponent />
	</Provider>,
	document.getElementsByTagName("main")[0]
);
