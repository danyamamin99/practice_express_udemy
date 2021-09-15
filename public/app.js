const toCurrency = price => {
  return new Intl.NumberFormat('ru-RU', {
    currency: 'rub',
    style: 'currency'
  }).format(price);
} 

document.querySelectorAll('.price').forEach(node => {
  node.textContent = toCurrency(node.textContent);
});

const cardDiv = document.querySelector('#card');
if (cardDiv) {
  cardDiv.addEventListener('click', (event) => {
    const target = event.target;

    if (target.classList.contains('js-remove')) {
      const id = target.dataset.id;
      
      fetch('/card/remove/' + id, {
        method: 'delete'
      })
        .then(response => response.json())
        .then(card => {
          if (card.courses.length) {
            let courses = '';

            card.courses.forEach(item => {
              courses += `
                <tr>
                  <td>${item.title}</td>
                  <td>${item.count}</td>
                  <td>
                    <button class="btn btn-small js-remove" data-id="${item.id}">Удалить</button>
                  </td>
                </tr>
              `;
            });

            document.querySelector('tbody').innerHTML = courses;
            document.querySelector('.price').textContent = toCurrency(card.price);
          } else {
            console.log(cardDiv);
            cardDiv.innerHTML = '<p>Корзина пуста!</p>'
          }
        })
        .catch(error => console.log(error));
    }

  });
}