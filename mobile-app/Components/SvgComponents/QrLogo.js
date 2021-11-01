import * as React from "react"
import Svg, { Path, Rect } from "react-native-svg"

function QrLogo(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-qrcode"
      width={44}
      height={44}
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="white"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <Path d="M0 0h24v24H0z" stroke="none" />
      <Rect x={4} y={4} width={6} height={6} rx={1} />
      <Path d="M7 17L7 17.01" />
      <Rect x={14} y={4} width={6} height={6} rx={1} />
      <Path d="M7 7L7 7.01" />
      <Rect x={4} y={14} width={6} height={6} rx={1} />
      <Path d="M17 7L17 7.01" />
      <Path d="M14 14L17 14" />
      <Path d="M20 14L20 14.01" />
      <Path d="M14 14L14 17" />
      <Path d="M14 20L17 20" />
      <Path d="M17 17L20 17" />
      <Path d="M20 17L20 20" />
    </Svg>
  )
}

export default QrLogo