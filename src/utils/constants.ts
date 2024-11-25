export const HEXGRID_SPACING = 1.0
export const HEXGRID_HEX_RADIUS = 1 // Side length also (regular hexagons are the only regular polygons where it is so!)
export const HEXGRID_HEX_APOTHEM = Math.sqrt(3) / 2 * HEXGRID_HEX_RADIUS // we are using regular hexagons where this equation is true

// HEX DIMENSIONS: according to HS hex image
// solid hex height: 7/16" 
// fluid hex height: 3/16"
// solid height to fluid height 7:3, 2.3333
// hex height to solid cap height: 7:1
// -------------------------------------
// solid hex subterrain height: 3/8"
// solid hex cap height: 1/16"
// solid hex flat-to-flat: 1 3/4"
// solid hex flat-to-flat wall thickness: 1/32"
// solid hex side: 1 1/128"
// hex side male plug width: 7/32"
// hex side female plug width: 6/32"
export const HEXGRID_HEX_HEIGHT = 0.5 // Altitude thickness
export const HEXGRID_HEXCAP_HEIGHT = HEXGRID_HEX_HEIGHT / 7
export const TREE_BASE_HEIGHT = HEXGRID_HEX_HEIGHT / 7
export const HEXGRID_HEXCAP_FLUID_HEIGHT = HEXGRID_HEX_HEIGHT * 3 / 7
export const HEXGRID_EMPTYHEX_HEIGHT = HEXGRID_HEX_HEIGHT / 20
export const HEXGRID_MAX_ALTITUDE = 25 // Altitude thickness
export const MAX_RECTANGLE_MAP_DIMENSION = 50 // 2500 global coords
export const MAX_HEXAGON_MAP_DIMENSION = 30 // 2791 global coords
export const CAMERA_FOV = 65
export const EVENTS = {
    savePng: 'savePng',
    saveJpg: 'saveJpg',
}