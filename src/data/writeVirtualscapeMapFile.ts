import { truncate } from "lodash"
import { VirtualScapeMap, VirtualScapeTile } from "../types"

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
      glyphLetter: '\u0000',
      glyphName: '',
      startName: '',
      colorf: 16777215,
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
  // file version "0.0007" only one ever seen
  setFloat64(dataView, myFile.version)
  writeCString(dataView, myFile.name)
  // virtualScapeMap.name = readCString(dataView)
  writeCString(dataView, myFile.author)
  // virtualScapeMap.author = readCString(dataView)
  writeCString(dataView, myFile.playerNumber)
  // virtualScapeMap.playerNumber = readCString(dataView)
  setInt32(dataView, myFile.scenario.length)
  // const scenarioLength = getInt32(dataView)
  // let scenarioRichText = ''
  const encoder = new TextEncoder();
  const encodedData = encoder.encode(myFile.scenario);
  for (let i = 0; i < myFile.scenario.length; i++) {
    setUint8(dataView, encodedData[i])
  }
  // virtualScapeMap.scenario = rtfToText(scenarioRichText)
  setInt32(dataView, myFile.levelPerPage)
  // virtualScapeMap.levelPerPage = getInt32(dataView)
  setInt32(dataView, myFile.printingTransparency)
  // virtualScapeMap.printingTransparency = getInt32(dataView)
  setInt32(dataView, myFile.printingGrid === true ? 1 : 0)
  // virtualScapeMap.printingGrid = getInt32(dataView) !== 0
  setInt32(dataView, myFile.printTileNumber === true ? 1 : 0)
  // virtualScapeMap.printTileNumber = getInt32(dataView) !== 0
  setInt32(dataView, myFile.printStartAreaAsLevel === true ? 1 : 0)
  // virtualScapeMap.printStartAreaAsLevel = getInt32(dataView) !== 0
  setInt32(dataView, myFile.tiles.length)
  // virtualScapeMap.tileCount = getInt32(dataView)

  for (let i = 0; i < myFile.tiles.length; i++) {
    const tile = myFile.tiles[i]
    // type designates a unique piece/tile in heroscape
    // tile.type = getInt32(dataView)
    setInt32(dataView, tile.type)
    // tile version "0.0003" only one tested or seen
    // tile.version = getFloat64(dataView)
    setFloat64(dataView, tile.version)
    // 6 rotations progress clockwise, 0-5
    // tile.rotation = getInt32(dataView)
    setInt32(dataView, tile.rotation)
    // x,y are "odd-r" offset hex coordinates: https://www.redblobgames.com/grids/hexagons/#coordinates
    // tile.posX = getInt32(dataView)
    setInt32(dataView, tile.posX)
    // tile.posY = getInt32(dataView)
    setInt32(dataView, tile.posY)
    // z is altitude in our world
    // tile.posZ = getInt32(dataView)
    setInt32(dataView, tile.posZ)
    // glyphLetter reliably is stored and read in files
    // tile.glyphLetter = String.fromCharCode(getUint8(dataView))
    setInt32(dataView, (tile.glyphLetter || 'õ').charCodeAt[0])
    // glyphName is empty on some tests of files, do not use it
    // tile.glyphName = readCString(dataView)
    writeCString(dataView, tile.glyphName)
    // tile.startName = readCString(dataView)
    writeCString(dataView, tile.startName)
    // this
    // tile.colorf = getInt32(dataView)
    setInt32(dataView, tile.colorf)
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

export function stringToUTF16Bytes(str) {
  const bytes = [];

  for (let i = 0; i < str.length; i++) {
    const codePoint = str.charCodeAt(i);

    // Check if code point requires surrogate pair
    if (codePoint > 0xFFFF) {
      const highSurrogate = 0xD800 + ((codePoint - 0x10000) >> 10);
      const lowSurrogate = 0xDC00 + ((codePoint - 0x10000) & 0x3FF);

      bytes.push(highSurrogate >> 8, highSurrogate & 0xFF);
      bytes.push(lowSurrogate >> 8, lowSurrogate & 0xFF);
    } else {
      bytes.push(codePoint >> 8, codePoint & 0xFF);
    }
  }

  return bytes;
}

function writeCString(dataView: DataView, argValue: string) {
  const truncated = truncate(argValue, {
    length: 1000,
    omission: 'TRUNCATED BY HEXOSCAPE BECAUSE STRING LENGTH OVER 65000 CHARACTERS'
  })
  const length = truncated.length
  const is2byteLength = length >= 255
  if (is2byteLength) {
    setUint16(dataView, length)
  } else {
    setUint8(dataView, length)
  }
  const valueAsUtf16Arr = stringToUTF16Bytes(truncated)
  for (let i = 0; i < length; i++) {
    // const new2Bit = String.prototype.codePointAt(truncated[i])
    setInt16(dataView, valueAsUtf16Arr[i])
  }
}
