import { Document, Page, Text, View, PDFViewer } from '@react-pdf/renderer';
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
          // backgroundColor: '#E4E4E4',
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
            // backgroundColor: 'red'
          }}>
            <View style={{
              flexBasis: '10%',
              border: '1px solid green'
            }}>
              <Text>Column #1</Text>
            </View>
            <View style={{
              flexBasis: '30%',
              border: '1px solid green'
            }} />
            <View style={{
              flexBasis: '30%',
              border: '1px solid yellow'
            }} />
            <View style={{
              flexBasis: '30%',
              border: '1px solid red'
            }} />
          </View>
          <View style={{
            flexBasis: '50%',
            flexGrow: 1,
            backgroundColor: 'blue',
            overflow: 'hidden'
          }}>
            <View style={{
              flexBasis: '10%',
              border: '1px solid green'
            }}>
              <Text>Column #2</Text>
            </View>
            <View style={{
              flexBasis: '30%',
              border: '1px solid green'
            }} />
            <View style={{
              flexBasis: '30%',
              border: '1px solid yellow'
            }} />
            <View style={{
              flexBasis: '30%',
              border: '1px solid red'
            }} />
          </View>
        </View>
      </Page>
    </>
  )
}

