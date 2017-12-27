<template>
  <div id="index-wrapper" v-loading="loading">
    <div class="site-general-wrapper">
      <div class="site-general purple">
        <div class="info-intro">
          <div class="info-intro">
            <ul class="info-list">
              <li>总文件数：{{header.total_count_all }}</li>
              <li>总文件大小：{{header.total_size_all | bytesToSize}}</li>
            </ul>
            <span class="bg"></span>
          </div>
        </div>
        <p class="general-title">文件总览</p>
      </div>
      <div class="site-general blue">
        <div class="info-intro">
          <div class="info-intro">
            <ul class="info-list">
              <li>本周上传文件：{{header.upload_count_week}}</li>
              <li>本月上传文件：{{header.upload_count_month}}</li>
            </ul>
            <span class="bg"></span>
          </div>
        </div>
        <p class="general-title">文件上传</p>
      </div>
      <div class="site-general green">
        <div class="info-intro">
          <div class="info-intro">
            <ul class="info-list">
              <li>本周下发文件：{{header.issued_count_week}}</li>
              <li>本月下发文件：{{header.issued_count_month}}</li>
            </ul>
            <span class="bg"></span>
          </div>
        </div>
        <p class="general-title">文件下发</p>
      </div>
      <div class="site-general orange">
        <div class="info-intro">
          <div class="info-intro">
            <ul class="info-list">
              <li>本周分享文件：{{header.share_count_week}}</li>
              <li>本月分享文件：{{header.share_count_month}}</li>
            </ul>
            <span class="bg"></span>
          </div>
        </div>
        <p class="general-title">监区分享</p>
      </div>
    </div>
    <div class="charts-wrapper">
      <div id="pieChartWrapper">
        <div id="pieChart" ></div>
      </div>
      <div id="barChartWrapper">
        <div id="barChart"></div>
      </div>
    </div>
    <el-table :data="recent_upload_list" style="width: 100%" class="latest-statistics">
      <el-table-column prop="name" label="名称" >
      </el-table-column>
      <el-table-column prop="updatetime" label="日期" >
      </el-table-column>
      <el-table-column prop="size" label="大小">
        <template slot-scope="scope">
          <div>{{scope.row.size | bytesToSize}}</div>
        </template>
      </el-table-column>
      <el-table-column  label="内容">
        <template slot-scope="scope">
          <div>上传</div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      
        header: {},
        pie:[],
        bar_list:{},
        bar_series:[],
        showPie:false,
        recent_upload_list:[],
        loading:false,
      }
    },
    methods: {
      drawCharts() {
        var vm = this;
        // if(!vm.pie.length){
        //   $("#pieChartWrapper").css("display","none")
        // }
        let chart1 = this.$echarts.init(document.getElementById('pieChart'))
        // 绘制图表
        var option1 = {
          title: {
            text: '当前资源数量比重',
            x: 'center',
            textStyle: {
              fontSize: "16",
              fontWeight: "normal",
              color: "#ddd"
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          color: ['#99dbca','#ecabd2','#ffc0cb','#da726d','#50acdb','#749f83','#ca8622','#c4ccd3','#6e7074', '#5196db','#bda29a', '#546570','#85c690', '#f4e569', '#f29422',],
          series: [{
            name: '资源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: vm.pie,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }]
        };
        chart1.setOption(option1);
        let chart2 = this.$echarts.init(document.getElementById('barChart'));

        var option2 = {
          color: ['#ffc0cb', '#50acdb', '#e4ad64'],
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          title: {
            text: '上传下发分享统计',
            x: 'center',
            textStyle: {
              fontSize: "16",
              fontWeight: "normal",
              color: "#ddd"
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          legend: {
            data: ['上传', '下发', '分享'],
            padding: [20, 10],
            left: 'right',
          },
          xAxis: [{
            type: 'category',
            data:vm.bar_list.bar_x,
            axisTick: {
              alignWithLabel: true
            }
          }],
          yAxis: [{
            type: 'value',
            minInterval: 1,
            axisLabel: {
              formatter: '{value} 个'
            }
          }],
          series:vm.bar_series
          
        };
        chart2.setOption(option2);
        window.onresize = function() {
          setTimeout(() => {
            chart1.resize();
          }, 300)
          chart2.resize();
        }
      }
    },
    mounted() {
     
    },
    created() {
      var vm = this;
      let params = {
        data: {},
        successFn(res) {
          vm.loading = false;
          var data = res.info;
          vm.header = data.hearder;
          vm.pie = data.pie;
          if(vm.pie.length){
            vm.showPie = true;
          }else{
            vm.showPie = false;
          }
          var graph = data.graph;
          let bar_x = [];
          for(let i=0;i<graph.graph_x.length;i++){
            bar_x.push('第'+graph.graph_x[i].time_str+'周');
          }
          vm.bar_list.bar_x = bar_x;
          const type = 'bar';
          var graph_upload_list = graph.graph_upload_list;
          var graph_issued_list = graph.graph_issued_list;
          var graph_share_list = graph.graph_share_list;

          var bar_series = [];
          var uploadObj = {};
          uploadObj.name = '上传';
          uploadObj.data = graph_upload_list;
          uploadObj.type = type;
          bar_series.push(uploadObj);

          var issuedObj = {};
          issuedObj.name = '下发';
          issuedObj.data = graph_issued_list;
          issuedObj.type = type;
          bar_series.push(issuedObj);

          var shareObj = {};
          shareObj.name = '分享';
          shareObj.data = graph_share_list;
          shareObj.type = type;
          bar_series.push(shareObj);
          vm.bar_series = bar_series;
          vm.recent_upload_list = data.recent_upload_list;
          vm.drawCharts();
          
        }
      };
      this.$store.dispatch("getIndexshow", params);
    },
    filters: {
      bytesToSize(bytes) {
        if (bytes === 0 || bytes === null || !bytes) return '0 B';
        var k = 1024;
        var sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        var i = Math.floor(Math.log(bytes) / Math.log(k));
        return (bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i];
        //后面保留一位小数，如1.0GB                                                                                                                  //return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
      }
    },
  }
</script>

<style>

</style>
