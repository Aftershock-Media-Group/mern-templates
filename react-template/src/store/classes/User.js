import { makeAutoObservable } from 'mobx'
// eslint-disable-next-line no-unused-vars
import { RootStore } from '../rootStore'

export class User {
  id = ''
  name = ''
  email = ''
  role = 0

  /**
   * @type {RootStore}
   */
  root = null
  constructor(data, root) {
    makeAutoObservable(this)
    this.root = root
    this.id = data?.id
    this.name = data.name
    this.email = data.email
    this.role = data.role
  }
}
