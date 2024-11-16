import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { Divider, ListItemIcon } from '@mui/material'
import {
  GiArrowCursor,
  GiPeaks,
  GiGrass,
  GiIsland,
  GiWaterfall,
  GiBulldozer,
} from 'react-icons/gi'
import {
  TbHexagonNumber1Filled,
  TbHexagonNumber2Filled,
  TbHexagonNumber3Filled,
} from 'react-icons/tb'
import { PenMode } from '../types'
import useBoundStore from '../store/store'

export default function PenTerrainSelect() {
  const penMode = useBoundStore((state) => state.penMode)
  const togglePenMode = useBoundStore((state) => state.togglePenMode)
  const handleChange = (event: SelectChangeEvent) => {
    togglePenMode(event.target.value as PenMode)
  }
  return (
    <FormControl variant="filled">
      <InputLabel id="pen-terrain-select-label">Terrain</InputLabel>
      <Select
        autoWidth
        sx={{
          minWidth: 100,
        }}
        MenuProps={{
          anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
        }}
        labelId="pen-terrain-select-label"
        id="pen-terrain-select"
        value={penMode}
        onChange={handleChange}
      >
        <MenuItem value={PenMode.select}>
          <ListItemIcon>
            <GiArrowCursor />
          </ListItemIcon>
          <span>Select</span>
        </MenuItem>

        <Divider />
        {/* TERRAIN TYPES BEGIN */}

        <MenuItem value={PenMode.grass}>
          <ListItemIcon>
            <GiGrass />
          </ListItemIcon>
          <span>Grass</span>
        </MenuItem>
        <MenuItem value={PenMode.rock}>
          <ListItemIcon>
            <GiPeaks />
          </ListItemIcon>
          <span>Rock</span>
        </MenuItem>
        <MenuItem value={PenMode.sand}>
          <ListItemIcon>
            <GiIsland />
          </ListItemIcon>
          <span>Sand</span>
        </MenuItem>
        <MenuItem value={PenMode.water}>
          <ListItemIcon>
            <GiWaterfall />
          </ListItemIcon>
          <span>Water</span>
        </MenuItem>

        <Divider />
        {/* START ZONES BEGIN */}

        <MenuItem value={PenMode.startZone0}>
          <ListItemIcon>
            <TbHexagonNumber1Filled />
          </ListItemIcon>
          <span>Start Zone: P1</span>
        </MenuItem>
        <MenuItem value={PenMode.startZone1}>
          <ListItemIcon>
            <TbHexagonNumber2Filled />
          </ListItemIcon>
          <span>Start Zone: P2</span>
        </MenuItem>
        <MenuItem value={PenMode.startZone2}>
          <ListItemIcon>
            <TbHexagonNumber3Filled />
          </ListItemIcon>
          <span>Start Zone: P3</span>
        </MenuItem>

        <Divider />
        {/* ERASER BUTTONS BEGIN */}

        <MenuItem value={PenMode.eraserStartZone}>
          <ListItemIcon>
            <GiBulldozer />
          </ListItemIcon>
          <span>Erase Start Zone</span>
        </MenuItem>
        <MenuItem value={PenMode.eraser}>
          <ListItemIcon>
            <GiBulldozer />
          </ListItemIcon>
          <span>Delete Hex</span>
        </MenuItem>
      </Select>
    </FormControl>
  )
}
