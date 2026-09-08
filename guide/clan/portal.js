// Portal Cross-Search Script
document.addEventListener('DOMContentLoaded', () => {
  const globalSearchInput = document.getElementById('globalSearchInput');
  const globalPowersGrid = document.getElementById('globalPowersGrid');

  if (!globalPowersGrid || typeof VTM_ALL_POWERS === 'undefined') return;

  function renderPowers(powers) {
    if (powers.length === 0) {
      globalPowersGrid.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; color: var(--text-dim); padding: 3rem;">一致するパワーが見つかりませんでした。</div>';
      return;
    }

    globalPowersGrid.innerHTML = powers.map(p => {
      const dotsSymbol = '●'.repeat(parseInt(p['ドット数'])) + '○'.repeat(3 - parseInt(p['ドット数']));
      const maturingHtml = (p['成熟ルール (上位ドット時の強化)'] && p['成熟ルール (上位ドット時の強化)'] !== 'なし') 
        ? `<div class="maturing-box">
            <div class="rules-heading">上位ドット時の成熟強化</div>
            <div class="maturing-text">${p['成熟ルール (上位ドット時の強化)']}</div>
          </div>` 
        : '';

      return `<div class="power-card">
        <div>
          <div class="power-header">
            <div class="power-title-wrap">
              <div class="power-discipline-badge">${p['氏族名']} - ${p['訓え名']}</div>
              <div class="power-name">${p['パワー名']}</div>
            </div>
            <div class="power-dots" title="${p['ドット数']}ドット">${dotsSymbol}</div>
          </div>
          
          <div class="power-meta-grid">
            <div class="meta-item">
              <span class="meta-label">系統・種別</span>
              <span class="meta-val">${p['系統・種別']}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">発動タイプ</span>
              <span class="meta-val">${p['発動タイプ']}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">使用能力値</span>
              <span class="meta-val">${p['使用能力値']}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">発動コスト</span>
              <span class="meta-val">${p['発動コスト']}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">対抗/難易度</span>
              <span class="meta-val">${p['抵抗/難易度']}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">射程/距離</span>
              <span class="meta-val">${p['射程/距離']}</span>
            </div>
            <div class="meta-item" style="grid-column: span 2;">
              <span class="meta-label">持続時間</span>
              <span class="meta-val">${p['持続時間']}</span>
            </div>
          </div>

          <div class="power-summary">${p['パワー概要']}</div>

          <div class="power-rules-box">
            <div class="rules-heading">ルールと効果の詳細</div>
            <div class="rules-text">${p['効果とルールの詳細 (日本語)']}</div>
          </div>

          ${maturingHtml}
        </div>

        <details class="en-accordion">
          <summary>英語公式ルール原文を表示</summary>
          <div class="en-content">
            <strong>Description:</strong> ${p['Rules_Description (英語原文)']}<br><br>
            <strong>Maturing:</strong> ${p['Maturing_Rules (英語原文)']}
          </div>
        </details>
      </div>`;
    }).join('');
  }

  // Initial display of first 12 powers
  renderPowers(VTM_ALL_POWERS.slice(0, 12));

  if (globalSearchInput) {
    globalSearchInput.addEventListener('input', () => {
      const q = globalSearchInput.value.trim().toLowerCase();
      if (!q) {
        renderPowers(VTM_ALL_POWERS.slice(0, 12));
        return;
      }
      const filtered = VTM_ALL_POWERS.filter(p => {
        return p['パワー名'].toLowerCase().includes(q) ||
               p['効果とルールの詳細 (日本語)'].toLowerCase().includes(q) ||
               p['パワー概要'].toLowerCase().includes(q) ||
               p['訓え名'].toLowerCase().includes(q) ||
               p['氏族名'].toLowerCase().includes(q) ||
               p['使用能力値'].toLowerCase().includes(q) ||
               p['発動コスト'].toLowerCase().includes(q);
      });
      renderPowers(filtered);
    });
  }
});
