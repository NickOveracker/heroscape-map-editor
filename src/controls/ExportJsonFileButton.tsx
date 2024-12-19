import { Button } from '@mui/material'
import { MdOutlineDownloadForOffline } from 'react-icons/md'
import useBoundStore from '../store/store'
import { MapState } from '../types'

const ExportJsonFileButton = () => {
  const boardHexes = useBoundStore((state) => state.boardHexes)
  const hexMap = useBoundStore((state) => state.hexMap)
  const boardPieces = useBoundStore((state) => state.boardPieces)
  const handleClickExportJson = () => {
    const filename = `MyHexMap.json`
    const data: MapState = {
      boardHexes,
      hexMap,
      boardPieces,
    }
    const element = document.createElement('a')
    element.setAttribute(
      'href',
      `data:application/x-ndjson;charset=utf-8,${encodeURIComponent(
        JSON.stringify(data)
      )}`
    )
    element.setAttribute('download', filename)
    element.style.display = 'none'
    // document.body.append(element)
    element.click()
    // element.remove()
  }
  return (
    <Button
      startIcon={<MdOutlineDownloadForOffline />}
      onClick={handleClickExportJson}
      variant="contained"
    >
      Download Map
    </Button>
  )
}
export default ExportJsonFileButton
