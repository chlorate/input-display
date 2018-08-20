let nextId = 0;

export class ErrorMessage {
	public id: number;
	public message: string;

	constructor(message: string) {
		this.id = nextId;
		this.message = message;

		nextId++;
	}
}
