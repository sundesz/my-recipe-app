export const capitalize = (text: string) =>
  `${text.charAt(0).toUpperCase()}${text.substring(1)}`

export const replaceLineBreaks = (text: string) =>
  text.replace(/(?:\\r\\n|\\r|\\n)/g, '<br>')
