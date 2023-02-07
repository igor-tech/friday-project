import { Routes, Route } from 'react-router-dom'

import { PATH } from '../../common'
import { CheckEmail } from '../../features/Auth/RecoveryPasswordForms/CheckEmail/CheckEmail'
import { NewPassword } from '../../features/Auth/RecoveryPasswordForms/NewPassword/NewPassword'
import { PasswordRecoveryForm } from '../../features/Auth/RecoveryPasswordForms/RecoveryPassword/PasswordRecoveryForm'

export const Pages = () => {
  return (
    <Routes>
      <Route path={'/'} element={<PasswordRecoveryForm />} />
      <Route path={PATH.LOGIN} element={<h1>login</h1>} />
      <Route path={PATH.REGISTRATION} element={<h1>registration</h1>} />
      <Route path={PATH.PASSWORD_RECOVERY} element={<PasswordRecoveryForm />} />
      <Route path={PATH.CHECK_EMAIL} element={<CheckEmail />} />
      <Route path={PATH.NEW_PASSWORD} element={<NewPassword />} />
      <Route path={PATH.ERROR} element={<h1>error</h1>} />
    </Routes>
  )
}
