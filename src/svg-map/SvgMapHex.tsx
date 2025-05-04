import { SyntheticEvent, useMemo } from 'react';

import { SvgHexIDText } from './SvgHexIDText';
import { getHexagonSvgPolygonPoints } from './getHexagonSvgPolygonPoints';
import { INTERLOCK_ROTATION_DIFFERENCE_SVG_FROM_3D, SVG_HEX_RADIUS } from '../utils/constants';
import { BoardHex } from '../types';
import { hexUtilsHexToPixel } from '../utils/map-utils';
import { getSvgHexBorderColor, getSvgHexFillColor } from './getSvgHexColors';

export const SvgMapHex = ({ hex }: { hex: BoardHex }) => {
  // handlers
  const onClick = (event: SyntheticEvent, sourceHex: BoardHex) => {
    console.log('🚀 ~ onClick ~ sourceHex:', sourceHex);
  };
  const { pixel } = useMemo(() => {
    const pixel = hexUtilsHexToPixel(hex)
    return {
      pixel,
    }
  }, [hex])

  const { points } = getHexagonSvgPolygonPoints(SVG_HEX_RADIUS);
  const color = getSvgHexFillColor(hex);
  const borderColor = getSvgHexBorderColor(hex);

  const borderRotation =
    (+ (hex?.interlockRotation ?? 0) +
      (hex?.pieceRotation ?? 0) - INTERLOCK_ROTATION_DIFFERENCE_SVG_FROM_3D) * (60);

  return (
    <g
      transform={`translate(${pixel.x}, ${pixel.y})`}
      onClick={(e) => {
        if (onClick) {
          onClick(e, hex)
        }
      }}
    >

      <polygon
        points={points}
        fill={color}
        clipPath="url(#inner-stroke-clip)"
      />
      {hex.interlockType !== '0' && <polygon
        points={points}
        transform={`rotate(${borderRotation}, 8.660254037844386, 10)`}
        fill='transparent'
        stroke={borderColor}
        strokeWidth={2}
        strokeLinejoin='round'
        strokeLinecap='butt'
        clipPath={`url(#interlock${hex.interlockType}-clip)`}
      />}
      {/* Hex text */}
      <SvgHexIDText
        hexSize={SVG_HEX_RADIUS}
        text={`${hex.interlockType}`}
        textLine2={`${hex.altitude}`}
      />
    </g>
  );
};
