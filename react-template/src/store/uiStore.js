import { makeAutoObservable } from 'mobx'
// eslint-disable-next-line no-unused-vars
import { RootStore } from './rootStore'

export class UIStore {
  theme = 'dark'
  /**
   * @type {RootStore}
   */
  root = null
  /**
   * @type {('production'|'streamer')}
   */
  view = 'production'

  dialog = ''

  assetData = {
    type: this.createAsset,
    title: '',
    status: 0,
    description: '',
    color: '',
    event: this.selectedEventId,
  }

  createAsset = ''
  editAssetId = ''

  addBlockLoading = false

  get selectedEvent() {
    return this.root.events.get(this.selectedEventId)
  }

  constructor(root) {
    makeAutoObservable(this)
    this.root = root
  }
}
