import { Document, Page, View, PDFViewer, Text, } from '@react-pdf/renderer';
import { groupBy } from 'lodash';
import { BoardHex, BoardHexes, BoardPieces, MapState, Pieces } from '../types';
import React, { PropsWithChildren } from 'react';
import { decodePieceID, getBoardHexesSvgMapDimensions } from '../utils/map-utils';
import useBoundStore from '../store/store';
import { ReactPdfSvgMapDisplay } from './ReactPdfSvgMapDisplay';
import { getBoardHexObstacleOriginsAndHexes } from '../utils/board-utils';

const getBoardHexAndPieceChunks = (boardHexes: BoardHexes, boardPieces: BoardPieces) => {
  const filteredBoardHexes = Object.values(getBoardHexObstacleOriginsAndHexes(boardHexes))
  const filteredBoardPieces = Object.keys(boardPieces).filter((pieceID) => {
    const id = decodePieceID(pieceID).pieceID;
    return (
      id === Pieces.battlement ||
      id === Pieces.roadWall ||
      id === Pieces.laurWallLong ||
      id === Pieces.laurWallShort ||
      id === Pieces.laurWallRuin
    );
  }).map((pieceID) => decodePieceID(pieceID));

  // Group hexes and pieces by altitude
  const groupedHexesByAltitude = groupBy(filteredBoardHexes, 'altitude');
  const groupedPiecesByAltitude = groupBy(filteredBoardPieces, 'altitude');

  // Combine hexes and pieces into a single array of altitude groups
  const combinedGroups = Object.keys(groupedHexesByAltitude).map((altitude) => ({
    altitude: Number(altitude),
    hexes: groupedHexesByAltitude[altitude] || [],
    pieces: groupedPiecesByAltitude[altitude] || [],
  }));

  // Sort combined groups by altitude
  combinedGroups.sort((a, b) => a.altitude - b.altitude);

  // Chunk combined groups into chunks of 6
  const chunks = [];
  for (let i = 0; i < combinedGroups.length; i += 6) {
    chunks.push(combinedGroups.slice(i, i + 6));
  }

  return chunks;
};

export default function ReactPdfRoot() {
  const boardHexes = useBoundStore((s) => s.boardHexes);
  const boardPieces = useBoundStore((s) => s.boardPieces);
  const hexMap = useBoundStore((s) => s.hexMap);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        padding: 0,
        margin: 0,
        backgroundColor: 'var(--outer-space)',
      }}
    >
      <PDFViewer
        width={"100%"}
        height={"100%"}
      >
        <MyDocument
          boardHexes={boardHexes}
          boardPieces={boardPieces}
          hexMap={hexMap}
        />
      </PDFViewer>
    </div>
  )
}
type DecodedPiece = {
  pieceID: string;
  altitude: number;
  rotation: number;
  boardHexID: string;
  pieceCoords: {
    q: number;
    r: number;
    s: number;
  };
}

// Create Document Component
const MyDocument = ({ boardHexes, boardPieces, hexMap }: MapState) => {
  return (
    <Document
      pageLayout="oneColumn"
      title={hexMap.name}
    >
      <HexMapLevels6PerPage
        boardHexes={boardHexes}
        boardPieces={boardPieces}
        hexMap={hexMap}
      />
    </Document>
  )
}
const HalfPageColumn = (props: PropsWithChildren) => {
  return (
    <View
      style={{
        flexGrow: 1,
        flexBasis: '50%',
        flexDirection: 'column',
        margin: 5,
      }}
    >
      {props.children}
    </View>
  );
};

const PADDING = 10

const HexMapLevels6PerPage = ({ boardHexes, boardPieces }: MapState) => {
  const boardHexAndPieceChunks = getBoardHexAndPieceChunks(boardHexes, boardPieces);
  const svgMapDimensions = getBoardHexesSvgMapDimensions(boardHexes)
  return (
    <>
      {boardHexAndPieceChunks.map((chunk, pageIndex) => (
        <HexMapPage
          key={pageIndex}
          chunk={chunk}
          width={svgMapDimensions.width + PADDING}
          length={svgMapDimensions.length + PADDING}
        />
      ))}
    </>
  );
};

type HexMapPageProps = {
  width: number
  length: number
  chunk: {
    altitude: number;
    hexes: BoardHex[];
    pieces: DecodedPiece[];
  }[];
};
const HexMapPage = ({ chunk, width, length }: HexMapPageProps) => {
  return (
    <Page
      size="LETTER"
      style={{
        flexDirection: 'column',
        maxHeight: '100vh',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          flexGrow: 1,
        }}
      >
        <HalfPageColumn>
          {chunk.map((group, i) => (
            <React.Fragment key={group.altitude}>
              {i < 3 && (
                <View
                  style={{
                    flexBasis: '33%',
                    border: '1px solid green',
                  }}
                >
                  <ReactPdfSvgMapDisplay
                    boardHexArr={group.hexes}
                    width={width}
                    length={length}
                  />
                </View>
              )}
            </React.Fragment>
          ))}
        </HalfPageColumn>
        <HalfPageColumn>
          {chunk.map((group, i) => (
            <React.Fragment key={group.altitude}>
              {i >= 3 && (
                <View
                  style={{
                    flexBasis: '33%',
                    border: '1px solid green',
                  }}
                >
                  <Text>Level: {group.altitude}</Text>
                  <ReactPdfSvgMapDisplay
                    boardHexArr={group.hexes}
                    width={width}
                    length={length}
                  />
                </View>
              )}
            </React.Fragment>
          ))}
        </HalfPageColumn>
      </View>
    </Page>
  );
};

