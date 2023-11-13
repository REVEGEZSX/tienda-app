import { createSlice } from '@reduxjs/toolkit'

const userAuthFromLocalStorage = () => {
  const isAuth = localStorage.getItem('isAuth')

  if (isAuth && JSON.parse(isAuth) === true) {
    return true
  }

  return false
}

const userRoleFromLocalStorage = () => {
  const userRole = localStorage.getItem('userRole')

  if (userRole) {
    return JSON.parse(userRole);
  }

  return null;
}


const initialState = {
  isAuth: userAuthFromLocalStorage(),
  userRole: userRoleFromLocalStorage(),
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticateUser: (state, action) => {
      state.isAuth = true; //<-- verifica la autenticacion del usuario que ingresa
      state.userRole = action.payload; //<--identifica que rol tiene el usuario que ingresa
    },
    unauthenticateUser: (state) => {
      state.isAuth = false
      state.userRole = null
    },
  },
})

export const { authenticateUser, unauthenticateUser } = authSlice.actions

export default authSlice.reducer