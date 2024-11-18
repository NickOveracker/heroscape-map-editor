import { truncate } from "lodash"

// // Create an array of bytes (e.g., representing an image)
// const byteArray = [0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x20, 0x57, 0x6f, 0x72, 0x6c, 0x64];

// // Create a Blob from the array
// const blob = new Blob([new Uint8Array(byteArray)], { type: 'application/octet-stream' });

// // Create a URL for the Blob
// const url = URL.createObjectURL(blob);

// // Create a link element
// const link = document.createElement('a');
// link.href = url;
// link.download = 'binary_file.bin'; // Set the desired file name

// // Append the link to the DOM and trigger a click event
// document.body.appendChild(link);
// link.click();

// // Clean up
// document.body.removeChild(link);
// URL.revokeObjectURL(url);
const isLittleEndian = true
let offset = 0
const myFile = {
  version: 0.0007,
  name: '',
  author: '',
  playerNumber: '',
  scenario: '',
  levelPerPage: 6,
  printingTransparency: 80,
  printingGrid: true,
  printTileNumber: false,
  printStartAreaAsLevel: true,
  tileCount: 1,
  tiles: [
    {
      type: 1001,
      version: 0.0003,
      rotation: 0,
      posX: 0,
      posY: 0,
      posZ: 0,
      glyphLetter: 'T',
      glyphName: '',
      startName: '',
      colorf: { r: 0, g: 160, b: 0, a: 0 },
    },
  ],
}
export function writeVirtualScapeArrayBuffer(length?: number) {
  let arrayBuffer: ArrayBuffer
  const isToGetOffsetOnly = (length ?? 0) <= 0
  if (isToGetOffsetOnly) {
    arrayBuffer = new ArrayBuffer(10000000)
  } else {
    arrayBuffer = new ArrayBuffer(length)
  }
  const dataView = new DataView(arrayBuffer)
  console.log("🚀 ~ writeVirtualScapeArrayBuffer ~ dataView:", dataView)
  offset = 0
  setFloat64(dataView, myFile.version)
  writeCString(dataView, myFile.name)
  writeCString(dataView, myFile.author)
  writeCString(dataView, myFile.playerNumber)
  setInt32(dataView, myFile.scenario.length)
  const encoder = new TextEncoder();
  const encodedData = encoder.encode(myFile.scenario);
  for (let i = 0; i < myFile.scenario.length; i++) {
    setUint8(dataView, encodedData[i])
  }
  setInt32(dataView, myFile.levelPerPage)
  setInt32(dataView, myFile.printingTransparency)
  setInt32(dataView, myFile.printingGrid === true ? 1 : 0)
  setInt32(dataView, myFile.printTileNumber === true ? 1 : 0)
  setInt32(dataView, myFile.printStartAreaAsLevel === true ? 1 : 0)
  setInt32(dataView, myFile.tiles.length)

  for (let i = 0; i < myFile.tiles.length; i++) {
    const tile = myFile.tiles[i]
    setInt32(dataView, tile.type)
    setFloat64(dataView, tile.version)
    setInt32(dataView, tile.rotation)
    setInt32(dataView, tile.posX)
    setInt32(dataView, tile.posY)
    setInt32(dataView, tile.posZ)
    setInt8(dataView, (tile.glyphLetter).charCodeAt[0])
    writeCString(dataView, tile.glyphName)
    writeCString(dataView, tile.startName)
    setInt8(dataView, tile.colorf.r)
    setInt8(dataView, tile.colorf.g)
    setInt8(dataView, tile.colorf.b)
    setInt8(dataView, tile.colorf.a) // alpha?
  }
  return { offset, dataView, arrayBuffer }

}
function setFloat64(dataView: DataView, value: number) {
  dataView.setFloat64(offset, value, isLittleEndian)
  offset += 8
}
function setInt32(dataView: DataView, value: number) {
  dataView.setInt32(offset, value, isLittleEndian)
  offset += 4
}
function setInt16(dataView: DataView, value: number) {
  dataView.setInt16(offset, value, isLittleEndian)
  offset += 2
}
function setUint16(dataView: DataView, value: number) {
  dataView.setUint16(offset, value, isLittleEndian)
  offset += 2
}
function setUint8(dataView: DataView, value: number) {
  dataView.setUint8(offset, value)
  offset += 1
}
function setInt8(dataView: DataView, value: number) {
  dataView.setInt8(offset, value)
  offset += 1
}

export function stringToUTF16Bytes(str) {
  const bytes = [];

  for (let i = 0; i < str.length; i++) {
    const codePoint = str.charCodeAt(i);
    bytes.push(codePoint >> 8, codePoint & 0xFF);
  }

  return bytes;
}

function writeCString(dataView: DataView, argValue: string) {
  const truncated = truncate(argValue, {
    length: 254,
    omission: ''
  })
  const length = truncated.length
  // FEFF 00FF : for empty strings
  setUint16(dataView, 0xfeff)
  setUint8(dataView, 0xff)
  setUint8(dataView, length)

  const valueAsUtf16Arr = stringToUTF16Bytes(truncated)
  for (let i = 0; i < length; i++) {
    // const new2Bit = String.prototype.codePointAt(truncated[i])
    setInt16(dataView, valueAsUtf16Arr[i])
  }
}
