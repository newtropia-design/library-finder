(function () {
  const latInput = document.getElementById('lat');
  const lngInput = document.getElementById('lng');
  const message = document.getElementById('message');
  const list = document.getElementById('list');
  const detail = document.getElementById('detail');
  const detailBody = document.getElementById('detail-body');
  const modeBadge = document.getElementById('mode-badge');

  function showMessage(text) {
    message.textContent = text;
  }

  function renderList(libraries) {
    list.innerHTML = '';
    if (libraries.length === 0) {
      showMessage('표시할 도서관이 없습니다.');
      return;
    }
    libraries.forEach((lib) => {
      const li = document.createElement('li');
      const info = document.createElement('div');
      const name = document.createElement('strong');
      name.textContent = lib.name;
      const addr = document.createElement('div');
      addr.textContent = lib.address;
      addr.style.fontSize = '0.88rem';
      addr.style.color = '#5b6876';
      info.append(name, addr);

      const dist = document.createElement('span');
      dist.className = 'dist';
      dist.textContent = lib.distanceKm !== undefined ? lib.distanceKm.toFixed(2) + ' km' : '';

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = '자세히';
      btn.addEventListener('click', () => showDetail(lib));

      li.append(info, dist, btn);
      list.appendChild(li);
    });
  }

  function showDetail(lib) {
    detail.hidden = false;
    detailBody.innerHTML = '';
    [
      ['이름', lib.name],
      ['주소', lib.address],
      ['운영시간', lib.hours],
      ['거리', lib.distanceKm !== undefined ? lib.distanceKm.toFixed(2) + ' km (직선거리)' : '-'],
    ].forEach(([k, v]) => {
      const dt = document.createElement('dt');
      dt.textContent = k;
      const dd = document.createElement('dd');
      dd.textContent = v;
      detailBody.append(dt, dd);
    });
  }

  async function loadNearby(lat, lng) {
    showMessage('');
    const res = await fetch(`/api/nearby?lat=${encodeURIComponent(lat)}&lng=${encodeURIComponent(lng)}`);
    const data = await res.json();
    if (!res.ok) {
      showMessage(data.error || '조회에 실패했습니다.');
      return;
    }
    modeBadge.textContent = data.mode === 'sample' ? '[예시 데이터]' : '[실제 데이터]';
    renderList(data.libraries);
  }

  document.getElementById('search-btn').addEventListener('click', () => {
    const lat = latInput.value.trim();
    const lng = lngInput.value.trim();
    if (lat === '' || lng === '') {
      showMessage('위도와 경도를 모두 입력하거나 예시 위치를 사용해 주세요.');
      return;
    }
    loadNearby(lat, lng).catch(() => showMessage('서버에 연결할 수 없습니다.'));
  });

  document.getElementById('sample-btn').addEventListener('click', () => {
    latInput.value = '37.5665';
    lngInput.value = '126.9780';
    loadNearby('37.5665', '126.9780').catch(() => showMessage('서버에 연결할 수 없습니다.'));
  });

  // 처음 열면 목록만 보여준다 (거리 없음)
  fetch('/api/libraries')
    .then((r) => r.json())
    .then((data) => renderList(data.libraries))
    .catch(() => showMessage('서버에 연결할 수 없습니다.'));
})();
