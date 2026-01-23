export interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

export interface DateFilterOption {
  label: string
  value: string
}

export interface ActionButton {
  label: string
  shortLabel?: string
  icon?: React.ReactNode
  onClick: () => void
}
