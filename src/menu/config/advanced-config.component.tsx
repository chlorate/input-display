import {linkEvent} from "inferno";
import {connect} from "inferno-mobx";
import {action} from "mobx";
import {Config} from "../../config/config";
import {Store} from "../../storage/store";

interface Props {
	config: Config;
}

/**
 * A section within the Config tab related to advanced settings.
 */
export const AdvancedConfigComponent = connect([Store.Config], ({config}: Props) => (
	<section>
		<div className="form-group m-0">
			<label for="config-custom-css">
				Custom CSS
			</label>
			<textarea
				className="form-control"
				id="config-custom-css"
				rows="8"
				spellCheck="false"
				value={config.customCss}
				onInput={linkEvent(config, handleChange)}
			/>
		</div>
	</section>
));

const handleChange = action((config: Config, event): void => {
	config.customCss = event.target.value;
});
