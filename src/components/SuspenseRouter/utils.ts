// достаем endpoint без параметров
export const getPath = (text: string) => {
    if (text === '/') return text
    const result = text.match(/(^\/.[^/]*[^/])/gm)
    if (result && result[0]) return result[0]
    return ''
  }
