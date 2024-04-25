export const useNumberFormatter = () => {
  const formatNumber = (num: number) => {
    const billion = 1e9 // 10^9
    const million = 1e6 // 10^6
    const thousand = 1e3 // 10^3

    if (num >= billion) {
      return (num / billion).toFixed(1).replace(/\.0$/, '') + 'b'
    }

    if (num >= million) {
      return (num / million).toFixed(1).replace(/\.0$/, '') + 'm'
    }

    if (num >= thousand) {
      return (num / thousand).toFixed(1).replace(/\.0$/, '') + 'k'
    }
    return num.toString()
  }

  return { formatNumber }
}
