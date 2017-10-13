import {connect} from "inferno-mobx";
import {Controller} from "../controller/controller";
import {Store} from "../storage/store";

interface Props {
	controller: Controller;
}

export const GamepadComponent = connect([Store.Controller], ({controller}: Props) => {
	return (
		<div className="gamepad">
			<div className="d-flex">
				<div className="gamepad-diamond">
					<div className="gamepad-dpad-top"></div>
					<div className="gamepad-dpad-left"></div>
					<div className="gamepad-dpad-right"></div>
					<div className="gamepad-dpad-bottom"></div>
				</div>
				<div className="gamepad-middle d-flex align-items-center">
					<div className="gamepad-button-face"></div>
					<div className="gamepad-button-face"></div>
				</div>
				<div className="gamepad-diamond">
					<div className="gamepad-button-face"></div>
					<div className="gamepad-button-face"></div>
					<div className="gamepad-button-face"></div>
					<div className="gamepad-button-face"></div>
				</div>
			</div>
		</div>
	);
});
