import { Routes, Route } from 'react-router-dom'

import { PATH } from '../../common'

export const Pages = () => {
  return (
    <Routes>
      <Route path={PATH.LOGIN} element={<h1>login</h1>} />
      <Route path={PATH.REGISTRATION} element={<h1>registration</h1>} />
      <Route path={PATH.PASSWORD_RECOVERY} element={<h1>password revodery</h1>} />
      <Route path={PATH.CHECK_EMAIL + '/:email'} element={<h1>check email</h1>} />
      <Route path={PATH.NEW_PASSWORD} element={<h1>new password</h1>} />
      <Route path={PATH.ERROR} element={<h1>error</h1>} />
    </Routes>
  )
}
