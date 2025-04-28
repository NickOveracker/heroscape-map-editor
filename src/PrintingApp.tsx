import { Document, Page, Text, View, PDFViewer, Svg, Polygon } from '@react-pdf/renderer';
export default function PrintingApp() {
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
        <MyDocument />
      </PDFViewer>
    </div>
  )
}

const HexGrid = () => {
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

// Create Document Component
const MyDocument = () => (
  <Document>
    <HexGrids6PerPage />
  </Document>
);

const HexGrids6PerPage = () => {
  return (
    <>
      <Page
        size="LETTER"
        style={{
          flexDirection: 'column',
          maxHeight: '100vh',
        }}>
        <View
          style={{
            flexDirection: 'row',
            flexGrow: 1,
          }}>
          <View style={{
            flexGrow: 1,
            flexBasis: '50%',
            flexDirection: 'column',
          }}>
            <HexGrid />
            <HexGrid />
            <HexGrid />
          </View>
          <View style={{
            flexBasis: '50%',
            flexGrow: 1,
          }}>
            <HexGrid />
            <HexGrid />
            <HexGrid />
          </View>
        </View>
      </Page>
    </>
  )
}

