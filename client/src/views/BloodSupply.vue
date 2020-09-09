<template>
  <div class="charts">
    <h3>Broj donacija po krvnoj grupi u 2020. godini i 2019. godini</h3>
    <bar-chart></bar-chart>
    <br>
    <h3>Usporedba broja svih darivatelja po krvnoj grupni</h3>
    <pie-chart></pie-chart>
    <h3>Ukupan broj donacija po godinama</h3>
    <line-chart></line-chart>
  </div>
</template>

<script>
import BarChart from '@/components/BarChart'
import PieChart from '@/components/PieChart'
import LineChart from '@/components/LineChart'

export default {
  components: {
    BarChart,
    PieChart,
    LineChart
  }
}
</script>

<style>
.charts {
  min-height: 1000px;
  width: 80%;
  margin: 0 auto;
  margin-top: 30px;
}
</style>