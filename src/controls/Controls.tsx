import { Button, Container } from '@mui/material'
import DEVLogSomethingCoolButton from './DEVLogSomethingCoolButton'
import FileButtonGroup from './FileButtonGroup'
// import MapLensToggles from './MapLensToggles'
import PieceSizeSelect from './PieceSizeSelect'
import PenTerrainSelect from './PenTerrainSelect'
import TakePictureButtonGroup from './TakePictureButtonGroup'
import ToggleCameraButton from './ToggleCameraButton'
import RotationSelect from './RotationSelect'
import useBoundStore from '../store/store'

const Controls = () => {
    const { undo, redo, clear } = useBoundStore.temporal.getState();

    return (
        <Container sx={{ padding: 1 }}>
            <PenTerrainSelect />
            <PieceSizeSelect />
            <RotationSelect />
            {/* <MapLensToggles /> */}
            <FileButtonGroup />
            <TakePictureButtonGroup />
            <ToggleCameraButton />
            <DEVLogSomethingCoolButton />
            <Button onClick={() => undo()}>UNDO</Button>
            <Button onClick={() => redo()}>REDO</Button>
        </Container>
    )
}

export default Controls