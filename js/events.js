
const addToCart = (id) => {
	const selectedPaleta = paletas.find(paleta => paleta.id === id);
	if (selectedPaleta) {
		Swal.fire({
			title: 'Añadir al carrito',
			text: `¿Deseas agregar "${selectedPaleta.title}" al carrito?`,
			icon: 'question',
			showCancelButton: true,
			confirmButtonText: 'Sí, agregar',
			cancelButtonText: 'Cancelar'
		}).then((result) => {
			if (result.isConfirmed) {
				cart.push(selectedPaleta);
				localStorage.setItem('cart', JSON.stringify(cart));
				updateCartUI();
				Swal.fire('Añadido al carrito', `"${selectedPaleta.title}" se ha agregado al carrito.`, 'success');
			}
		});
	}
}

const updateCartUI = () => {
	const cartDetailsContainer = document.getElementById('cart-details');
	const cartTotalElement = document.getElementById('cart-total');

	cartDetailsContainer.innerHTML = '';

	const paletteInfo = {};

	let total = 0;

	cart.forEach(item => {
		if (paletteInfo[item.title]) {
			paletteInfo[item.title].count++;
			paletteInfo[item.title].sum += item.price;
		} else {
			paletteInfo[item.title] = {
				count: 1,
				sum: item.price
			};
		}
		total += item.price;
	});

	for (const title in paletteInfo) {
		const paletaDetail = document.createElement('p');
		paletaDetail.textContent = `${paletteInfo[title].count}x ${title} - $${paletteInfo[title].sum.toFixed(2)}`;
		cartDetailsContainer.appendChild(paletaDetail);
	}

	cartTotalElement.textContent = total.toFixed(2);
}




const calcularTotalUSD = () => {
	const apiUrl = 'https://dolarapi.com/v1/dolares';

	fetch(apiUrl)
		.then((res) => res.json())
		.then(data => data[1].venta) {
	    .catch ((error) => {
	console.error('Error al obtener las tasas de cambio:', error);

})};
  };

document.addEventListener('DOMContentLoaded', () => {
	calcularTotalUSD();
});







