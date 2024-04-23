export default function useRadarGraph() {

  const chartOptions = ref({
    chart: {
      height: 120,
      width: 120,
      type: 'radar',
      toolbar: {
        show: false
      },
    },
    dataLabels: {
      enabled: true,
      background: {
        enabled: true,
        borderRadius: 2,
      }
    },
    xaxis: {
      categories: ['intl', 'cha', 'power', 'lead', 'pol']
    },
    yaxis: {
      show: false
    }
  })

  const series = ref<{ name: string, data: number[] }[]>([{
    name: 'Stats',
    data: [],
  }])

  return {
    chartOptions,
    series
  }
}