import { Button } from '@mui/material'
import useBoundStore from '../store/store'
import { useHotkeys } from 'react-hotkeys-hook'
import ControlButtonGroup from './ControlButtonGroup';

const UndoRedoButtonGroup = () => {
  const { undo, redo } = useBoundStore.temporal.getState();
  useHotkeys('ctrl+z', () => undo())
  useHotkeys('ctrl+y', () => redo())
  useHotkeys('cmd+z', () => undo())
  useHotkeys('cmd+y', () => redo())
  return (
    <ControlButtonGroup>
      <Button variant='contained' onClick={() => undo()}>UNDO (ctrl/cmd + Z)</Button>
      <Button variant='contained' onClick={() => redo()}>REDO (ctrl/cmd + Z)</Button>
    </ControlButtonGroup>
  )
}

export default UndoRedoButtonGroup