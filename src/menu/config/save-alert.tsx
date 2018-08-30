import {SFC} from "inferno";
import {Alert} from "inferno-bootstrap";
import {Store} from "../../storage/store";

interface Props {
	url?: string;
	onClose: () => void;
}

/**
 * Displays instructions and a link for saving a config file to disk.
 */
export const SaveAlert: SFC<Props> = ({url, onClose}) => {
	if (!url) {
		return null;
	}

	return (
		<Alert color="success" className="mt-3 mb-0" onClose={onClose}>
			Right-click and "Save link as":{" "}
			<a href={url} download={`${Store.Config}.json`}>
				{Store.Config}
				.json
			</a>
		</Alert>
	);
};
