import {linkEvent} from "inferno";
import {connect} from "inferno-mobx";
import {Controller} from "../../controller/controller";
import {Store} from "../../storage/store";
import {AxisRowComponent} from "./axis-row.component";
import {ButtonRowComponent} from "./button-row.component";

interface Props {
	controller: Controller;
}

/**
 * Contents of the Controller tab. It displays information about the controller,
 * buttons, and axes.
 */
export const ControllerComponent = connect([Store.Controller], ({controller}: Props) => (
	<section>
		<h2 className="h4">
			Device
		</h2>
		{controller.id === undefined &&
			<p>Not connected.</p>
		}
		{controller.id !== undefined && [
			<table className="table table-sm table-controller-general">
				<tr>
					<th>ID</th>
					<td>{controller.id}</td>
				</tr>
				{controller.alias !== undefined &&
					<tr>
						<th>Alias</th>
						<td>{controller.alias}</td>
					</tr>
				}
				{controller.mapping !== undefined &&
					<tr>
						<th>Mapping</th>
						<td>{controller.mapping === "" ? <span className="text-muted">None</span> : controller.mapping}</td>
					</tr>
				}
			</table>,
		]}

		<h2 className="h4">
			Buttons
			{controller.buttons.length > 0 &&
				<button
					className="btn btn-warning btn-sm float-right"
					onClick={linkEvent(controller, handleClickResetButtons)}
				>
					Reset
				</button>
			}
		</h2>
		{!controller.buttons.length &&
			<p>No buttons detected.</p>
		}
		{controller.buttons.length > 0 &&
			<div className="scroll">
				<table className="table table-sm table-controller-buttons">
					<thead>
						<tr>
							<th>Name</th>
							<th className="text-center">Pressed</th>
							<th className="text-right"># presses</th>
							<th className="text-right">Mash speed</th>
							<th className="text-right">Mash best</th>
						</tr>
					</thead>
					<tbody>
						{controller.buttons.map((button) => <ButtonRowComponent button={button} />)}
					</tbody>
				</table>
			</div>
		}

		<h2 className="h4">
			Axes
			{controller.axes.length > 0 &&
				<button
					className="btn btn-warning btn-sm float-right"
					onClick={linkEvent(controller, handleClickResetAxes)}
				>
					Reset
				</button>
			}
		</h2>
		{!controller.axes.length &&
			<p className="m-0">No axes detected.</p>
		}
		{controller.axes.length > 0 &&
			<div className="scroll m-0">
				<table className="table table-sm table-controller-axes">
					<thead>
						<tr>
							<th>Name</th>
							<th className="text-right">Value</th>
							<th className="text-right">Neutral</th>
							<th className="text-right">Min</th>
							<th className="text-right">Max</th>
						</tr>
					</thead>
					<tbody>
						{controller.axes.map((axis, i) => <AxisRowComponent axis={axis} index={i} />)}
					</tbody>
				</table>
			</div>
		}
	</section>
));

function handleClickResetButtons(controller: Controller): void {
	controller.resetButtons();
}

function handleClickResetAxes(controller: Controller): void {
	controller.resetAxes();
}
