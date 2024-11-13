import { AppState } from "../types"

const initialState: AppState = {
    boardHexes: {

        "0,0,0": {
            "q": 0,
            "r": 0,
            "s": 0,
            "id": "0,0,0",
            "occupyingUnitID": "",
            "isUnitTail": false,
            "altitude": 0,
            "terrain": "empty",
            "startzonePlayerIDs": []
        },
        "1,0,-1": {
            "q": 1,
            "r": 0,
            "s": -1,
            "id": "1,0,-1",
            "occupyingUnitID": "",
            "isUnitTail": false,
            "altitude": 0,
            "terrain": "empty",
            "startzonePlayerIDs": []
        },
        "0,1,-1": {
            "q": 0,
            "r": 1,
            "s": -1,
            "id": "0,1,-1",
            "occupyingUnitID": "",
            "isUnitTail": false,
            "altitude": 0,
            "terrain": "empty",
            "startzonePlayerIDs": []
        },
        "1,1,-2": {
            "q": 1,
            "r": 1,
            "s": -2,
            "id": "1,1,-2",
            "occupyingUnitID": "",
            "isUnitTail": false,
            "altitude": 0,
            "terrain": "empty",
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