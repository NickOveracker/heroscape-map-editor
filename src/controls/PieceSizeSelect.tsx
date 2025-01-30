import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import useBoundStore from '../store/store'

export default function PieceSizeSelect() {
  const pieceSize = useBoundStore((s) => s.pieceSize)
  const togglePieceSize = useBoundStore((s) => s.togglePieceSize)
  const flatPieceSizes = useBoundStore((s) => s.flatPieceSizes)
  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    value: string,
  ) => {
    togglePieceSize(parseInt(value))
  }
  const isSizes = flatPieceSizes?.length > 0
  return (
    <span style={{ margin: '0px 20px' }}>
      <ToggleButtonGroup
        disabled={!isSizes}
        value={`${pieceSize}`}
        onChange={handleChange}
        exclusive
        aria-label="piece select for current pen mode"
        sx={{
          alignItems: 'center',
        }}
      >
        <span>Select piece:</span>
        <span>
          {isSizes ? (
            flatPieceSizes.map((s, i) => (
              <ToggleButton
                key={s}
                value={`${s}`}
                aria-label={`${s}-hex sized piece`}
              >
                {s} [{i + 1}]
                {/* <HotkeyBadge hotkey={`${i + 1}`} /> */}
              </ToggleButton>
            ))
          ) : (
            <>
              No sizes
            </>
          )}
        </span>
      </ToggleButtonGroup>
    </span>
  )
}
