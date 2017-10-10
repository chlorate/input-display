import {loadLocalStorage, saveLocalStorage} from "./local";

class TestObject {
	public json?: any;

	public toJSON(): object {
		return {};
	}

	public loadJSON(json: any): void {
		this.json = json;
	}
}

describe("loadLocalStorage", () => {
	let obj;

	beforeEach(() => {
		obj = new TestObject();
	});

	it("should do nothing if item doesn't exist", () => {
		spyOn(localStorage, "getItem").and.returnValue(null);
		loadLocalStorage("key", obj);
		expect(obj.json).toBeUndefined();
	});

	it("should call loadJSON if item does exist", () => {
		spyOn(localStorage, "getItem").and.returnValue("{}");
		loadLocalStorage("key", obj);
		expect(obj.json).toEqual({});
	});
});

describe("saveLocalStorage", () => {
	it("should save to local storage", () => {
		spyOn(localStorage, "setItem");
		saveLocalStorage("key", new TestObject());
		expect(localStorage.setItem).toHaveBeenCalledWith("inputDisplay.key", "{}");
	});
});
