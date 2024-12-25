import { Button } from '@mui/material'
import useBoundStore from '../store/store'
import JSONCrush from 'jsoncrush';

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
    console.info({
      state: appState,
    })
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

