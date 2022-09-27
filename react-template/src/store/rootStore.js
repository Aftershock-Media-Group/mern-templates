import axios from 'axios'
import { makeAutoObservable } from 'mobx'
import { createContext, useContext } from 'react'
import { API_URL, TOKEN_NAME, URL } from '../constants/url'
import { User } from './classes/User'
import { UIStore } from './uiStore'

export class RootStore {
  token = ''
  /**
   * @type {User}
   */
  user = null
  /**
   * @type {UIStore}
   */
  uiStore = null
  toast = null
  constructor() {
    makeAutoObservable(this)
    this.uiStore = new UIStore(this)
  }

  /**
   * @type {User}
   */
  user = null

  showToast = (
    title,
    description = '',
    status = 'info',
    duration = 5000,
    isClosable = true
  ) => {
    this.toast?.({
      title,
      description,
      status,
      duration,
      isClosable,
    })
  }

  get isLoggedIn() {
    return this.user !== null
  }

  get = async () => {
    const result = await this.HTTP('user/get', {}, false)
    this.user = new User(result.user, this)
  }

  checkLogin = async () => {
    if (localStorage.getItem(TOKEN_NAME)) {
      this.token = localStorage.getItem(TOKEN_NAME)
      await this.get()
      return true
    }
    return false
  }

  handleLogin = async (token) => {
    this.token = token
    localStorage.setItem(TOKEN_NAME, token)
    await this.get()
  }

  /* #region  HTTP Methods */
  HTTP = async (endpoint, data = {}, post = true) => {
    const config = this._getHeaders()
    if (!config) return
    let response = {}
    try {
      if (post) response = await axios.post(API_URL + endpoint, data, config)
      else response = await axios.get(API_URL + endpoint, config)
      return response?.data
    } catch (err) {
      this._handleError(err)
      return null
    }
  }

  POST_NO_AUTH = async (endpoint, data) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const response = await axios
      .post(URL + endpoint, data, config)
      .catch(this._handleError)
    return response?.data
  }

  _handleError = (err) => {
    console.error(err.response)

    this.showToast(
      err?.response?.data || 'Something went wrong, please try again.',
      null,
      'error',
      7000,
      true
    )
  }

  _getHeaders = () => {
    if (!this.token) return null
    return {
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
    }
  }
  /* #endregion */
}

export const RootStoreInstance = new RootStore()

const RootStoreContext = createContext(RootStoreInstance)

export const useStores = () => useContext(RootStoreContext)

export const useUIStore = () => {
  const { uiStore } = useStores()
  return uiStore
}
