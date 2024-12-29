import { Button } from '@mui/material'
import useBoundStore from '../store/store'
import JSONCrush from 'jsoncrush'
import { HexTerrain } from '../types'
import { keyBy } from 'lodash'
import { getBoardHexesRectangularMapDimensions } from '../utils/map-utils'

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
  const onClick2 = () => {
    const nonEmpties = keyBy(Object.values(appState.boardHexes).filter(
      (bh) => bh.terrain !== HexTerrain.empty,
    ), 'id')
    console.log("🚀 ~ onClick2 ~ nonEmpties:", Object.values(appState.boardHexes).length)
    // console.log("🚀 ~ onClick2 ~ map dims without empties:", getBoardHexesRectangularMapDimensions(nonEmpties))

    //     console.log(
    //       `%c${Object.keys(appState.boardPieces).map((s) => `${s}` + '\n')}
    // `,
    //       'color: red; font-size: 14px',
    //     )


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
