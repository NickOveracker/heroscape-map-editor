import { Button } from '@mui/material'
import useBoundStore from '../store/store'
import JSONCrush from 'jsoncrush'

const DEVLogSomethingCoolButton = () => {
  const appState = useBoundStore((state) => state)
  const onClick = () => {
    const myUrl = encodeURI(
      JSONCrush.crush(
        JSON.stringify([
          appState.hexMap, // 1
          ...Object.keys(appState.boardPieces),
        ]),
      ),
    )
    console.log('🚀 ~ onClick ~ myUrl:', myUrl, myUrl.length)
  }
  const onClickLogState = () => {
    console.log(`c%App State:`, appState)
  }
  const onClick2 = () => {
    // const nonEmpties = Object.values(appState.boardHexes).filter(
    //   (bh) => bh.terrain !== HexTerrain.empty,
    // )
    // console.log("🚀 ~ onClick2 ~ nonEmpties:", Object.values(appState.boardHexes).length)
    // console.log("🚀 ~ onClick2 ~ map dims without empties:", getBoardHexesRectangularMapDimensions(nonEmpties))

    console.log(
      `%c${Object.keys(appState.boardPieces).map((s) => s ? `${s}` + '\n' : '')}
    `,
      'color: red; font-size: 14px',
    )


    // console.log(
    //   `%c${nonEmpties
    //     .forEach(s => (
    //       console.dir(s.laurAddons)
    //     ))}
    // `, "color: blue; font-size: 16px")

  }
  return (
    <>
      <Button variant="contained" onClick={onClick}>
        Log URL
      </Button>
      <Button variant="contained" onClick={onClickLogState}>
        Log state
      </Button>
      <Button variant="contained" onClick={onClick2}>
        Log Cool thing
      </Button>
    </>
  )
}

export default DEVLogSomethingCoolButton
