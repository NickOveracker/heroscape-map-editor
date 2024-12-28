import { Button } from '@mui/material'
import useBoundStore from '../store/store'
import JSONCrush from 'jsoncrush';
import { HexTerrain } from '../types';

const DEVLogSomethingCoolButton = () => {
  const appState = useBoundStore((state) => state)
  const onClick = () => {
    // const myUrl = encodeURI(JSON.stringify({
    //   hexMap: appState.hexMap,
    //   boardPieces: appState.boardPieces,
    // }))
    const myUrl = encodeURI(JSONCrush.crush(JSON.stringify([
      appState.hexMap, // 1
      ...Object.keys(appState.boardPieces)
    ])))
    // const myUrl = stringify({
    //   hexMap: appState.hexMap,
    //   boardPieces: appState.boardPieces,
    // }, { short: false })
    console.log("🚀 ~ onClick ~ myUrl:", myUrl, myUrl.length)
    // console.info({
    //   boardHexes: appState.boardHexes,
    //   pieces: appState.boardPieces,
    //   hexMap: appState.hexMap,
    //   state: appState,
    // })
  }
  const onClick2 = () => {
    const nonEmpties = Object.values(appState.boardHexes)
      .filter(bh => bh.terrain !== HexTerrain.empty)

    console.log(
      `%c${Object.keys(appState.boardPieces).map(s => (
        `${s}`
        + '\n'
      ))}
`, "color: red; font-size: 14px")
    console.table(nonEmpties.filter(bh => Boolean(bh.laurAddons)).map(bh => (
      { id: bh.id, ...bh.laurAddons })))
    //     console.log(
    //       `%c${nonEmpties
    //         .forEach(s => (
    //           console.dir(s.laurAddons)
    //         ))}
    // `, "color: blue; font-size: 16px")
  }
  return (
    <>
      <Button variant="contained" onClick={onClick}>
        Log URL
      </Button>
      <Button variant="contained" onClick={onClick2}>
        Log state
      </Button>
    </>
  )
}

export default DEVLogSomethingCoolButton

