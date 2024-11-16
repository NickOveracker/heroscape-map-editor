import {
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Switch,
} from '@mui/material'

const MapLensToggles = () => {
  // const { isShowStartZones, toggleIsShowStartZones } = useHexxaformContext()
  return (
    <Container>
      <FormControl component="fieldset">
        <FormLabel component="legend">Map Lenses</FormLabel>
        <FormGroup aria-label="map lens toggles" row>
          <FormControlLabel
            // value={isShowStartZones}
            control={
              <Switch
                color="primary"
              // checked={isShowStartZones}
              // onChange={toggleIsShowStartZones}
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
