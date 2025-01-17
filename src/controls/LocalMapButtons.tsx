import { Button, Container } from '@mui/material'
import useBoundStore from '../store/store'
import { useLocalMapMemory } from '../hooks/useLocalMapMemory'
import { enqueueSnackbar } from 'notistack'

const LocalMapButtons = () => {
  const boardHexes = useBoundStore((s) => s.boardHexes)
  const boardPieces = useBoundStore((s) => s.boardPieces)
  const hexMap = useBoundStore((s) => s.hexMap)
  const loadMap = useBoundStore((s) => s.loadMap)
  const {
    map1,
    setMap1,
    map2,
    setMap2,
    map3,
    setMap3,
    map4,
    setMap4,
  } = useLocalMapMemory()
  const saveMap1 = () => {
    setMap1({
      hexMap,
      boardPieces,
      boardHexes
    })
    enqueueSnackbar({
      message: `Saved map to slot 1`,
      variant: 'success',
      autoHideDuration: 3000,
    })
  }
  const loadMap1 = () => {
    if (map1.hexMap.name) {
      loadMap(map1)
      enqueueSnackbar({
        message: `Loaded map from slot 1: ${map1.hexMap.name}`,
        variant: 'success',
        autoHideDuration: 3000,
      })
    }
  }
  const loadMap2 = () => {
    if (map2.hexMap.name) {
      loadMap(map2)
      enqueueSnackbar({
        message: `Loaded map from slot 2: ${map2.hexMap.name}`,
        variant: 'success',
        autoHideDuration: 3000,
      })
    }
  }
  const loadMap3 = () => {
    if (map3.hexMap.name) {
      loadMap(map3)
      enqueueSnackbar({
        message: `Loaded map from slot 3: ${map3.hexMap.name}`,
        variant: 'success',
        autoHideDuration: 3000,
      })
    }
  }
  const loadMap4 = () => {
    if (map4.hexMap.name) {
      loadMap(map4)
      enqueueSnackbar({
        message: `Loaded map from slot 4: ${map4.hexMap.name}`,
        variant: 'success',
        autoHideDuration: 3000,
      })
    }
  }

  return (
    <Container sx={{ padding: 1 }}>
      <Button onClick={loadMap1}>{`Load saved map #1: ${map1.hexMap.name}`}</Button>
      <Button onClick={loadMap2}>{`Load saved map #2: ${map2.hexMap.name}`}</Button>
      <Button onClick={loadMap3}>{`Load saved map #3: ${map3.hexMap.name}`}</Button>
      <Button onClick={loadMap4}>{`Load saved map #4: ${map4.hexMap.name}`}</Button>
      <Button onClick={saveMap1}>{`Save map to spot #1`}</Button>
    </Container>
  )
}

export default LocalMapButtons
