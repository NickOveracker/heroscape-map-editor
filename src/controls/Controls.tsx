import { Container } from '@mui/material'
import DEVLogSomethingCoolButton from './DEVLogSomethingCoolButton'
import FileButtonGroup from './FileButtonGroup'
import MapLensToggles from './MapLensToggles'
import PieceSizeSelect from './PieceSizeSelect'
import PenTerrainSelect from './PenTerrainSelect'
import TakePictureButtonGroup from './TakePictureButtonGroup'
import ToggleCameraButton from './ToggleCameraButton'
import RotationSelect from './RotationSelect'
import UndoRedoButtonGroup from './UndoRedoButtonGroup'
import ControlButtonGroup from './ControlButtonGroup'
import FormDialog from '../layout/FormDialog'

const Controls = () => {
    return (
        <Container sx={{ padding: 1 }}>
            <PenTerrainSelect />
            <PieceSizeSelect />
            <RotationSelect />
            <MapLensToggles />
            <FileButtonGroup />
            <TakePictureButtonGroup />
            <UndoRedoButtonGroup />
            <ControlButtonGroup>
                <ToggleCameraButton />
                <DEVLogSomethingCoolButton />
                <FormDialog />
            </ControlButtonGroup>
            {/* <Button onClick={() => useBoundStore.temporal.getState().clear()}>CLEAR</Button> */}
        </Container>
    )
}

export default Controls