import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { HexTerrain } from '../types'

export const landSizes = {
  // solid terrain below
  [HexTerrain.grass]: [1, 2, 3, 7, 24],
  [HexTerrain.rock]: [1, 2, 3, 7, 24],
  [HexTerrain.sand]: [1, 2, 3, 7, 24],
  [HexTerrain.swamp]: [1, 2, 3, 7, 24],
  [HexTerrain.dungeon]: [1, 2, 3, 7, 24],
  [HexTerrain.lavaField]: [1, 2, 7],
  [HexTerrain.concrete]: [1, 2, 7],
  [HexTerrain.asphalt]: [1, 2, 7],
  [HexTerrain.road]: [1, 2],
  [HexTerrain.snow]: [1, 2],
  // fluid terrain below
  [HexTerrain.water]: [1],
  [HexTerrain.swampWater]: [1],
  [HexTerrain.lava]: [1],
  [HexTerrain.ice]: [1],
  [HexTerrain.shadow]: [1],
}

export default function PieceSizeSelect() {
  // const { penMode, pieceSize, togglePieceSize, flatPieceSizes } =
  //   useHexxaformContext()
  const handleChange = (event) => {
    // togglePieceSize(parseInt(event?.target?.value ?? '1'))
  }
  // const isSizes = flatPieceSizes.length > 0
  return (
    <span style={{ margin: '0px 20px' }}>
      <span>Select piece:</span>
      <ToggleButtonGroup
        // disabled={!isSizes}
        // value={`${pieceSize}`}
        onChange={handleChange}
        exclusive
        aria-label="piece select for current pen mode"
      >
        {/* {isSizes ? (
          flatPieceSizes.map((s) => (
            <ToggleButton
              key={s}
              value={`${s}`}
              aria-label={`${s}-hex sized piece`}
            >
              {s}
            </ToggleButton>
          ))
        ) : (
          <ToggleButton
            value={'1'}
            aria-label={`only piece for current pen mode`}
          >
            {penMode}
          </ToggleButton>
        )} */}
      </ToggleButtonGroup>
    </span>
  )
}
