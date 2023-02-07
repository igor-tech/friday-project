import { useState } from 'react'

export const useShowPassword = () => {
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword(show => !show)

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault()
  }

  return {
    showPassword,
    handleMouseDownPassword,
    handleClickShowPassword,
  }
}
