import * as React from "react"
import Svg, { Path } from "react-native-svg"

function TrashIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-trash"
      width={38}
      height={38}
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="#ff5252"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <Path d="M0 0h24v24H0z" stroke="none" />
      <Path d="M4 7L20 7" />
      <Path d="M10 11L10 17" />
      <Path d="M14 11L14 17" />
      <Path d="M5 7l1 12a2 2 0 002 2h8a2 2 0 002-2l1-12M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3" />
    </Svg>
  )
}

export default TrashIcon