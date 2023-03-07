import React from 'react'

export const Logo = ({style, routeImg, altText}) => {
  return (
    <img className={style} src={routeImg} alt={altText} />
  )
}
