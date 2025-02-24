// Function to toggle the visibility of the beverage section
function toggleCategory(categoryId) {
    const content = document.getElementById(categoryId);
    const arrow = document.getElementById(categoryId + '-arrow');

    if (content.style.display === 'none') {
        content.style.display = 'block';
        arrow.innerHTML = '▲'; // Change arrow direction
    } else {
        content.style.display = 'none';
        arrow.innerHTML = '▼'; // Change arrow direction
    }
}

// Function to update quantity
function updateQuantity(button) {
    const quantityInput = button.parentElement.querySelector('.quantity');
    let currentValue = parseInt(quantityInput.value);

    if (button.classList.contains('btn-plus')) {
        currentValue++;
    } else if (button.classList.contains('btn-minus') && currentValue > 0) {
        currentValue--;
    }

    quantityInput.value = currentValue;
    calculateTotal(); // Update total whenever quantity changes
}

// Function to calculate total price
function calculateTotal() {
    let total = 0;

    // Get the price of the main dish
    const mainDishPrice = parseFloat(document.querySelector('.dish-price h4').innerText.replace('R$', '').replace(',', '.'));
    const mainDishQuantity = parseInt(document.querySelector('.quantity').value);
    total += mainDishPrice * mainDishQuantity;

    // Get prices of beverages
    const beverageItems = document.querySelectorAll('.bebidas .item');
    beverageItems.forEach(item => {
        const price = parseFloat(item.querySelector('.price').innerText.replace('R$', '').replace(',', '.'));
        const quantity = parseInt(item.querySelector('.quantity').value);
        total += price * quantity;
    });

    // Display total
    document.getElementById('total-price').innerText = `Total: R$ ${total.toFixed(2).replace('.', ',')}`;
}

// Function to finalize order and send via WhatsApp
function finalizeOrder() {
    let orderDetails = "Pedido:\n";
    const mainDishQuantity = parseInt(document.querySelector('.quantity').value);
    if (mainDishQuantity > 0) {
        const mainDishPrice = document.querySelector('.dish-price h4').innerText;
        orderDetails += `Espetinho de frango com bacon: ${mainDishQuantity} x ${mainDishPrice}\n`;
    }

    const beverageItems = document.querySelectorAll('.bebidas .item');
    beverageItems.forEach(item => {
        const quantity = parseInt(item.querySelector('.quantity').value);
        if (quantity > 0) {
            const label = item.querySelector('label').innerText;
            const price = item.querySelector('.price').innerText;
            orderDetails += `${label}: ${quantity} x ${price}\n`;
        }
    });

    const phoneNumber = '5563981177066';

    const total = document.getElementById('total-price').innerText;
    orderDetails += `${total}\n`;

    // Encode the order details for WhatsApp
    const whatsappMessage = encodeURIComponent(orderDetails);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
}

// Add event listeners to quantity buttons
document.querySelectorAll('.btn-plus, .btn-minus').forEach(button => {
    button.addEventListener('click', function() {
        updateQuantity(this);
    });
});

// Add event listener to finalize button
document.getElementById('finalize-button').addEventListener('click', finalizeOrder);