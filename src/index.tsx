import {render} from "inferno";
import {Provider} from "inferno-mobx";
import {Config} from "./config/config";
import {Controller} from "./controller/controller";
import {GamepadComponent} from "./display/gamepad.component";
import {MenuComponent} from "./menu/menu.component";

const config = new Config();

const controller = new Controller(config);
controller.poll();

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
			<div class="gamepads p-3">
				<GamepadComponent />
			</div>
			<div class="menu p-3">
				<MenuComponent />
			</div>
		</section>
	);
};

render(
	<Provider config={config} controller={controller}>
		<IndexComponent />
	</Provider>,
	document.getElementsByTagName("main")[0],
);
