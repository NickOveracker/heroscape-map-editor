import { Container } from '@mui/material'
import DEVLogSomethingCoolButton from './DEVLogSomethingCoolButton'

const Controls = () => {
    return (
        <Container sx={{ padding: 1 }}>
            {/* <PenTerrainSelect /> */}
            {/* <PieceSizeSelect /> */}
            {/* <MapLensToggles /> */}
            {/* <FileButtonGroup boardHexes={boardHexes} hexMap={hexMap} moves={moves} /> */}
            {/* <TakePictureButtonGroup /> */}
            <DEVLogSomethingCoolButton />
        </Container>
    )
}

export default Controls