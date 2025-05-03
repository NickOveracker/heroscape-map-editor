import { SyntheticEvent } from 'react';

import { SvgHexIDText } from './SvgHexIDText';
import { HexGridCoordinate } from './HexGridCoordinate';
import { getHexagonSvgPolygonPoints } from './getHexagonSvgPolygonPoints';
import { SVG_HEX_RADIUS } from '../utils/constants';
import { BoardHex } from '../types';
import { svgColors } from '../world/maphex/hexColors';
import { decodePieceID, hexUtilsHexToPixel } from '../utils/map-utils';
import { piecesSoFar } from '../data/pieces';
import { isSolidTerrainHex } from '../utils/board-utils';

const getBorderColor = (hex: BoardHex) => {
  const isSolidTerrain = isSolidTerrainHex(hex.terrain);
  const inventoryPiece = piecesSoFar[decodePieceID(hex.pieceID).pieceID];
  const is1Hex = inventoryPiece.size === 1;
  const is2Hex = inventoryPiece.size === 2;
  const is3Hex = inventoryPiece.size === 3;
  const is7Hex = inventoryPiece.size === 7;
  const is24Hex = inventoryPiece.size === 24;
  if (isSolidTerrain && is1Hex) {
    return svgColors.outline1;
  }
  if (isSolidTerrain && is2Hex) {
    return svgColors.outline2;
  }
  if (isSolidTerrain && is3Hex) {
    return svgColors.outline3;
  }
  if (isSolidTerrain && is7Hex) {
    return svgColors.outline7;
  }
  if (isSolidTerrain && is24Hex) {
    return svgColors.outline24;
  }
  return 'black';
};

export const SvgMapHex = ({ hex }: { hex: BoardHex }) => {
  // handlers
  const onClick = (event: SyntheticEvent, sourceHex: BoardHex) => {
    console.log('🚀 ~ onClick ~ sourceHex:', sourceHex);
  };

  const { points } = getHexagonSvgPolygonPoints(SVG_HEX_RADIUS);
  const color = svgColors[hex.terrain];
  const borderColor = getBorderColor(hex);

  // Calculate the center of the hex
  const center = hexUtilsHexToPixel(hex); // This function should already return the center of the hex

  // Rotation logic
  const borderRotation =
    (hex?.interlockRotation ?? 0) +
    (hex?.pieceRotation ?? 0) * (Math.PI / 3);

  return (
    <HexGridCoordinate hex={hex} onClick={onClick}>
      <polygon
        points={points}
        fill={color}
        clipPath="url(#inner-stroke-clip)"
      />
      <polygon
        points={points}
        stroke={borderColor}
        fill='transparent'
        transform={`rotate(${(30)}, ${center.x}, ${center.y})`}
        strokeWidth={1}
        clipPath={`url(#interlock${hex.interlockType}-clip)`}
      />
      {/* Hex text */}
      <SvgHexIDText
        hexSize={SVG_HEX_RADIUS}
        text={`${hex.id}`}
        textLine2={`${hex.altitude}`}
      />
    </HexGridCoordinate>
  );
};
