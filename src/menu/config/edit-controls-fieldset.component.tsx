import {linkEvent} from "inferno";
import Component from "inferno-component";
import {connect} from "inferno-mobx";
import {action} from "mobx";
import {Config} from "../../config/config";
import {Store} from "../../storage/store";

interface Props {
	config: Config;
}

/**
 * A set of buttons that perform bulk edit operations on all controls.
 */
@connect([Store.Config])
export class EditControlsFieldsetComponent extends Component<Props, {}> {
	/**
	 * Moves all controls by some amount.
	 */
	@action public move(x: number, y: number): void {
		this.props.config.controls.forEach((control) => {
			control.x += x;
			control.y += y;
		});
	}

	public render() {
		return (
			<fieldset>
				<div class="form-row">
					<div className="form-group col-auto">
						<label>
							X
						</label>
						<div className="input-group">
							<span className="input-group-btn">
								<button
									className="btn btn-primary"
									onClick={linkEvent(this, handleClickLeft)}
								>
									Left
								</button>
							</span>
							<span className="input-group-btn">
								<button
									className="btn btn-primary"
									onClick={linkEvent(this, handleClickRight)}
								>
									Right
								</button>
							</span>
						</div>
					</div>
					<div className="form-group col-auto">
						<label>
							Y
						</label>
						<div className="input-group">
							<span className="input-group-btn">
								<button
									className="btn btn-primary"
									onClick={linkEvent(this, handleClickUp)}
								>
									Up
								</button>
							</span>
							<span className="input-group-btn">
								<button
									className="btn btn-primary"
									onClick={linkEvent(this, handleClickDown)}
								>
									Down
								</button>
							</span>
						</div>
					</div>
				</div>
			</fieldset>
		);
	}
}

function handleClickUp(component: EditControlsFieldsetComponent) {
	component.move(0, -1);
}

function handleClickDown(component: EditControlsFieldsetComponent) {
	component.move(0, 1);
}

function handleClickLeft(component: EditControlsFieldsetComponent) {
	component.move(-1, 0);
}

function handleClickRight(component: EditControlsFieldsetComponent) {
	component.move(1, 0);
}
