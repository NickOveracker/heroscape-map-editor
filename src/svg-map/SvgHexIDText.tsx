import { HexText } from './HexText'
import { SVG_HEX_APOTHEM, SVG_HEX_RADIUS } from '../utils/constants'

type Props = {
  hexSize: number
  text: string
  textLine2?: string
}

export const SvgHexIDText = ({ hexSize, text, textLine2 }: Props) => {
  return (
    <>
      <HexText
        className="maphex_altitude-text"
        y={hexSize * 0.6 + SVG_HEX_RADIUS}
        x={SVG_HEX_APOTHEM}
      >
        {text.toString()}
      </HexText>
      {textLine2 && (
        <HexText
          className="maphex_altitude-text"
          y={hexSize * 0.8 + SVG_HEX_RADIUS}
          x={SVG_HEX_APOTHEM}
        >
          {textLine2.toString()}
        </HexText>
      )}
    </>
  )
}
