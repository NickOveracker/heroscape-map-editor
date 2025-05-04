import { ClipPath, Defs, Polygon } from '@react-pdf/renderer'
import React from 'react'

type Props = { points: string }

export const SvgInterlockClipPaths = ({ points }: Props) => {
  return (
    <defs>
      <clipPath id="inner-stroke-clip">
        <polygon points={points} />
      </clipPath>
      <clipPath id="interlock1-clip">
        <polygon points={interlock1Points} />
      </clipPath>
      <clipPath id="interlock2-clip">
        <polygon points={interlock2Points} />
      </clipPath>
      <clipPath id="interlock3-clip">
        <polygon points={interlock3Points} />
      </clipPath>
      <clipPath id="interlock3B-clip">
        <polygon points={interlock3BPoints} />
      </clipPath>
      <clipPath id="interlock4-clip">
        <polygon points={interlock4Points} />
      </clipPath>
      <clipPath id="interlock4B-clip">
        <polygon points={interlock4BPoints} />
      </clipPath>
      <clipPath id="interlock5-clip">
        <polygon points={interlock5Points} />
      </clipPath>
      <clipPath id="interlock6-clip">
        <polygon points={interlock6Points} />
      </clipPath>
    </defs>
  )
}
export const PdfInterlockClipPaths = ({ points }: Props) => {
  return (
    <Defs>
      <ClipPath id="inner-stroke-clip">
        <Polygon points={points} />
      </ClipPath>
      <ClipPath id="interlock1-clip">
        <Polygon points={interlock1Points} />
      </ClipPath>
      <ClipPath id="interlock2-clip">
        <Polygon points={interlock2Points} />
      </ClipPath>
      <ClipPath id="interlock3-clip">
        <Polygon points={interlock3Points} />
      </ClipPath>
      <ClipPath id="interlock3B-clip">
        <Polygon points={interlock3BPoints} />
      </ClipPath>
      <ClipPath id="interlock4-clip">
        <Polygon points={interlock4Points} />
      </ClipPath>
      <ClipPath id="interlock4B-clip">
        <Polygon points={interlock4BPoints} />
      </ClipPath>
      <ClipPath id="interlock5-clip">
        <Polygon points={interlock5Points} />
      </ClipPath>
      <ClipPath id="interlock6-clip">
        <Polygon points={interlock6Points} />
      </ClipPath>
    </Defs>
  )
}

const interlock1Points =
  `17.32,15
8.66,20 
0,15 
8.66,10
0,5 
8.66,0 
17.32,5
8.66,10
`
const interlock2Points =
  `17.32,15
8.66,20 
0,15 
8.66, 10`
const interlock3Points =
  `17.32,15
8.66,20 
0,15 
0,5 
8.66,10`
const interlock3BPoints =
  `17.32,15
8.66,20 
0,15 
8.66, 10
8.66,0 
17.32,5
8.66, 10
`
const interlock4Points =
  `17.32,15
8.66,20 
0,15 
0,5 
8.66,0 
8.66,10`
const interlock4BPoints =
  `17.32,15
8.66,20 
0,15 
0,5 
8.66,0 
17.32,5`
const interlock5Points =
  `17.32,15
8.66,20 
0,15 
0,5 
8.66,0 
17.32,5
8.66,10
`
const interlock6Points =
  `17.32,15
8.66,20 
0,15 
0,5 
8.66,0 
17.32,5`