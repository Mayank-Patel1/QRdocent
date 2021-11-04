import * as React from "react"
import Svg, { Path, Circle } from "react-native-svg"

function MusicIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-music"
      width={30}
      height={30}
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="white"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <Path d="M0 0h24v24H0z" stroke="none" />
      <Circle cx={6} cy={17} r={3} />
      <Circle cx={16} cy={17} r={3} />
      <Path d="M9 17L9 4 19 4 19 17" />
      <Path d="M9 8L19 8" />
    </Svg>
  )
}

export default MusicIcon
