import {connect} from "inferno-mobx";
import {Controller} from "../controller/controller";
import {Store} from "../mobx/store";

interface Props {
	controller: Controller;
}

export const GamepadComponent = connect([Store.Controller], ({controller}: Props) => {
	return (
		<div class="gamepad">
			<div class="d-flex">
				<div class="gamepad-diamond">
					<div class="gamepad-dpad-top"></div>
					<div class="gamepad-dpad-left"></div>
					<div class="gamepad-dpad-right"></div>
					<div class="gamepad-dpad-bottom"></div>
				</div>
				<div class="gamepad-middle d-flex align-items-center">
					<div class="gamepad-button-face"></div>
					<div class="gamepad-button-face"></div>
				</div>
				<div class="gamepad-diamond">
					<div class="gamepad-button-face"></div>
					<div class="gamepad-button-face"></div>
					<div class="gamepad-button-face"></div>
					<div class="gamepad-button-face"></div>
				</div>
			</div>
		</div>
	);
});
