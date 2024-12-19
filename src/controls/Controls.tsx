import { Button, Container } from '@mui/material'
import DEVLogSomethingCoolButton from './DEVLogSomethingCoolButton'
import FileButtonGroup from './FileButtonGroup'
// import MapLensToggles from './MapLensToggles'
import PieceSizeSelect from './PieceSizeSelect'
import PenTerrainSelect from './PenTerrainSelect'
import TakePictureButtonGroup from './TakePictureButtonGroup'
import ToggleCameraButton from './ToggleCameraButton'
import RotationSelect from './RotationSelect'
import { useSnackbar, VariantType } from 'notistack'

const Controls = () => {
    const { enqueueSnackbar } = useSnackbar();

    const handleClick = () => {
        enqueueSnackbar('I love snacks.');
    };

    const handleClickVariant = (variant: VariantType) => () => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar('This is a success message!', { variant });
    };
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
            <Button onClick={handleClick}>Show snackbar</Button>
            <Button onClick={handleClickVariant('success')}>Show success snackbar</Button>
        </Container>
    )
}

export default Controls