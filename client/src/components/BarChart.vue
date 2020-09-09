<script>
  import { Bar } from 'vue-chartjs'
  import { mapActions, mapGetters } from "vuex";
  import moment from 'moment';
  export default {
    extends: Bar,
    data() {
      return {
        list: [],
        filtered2020: [],
        filtered2019: [],
        chartData: {
          labels: ["0+", "A+", "B+", "AB+", "0-", "A-", "B-", "AB-"],
          datasets: [{
            label: '2020.',
            borderWidth: 1,
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
            pointBorderColor: '#2554FF',
            data: [2, 3, 3, 5, 2, 3, 2, 1]
          },
          {
            label: '2019.',
            borderWidth: 1,
            backgroundColor: [
              'rgba(255, 99, 132, 0.7)',
              'rgba(54, 162, 235, 0.7)',
              'rgba(255, 206, 86, 0.7)',
              'rgba(75, 192, 192, 0.7)',
              'rgba(153, 102, 255, 0.7)',
              'rgba(255, 159, 64, 0.7)',
              'rgba(255, 145, 169, 0.7)',
              'rgba(4, 123, 204, 0.7)',
            ],
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
            pointBorderColor: '#2554FF',
            data: [0, 0, 0, 0, 0, 0, 0, 0]
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }],
            xAxes: [{
              gridLines: {
                display: false
              }
            }]
          },
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
      countByYear() {
        
        var startDate = moment("01/01/2020", "DD/MM/YYYY");
        var endDate = moment("31/12/2020", "DD/MM/YYYY");
        this.filtered2020 = this.list.filter(function(result) { 
          return moment(result.donationDate[0]).isBetween(startDate, endDate) ||
          moment(result.donationDate[1]).isBetween(startDate, endDate) ||
          moment(result.donationDate[2]).isBetween(startDate, endDate) ||
          moment(result.donationDate[3]).isBetween(startDate, endDate) ||
          moment(result.donationDate[4]).isBetween(startDate, endDate);  
        });
        var startDate2 = moment("01/01/2019", "DD/MM/YYYY");
        var endDate2 = moment("31/12/2019", "DD/MM/YYYY");
        this.filtered2019 = this.list.filter(function(result) { 
          return moment(result.donationDate[0]).isBetween(startDate2, endDate2) ||
          moment(result.donationDate[1]).isBetween(startDate2, endDate2) ||
          moment(result.donationDate[2]).isBetween(startDate2, endDate2) ||
          moment(result.donationDate[3]).isBetween(startDate2, endDate2) ||
          moment(result.donationDate[4]).isBetween(startDate2, endDate2); 
        });

        this.counting("0+","0")
        this.counting("A+","1")
        this.counting("B+","2")
        this.counting("AB+","3")
        this.counting("0-","4")
        this.counting("A-","5")
        this.counting("B-","6")
        this.counting("AB-","7")
      },
      counting(group, place) {
        var count = 0;
        for(var i=0; i<this.filtered2020.length;i++) {
          if(this.filtered2020[i].bloodgroup == group) {
            count = count + 1;
          }
          this.chartData.datasets[0].data[place] = count
        }
        var count2 = 0;
        for(var j=0; j<this.filtered2019.length;j++) {
          if(this.filtered2019[j].bloodgroup == group) {
            count2 = count2 + 1;
          }
          this.chartData.datasets[1].data[place] = count2
        }
      }
    },
    created() {
      this.getUsers().then(res => {
        if (res.data.success) {       
          this.list = res.data.users
          this.list.shift()

          this.countByYear()
          this.renderChart(this.chartData, this.options)
        }
      })
      
    }
  }
</script>