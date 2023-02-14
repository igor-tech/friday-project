import React from 'react'

import downIcon from './images/arrowDown.svg'
import upIcon from './images/arrowUp.svg'
import noneIcon from './images/noneIcon.svg'

export type SuperSortPropsType = {
  id?: string
  sort: string
  value: string
  onChange: (newSort: string) => void
}

const pureChange = (sort: string, down: string, up: string) => {
  let sortArr = sort.split('')

  if (sortArr.length === 0 || sortArr[1] !== down.split('')[1]) {
    return down
  }
  if (sortArr[0] === '1') {
    return up
  }

  return ''
}

const SuperSort: React.FC<SuperSortPropsType> = ({ sort, value, onChange, id = 'hw15' }) => {
  const up = '0' + value
  const down = '1' + value

  const onChangeCallback = () => {
    onChange(pureChange(sort, down, up))
  }

  // eslint-disable-next-line no-nested-ternary
  const icon = sort === down ? downIcon : sort === up ? upIcon : noneIcon

  return (
    <span id={id + '-sort-' + value} onClick={onChangeCallback}>
      <img id={id + '-icon-' + sort} src={icon} alt={value} />
    </span>
  )
}

export default SuperSort
