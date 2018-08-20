let nextId = 0;

/**
 * An application error message.
 */
export class ErrorMessage {
	public id: number;
	public message: string;

	constructor(message: string) {
		this.id = nextId;
		this.message = message;

		nextId++;
	}
}
