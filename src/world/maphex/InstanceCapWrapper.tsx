import { ThreeEvent } from "@react-three/fiber"
import { BoardHex } from "../../types"
import { JSXElementConstructor } from "react"
import { InstanceCapProps } from "./instance-hex"



type InstanceCapWrapperProps = {
  capHexesArray: BoardHex[]
  onPointerEnter: (hex: BoardHex) => void
  onPointerOut: () => void
  onPointerDown: (e: ThreeEvent<PointerEvent>, hex: BoardHex) => void
  component: JSXElementConstructor<InstanceCapProps>
  glKey: string
}
export default function InstanceCapWrapper(props: InstanceCapWrapperProps) {
  const InstanceCap = props.component
  const numInstances = props.capHexesArray.length
  if (numInstances < 1) return null
  const key = `${props.glKey}${numInstances}` // IMPORTANT: to include numInstances in key, otherwise gl will crash on change
  return (
    <InstanceCap
      key={key}
      capHexesArray={props.capHexesArray}
      onPointerEnter={props.onPointerEnter}
      onPointerOut={props.onPointerOut}
      onPointerDown={props.onPointerDown}
    />
  )
}
