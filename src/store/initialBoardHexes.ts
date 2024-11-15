import { AppState } from "../types"

const initialState: AppState = {
    boardHexes: {
        "0,0,0": {
            "q": 0,
            "r": 0,
            "s": 0,
            "id": "0,0,0",
            "altitude": 2,
            "terrain": "grass",
            "startzonePlayerIDs": []
        },
        "1,0,-1": {
            "q": 1,
            "r": 0,
            "s": -1,
            "id": "1,0,-1",
            "altitude": 1,
            "terrain": "grass",
            "startzonePlayerIDs": []
        },
        "0,1,-1": {
            "q": 0,
            "r": 1,
            "s": -1,
            "id": "0,1,-1",
            "altitude": 1,
            "terrain": "water",
            "startzonePlayerIDs": []
        },
        "1,1,-2": {
            "q": 1,
            "r": 1,
            "s": -2,
            "id": "1,1,-2",
            "altitude": 3,
            "terrain": "grass",
            "startzonePlayerIDs": []
        }
    },
    hexMap: {
        "id": "1731525017538",
        "name": "default rectangle map",
        "shape": "rectangle",
        "size": 2,
        "glyphs": {}
    }
}

export default initialState