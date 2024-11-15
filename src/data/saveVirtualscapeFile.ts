
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
      type: 18001,
      version: 0.0003,
      rotation: 0,
      posX: 0,
      posY: 0,
      posZ: 0,
      glyphLetter: '\u0000',
      glyphName: '',
      startName: '',
      colorf: 16777215,
      isPersonalTile: false,
      personal: {
        pieceSize: 0,
        textureTop: '',
        textureSide: '',
        letter: '',
        name: '',
      },
    },
  ],
}