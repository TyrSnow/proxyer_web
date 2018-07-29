export interface CommandAction {
  type: Symbol
  name: string
  handler: any
  payload: any
}