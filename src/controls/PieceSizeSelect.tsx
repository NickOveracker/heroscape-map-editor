import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import useBoundStore from '../store/store'

export default function PieceSizeSelect() {
  const penMode = useBoundStore(s => s.penMode)
  const pieceSize = useBoundStore(s => s.pieceSize)
  const togglePieceSize = useBoundStore(s => s.togglePieceSize)
  const flatPieceSizes = useBoundStore(s => s.flatPieceSizes)
  const handleChange = (_event: React.MouseEvent<HTMLElement>, value: string) => {
    togglePieceSize(parseInt(value))
  }
  const isSizes = flatPieceSizes?.length > 0
  return (
    <span style={{ margin: '0px 20px' }}>
      <span>Select piece:</span>
      <ToggleButtonGroup
        disabled={!isSizes}
        value={`${pieceSize}`}
        onChange={handleChange}
        exclusive
        aria-label="piece select for current pen mode"
      >
        {isSizes ? (
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
        )}
      </ToggleButtonGroup>
    </span>
  )
}
