import { useRef, useState } from 'react'
import { MdSave } from 'react-icons/md'
import {
  Button,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from '@mui/material'

import useBoundStore from '../store/store'
import { hexagonScenario, rectangleScenario } from '../utils/map-gen'
import { useLocalMapMemory } from '../hooks/useLocalMapMemory'
import { MapState } from '../types'
import { useSnackbar } from 'notistack'

export const LoadSaveMapButtons = () => {
  const boardHexes = useBoundStore((state) => state.boardHexes)
  const hexMap = useBoundStore((state) => state.hexMap)
  const boardPieces = useBoundStore((state) => state.boardPieces)
  const loadMap = useBoundStore((state) => state.loadMap)
  const { enqueueSnackbar } = useSnackbar();
  const currentSaveableMap: MapState = { boardHexes, hexMap, boardPieces }
  const { map1, setMap1, map2, setMap2, map3, setMap3 } = useLocalMapMemory()
  const isMap1 =
    Object.keys(map1?.boardHexes ?? {})?.length > 0 && Boolean(map1?.hexMap)
  const isMap2 =
    Object.keys(map2?.boardHexes ?? {})?.length > 0 && Boolean(map2?.hexMap)
  const isMap3 =
    Object.keys(map3?.boardHexes ?? {})?.length > 0 && Boolean(map3?.hexMap)
  const handleLoadMap1 = () => {
    if (isMap1) {
      loadMap(map1)
      enqueueSnackbar(`Loaded map: "${map1.hexMap.name}" from local map slot 1`)
    }
  }
  const handleLoadMap2 = () => {
    if (isMap2) {
      loadMap(map2)
      enqueueSnackbar(`Loaded map: "${map2.hexMap.name}" from local map slot 2`)
    }
  }
  const handleLoadMap3 = () => {
    if (isMap3) {
      loadMap(map3)
      enqueueSnackbar(`Loaded map: "${map3.hexMap.name}" from local map slot 3`)
    }
  }
  const handleLoadHexagonMap = () => {
    loadMap(hexagonScenario)
    enqueueSnackbar(`Loaded map: ${hexagonScenario.hexMap.name}`)
  }
  const handleLoadRectangleMap = () => {
    loadMap(rectangleScenario)
    enqueueSnackbar(`Loaded map: ${rectangleScenario.hexMap.name}`)
  }
  const handleSaveMap1 = () => {
    setMap1(currentSaveableMap)
    enqueueSnackbar(`Saved "${currentSaveableMap.hexMap.name}" to local map slot 1`)
  }
  const handleSaveMap2 = () => {
    setMap2(currentSaveableMap)
    enqueueSnackbar(`Saved "${currentSaveableMap.hexMap.name}" to local map slot 2`)
  }
  const handleSaveMap3 = () => {
    setMap3(currentSaveableMap)
    enqueueSnackbar(`Saved "${currentSaveableMap.hexMap.name}" to local map slot 3`)
  }
  return (
    <>
      <SplitButton
        isMap1={isMap1}
        isMap2={isMap2}
        isMap3={isMap3}
        handleLoadMap1={handleLoadMap1}
        handleLoadMap2={handleLoadMap2}
        handleLoadMap3={handleLoadMap3}
        handleSaveMap1={handleSaveMap1}
        handleSaveMap2={handleSaveMap2}
        handleSaveMap3={handleSaveMap3}
        // handleLoadGiantsTable={handleLoadGiantsTable}
        // handleLoadForsakenWaters={handleLoadForsakenWaters}
        // handleLoadCirdanGarden={handleLoadCirdanGarden}
        handleLoadHexagonMap={handleLoadHexagonMap}
        handleLoadRectangleMap={handleLoadRectangleMap}
      />
    </>
  )
}
type SaveLoadMapOption = {
  title: string
  onClick: () => void
  isDisabled: boolean
}
type SplitButtonProps = {
  isMap1: boolean
  isMap2: boolean
  isMap3: boolean
  handleLoadMap1: () => void
  handleLoadMap2: () => void
  handleLoadMap3: () => void
  handleSaveMap1: () => void
  handleSaveMap2: () => void
  handleSaveMap3: () => void
  // handleLoadGiantsTable: () => void
  // handleLoadForsakenWaters: () => void
  // handleLoadCirdanGarden: () => void
  handleLoadHexagonMap: () => void
  handleLoadRectangleMap: () => void
}
function SplitButton({
  isMap1,
  isMap2,
  isMap3,
  handleSaveMap1,
  handleSaveMap2,
  handleSaveMap3,
  handleLoadMap1,
  handleLoadMap2,
  handleLoadMap3,
  // handleLoadGiantsTable,
  // handleLoadForsakenWaters,
  // handleLoadCirdanGarden,
  handleLoadHexagonMap,
  handleLoadRectangleMap,
}: SplitButtonProps) {
  const [open, setOpen] = useState(false)
  const anchorRef = useRef<HTMLButtonElement>(null!)
  const options: SaveLoadMapOption[] = [
    {
      title: 'Save Map 1',
      onClick: handleSaveMap1,
      isDisabled: false,
    },
    {
      title: 'Save Map 2',
      onClick: handleSaveMap2,
      isDisabled: false,
    },
    {
      title: 'Save Map 3',
      onClick: handleSaveMap3,
      isDisabled: false,
    },
    {
      title: 'Load Map 1',
      onClick: handleLoadMap1,
      isDisabled: !isMap1,
    },
    {
      title: 'Load Map 2',
      onClick: handleLoadMap2,
      isDisabled: !isMap2,
    },
    {
      title: 'Load Map 3',
      onClick: handleLoadMap3,
      isDisabled: !isMap3,
    },
    ////
    // {
    //   title: 'Load Giants Table Map',
    //   onClick: handleLoadGiantsTable,
    //   isDisabled: false,
    // },
    // {
    //   title: 'Load Forsaken Waters Map',
    //   onClick: handleLoadForsakenWaters,
    //   isDisabled: false,
    // },
    // {
    //   title: 'Load Cirdan Garden Map',
    //   onClick: handleLoadCirdanGarden,
    //   isDisabled: false,
    // },
    {
      title: 'Load Hexagon Map',
      onClick: handleLoadHexagonMap,
      isDisabled: false,
    },
    {
      title: 'Load Rectangle Map',
      onClick: handleLoadRectangleMap,
      isDisabled: false,
    },
  ]
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }
  const handleClose = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    if (anchorRef?.current?.contains?.(event.target as HTMLElement)) {
      return
    }
    setOpen(false)
  }
  const onClickMenuItem = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, option: SaveLoadMapOption) => {
    option.onClick()
    handleClose(event)
  }

  return (
    <>
      <Button
        ref={anchorRef}
        variant="contained"
        size="small"
        aria-controls={open ? 'split-button-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-label="Load or save map"
        aria-haspopup="menu"
        onClick={handleToggle}
        startIcon={<MdSave />}
      >
        Load / Save Map
      </Button>
      <Popper
        sx={{ zIndex: 1 }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="right-end"
        transition
      >
        {({ TransitionProps }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={(e: Event) => handleClose(e as unknown as React.MouseEvent<HTMLLIElement, MouseEvent>)}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option) => (
                    <MenuItem
                      key={option.title}
                      disabled={option.isDisabled}
                      onClick={(e) => onClickMenuItem(e, option)}
                    >
                      {option.title}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  )
}
