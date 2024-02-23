import { defaultsDeep } from 'lodash-es'
import type { RecursiveRequired, Settings } from '#/global'
import settingsDefault from '@/settings.default'

const globalSettings: Settings.all =
{
  "menu": {
    "menuMode": "single"
  },
  "app": {
    "enableDynamicTitle": true
  },
  "tabbar": {
    "enable": true
  }
}

export default defaultsDeep(globalSettings, settingsDefault) as RecursiveRequired<Settings.all>
