import { Button } from '@mui/material'
import { MdOutlineDownloadForOffline } from 'react-icons/md'
import useBoundStore from '../store/store'
import { MapFileState } from '../types'
import { encodeFilename } from '../utils/map-utils'



const ExportJsonFileButton = () => {
  const hexMap = useBoundStore((state) => state.hexMap)
  const boardPieces = useBoundStore((state) => state.boardPieces)
  const handleClickExportJson = async () => {
    const filename = `${encodeFilename(hexMap.name)}.json`
    const data: MapFileState = {
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
      Download Map File (.json)
    </Button>
  )
}
export default ExportJsonFileButton
