import * as React from "react"
import Svg, { Path, Circle } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-info-circle"
      width={55}
      height={55}
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="white"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <Path d="M0 0h24v24H0z" stroke="none" />
      <Circle cx={12} cy={12} r={9} />
      <Path d="M12 8L12.01 8" />
      <Path d="M11 12L12 12 12 16 13 16" />
    </Svg>
  )
}

export default SvgComponent
