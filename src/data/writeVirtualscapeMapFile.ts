const isLittleEndian = true
let offset = 0
const myFile = {
  version: 0.0007,
  name: '', // gets written blank
  author: '', // gets written blank
  playerNumber: '', // gets written blank
  scenario: '', // gets written blank, but is not a C-string
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
      glyphLetter: 'T', // gets written static until a problem arises: T works, use "T"
      glyphName: '', // gets written blank
      startName: '', // gets written blank
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
    arrayBuffer = new ArrayBuffer(length ?? 0)
  }
  const dataView = new DataView(arrayBuffer)
  offset = 0
  setFloat64(dataView, myFile.version)
  // writeBlankCString(dataView, myFile.name)
  writeBlankCString(dataView)
  // writeBlankCString(dataView, myFile.author)
  writeBlankCString(dataView)
  // writeBlankCString(dataView, myFile.playerNumber)
  writeBlankCString(dataView)
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
    setInt8(dataView, 68)
    // writeBlankCString(dataView, tile.glyphName)
    writeBlankCString(dataView)
    // writeBlankCString(dataView, tile.startName)
    writeBlankCString(dataView)
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
// function setInt16(dataView: DataView, value: number) {
//   dataView.setInt16(offset, value, isLittleEndian)
//   offset += 2
// }
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

function writeBlankCString(dataView: DataView) {
  // Cannot figure out how to write strings, so they all get written as empty
  const length = 0
  // FEFF 00FF : for empty strings
  setUint16(dataView, 0xfeff)
  setUint8(dataView, 0xff)
  setUint8(dataView, length)

  // const valueAsUtf16Arr = stringToUTF16Bytes(truncated)
  // for (let i = 0; i < length; i++) {
  //   // const new2Bit = String.prototype.codePointAt(truncated[i])
  //   setInt16(dataView, valueAsUtf16Arr[i])
  // }
  // function stringToUTF16Bytes(str) {
  //   const bytes = [];
  //   for (let i = 0; i < str.length; i++) {
  //     const codePoint = str.charCodeAt(i);
  //     // Check if code point requires surrogate pair
  //     if (codePoint > 0xFFFF) {
  //       const highSurrogate = 0xD800 + ((codePoint - 0x10000) >> 10);
  //       const lowSurrogate = 0xDC00 + ((codePoint - 0x10000) & 0x3FF);
  //       bytes.push(highSurrogate >> 8, highSurrogate & 0xFF);
  //       bytes.push(lowSurrogate >> 8, lowSurrogate & 0xFF);
  //     } else {
  //       bytes.push(codePoint >> 8, codePoint & 0xFF);
  //     }
  //     return bytes;
  //   }
  // }
}
