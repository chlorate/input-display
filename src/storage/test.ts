export class TestObject {
	public json?: any;

	public toJSON(): object {
		return {};
	}

	public loadJSON(json: any): void {
		this.json = json;
	}
}
