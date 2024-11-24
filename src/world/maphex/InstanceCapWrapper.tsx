import { JSXElementConstructor } from "react"
import { InstanceCapProps } from "./instance-hex"



type InstanceCapWrapperProps = InstanceCapProps & {
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
