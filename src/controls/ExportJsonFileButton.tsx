import { Button } from '@mui/material'
import { MdOutlineDownloadForOffline } from 'react-icons/md'
import useBoundStore from '../store/store'
import { MapState } from '../types'

const ExportJsonFileButton = () => {
  const boardHexes = useBoundStore((state) => state.boardHexes)
  const hexMap = useBoundStore((state) => state.hexMap)
  const boardPieces = useBoundStore((state) => state.boardPieces)
  const handleClickExportJson = async () => {
    const filename = `${hexMap.name}.hexoscape.gz`
    const data: MapState = {
      boardHexes,
      hexMap,
      boardPieces,
    }
    const jsonDataString = JSON.stringify(data);
    const encoder = new TextEncoder();
    const encodedData = encoder.encode(jsonDataString);
    const stream = new Blob([encodedData]).stream()
    const compressedReadableStream = stream.pipeThrough(
      new CompressionStream("gzip")
    );
    const compressedResponse = new Response(compressedReadableStream);
    const blob = await compressedResponse.blob();
    const element = document.createElement('a')
    element.href = window.URL.createObjectURL(blob)
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
      Download Map File (.hexoscape.gz)
    </Button>
  )
}
export default ExportJsonFileButton
