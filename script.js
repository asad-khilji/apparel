fetch('products.json')
  .then(r => r.json())
  .then(({ products }) => {
    const root = document.getElementById('catalog');

    products.forEach(p => {
      const front = (p.images && p.images[0]) || p.image || '';
      const back  = (p.images && p.images[1]) || '';

      const card = document.createElement('section');
      card.className = 'card';

      const [firstWord, ...restWords] = (p.name || '').split(' ');
      const rest = restWords.join(' ');

      card.innerHTML = `
        <div class="top">
          <div class="leftcol">
            <img class="front" src="${front}" alt="${p.name} - front">
          </div>

          <div class="rightcol">
            <div class="styleprice">
              <span>${p.code || ''}</span>
              <span>${p.price || ''}</span>
            </div>
            ${back ? `<img class="back" src="${back}" alt="${p.name} - back">` : ''}
            <div class="details">
              <h3 class="title" spellcheck="false">
                <span class="wavy">${firstWord || ''}</span> ${rest}
              </h3>
              ${
                (p.features && p.features.length)
                  ? `<ul class="features">${p.features.map(f => `<li>${f}</li>`).join('')}</ul>`
                  : ''
              }
            </div>
          </div>
        </div>
      `;

      root.appendChild(card);
    });
  })
  .catch(err => console.error('Error loading products:', err));
