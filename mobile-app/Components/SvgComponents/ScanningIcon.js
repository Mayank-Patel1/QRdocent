import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ScanningIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-scan"
      width={100}
      height={100}
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="#2c3e50"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <Path d="M0 0h24v24H0z" stroke="none" />
      <Path d="M4 7V6a2 2 0 012-2h2M4 17v1a2 2 0 002 2h2M16 4h2a2 2 0 012 2v1M16 20h2a2 2 0 002-2v-1" stroke="white"/>
      <Path d="M5 12L19 12"  stroke={props.home ? "white":"none"} />
      {props.children}
    </Svg>
  )
}

export default ScanningIcon;
