import { useLocalStorage } from '../hooks/useLocalStorage'
import { MapState } from '../types'

export const useLocalMapMemory = () => {
  const blankMapState: MapState = {
    boardHexes: {},
    boardPieces: {},
    hexMap: {
      id: '',
      name: '',
      shape: '',
      length: 0,
      width: 0,
    },
  }
  const [map1, setMap1] = useLocalStorage('hexxaform-map1', blankMapState)
  const [map2, setMap2] = useLocalStorage('hexxaform-map2', blankMapState)
  const [map3, setMap3] = useLocalStorage('hexxaform-map3', blankMapState)
  return {
    map1,
    setMap1,
    map2,
    setMap2,
    map3,
    setMap3,
  }
}
