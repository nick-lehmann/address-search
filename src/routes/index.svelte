<script lang="ts">
	import { Address } from './address.dto';

	const address = new Address({});

	type NominatimAddress = {
		country: string;
		country_code: string;
		county: string;
		historic: string;
		municipality: string;
		postcode: string;
		road: string;
		state: string;
		suburb: string;
		town: string;
		village: string;
	};

	let streetList;

	let hits = [];
	let addressText = '';
	$: addressText = address.toString();

	let searchTimeout = null;
	$: address && autocomplete();

	function autocomplete() {
		if (searchTimeout) clearInterval(searchTimeout);
		searchTimeout = setTimeout(function () {
			console.log('Search');
		}, 1000);
	}

	async function search() {
		const url = new URL('search', 'https://nominatim.openstreetmap.org/');
		const params = new URLSearchParams();
		params.set('addressdetails', '1');
		params.set('countrycodes', 'de');
		params.set('format', 'json');

		if (address.street) params.set('county', address.district);
		if (address.street) params.set('postalcode', address.postalCode);
		if (address.street) params.set('street', address.street);
		if (address.street) params.set('street', address.street);
		if (address.town) params.set('city', address.town);

		url.search = params.toString();

		const response = await fetch(url.toString());
		const data = await response.json();
		console.log(data);
		hits = data as NominatimAddress[];
	}
</script>

<h1>Deine Addresse</h1>

<form on:submit|preventDefault={search}>
	<div>
		<label for="street">Straße</label>
		<input
			id="street"
			name="street"
			type="text"
			autocomplete="street-address"
			list="street-list"
			bind:value={address.street}
		/>
	</div>
	<div>
		<label for="housenumber">Hausnummer</label>
		<input
			id="housenumber"
			name="housenumber"
			type="text"
			autocomplete="street-address"
			bind:value={address.houseNumber}
		/>
	</div>
	<div>
		<label for="district">Ortsteil</label>
		<input id="district" type="text" bind:value={address.district} />
	</div>
	<div>
		<label for="postalCode">Postleitzahl</label>
		<input
			id="postalCode"
			type="text"
			auto-complete="postal-code"
			bind:value={address.postalCode}
		/>
	</div>
	<div>
		<label for="town">Stadt</label>
		<input id="town" type="text" auto-complete="address-level2" bind:value={address.town} />
	</div>
	<button type="submit" on:click={search}>Suchen</button>
</form>

<p>Address: {addressText}</p>

<h1>Ergebnisse</h1>

<ul>
	{#each hits as hit}
		<li>{hit.display_name}</li>
	{/each}
</ul>

<datalist id="street-list" bind:this={streetList}>
	{#each hits as hit}
		<option value={hit.display_name} />
	{/each}
</datalist>
