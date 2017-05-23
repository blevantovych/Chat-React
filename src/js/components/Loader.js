import styles from './loader.scss'
import React from 'react'

console.log('Styles ', styles)

const Loader = ({ active }) => {
  console.log("Loader ", active)
  return (
    <div class={ active ? 'loader-wrapper' : 'hidden' }>
      <div class="loader" />
    </div>
  )
}

export default Loader
