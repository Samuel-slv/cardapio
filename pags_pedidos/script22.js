// Alterna a exibição da seção de bebidas
function toggleCategory(categoryId) {
    const content = document.getElementById(categoryId);
    let arrow;
    
    // Se for a seção de bebidas, busca o arrow com id 'bebidas-arrow'
    if (categoryId === 'bebidas-content') {
      arrow = document.getElementById('bebidas-arrow');
    } else {
      arrow = document.getElementById(`${categoryId}-arrow`);
    }
    
    if (!content || !arrow) return; // Se não encontrar, sai
    
    // Alterna a exibição: se estiver oculto ou vazio, mostra; caso contrário, esconde
    if (content.style.display === 'none' || content.style.display === '') {
      content.style.display = 'block';
      arrow.textContent = '▲';
    } else {
      content.style.display = 'none';
      arrow.textContent = '▼';
    }
  }
  
    
  // Atualiza a quantidade de um item e recalcula o total
  function updateQuantity(button) {
    const quantityInput = button.parentElement.querySelector('.quantity');
    let currentValue = parseInt(quantityInput.value, 10);
    
    if (button.classList.contains('btn-plus')) {
      currentValue++;
    } else if (button.classList.contains('btn-minus')) {
      currentValue--;
    }
    if (currentValue < 0) currentValue = 0;
    
    quantityInput.value = currentValue;
    calculateTotal();
  }
    
  // Calcula o total do pedido
  function calculateTotal() {
    let total = 0;
    
    // Calcula os pratos principais
    document.querySelectorAll('.card').forEach(card => {
      let price = parseFloat(card.dataset.price);
      if (isNaN(price)) price = 0;
      const quantity = parseInt(card.querySelector('.quantity').value, 10) || 0;
      total += price * quantity;
    });
    
    // Calcula as bebidas
    document.querySelectorAll('.bebidas .item').forEach(item => {
      let price = parseFloat(item.dataset.price);
      if (isNaN(price)) price = 0;
      const quantity = parseInt(item.querySelector('.quantity').value, 10) || 0;
      total += price * quantity;
    });
    
    document.getElementById('total-price').textContent =
      `Total: R$ ${total.toFixed(2).replace('.', ',')}`;
  }
    
  // Finaliza o pedido, montando os detalhes e abrindo a URL do WhatsApp
  function finalizeOrder() {
    let orderDetails = "*Pedido:*\n\n";
    
    // Adiciona os itens dos pratos principais
    document.querySelectorAll('.card').forEach(card => {
      const quantity = parseInt(card.querySelector('.quantity').value, 10) || 0;
      if (quantity > 0) {
        const name = card.querySelector('h3').textContent;
        let price = parseFloat(card.dataset.price);
        if (isNaN(price)) price = 0;
        orderDetails += `▪ ${name}: ${quantity} x R$ ${price.toFixed(2)}\n`;
      }
    });
    
    // Adiciona os itens de bebidas
    document.querySelectorAll('.bebidas .item').forEach(item => {
      const quantity = parseInt(item.querySelector('.quantity').value, 10) || 0;
      if (quantity > 0) {
        const name = item.querySelector('.label').textContent;
        let price = parseFloat(item.dataset.price);
        if (isNaN(price)) price = 0;
        orderDetails += `▪ ${name}: ${quantity} x R$ ${price.toFixed(2)}\n`;
      }
    });
    
    const phoneNumber = '5563992627240';
    const total = document.getElementById('total-price').textContent;
    const message = encodeURIComponent(`${orderDetails}\n${total}`);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  }
    
  // Registra os eventos assim que o DOM estiver carregado
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.btn-plus, .btn-minus').forEach(button => {
      button.addEventListener('click', () => updateQuantity(button));
    });
    
    document.getElementById('finalize-button').addEventListener('click', finalizeOrder);
  });
  