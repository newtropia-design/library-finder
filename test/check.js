// 간단한 동작 점검: 거리 계산과 정렬이 올바른지 확인한다.
const assert = require('assert');
const { distanceKm } = require('../lib/distance');
const { findNearby } = require('../lib/libraries');

// 같은 지점은 0km
assert.strictEqual(distanceKm(37.5, 127, 37.5, 127), 0);

// 서울시청 ↔ 강남역 약 8~9km 범위
const d = distanceKm(37.5665, 126.978, 37.4979, 127.0276);
assert.ok(d > 8 && d < 10, `거리 범위 오류: ${d}`);

// 정렬: 가까운 순서인지 확인
const list = findNearby(37.5665, 126.978);
for (let i = 1; i < list.length; i++) {
  assert.ok(list[i - 1].distanceKm <= list[i].distanceKm, '정렬 오류');
}
console.log('통과: 거리 계산과 정렬 점검 완료');
