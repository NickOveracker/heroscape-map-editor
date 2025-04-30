import { Point } from "../types"
import { SVG_HEX_APOTHEM, SVG_HEX_RADIUS } from "../utils/constants"

export function getHexagonSvgPolygonPoints(
  radius: number
) {
  const corners: Point[] = []

  for (let i = 0; i < 6; i++) {
    const x = radius * Math.cos((2 * Math.PI * i) / 6 + Math.PI / 6)
    const y = radius * Math.sin((2 * Math.PI * i) / 6 + Math.PI / 6)
    const point = { x: SVG_HEX_APOTHEM + x, y: SVG_HEX_RADIUS + y }
    // const point = { x: x, y: y }
    corners.push(point)
  }
  const points = corners.map((point) => `${point.x},${point.y}`).join(' ')
  return { points, corners }
}

