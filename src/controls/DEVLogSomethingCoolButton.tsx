import { Button } from '@mui/material'
import useBoundStore from '../store/store'
import JSONCrush from 'jsoncrush'
import { useSnackbar } from 'notistack';

const DEVLogSomethingCoolButton = () => {
  const appState = useBoundStore((state) => state)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const onClickCopy = async () => {
    const myUrl = encodeURI(
      JSONCrush.crush(
        JSON.stringify([
          appState.hexMap, // 1
          ...Object.keys(appState.boardPieces),
        ]),
      ),
    )
    const fullUrl = window.location.href + '?m=' + myUrl
    if (fullUrl.length > 2082) {
      enqueueSnackbar({
        message: `Map is too big to be stored in a URL, sorry!`,
        variant: 'error',
        autoHideDuration: 3000,
      })
      return
    }
    try {
      await navigator.clipboard.writeText(fullUrl);
      enqueueSnackbar({
        message: `Copied shareable map URL to clipboard`,
        autoHideDuration: 3000,
      })

    } catch (err) {
      console.log("Attempted clipboard write, failed:", err)
      const action: any = (snackbarId: string) => (
        <>
          {/* <button onClick={() => { alert(`I belong to snackbar with id ${snackbarId}`); }}>
            Undo
          </button> */}
          <button onClick={() => { closeSnackbar(snackbarId) }}>
            Dismiss
          </button>
        </>
      );
      enqueueSnackbar({
        message: `Failed to copy map state to clipboard, here it is: ${fullUrl}`,
        variant: 'error',
        // autoHideDuration: 3000,
        action: action
      })
    }
    console.log('🚀 ~ onClick ~ myUrl:', window.location)
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
      <Button variant="contained" onClick={onClickCopy}>
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
