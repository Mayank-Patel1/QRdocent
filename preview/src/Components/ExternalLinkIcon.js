import React from "react"


function ExternalLinkIcon(props) {
  return (
    <svg
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
      <path d="M0 0h24v24H0z" stroke="none" />
      <path d="M11 7H6a2 2 0 00-2 2v9a2 2 0 002 2h9a2 2 0 002-2v-5" />
      <path d="M10 14L20 4" />
      <path d="M15 4L20 4 20 9" />
    </svg>
  )
}

export default ExternalLinkIcon
