function groupBy<T>(
  array: Array<T>,
  key: string,
  callback?: (index: unknown) => string,
): { [key: string]: Array<T> } {
  return array.reduce(
    (accumulator, item) => {
      const index = (callback)
        ? callback(item[key])
        : item[key]

      if (!accumulator[index]) {
        accumulator[index] = []
      }

      accumulator[index].push(item)

      return accumulator
    },
    {},
  )
}

export default groupBy