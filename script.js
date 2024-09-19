let arraySelectedItems = [];
const url = 'https://fakestoreapi.com/products';
const containerCards = document.getElementById('containerCards');
const cartCount = document.getElementById('cartCount');
const containerSelectedItems = document.getElementById('pay-selected-items');
let allProducts = [];
let flag = false;

// Función para obtener datos de la API
const getAPI = async (URL) => {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
};

// Crear tarjetas de productos
const createClothes = (clothe) => {
    const card = document.createElement('div');
    card.classList.add('card');

    const imgClothe = document.createElement('img');
    imgClothe.src = clothe.image;
    imgClothe.alt = clothe.title;

    const divClothe = document.createElement('div');
    divClothe.classList.add('description-card');

    const descriptionClothe = document.createElement('h5');
    descriptionClothe.textContent = clothe.title;

    const priceClothe = document.createElement('h4');
    priceClothe.textContent = `$${clothe.price}`;

    const buttonAddCar = document.createElement('button');
    buttonAddCar.textContent = 'Añadir al Carrito';
    buttonAddCar.dataset.id = clothe.id;
    buttonAddCar.addEventListener('click', () => addToShopeeCar(clothe));

    card.appendChild(imgClothe);
    card.appendChild(divClothe);
    divClothe.appendChild(descriptionClothe);
    divClothe.appendChild(priceClothe);
    divClothe.appendChild(buttonAddCar);

    containerCards.appendChild(card);
};

// Añadir producto al carrito
const addToShopeeCar = (clothe) => {
    arraySelectedItems.push(clothe);
    localStorage.setItem('shopeeCart', JSON.stringify(arraySelectedItems));
    updateCartCount();
};

// Cargar artículos del carrito
const loadCartItems = () => {
    const storedCart = localStorage.getItem('shopeeCart');
    if (storedCart) {
        arraySelectedItems = JSON.parse(storedCart);
    }
    updateCartCount();
};

// Actualizar el contador del carrito
const updateCartCount = () => {
    
    if (cartCount ) {

        cartCount.textContent = arraySelectedItems.length;
        if (flag===true){
            alert('Producto añadido al carrito'); 
        }
        flag =true;
    }
};

// Generar tarjetas del carrito
const generateSelectedItems = (clothe) => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('card');
    
    const imgClothe = document.createElement('img');
    imgClothe.src = clothe.image;
    imgClothe.alt = clothe.title;

    const divClothe = document.createElement('div');
    divClothe.classList.add('description-card');

    const descriptionClothe = document.createElement('h5');
    descriptionClothe.textContent = clothe.title;

    const priceClothe = document.createElement('h4');
    priceClothe.textContent = `$${clothe.price}`;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Eliminar';
    removeButton.addEventListener('click', () => {
        removeFromCart(clothe.id);
        itemDiv.remove(); // Eliminar la tarjeta visualmente
    });

    divClothe.appendChild(descriptionClothe);
    divClothe.appendChild(priceClothe);
    divClothe.appendChild(removeButton);
    itemDiv.appendChild(imgClothe);
    itemDiv.appendChild(divClothe);

    containerSelectedItems.appendChild(itemDiv);
};

// Eliminar producto del carrito
const removeFromCart = (id) => {
    arraySelectedItems = arraySelectedItems.filter(item => item.id !== id);
    localStorage.setItem('shopeeCart', JSON.stringify(arraySelectedItems));
    updateCartCount();
};

// Cargar ropa
const getClothes = async () => {
    allProducts = await getAPI(url);
    allProducts.forEach(Element => createClothes(Element));
};

// Cargar artículos del carrito en la página de carrito
const loadCartItemsForCartPage = () => {
    const storedCart = localStorage.getItem('shopeeCart');
    if (storedCart) {
        const items = JSON.parse(storedCart);
        items.forEach(item => generateSelectedItems(item));
    }
};

// Inicialización
window.addEventListener('DOMContentLoaded', () => {
    loadCartItems(); // Cargar artículos del carrito
    if (containerCards) {
        getClothes(); // Obtener ropa desde la API
    }
    if (containerSelectedItems) {
        loadCartItemsForCartPage(); // Cargar artículos en la página del carrito
    }
});