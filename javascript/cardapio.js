document.querySelectorAll('.quantity-control').forEach(control => {
    const btnMinus = control.querySelector('.btn-minus');
    const btnPlus = control.querySelector('.btn-plus');
    const quantityInput = control.querySelector('.quantity');

    btnMinus.addEventListener('click', () => {
        let currentValue = parseInt(quantityInput.value);
        if (currentValue > 0) {
            quantityInput.value = currentValue - 1;
        }
    });

    btnPlus.addEventListener('click', () => {
        let currentValue = parseInt(quantityInput.value);
        quantityInput.value = currentValue + 1;
    });
});