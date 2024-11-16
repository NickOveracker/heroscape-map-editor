import {
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Switch,
} from '@mui/material'
import useBoundStore from '../store/store'

const MapLensToggles = () => {
  const isShowStartZones = useBoundStore(s => s.isShowStartZones)
  const toggleIsShowStartZones = useBoundStore((s => s.toggleIsShowStartZones))
  return (
    <Container>
      <FormControl component="fieldset">
        <FormLabel component="legend">Map Lenses</FormLabel>
        <FormGroup aria-label="map lens toggles" row>
          <FormControlLabel
            value={isShowStartZones}
            control={
              <Switch
                color="primary"
                checked={isShowStartZones}
                onChange={() => toggleIsShowStartZones(!isShowStartZones)}
              />
            }
            label="Show Start Zones"
            labelPlacement="start"
          />
        </FormGroup>
      </FormControl>
    </Container>
  )
}

export default MapLensToggles
