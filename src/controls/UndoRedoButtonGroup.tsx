import { Button } from '@mui/material'
import { useHotkeys } from 'react-hotkeys-hook'
import useTemporalStore from '../hooks/useTemporalStore'
import ControlButtonGroup from './ControlButtonGroup';


const UndoRedoButtonGroup = () => {
  // we do things strange in this component to have react pastStates/futureStates and show
  // the user a count of actions in either direction
  // const { undo, redo } = useBoundStore.temporal.getState()
  const { undo, redo, pastStates, futureStates } = useTemporalStore(
    (state: any) => state,
  );
  useHotkeys('mod+z', () => undo())
  useHotkeys('mod+y', () => redo())
  return (
    <ControlButtonGroup>
      {/* <Button onClick={() => useBoundStore.temporal.getState().clear()}>CLEAR</Button> */}
      <Button variant="contained" onClick={() => undo()}>
        UNDO (ctrl/cmd + Z) ({pastStates.length} undoable actions)
      </Button>
      <Button variant="contained" onClick={() => redo()}>
        REDO (ctrl/cmd + Z) ({futureStates.length} redoable actions)
      </Button>
    </ControlButtonGroup>
  )
}

export default UndoRedoButtonGroup
