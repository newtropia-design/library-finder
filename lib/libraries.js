const path = require('path');
const fs = require('fs');
const { distanceKm } = require('./distance');

const DATA_FILE = path.join(__dirname, '..', 'data', 'libraries.json');

// 예시 데이터를 읽는다. 파일을 매번 읽어도 용량이 작아 캐시하지 않는다.
function loadLibraries() {
  const raw = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  return raw.libraries;
}

// 위치를 기준으로 거리를 붙이고 가까운 순으로 정렬한다.
function findNearby(lat, lng, limit = 10) {
  return loadLibraries()
    .map((lib) => ({
      ...lib,
      distanceKm: Number(distanceKm(lat, lng, lib.lat, lib.lng).toFixed(2)),
    }))
    .sort((a, b) => a.distanceKm - b.distanceKm)
    .slice(0, limit);
}

module.exports = { loadLibraries, findNearby };
