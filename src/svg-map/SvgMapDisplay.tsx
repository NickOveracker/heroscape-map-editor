import { useRef, useState, useEffect } from 'react';
import { SvgMapHex } from './SvgMapHex';
import { getBoardHexesSvgMapDimensions } from '../utils/map-utils';
import { getBoardHexObstacleOriginsAndHexes } from '../utils/board-utils';
import { getHexagonSvgPolygonPoints } from './getHexagonSvgPolygonPoints';
import { SVG_HEX_RADIUS } from '../utils/constants';
import { SvgInterlockClipPaths } from './svg-hex-interlock-clippath';
import useBoundStore from '../store/store';

const PADDING = 10;

export const SvgMapDisplay = () => {
  const boardHexes = useBoundStore((state) => state.boardHexes)
  const mapDimensions = getBoardHexesSvgMapDimensions(boardHexes);
  const boardHexesArr = Object.values(getBoardHexObstacleOriginsAndHexes(boardHexes)).sort(
    (a, b) => a.altitude - b.altitude,
  );
  const { points } = getHexagonSvgPolygonPoints(SVG_HEX_RADIUS);

  const svgRef = useRef<SVGSVGElement>(null);
  const [viewBox, setViewBox] = useState({
    x: 0 - PADDING,
    y: 0 - PADDING,
    width: mapDimensions.width + 3 * PADDING,
    height: mapDimensions.length + 3 * PADDING,
  });

  const pointerOrigin = useRef({ x: 0, y: 0 });
  const isPointerDown = useRef(false);

  // Effect to update the viewBox when map dimensions change
  useEffect(() => {
    setViewBox({
      x: 0 - PADDING,
      y: 0 - PADDING,
      width: getBoardHexesSvgMapDimensions(boardHexes).width + 3 * PADDING,
      height: getBoardHexesSvgMapDimensions(boardHexes).length + 3 * PADDING,
    });
  }, [boardHexes]);

  const onPointerDown = (event: React.PointerEvent) => {
    isPointerDown.current = true;
    pointerOrigin.current = { x: event.clientX, y: event.clientY };
  };

  const onPointerMove = (event: React.PointerEvent) => {
    if (!isPointerDown.current) return;

    const svg = svgRef.current;
    if (!svg) return;
    event.preventDefault();
    const pointerPosition = { x: event.clientX, y: event.clientY };
    const dx = pointerPosition.x - pointerOrigin.current.x;
    const dy = pointerPosition.y - pointerOrigin.current.y;

    const ratio = viewBox.width / svg.getBoundingClientRect().width;

    setViewBox((prev) => ({
      ...prev,
      x: prev.x - dx * ratio,
      y: prev.y - dy * ratio,
    }));

    pointerOrigin.current = pointerPosition;
  };

  const onPointerUp = () => {
    isPointerDown.current = false;
  };

  return (
    <svg
      ref={svgRef}
      viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
      style={{
        height: '99%',
        cursor: isPointerDown.current ? 'grabbing' : 'grab',
        overflow: 'scroll',
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      <SvgInterlockClipPaths points={points} />
      {boardHexesArr.map((hex) => (
        <SvgMapHex key={hex.id} hex={hex} />
      ))}
    </svg>
  );
};
