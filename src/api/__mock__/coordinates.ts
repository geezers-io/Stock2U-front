import { Coordinate } from '@/api/@types/@shared';

export function generateMockCoords<G extends Coordinate>(
  currGeo: G,
  numberOfCoords: number = 20,
  radius: number = 0.5,
): Coordinate[] {
  const coords: Coordinate[] = [];

  for (let i = 0; i < numberOfCoords; i++) {
    // 랜덤한 각도 (0 ~ 360도)
    const angle = Math.random() * 2 * Math.PI;
    // 랜덤한 반지름 (0 ~ radius)
    const randomRadius = Math.random() * radius;

    const newLat = currGeo.latitude + (randomRadius * Math.cos(angle)) / 111.32;
    const newLng =
      currGeo.longitude + (randomRadius * Math.sin(angle)) / (111.32 * Math.cos(currGeo.latitude * (Math.PI / 180)));

    coords.push({ latitude: newLat, longitude: newLng });
  }

  return coords;
}
