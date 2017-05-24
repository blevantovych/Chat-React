import styles from './loader.scss'
import React from 'react'

const Loader = ({ active }) => {
  return (
    <div class={ active ? 'loader-wrapper' : 'hidden' }>
      <div class="loader"></div>
    </div>
  )
}

export default Loader
