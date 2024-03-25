import type { GeneralData } from "~/utils"

export default function useRatings() {

  const getTheTwoBiggest = (array: number[]) => array.reduce((acc, item) => {
    if (item > acc[0]) {
      acc[1] = acc[0]
      acc[0] = item
    } else if (item > acc[1] || typeof acc[1] === 'undefined') {
      acc[1] = item
    }
    return acc
  }, [-Infinity, -Infinity]) // Inicialize os dois maiores valores com -Infinity

  const rating = (advanced_stats: GeneralData['advanced_stats']) => {
    const baseArr: number[] = [advanced_stats.stats_averages.intelligence, advanced_stats.stats_averages.power, advanced_stats.stats_averages.charisma, advanced_stats.stats_averages.politics, advanced_stats.stats_averages.lead]
    const twoBig = getTheTwoBiggest(baseArr)
    const sum = twoBig.reduce((acc, curr) => acc + curr, 0)
    return Math.ceil(sum / 2)
  }

  return {
    rating
  }
}
