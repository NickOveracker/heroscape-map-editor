import React from "react"
import { Canvas } from "@react-three/fiber"
import { Stats } from "@react-three/drei"
import { Vector3 } from "three"
import Lights from "./Lights"
import MyCameraControls from "./camera/MyCameraControls"
import MapDisplay3D from "./MapDisplay3D"
import GridHelper from "./GridHelper"
import { CAMERA_FOV } from "../utils/constants"
import ForestTree10WithBase from "./maphex/ForestTree10WithBase"
import { Alert, Button, Snackbar } from "@mui/material"

const World = () => {
    const cameraControlsRef = React.useRef(undefined!)
    return (
        <div
            id="canvas-container"
            style={{
                width: '100%',
                height: '100%',
                position: 'relative',
            }}
        >
            <Canvas camera={{
                fov: CAMERA_FOV,
            }}
                shadows
            >
                {/* Stats displays the fps */}
                <Stats className='stats-panel' />
                <ForestTree10WithBase position={new Vector3(0, 1, 0)} />
                <MapDisplay3D
                    cameraControlsRef={cameraControlsRef}
                />
                <Lights />
                <GridHelper />
                <MyCameraControls cameraControlsRef={cameraControlsRef} />
            </Canvas>
            <Snackbar
                open={true}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                autoHideDuration={2000}
                message="This Snackbar will be dismissed in 5 seconds."
                action={
                    <Button color="inherit" size="small">
                        Undo
                    </Button>
                }
                sx={{ bottom: { xl: 320, lg: 300, md: 300, sm: 20, xs: 20 } }}
            >
                <Alert
                    // onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    This is a success Alert inside a Snackbar!
                </Alert>
            </Snackbar>
        </div>
    )
}

export default World
