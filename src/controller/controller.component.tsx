import {linkEvent} from "inferno";
import {connect} from "inferno-mobx";
import {AxisRowComponent} from "./axis-row.component";
import {ButtonRowComponent} from "./button-row.component";
import {Controller} from "./controller";

interface Props {
	gamepad: Controller;
}

/**
 * Contents of the Controller tab. It displays information about the controller,
 * buttons, and axes.
 */
export const ControllerComponent = connect(["gamepad"], ({gamepad}: Props) => (
	<section>
		<h2 class="h4">
			Device
		</h2>
		{gamepad.id === undefined &&
			<p>Not connected.</p>
		}
		{gamepad.id !== undefined && [
			<table class="table table-sm table-controller-general">
				<tr>
					<th>ID</th>
					<td>{gamepad.id}</td>
				</tr>
				{gamepad.alias !== undefined &&
					<tr>
						<th>Alias</th>
						<td>{gamepad.alias}</td>
					</tr>
				}
				{gamepad.mapping !== undefined &&
					<tr>
						<th>Mapping</th>
						<td>{gamepad.mapping === "" ? <span class="text-muted">None</span> : gamepad.mapping}</td>
					</tr>
				}
			</table>,
		]}

		<h2 class="h4">
			Buttons
			{gamepad.buttons.length > 0 &&
				<button
					class="btn btn-warning btn-sm float-right"
					onClick={linkEvent(gamepad, handleClickResetButtons)}
				>
					Reset
				</button>
			}
		</h2>
		{!gamepad.buttons.length &&
			<p>No buttons detected.</p>
		}
		{gamepad.buttons.length > 0 &&
			<div class="scroll">
				<table class="table table-sm table-controller-buttons">
					<thead>
						<tr>
							<th>Name</th>
							<th class="text-center">Pressed</th>
							<th class="text-right"># presses</th>
							<th class="text-right">Mash speed</th>
							<th class="text-right">Mash best</th>
						</tr>
					</thead>
					<tbody>
						{gamepad.buttons.map((button) => <ButtonRowComponent button={button} />)}
					</tbody>
				</table>
			</div>
		}

		<h2 class="h4">
			Axes
			{gamepad.axes.length > 0 &&
				<button
					class="btn btn-warning btn-sm float-right"
					onClick={linkEvent(gamepad, handleClickResetAxes)}
				>
					Reset
				</button>
			}
		</h2>
		{!gamepad.axes.length &&
			<p class="m-0">No axes detected.</p>
		}
		{gamepad.axes.length > 0 &&
			<div class="scroll m-0">
				<table class="table table-sm table-controller-axes">
					<thead>
						<tr>
							<th>Name</th>
							<th class="text-right">Value</th>
							<th class="text-right">Neutral</th>
							<th class="text-right">Min</th>
							<th class="text-right">Max</th>
						</tr>
					</thead>
					<tbody>
						{gamepad.axes.map((axis, i) => <AxisRowComponent axis={axis} index={i} />)}
					</tbody>
				</table>
			</div>
		}
	</section>
));

function handleClickResetButtons(controller: Controller) {
	controller.resetButtons();
}

function handleClickResetAxes(controller: Controller) {
	controller.resetAxes();
}
