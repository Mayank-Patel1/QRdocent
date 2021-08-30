import * as React from "react"
import Svg, { Path, Circle } from "react-native-svg"

function OneIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-circle-1"
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
      <Path d="M12 16V8l-2 2" />
      <Circle cx={12} cy={12} r={9} />
    </Svg>
  )
}

function TwoIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-circle-2"
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
      <Path d="M10 10a2 2 0 114 0c0 .591-.417 1.318-.816 1.858L10 16.001 14 16" />
      <Circle cx={12} cy={12} r={9} />
    </Svg>
  )
}

function ThreeIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-circle-3"
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
      <Path d="M12 12a2 2 0 10-2-2M10 14a2 2 0 102-2" />
      <Circle cx={12} cy={12} r={9} />
    </Svg>
  )
}

function FourIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-circle-4"
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
      <Path d="M13 16V8l-4 6h5" />
      <Circle cx={12} cy={12} r={9} />
    </Svg>
  )
}

export  { OneIcon, TwoIcon, ThreeIcon, FourIcon };
