import { Document, Page, View, PDFViewer, Svg, Polygon } from '@react-pdf/renderer';
import { groupBy } from 'lodash';
import { BoardHex, BoardHexes, BoardPieces, MapState, Pieces } from './types';
import React, { PropsWithChildren } from 'react';
import { piecesSoFar } from './data/pieces';
import { decodePieceID } from './utils/map-utils';

export default function PdfMapDisplay({ boardHexes, boardPieces, hexMap }: MapState) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100vh',
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


// Create Document Component
const MyDocument = ({ boardHexes, boardPieces, hexMap }: MapState) => {
  return (
    <Document>
      <HexMapLevels6PerPage
        boardHexes={boardHexes}
        boardPieces={boardPieces}
        hexMap={hexMap}
      />
    </Document>
  )
}

const getBoardHexAndPieceChunks = (boardHexes: BoardHexes, boardPieces: BoardPieces) => {
  const filteredBoardHexes = Object.values(boardHexes).filter((hex) => {
    const inventoryPieceID = decodePieceID(hex.pieceID).pieceID;
    return (
      piecesSoFar[inventoryPieceID]?.isHexTerrainPiece ||
      (piecesSoFar[inventoryPieceID]?.isObstaclePiece && hex.isObstacleOrigin)
    );
  });

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

const HexMapLevels6PerPage = ({ boardHexes, boardPieces }: MapState) => {
  const boardHexAndPieceChunks = getBoardHexAndPieceChunks(boardHexes, boardPieces);

  return (
    <>
      {boardHexAndPieceChunks.map((chunk, pageIndex) => (
        <HexMapPage key={pageIndex} chunk={chunk} />
      ))}
    </>
  );
};
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
const HexMapPage = ({ chunk }: { chunk: { altitude: number; hexes: BoardHex[]; pieces: DecodedPiece[] }[] }) => {
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
                <PdfHexAndPieceGrid
                  boardHexArr={group.hexes}
                  boardPieceArr={group.pieces}
                />
              )}
            </React.Fragment>
          ))}
        </HalfPageColumn>
        <HalfPageColumn>
          {chunk.map((group, i) => (
            <React.Fragment key={group.altitude}>
              {i >= 3 && (
                <PdfHexAndPieceGrid
                  boardHexArr={group.hexes}
                  boardPieceArr={group.pieces}
                />
              )}
            </React.Fragment>
          ))}
        </HalfPageColumn>
      </View>
    </Page>
  );
};

type PdfHexAndPieceGridProps = {
  boardHexArr: BoardHex[];
  boardPieceArr: DecodedPiece[];
};

const PdfHexAndPieceGrid = ({ boardHexArr, boardPieceArr }: PdfHexAndPieceGridProps) => {
  console.log("🚀 ~ PdfHexAndPieceGrid ~ boardHexArr, boardPieceArr:", boardHexArr, boardPieceArr)
  return (
    <View
      style={{
        flexBasis: '33%',
        border: '1px solid green',
      }}
    >
      <Svg
        style={{
          width: '100%',
          height: '100%',
        }}
        viewBox="0 0 100 100"
      >
        <Polygon points="50,0 100,25 100,75 50,100 0,75 0,25" fill="red" stroke="red" />
        {/* Render pieces here */}
      </Svg>
    </View>
  );
};
const HalfPageColumn = (props: PropsWithChildren) => {
  return (
    <View
      style={{
        flexGrow: 1,
        flexBasis: '50%',
        flexDirection: 'column',
        border: '1px solid black',
        margin: 5,
      }}
    >
      {props.children}
    </View>
  );
};