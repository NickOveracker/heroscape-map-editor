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
  GiCastle,
} from 'react-icons/gi'
import { PiecePrefixes, Pieces } from '../types'
import useBoundStore from '../store/store'

export default function PenTerrainSelect() {
  const penMode = useBoundStore((state) => state.penMode)
  const togglePenMode = useBoundStore((state) => state.togglePenMode)
  const handleChange = (event: SelectChangeEvent) => {
    togglePenMode(event.target.value)
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
        <MenuItem value={'select'}>
          <ListItemIcon>
            <GiArrowCursor />
          </ListItemIcon>
          <span>Select</span>
        </MenuItem>

        <Divider />
        {/* TERRAIN TYPES BEGIN */}

        <MenuItem value={PiecePrefixes.grass}>
          <ListItemIcon>
            <GiGrass />
          </ListItemIcon>
          <span>Grass</span>
        </MenuItem>
        <MenuItem value={PiecePrefixes.rock}>
          <ListItemIcon>
            <GiPeaks />
          </ListItemIcon>
          <span>Rock</span>
        </MenuItem>
        <MenuItem value={PiecePrefixes.sand}>
          <ListItemIcon>
            <GiIsland />
          </ListItemIcon>
          <span>Sand</span>
        </MenuItem>
        <MenuItem value={PiecePrefixes.road}>
          <ListItemIcon>
            <GiIsland />
          </ListItemIcon>
          <span>Road</span>
        </MenuItem>
        <MenuItem value={PiecePrefixes.lavaField}>
          <ListItemIcon>
            <GiIsland />
          </ListItemIcon>
          <span>Lava Field</span>
        </MenuItem>
        <MenuItem value={PiecePrefixes.snow}>
          <ListItemIcon>
            <GiIsland />
          </ListItemIcon>
          <span>Snow</span>
        </MenuItem>
        <MenuItem value={PiecePrefixes.concrete}>
          <ListItemIcon>
            <GiIsland />
          </ListItemIcon>
          <span>Concrete</span>
        </MenuItem>
        <MenuItem value={PiecePrefixes.asphalt}>
          <ListItemIcon>
            <GiIsland />
          </ListItemIcon>
          <span>Asphalt</span>
        </MenuItem>
        <MenuItem value={PiecePrefixes.swamp}>
          <ListItemIcon>
            <GiIsland />
          </ListItemIcon>
          <span>Swamp</span>
        </MenuItem>
        <MenuItem value={PiecePrefixes.dungeon}>
          <ListItemIcon>
            <GiIsland />
          </ListItemIcon>
          <span>Dungeon</span>
        </MenuItem>
        <Divider />
        {/* FLUID LAND BEGIN */}
        <MenuItem value={PiecePrefixes.water}>
          <ListItemIcon>
            <GiWaterfall />
          </ListItemIcon>
          <span>Water</span>
        </MenuItem>
        <MenuItem value={PiecePrefixes.wellspringWater}>
          <ListItemIcon>
            <GiWaterfall />
          </ListItemIcon>
          <span>Wellspring Water</span>
        </MenuItem>
        <MenuItem value={PiecePrefixes.ice}>
          <ListItemIcon>
            <GiWaterfall />
          </ListItemIcon>
          <span>Ice</span>
        </MenuItem>
        <MenuItem value={PiecePrefixes.lava}>
          <ListItemIcon>
            <GiWaterfall />
          </ListItemIcon>
          <span>Lava</span>
        </MenuItem>
        <MenuItem value={PiecePrefixes.swampWater}>
          <ListItemIcon>
            <GiWaterfall />
          </ListItemIcon>
          <span>Swamp Water</span>
        </MenuItem>
        <MenuItem value={PiecePrefixes.shadow}>
          <ListItemIcon>
            <GiWaterfall />
          </ListItemIcon>
          <span>Shadow</span>
        </MenuItem>

        <Divider />
        {/* LAUR WALL */}
        <MenuItem value={Pieces.laurWallPillar}>
          <ListItemIcon>
            <GiWaterfall />
          </ListItemIcon>
          <span>Laur Pillar</span>
        </MenuItem>
        {/* <MenuItem value={PenMode.laurWallRuin}>
          <ListItemIcon>
            <GiWaterfall />
          </ListItemIcon>
          <span>Laur Wall Ruin</span>
        </MenuItem>
        <MenuItem value={PenMode.laurWallShort}>
          <ListItemIcon>
            <GiWaterfall />
          </ListItemIcon>
          <span>Laur Wall Short</span>
        </MenuItem>
        <MenuItem value={PenMode.laurWallLong}>
          <ListItemIcon>
            <GiWaterfall />
          </ListItemIcon>
          <span>Laur Wall Long</span>
        </MenuItem> */}
        <Divider />
        {/* RUINS */}
        <MenuItem value={Pieces.ruins2}>
          <ListItemIcon>
            <GiWaterfall />
          </ListItemIcon>
          <span>Ruins 2</span>
        </MenuItem>
        <MenuItem value={Pieces.ruins3}>
          <ListItemIcon>
            <GiWaterfall />
          </ListItemIcon>
          <span>Ruins 3</span>
        </MenuItem>
        <Divider />
        {/* OBSTACLES */}
        <MenuItem value={Pieces.tree10}>
          <ListItemIcon>
            <GiWaterfall />
          </ListItemIcon>
          <span>Tree10</span>
        </MenuItem>
        <MenuItem value={Pieces.tree11}>
          <ListItemIcon>
            <GiWaterfall />
          </ListItemIcon>
          <span>Tree11</span>
        </MenuItem>
        <MenuItem value={Pieces.tree12}>
          <ListItemIcon>
            <GiWaterfall />
          </ListItemIcon>
          <span>Tree12</span>
        </MenuItem>
        <MenuItem value={Pieces.tree415}>
          <ListItemIcon>
            <GiWaterfall />
          </ListItemIcon>
          <span>Tree415</span>
        </MenuItem>
        <MenuItem value={Pieces.brush9}>
          <ListItemIcon>
            <GiWaterfall />
          </ListItemIcon>
          <span>TicallaBrush9</span>
        </MenuItem>
        <MenuItem value={Pieces.palm14}>
          <ListItemIcon>
            <GiWaterfall />
          </ListItemIcon>
          <span>TicallaPalm14</span>
        </MenuItem>
        <MenuItem value={Pieces.palm15}>
          <ListItemIcon>
            <GiWaterfall />
          </ListItemIcon>
          <span>TicallaPalm15</span>
        </MenuItem>
        <MenuItem value={Pieces.palm16}>
          <ListItemIcon>
            <GiWaterfall />
          </ListItemIcon>
          <span>TicallaPalm16</span>
        </MenuItem>
        <MenuItem value={Pieces.laurBrush10}>
          <ListItemIcon>
            <GiWaterfall />
          </ListItemIcon>
          <span>LaurBrush10</span>
        </MenuItem>
        <MenuItem value={Pieces.laurPalm13}>
          <ListItemIcon>
            <GiWaterfall />
          </ListItemIcon>
          <span>LaurPalm13</span>
        </MenuItem>
        <MenuItem value={Pieces.laurPalm14}>
          <ListItemIcon>
            <GiWaterfall />
          </ListItemIcon>
          <span>LaurPalm14</span>
        </MenuItem>
        <MenuItem value={Pieces.laurPalm15}>
          <ListItemIcon>
            <GiWaterfall />
          </ListItemIcon>
          <span>LaurPalm15</span>
        </MenuItem>
        <MenuItem value={Pieces.outcrop1}>
          <ListItemIcon>
            <GiWaterfall />
          </ListItemIcon>
          <span>Outcrop 1</span>
        </MenuItem>
        <MenuItem value={Pieces.outcrop3}>
          <ListItemIcon>
            <GiWaterfall />
          </ListItemIcon>
          <span>Outcrop 3</span>
        </MenuItem>
        <MenuItem value={Pieces.glacier1}>
          <ListItemIcon>
            <GiWaterfall />
          </ListItemIcon>
          <span>Glacier 1</span>
        </MenuItem>
        <MenuItem value={Pieces.glacier3}>
          <ListItemIcon>
            <GiWaterfall />
          </ListItemIcon>
          <span>Glacier 3</span>
        </MenuItem>
        <MenuItem value={Pieces.glacier4}>
          <ListItemIcon>
            <GiWaterfall />
          </ListItemIcon>
          <span>Glacier 4</span>
        </MenuItem>
        <MenuItem value={Pieces.glacier6}>
          <ListItemIcon>
            <GiWaterfall />
          </ListItemIcon>
          <span>Glacier 6</span>
        </MenuItem>
        <MenuItem value={Pieces.hive}>
          <ListItemIcon>
            <GiWaterfall />
          </ListItemIcon>
          <span>Marro Hive 6</span>
        </MenuItem>

        <Divider />
        <MenuItem value={Pieces.castleBaseEnd}>
          <ListItemIcon>
            <GiCastle />
          </ListItemIcon>
          <span>Castle Base End</span>
        </MenuItem>
        <MenuItem value={Pieces.castleBaseStraight}>
          <ListItemIcon>
            <GiCastle />
          </ListItemIcon>
          <span>Castle Base Straight</span>
        </MenuItem>
        <MenuItem value={Pieces.castleBaseCorner}>
          <ListItemIcon>
            <GiCastle />
          </ListItemIcon>
          <span>Castle Base Corner</span>
        </MenuItem>
        <MenuItem value={Pieces.castleWallEnd}>
          <ListItemIcon>
            <GiCastle />
          </ListItemIcon>
          <span>Castle Wall End</span>
        </MenuItem>
        <MenuItem value={Pieces.castleWallStraight}>
          <ListItemIcon>
            <GiCastle />
          </ListItemIcon>
          <span>Castle Wall Straight</span>
        </MenuItem>
        <MenuItem value={Pieces.castleWallCorner}>
          <ListItemIcon>
            <GiCastle />
          </ListItemIcon>
          <span>Castle Wall Corner</span>
        </MenuItem>
        <MenuItem value={Pieces.castleArch}>
          <ListItemIcon>
            <GiCastle />
          </ListItemIcon>
          <span>Castle Arch</span>
        </MenuItem>
        <MenuItem value={Pieces.castleArchNoDoor}>
          <ListItemIcon>
            <GiCastle />
          </ListItemIcon>
          <span>Castle Arch (No Door)</span>
        </MenuItem>
        {/* WALL WALK BEGIN */}
        <MenuItem value={Pieces.wallWalk1}>
          <ListItemIcon>
            <GiCastle />
          </ListItemIcon>
          <span>Wall Walk 1</span>
        </MenuItem>
        <MenuItem value={Pieces.wallWalk7}>
          <ListItemIcon>
            <GiCastle />
          </ListItemIcon>
          <span>Wall Walk 7</span>
        </MenuItem>
        <MenuItem value={Pieces.wallWalk9}>
          <ListItemIcon>
            <GiCastle />
          </ListItemIcon>
          <span>Wall Walk 9</span>
        </MenuItem>

        {/* <Divider /> */}
        {/* START ZONES BEGIN */}
        {/* 
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
        </MenuItem> */}

        {/* <Divider /> */}
        {/* ERASER BUTTONS BEGIN */}

        {/* <MenuItem value={PenMode.eraserStartZone}>
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
        </MenuItem> */}
      </Select>
    </FormControl>
  )
}
