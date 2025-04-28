import { Document, Page, Text, View, PDFViewer, Svg, Polygon } from '@react-pdf/renderer';
import useBoundStore from './store/store';
import { groupBy } from 'lodash';
import { BoardHexes } from './types';
import useAutoLoadMapFile from './hooks/useAutoLoadMapFile';

export default function PrintingApp() {
  const boardHexes = useBoundStore((s) => s.boardHexes);
  console.log("🚀 ~ PrintingApp ~ boardHexes:", boardHexes)
  useAutoLoadMapFile()
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
        <MyDocument boardHexes={boardHexes} />
      </PDFViewer>
    </div>
  )
}


// Create Document Component
const MyDocument = ({ boardHexes }: { boardHexes: BoardHexes }) => {
  return (
    <Document>
      <HexMapLevels6PerPage boardHexes={boardHexes} />
    </Document>
  )
}

const HexMapLevels6PerPage = ({ boardHexes }: { boardHexes: BoardHexes }) => {
  // Group boardHexes by altitude
  const groupedByAltitude = groupBy(Object.values(boardHexes), 'altitude');

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

  return (
    <>
      {chunks.map((chunk, pageIndex) => (
        <HexMapPage key={pageIndex} chunk={chunk} />
      ))}
    </>
  );
};

const HexMapPage = ({ chunk }: { chunk: { altitude: number; hexes: any[] }[] }) => {
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
        {chunk.map((group) => (
          <AltitudeGroup key={group.altitude} group={group} />
        ))}
      </View>
    </Page>
  );
};

const AltitudeGroup = ({ group }: { group: { altitude: number; hexes: any[] } }) => {
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
      <Text>Altitude: {group.altitude}</Text>
      <HexGrid />
    </View>
  );
};

const AltitudeGroup = () => {
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