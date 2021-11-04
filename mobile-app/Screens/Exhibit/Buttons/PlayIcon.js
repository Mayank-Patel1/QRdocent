import * as React from "react"
import Svg, { Path } from "react-native-svg"

function PlayIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-player-play"
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
      <Path d="M7 4v16l13-8z" />
    </Svg>
  )
}

export default PlayIcon
