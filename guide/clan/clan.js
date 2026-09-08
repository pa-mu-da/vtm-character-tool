// Clan Page Filtering Script
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('powerSearch');
  const discButtons = document.querySelectorAll('#discFilterGroup .filter-btn');
  const dotButtons = document.querySelectorAll('#dotFilterGroup .filter-btn');
  const cards = document.querySelectorAll('.power-card');

  let currentDisc = 'all';
  let currentDot = 'all';

  function filterCards() {
    const q = searchInput ? searchInput.value.trim().toLowerCase() : '';

    cards.forEach(card => {
      const disc = card.getAttribute('data-disc');
      const dot = card.getAttribute('data-dot');
      const name = (card.getAttribute('data-name') || '').toLowerCase();
      const summary = (card.getAttribute('data-summary') || '').toLowerCase();
      const text = card.textContent.toLowerCase();

      const matchDisc = (currentDisc === 'all' || disc === currentDisc);
      const matchDot = (currentDot === 'all' || dot === currentDot);
      const matchSearch = (!q || name.includes(q) || summary.includes(q) || text.includes(q));

      if (matchDisc && matchDot && matchSearch) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  discButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      discButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentDisc = btn.getAttribute('data-disc');
      filterCards();
    });
  });

  dotButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      dotButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentDot = btn.getAttribute('data-dot');
      filterCards();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', filterCards);
  }
});
