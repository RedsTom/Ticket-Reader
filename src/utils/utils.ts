export function copy (text: string) {
  if (navigator.clipboard && window.isSecureContext) {
    // navigator clipboard api method'
    return navigator.clipboard.writeText(text)
  } else {
    // text area method
    const textArea = document.createElement('textarea')
    textArea.value = text
    // make the textarea out of viewport
    textArea.style.position = 'fixed'
    textArea.style.left = '-999999px'
    textArea.style.top = '-999999px'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()

    document.execCommand('copy')
    textArea.remove()
  }
}

export function toColor (num: number): string {
  num >>>= 0
  const b = num & 0xFF
  const g = (num & 0xFF00) >>> 8
  const r = (num & 0xFF0000) >>> 16
  return 'rgba(' + [r, g, b, 255].join(',') + ')'
}
