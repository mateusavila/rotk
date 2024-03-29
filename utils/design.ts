export enum Size {
  "2xs" = "2xs",
  "xs" = "xs",
  "sm" = "sm",
  "md" = "md",
  "lg" = "lg",
  "xl" = "xl",
}

export type FieldType = 'textarea' | 'select' | 'checkbox' | 'radiogroup' | 'toggle' | 'range' | 'password' | 'number' | 'date' | 'email' | 'time' | 'text' | 'file' | 'upload' | 'money' | 'cardcheckbox' | 'divisor' | 'editor' | 'array'

export type FieldsComponentsChild = {
  type: FieldType
  id: string
  gridCards?: string
  gridItemClass?: string
  gridCardActive?: string
  options?: OptionsSelect[]
  multiple?: boolean
  icon?: string
  size?: Size
  ui?: any
  error?: boolean
  mask?: string
  label?: string
  placeholder?: string
  errorMessage?: string
  searchable?: boolean
  searchablePlaceholder?: string
  min?: number
  max?: number
  step?: number
  uploadClassComponent?: string
  uploadMessage?: string
  defaultImageValue?: string
  value: any
}

export type FieldsComponents = {
  type: FieldType
  id: string
  gridCards?: string
  gridItemClass?: string
  gridCardActive?: string
  options?: OptionsSelect[]
  multiple?: boolean
  icon?: string
  size?: Size
  ui?: any
  error?: boolean
  mask?: string
  label?: string
  placeholder?: string
  errorMessage?: string
  searchable?: boolean
  searchablePlaceholder?: string
  min?: number
  max?: number
  step?: number
  uploadClassComponent?: string
  uploadMessage?: string
  defaultImageValue?: string
  fields?: FieldsComponentsChild[] | any
}