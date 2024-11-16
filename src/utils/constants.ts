export const HEXGRID_SPACING = 1.05
export const HEXGRID_HEX_RADIUS = 1 // Side length also, in case you didn't know 
export const HEXGRID_HEX_APOTHEM = Math.sqrt(3) / 2 * HEXGRID_HEX_RADIUS // we are using regular hexagons where this equation is true
export const HEXGRID_HEX_HEIGHT = 0.5 // Altitude thickness
export const CAMERA_FOV = 65
export const EVENTS = {
    savePng: 'savePng',
    saveJpg: 'saveJpg',
}