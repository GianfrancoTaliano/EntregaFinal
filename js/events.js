
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

	cartTotal = total;
	calcularTotal();

	for (const title in paletteInfo) {
		const paletaDetail = document.createElement('p');
		paletaDetail.textContent = `${paletteInfo[title].count}x ${title} - $${paletteInfo[title].sum.toFixed(2)}`;
		cartDetailsContainer.appendChild(paletaDetail);
	}
}

const calcularTotal = () => {
	const url = 'https://dolarapi.com/v1/dolares';
	fetch(url)
		.then((res) => res.json())
		.then(data => {
			const usdTotal = document.getElementById('cart-total-usd')
			const total = document.getElementById('cart-total')
			usdTotal.innerText = (cartTotal / data[1].venta).toFixed(2)
			total.innerText = cartTotal.toFixed(2)
		})
		.catch((error) =>
			console.error('Error al obtener las tasas de cambio:', error))
};
document.addEventListener('DOMContentLoaded', () => calcularTotal());





