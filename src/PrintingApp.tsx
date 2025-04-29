import { Document, Page, View, PDFViewer, Svg, Polygon } from '@react-pdf/renderer';
import useBoundStore from './store/store';
import { groupBy } from 'lodash';
import { BoardHex, BoardHexes, MapState } from './types';
import React, { PropsWithChildren } from 'react';
import { piecesSoFar } from './data/pieces';
import { decodePieceID } from './utils/map-utils';

export default function PrintingApp() {
  const hexMap = useBoundStore((s) => s.hexMap);
  const boardPieces = useBoundStore((s) => s.boardPieces);
  const boardHexes = useBoundStore((s) => s.boardHexes);
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
const getBoardHexChunks = (boardHexes: BoardHexes) => {
  const filteredBoardHexes = Object.values(boardHexes).filter((hex) => {
    const inventoryPieceID = decodePieceID(hex.pieceID).pieceID
    return (
      // Include all solid and fluid terrain types.
      // Also include origin hexes for obstacles, not auxiliary hexes.
      piecesSoFar[inventoryPieceID]?.isHexTerrainPiece || piecesSoFar[inventoryPieceID]?.isObstaclePiece && hex.isObstacleOrigin
    )
  })
  // Group boardHexes by altitude
  const groupedByAltitude = groupBy(filteredBoardHexes, 'altitude');
  // Convert the grouped object into an array of altitude groups
  const altitudeGroups = Object.entries(groupedByAltitude).map(([altitude, hexes]) => ({
    altitude: Number(altitude),
    hexes,
  }));
  // Sort altitude groups by altitude
  altitudeGroups.sort((a, b) => a.altitude - b.altitude);

  // Chunk altitude groups into chunks of 6
  const chunks = [];
  for (let i = 0; i < altitudeGroups.length; i += 6) {
    chunks.push(altitudeGroups.slice(i, i + 6));
  }
  return chunks
}
// const getBoardPieceChunks = (boardPieces: BoardPieces) => {
//   const filteredBoardPieces = Object.values(boardPieces).filter((pieceID) => {
//     const pie = decodePieceID(pieceID)
//     return (
//       // Include all solid and fluid terrain types.
//       // Also include origin hexes for obstacles, not auxiliary hexes.
//       piecesSoFar[pieceID.pieceID].isHexTerrainPiece || piecesSoFar[pieceID.pieceID].isObstaclePiece && pieceID.isObstacleOrigin
//     )
//   })
//   // Group boardPieces by altitude
//   const groupedByAltitude = groupBy(filteredBoardPieces, 'altitude');
//   // Convert the grouped object into an array of altitude groups
//   const altitudeGroups = Object.entries(groupedByAltitude).map(([altitude, hexes]) => ({
//     altitude: Number(altitude),
//     hexes,
//   }));
//   // Sort altitude groups by altitude
//   altitudeGroups.sort((a, b) => a.altitude - b.altitude);

//   // Chunk altitude groups into chunks of 6
//   const chunks = [];
//   for (let i = 0; i < altitudeGroups.length; i += 6) {
//     chunks.push(altitudeGroups.slice(i, i + 6));
//   }
//   return chunks
// }
const HexMapLevels6PerPage = ({ boardHexes }: MapState) => {
  const boardHexChunks = getBoardHexChunks(boardHexes);
  // const boardPieceChunks = getBoardPieceChunks(boardPieces)
  return (
    <>
      {boardHexChunks.map((boardHexChunk, pageIndex) => (
        <HexMapPage key={pageIndex} boardHexChunk={boardHexChunk} />
      ))}BoardPieces,
    </>
  );
};

const HexMapPage = ({ boardHexChunk }: { boardHexChunk: { altitude: number; hexes: BoardHex[] }[] }) => {
  console.log("🚀 ~ HexMapPage ~ boardHexChunk:", boardHexChunk)
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
          {boardHexChunk.map((altitudeGroup, i) => (
            <React.Fragment key={altitudeGroup.altitude}>
              {i === 0 && (
                <PdfHexGrid
                  boardHexArr={altitudeGroup.hexes}
                />)}
              {i === 1 && (
                <PdfHexGrid
                  boardHexArr={altitudeGroup.hexes}
                />)}
              {i === 2 && (
                <PdfHexGrid
                  boardHexArr={altitudeGroup.hexes}
                />)}
            </React.Fragment>
          ))}
        </HalfPageColumn>
        <HalfPageColumn>
          {boardHexChunk.map((altitudeGroup, i) => (
            <React.Fragment key={altitudeGroup.altitude}>
              {i === 3 && (
                <PdfHexGrid
                  boardHexArr={altitudeGroup.hexes}
                />)}
              {i === 4 && (
                <PdfHexGrid
                  boardHexArr={altitudeGroup.hexes}
                />)}
              {i === 5 && (
                <PdfHexGrid
                  boardHexArr={altitudeGroup.hexes}
                />)}
            </React.Fragment>
          ))}
        </HalfPageColumn>
      </View>
    </Page>
  );
};

type PdfHexGridProps = {
  boardHexArr: BoardHex[],
  // boardPieceIDArr: string[]
}
const PdfHexGrid = ({
  boardHexArr,
  // boardPieceIDArr,
}: PdfHexGridProps) => {
  console.log("🚀 ~ boardHexArr:", boardHexArr)
  return (
    <View style={{
      flexBasis: '33%',
      border: '1px solid green'
    }}>
      <Svg
        style={{
          width: '100%',
          height: '100%',
        }}
        viewBox="0 0 100 100"
      >
        <Polygon points="50,0 100,25 100,75 50,100 0,75 0,25" fill="red" stroke="red" />
      </Svg>
    </View>
  )
}
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