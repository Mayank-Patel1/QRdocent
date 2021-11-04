import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ExternalLinkIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-external-link"
      width={25}
      height={25}
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="white"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <Path d="M0 0h24v24H0z" stroke="none" />
      <Path d="M11 7H6a2 2 0 00-2 2v9a2 2 0 002 2h9a2 2 0 002-2v-5" />
      <Path d="M10 14L20 4" />
      <Path d="M15 4L20 4 20 9" />
    </Svg>
  )
}

export default ExternalLinkIcon
