import { Container } from '@mui/material'
import DEVLogSomethingCoolButton from './DEVLogSomethingCoolButton'
import FileButtonGroup from './FileButtonGroup'
import MapLensToggles from './MapLensToggles'
import PieceSizeSelect from './PieceSizeSelect'
import PenTerrainSelect from './PenTerrainSelect'
import TakePictureButtonGroup from './TakePictureButtonGroup'
import ToggleCameraButton from './ToggleCameraButton'

const Controls = () => {
    return (
        <Container sx={{ padding: 1 }}>
            <PenTerrainSelect />
            <PieceSizeSelect />
            <MapLensToggles />
            <FileButtonGroup />
            <TakePictureButtonGroup />
            <ToggleCameraButton />
            <DEVLogSomethingCoolButton />
        </Container>
    )
}

export default Controls