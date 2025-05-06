import { useRef, useState, useEffect } from 'react';
import { SvgMapHex } from './SvgMapHex';
import { getBoardHexesSvgMapDimensions } from '../utils/map-utils';
import { getBoardHexObstacleOriginsAndHexesAndEmpties } from '../utils/board-utils';
import { getHexagonSvgPolygonPoints } from './getHexagonSvgPolygonPoints';
import { SVG_HEX_RADIUS } from '../utils/constants';
import { SvgInterlockClipPaths } from './svg-hex-interlock-clippath';
import useBoundStore from '../store/store';

export const SvgMapDisplay = () => {
  const boardHexes = useBoundStore((state) => state.boardHexes)
  const { points } = getHexagonSvgPolygonPoints(SVG_HEX_RADIUS);
  const mapDimensions = getBoardHexesSvgMapDimensions(boardHexes);
  const boardHexesArr = Object.values(getBoardHexObstacleOriginsAndHexesAndEmpties(boardHexes)).sort(
    (a, b) => a.altitude - b.altitude,
  );

  const svgRef = useRef<SVGSVGElement>(null);
  const [viewBox, setViewBox] = useState({
    x: 0,
    y: 0,
    width: mapDimensions.width,
    height: mapDimensions.length,
  });

  const pointerOrigin = useRef({ x: 0, y: 0 });
  const isPointerDown = useRef(false);

  // Effect to update the viewBox when map dimensions change
  useEffect(() => {
    setViewBox({
      x: 0,
      y: 0,
      width: getBoardHexesSvgMapDimensions(boardHexes).width,
      height: getBoardHexesSvgMapDimensions(boardHexes).length,
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
      <line
        x1={0}
        y1={0}
        x2={0}
        y2={mapDimensions.length}
        stroke="red"
        strokeWidth={0.5}
      />
      <line
        x1={0}
        y1={0}
        x2={mapDimensions.width}
        y2={0}
        stroke="blue"
        strokeWidth={0.5}
      />
      {boardHexesArr.map((hex) => (
        <SvgMapHex key={hex.id} hex={hex} />
      ))}
    </svg>
  );
};
