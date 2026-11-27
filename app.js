const express = require('express');
const { loadLibraries, findNearby } = require('./lib/libraries');

const app = express();
app.use(express.static('public'));

// 도서관 목록 (거리 없이)
app.get('/api/libraries', (req, res) => {
  const data = loadLibraries();
  res.json({ mode: 'sample', count: data.length, libraries: data });
});

// 위치 기준 가까운 도서관 목록
app.get('/api/nearby', (req, res) => {
  const lat = Number(req.query.lat);
  const lng = Number(req.query.lng);
  if (!Number.isFinite(lat) || !Number.isFinite(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
    return res.status(400).json({ error: '위도(lat)와 경도(lng)를 올바른 숫자로 입력해 주세요.' });
  }
  const libraries = findNearby(lat, lng);
  res.json({ mode: 'sample', origin: { lat, lng }, libraries });
});

module.exports = app;
