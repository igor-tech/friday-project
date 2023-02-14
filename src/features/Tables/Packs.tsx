import React, { useEffect, useState } from 'react'

import { useSearchParams } from 'react-router-dom'

import { useAppDispatch } from '../../common'

import { TablePacks } from './Table-packs/TablePacks'
import { getPacks } from './table-slice'

const Packs = () => {
  const [sort, setSort] = useState('')
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(10)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getPacks({ sortPacks: sort, page: page, pageCount: count }))
  }, [sort, page, count])

  const onChangeSort = (newSort: string) => {
    // setSort(newSort)
    // sendQuery({sort: newSort, count: count, page: page})
    // setSearchParams({page: page.toString(), count: count.toString(), sort: newSort.toString()})
    setSort(sort)
    dispatch(getPacks({ sortPacks: newSort, page: page, pageCount: count }))
  }

  console.log(sort)

  return (
    <div>
      <TablePacks onChangeSort={onChangeSort} />
      {/*<TableCards />*/}
    </div>
  )
}

export default Packs
