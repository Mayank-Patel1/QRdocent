import * as React from "react"

function InfoButton(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="prefix__icon prefix__icon-tabler prefix__icon-tabler-info-circle"
      width={44}
      height={44}
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="#fff"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M0 0h24v24H0z" stroke="none" />
      <circle cx={12} cy={12} r={9} />
      <path d="M12 8h.01M11 12h1v4h1" />
    </svg>
  )
}

export default InfoButton
