<script>
  import { Pie } from 'vue-chartjs'
    import { mapActions, mapGetters } from "vuex";
  export default {
    extends: Pie,
    data () {
      return {
        lista: [],
        filters: [],
        chartData: {
          labels: ["0+", "A+", "B+", "AB+","0-","A-","B-","AB-"],
          datasets: [{
              borderWidth: 1,
              borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 145, 169, 1)',
              'rgba(4, 123, 204, 1)',           
              ],
              backgroundColor: [
              'rgba(255, 99, 132, 0.4)',
              'rgba(54, 162, 235, 0.4)',
              'rgba(255, 206, 86, 0.4)',
              'rgba(75, 192, 192, 0.4)',
              'rgba(153, 102, 255, 0.4)',
              'rgba(255, 159, 64, 0.4)',
              'rgba(255, 145, 169, 0.4)',
              'rgba(4, 123, 204, 0.4)',                
              ],
              data: [1000,	500,	1500,	1000]
            }]
        },
        options: {
          legend: {
            display: true
          },
          responsive: true,
          maintainAspectRatio: false
        }
      }
    },
    computed: mapGetters(["users"]),
    methods: {
      ...mapActions(["getUsers"]),
    countBloodgroups(group,place) {
        this.filters = this.lista.filter(function(result) {
            return result.bloodgroup === group
        })
        this.chartData.datasets[0].data[place] = this.filters.length
    }
    },
    created () {
        this.getUsers().then(res => {
            if (res.data.success) {       
                this.lista = res.data.users
                this.lista.shift()

                this.countBloodgroups("0+","0")
                this.countBloodgroups("A+","1")
                this.countBloodgroups("B+","2")
                this.countBloodgroups("AB+","3")
                this.countBloodgroups("0-","4")
                this.countBloodgroups("A-","5")
                this.countBloodgroups("B-","6")
                this.countBloodgroups("AB-","7")
                
                this.renderChart(this.chartData, this.options)
            }
        })
    }
  }
</script>