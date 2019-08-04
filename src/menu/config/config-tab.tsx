import {Component, InfernoNode} from "inferno";
import {CardBody, ListGroup} from "inferno-bootstrap";
import {observer} from "inferno-mobx";
import {Link} from "inferno-router";
import {action, observable} from "mobx";
import {ExportAlert, ExportButton, OpenButton, SaveAlert, SaveButton} from ".";

const links = [
	{
		path: "/config/controller",
		name: "Controller",
		description:
			"Select and configure the controller whose inputs will be read.",
	},
	{
		path: "/config/appearance",
		name: "Appearance",
		description:
			"Configure the display size and the default font and colors used in controls.",
	},
	{
		path: "/config/controls",
		name: "Controls",
		description:
			"Configure the buttons and analog sticks shown in the display.",
	},
	{
		path: "/config/advanced",
		name: "Advanced",
		description: "Edit custom CSS.",
	},
];

/**
 * The top-level contents of the Config tab. Provides file operations and links
 * to each major config section.
 */
@observer
export class ConfigTab extends Component {
	@observable
	private saveUrl?: string;

	@observable
	private exportedJson?: string;

	public render = (): InfernoNode => (
		<div>
			<CardBody>
				<OpenButton onOpen={this.clear} />{" "}
				<SaveButton onSave={this.handleSave} />{" "}
				<ExportButton onExport={this.handleExport} />
				<SaveAlert url={this.saveUrl} onClose={this.clear} />
				<ExportAlert json={this.exportedJson} onClose={this.clear} />
			</CardBody>
			<ListGroup tag="div" flush>
				{this.items}
			</ListGroup>
		</div>
	);

	private get items(): InfernoNode[] {
		return links.map((link) => (
			<Link
				to={link.path}
				className="list-group-item list-group-item-action"
			>
				<h2 class="h4 mb-1">{link.name}</h2>
				<div class="small text-body">{link.description}</div>
			</Link>
		));
	}

	@action
	private handleSave = (url: string): void => {
		this.saveUrl = url;
	};

	@action
	private handleExport = (json: string): void => {
		this.exportedJson = json;
	};

	@action
	private clear = (): void => {
		this.saveUrl = undefined;
		this.exportedJson = undefined;
	};
}
