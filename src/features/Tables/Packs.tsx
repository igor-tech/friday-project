import React, { useEffect } from 'react'

import { useAppDispatch } from '../../common'

import { TablePacks } from './Table-packs/TablePacks'
import { getPacks } from './table-slice'

const Packs = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getPacks({}))
  }, [])

  return (
    <div>
      <TablePacks />
      {/*<TableCards />*/}
    </div>
  )
}

export default Packs
