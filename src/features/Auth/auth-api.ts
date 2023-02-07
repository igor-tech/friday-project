import { instanceHeroku } from '../../common'

interface ForgotPasswordReqType {
  email: string
  from: string
  message: string
}
interface ForgotPasswordResType {
  data: {
    success: boolean
  }
  error?: string
}

interface SetNewPasswordResType {
  info: string
  error: string
}

export interface SetNewPasswordReqType {
  password: string
  resetPasswordToken: string
}

export const AUTH_RESET = {
  forgotPassword(request: ForgotPasswordReqType) {
    return instanceHeroku.post('/auth/forgot', request)
  },
  setNewPassword(request: SetNewPasswordReqType) {
    return instanceHeroku.post<SetNewPasswordResType>('/auth/set-new-password', request)
  },
}
