import * as React from "react";
import Svg, { Path, Rect } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      className="prefix__icon prefix__icon-tabler prefix__icon-tabler-brand-youtube"
      width={35}
      height={35}
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="white"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <Path d="M0 0h24v24H0z" stroke="none" />
      <Rect x={3} y={5} width={18} height={14} rx={4} />
      <Path d="M10 9l5 3-5 3z" />
    </Svg>
  )
}

export default SvgComponent