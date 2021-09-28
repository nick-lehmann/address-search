/* eslint-disable @typescript-eslint/no-inferrable-types */
export class Address {
	street: string = '';
	houseNumber: string = '';
	district: string = '';
	postalCode: string = '';
	town: string = '';

	toString(): string {
		const addressLine1 = `${this.street} ${this.houseNumber}`;
		const addressLine2 = `${this.postalCode} ${this.district} ${this.town}`;

		return addressLine2.trim() ? `${addressLine1}, ${addressLine2}` : addressLine1;
	}

	constructor(init: Partial<Address>) {
		Object.assign(this, init);
	}
}
