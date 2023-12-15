export type PopupPosition = 'top' | 'left' | 'bottom' | 'right' | 'center' | ''
export type PopupCloseIconPosition =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'

export interface PopupProps {
  show: boolean
  zIndex?: number | string
  overlay: boolean
  teleport?: TeleportProps['to']
  lockScroll: boolean
  beforeClose?: Interceptor
  popupClass?: string
  overlayClass?: string
  transitionAppear: boolean
  closeOnClickOverlay: boolean

  position: PopupPosition
  closeable: boolean
  closeOnPopstate: boolean
  // closeIconPosition: PopupCloseIconPosition
}

export interface PopupEmits {
  (e: 'open'): void
  (e: 'close'): void
  (e: 'opened'): void
  (e: 'closed'): void
  (e: 'keydown', event: KeyboardEvent): void
  (e: 'update:show', show: boolean): void
  (e: 'clickOverlay', event: MouseEvent): void
  (e: 'clickCloseIcon', event: MouseEvent): void
}

export type Interceptor = (
  ...args: any[]
) => Promise<boolean> | boolean | undefined | void
