import type { GeneralData } from "~/utils"

export default function useRatings() {

  const statsPerGame = [3, 3, 4, 5, 4, 4, 4, 5, 5]

  const limitDecimals = (number: number | null, decimals: number | undefined = 2): number | null => {
    if (typeof number !== "number") {
      return null
    }
    const exactNumber = (number * 10 ** decimals) % 10 === 0
    if (exactNumber) {
      return number
    }
    const numberString = number.toString()
    const [intNumber, partDecimal] = numberString.split(".")
    const limitedPartDecimal = partDecimal.substring(0, decimals)
    const partRounded = Math.ceil(parseFloat(limitedPartDecimal) * 100) / 100
    const formattedNumber = `${intNumber}.${partRounded}`
    return parseFloat(formattedNumber)
  }

  const getTheTwoBiggest = (array: (number | null)[]) => array.reduce((acc, item) => {
    if (item && item > acc[0]) {
      acc[1] = acc[0]
      acc[0] = item
    } else if (item && item > acc[1]) {
      acc[1] = item
    }
    return acc
  }, [-Infinity, -Infinity]) // Inicialize os dois maiores valores com -Infinity

  const rating = (advanced_stats: GeneralData['advanced_stats']) => {
    const baseArr: (number | null)[] = [advanced_stats.stats_averages.intelligence, advanced_stats.stats_averages.power, advanced_stats.stats_averages.charisma, advanced_stats.stats_averages.politics, advanced_stats.stats_averages.lead]
    const twoBig = getTheTwoBiggest(baseArr)
    const sum = twoBig.reduce((acc, curr) => acc + curr, 0)
    return Math.ceil(sum / 2)
  }

  const intArray = (stats: GeneralData['stats']): number[] => {
    const { rotk1, rotk2, rotk3, rotk4, rotk7, rotk8, rotk9, rotk10, rotk11 } = stats

    return [rotk1.intelligence, rotk2.intelligence, rotk3.intelligence, rotk4.intelligence, rotk7.intelligence, rotk8.intelligence, rotk9.intelligence, rotk10.intelligence, rotk11.intelligence].filter((item) => item && item) as number[]
  }

  const powArray = (stats: GeneralData['stats']): number[] => {
    const { rotk1, rotk2, rotk3, rotk4, rotk7, rotk8, rotk9, rotk10, rotk11 } = stats

    return [rotk1.power, rotk2.power, rotk3.power, rotk4.power, rotk7.power, rotk8.power, rotk9.power, rotk10.power, rotk11.power].filter((item) => item && item) as number[]
  }

  const chaArray = (stats: GeneralData['stats']): number[] => {
    const { rotk1, rotk2, rotk3, rotk4, rotk7, rotk8, rotk10, rotk11 } = stats

    return [rotk1.charisma, rotk2.charisma, rotk3.charisma, rotk4.charisma, rotk7.charisma, rotk8.charisma, rotk10.charisma, rotk11.charisma].filter((item) => item && item) as number[]
  }

  const leaArray = (stats: GeneralData['stats']): number[] => {
    const { rotk4, rotk9, rotk10, rotk11 } = stats

    return [rotk4.lead, rotk9.lead, rotk10.lead, rotk11.lead].filter((item) => item && item) as number[]
  }

  const polArray = (stats: GeneralData['stats']): number[] => {
    const { rotk3, rotk4, rotk7, rotk8, rotk9, rotk10, rotk11 } = stats

    return [rotk3.politics, rotk4.politics, rotk7.politics, rotk8.politics, rotk9.politics, rotk10.politics, rotk11.politics].filter((item) => item && item) as number[]
  }

  const calculateTotals = (stats: GeneralData['stats']) => {
    const rotk1 = stats.rotk1.active ? [stats.rotk1.intelligence, stats.rotk1.power, stats.rotk1.charisma].reduce((p, c) => +(p as number) + +(c as number), 0) : null
    const rotk2 = stats.rotk2.active ? [stats.rotk2.intelligence, stats.rotk2.power, stats.rotk2.charisma].reduce((p, c) => +(p as number) + +(c as number), 0) : null
    const rotk3 = stats.rotk3.active ? [stats.rotk3.intelligence, stats.rotk3.power, stats.rotk3.charisma, stats.rotk3.politics].reduce((p, c) => +(p as number) + +(c as number), 0) : null
    const rotk4 = stats.rotk4.active ? [stats.rotk4.intelligence, stats.rotk4.power, stats.rotk4.charisma, stats.rotk4.politics, stats.rotk4.lead].reduce((p, c) => +(p as number) + +(c as number), 0) : null
    const rotk7 = stats.rotk7.active ? [stats.rotk7.intelligence, stats.rotk7.power, stats.rotk7.charisma, stats.rotk7.politics].reduce((p, c) => +(p as number) + +(c as number), 0) : null
    const rotk8 = stats.rotk8.active ? [stats.rotk8.intelligence, stats.rotk8.power, stats.rotk8.charisma, stats.rotk8.politics].reduce((p, c) => +(p as number) + +(c as number), 0) : null
    const rotk9 = stats.rotk9.active ? [stats.rotk9.intelligence, stats.rotk9.power, stats.rotk9.lead, stats.rotk9.politics].reduce((p, c) => +(p as number) + +(c as number), 0) : null
    const rotk10 = stats.rotk10.active ? [stats.rotk10.intelligence, stats.rotk10.power, stats.rotk10.charisma, stats.rotk10.politics, stats.rotk10.lead].reduce((p, c) => +(p as number) + +(c as number), 0) : null
    const rotk11 = stats.rotk11.active ? [stats.rotk11.intelligence, stats.rotk11.power, stats.rotk11.charisma, stats.rotk11.politics, stats.rotk11.lead].reduce((p, c) => +(p as number) + +(c as number), 0) : null

    return [rotk1, rotk2, rotk3, rotk4, rotk7, rotk8, rotk9, rotk10, rotk11]
  }

  const calculateAverages = (stats: GeneralData['stats']) => calculateTotals(stats).map((game, index) => {
    if (!game) {
      return null
    }
    return limitDecimals(game / statsPerGame[index])
  })

  const intAverages = (stats: GeneralData['stats']) => intArray(stats).length ? limitDecimals(intArray(stats).reduce((p, c) => +(p as number) + +(c as number), 0) / intArray(stats).length) : null
  const powAverages = (stats: GeneralData['stats']) => powArray.length ? limitDecimals(powArray(stats).reduce((p, c) => +(p as number) + +(c as number), 0) / powArray(stats).length) : null
  const polAverages = (stats: GeneralData['stats']) => polArray(stats).length ? limitDecimals(polArray(stats).reduce((p, c) => +(p as number) + +(c as number), 0) / polArray(stats).length) : null
  const leaAverages = (stats: GeneralData['stats']) => leaArray(stats).length ? limitDecimals(leaArray(stats).reduce((p, c) => +(p as number) + +(c as number), 0) / leaArray(stats).length) : null
  const chaAverages = (stats: GeneralData['stats']) => chaArray(stats).length ? limitDecimals(chaArray(stats).reduce((p, c) => +(p as number) + +(c as number), 0) / chaArray(stats).length) : null

  const getMaxValue = (numbers: number[]) => Math.max(...numbers)
  const getMinValue = (numbers: (number | null)[]): number | undefined => {
    const filteredNumbers = numbers.filter((number) => number !== null)
    return filteredNumbers && filteredNumbers.length > 0 ? Math.min(...(filteredNumbers as number[])) : undefined
  }

  return {
    statsPerGame,
    getMinValue,
    getMaxValue,
    rating,
    calculateTotals,
    calculateAverages,
    intArray,
    powArray,
    leaArray,
    chaArray,
    polArray,
    intAverages,
    chaAverages,
    leaAverages,
    polAverages,
    powAverages
  }
}
