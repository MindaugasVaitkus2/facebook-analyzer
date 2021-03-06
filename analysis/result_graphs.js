function daterize(data){
  new_data = [];
  $.each(data, function(date, value) {
    new_data.push([Date.parse(value[0]), value[1]]);
  });

  return new_data;
};
result_data.posts_year_data = daterize(result_data.posts_year_data)
result_data.posts_month_data = daterize(result_data.posts_month_data)
result_data.posts_data = daterize(result_data.posts_data)

var chart1;
var chart2;
var chart3;
var chart4;
var chart5;
Highcharts.setOptions({
  chart: {
     style: {
       fontFamily : '"Permanent Marker", arial, serif'
     }
  }
});

$(document).ready(function() {
   chart1 = new Highcharts.Chart({
      chart: {
         renderTo: 'posts_by_day',
         zoomType: 'x'
      },
       title: {
         text: 'Wall Posts per Day'
      },
       subtitle: {
         text: document.ontouchstart === undefined ?
            'Click and drag in the plot area to zoom in' :
            'Drag your finger over the plot to zoom in'
      },
      xAxis: {
         type: 'datetime',
         maxZoom: 14 * 24 * 3600000, // fourteen days
         title: {
            text: null
         }
      },
      yAxis: {
         title: {
            text: 'posts'
         },
         min: null,
         tickInterval: null,
         showFirstLabel: false
      },
      tooltip: {
         shared: true               
      },
      plotOptions: {
         area: {
            fillColor: {
               linearGradient: [0, 0, 0, 300],
               stops: [
                  [0, Highcharts.theme.colors[0]],
                  [1, 'rgba(2,0,0,0)']
               ]
            },
            lineWidth: 1,
            marker: {
               enabled: false,
               states: {
                  hover: {
                     enabled: true,
                     radius: 2
                  }
               }
            },
            shadow: false,
            states: {
               hover: {
                  lineWidth: 1
               }
            }
         }
      },
      series: [{
         type: 'area',
         name: 'Posts per Day',
         data: result_data.posts_data

      }]
   });

   chart4 = new Highcharts.Chart({
      chart: {
         renderTo: 'posts_month',
         zoomType: 'xy',
      },
       title: {
         text: 'Wall Posts by Month/Year'
      },
       subtitle: {
         text: document.ontouchstart === undefined ?
            'Click and drag in the plot area to zoom in' :
            'Drag your finger over the plot to zoom in'
      },
      xAxis: {
         type: 'datetime',
         maxZoom: 14 * 24 * 3600000, // fourteen days
         title: {
            text: null
         }
      },
      yAxis: [{
         title: {
            text: 'posts by month'
         },
         min: null,
         tickInterval: null,
         showFirstLabel: false
      }, {
         title: {
            text: 'posts by year'
         },
         min: null,
         tickInterval: null,
         showFirstLabel: false,
         opposite: true
     }],
      tooltip: {
         shared: true               
      },
      plotOptions: {
         area: {
            fillColor: {
               linearGradient: [0, 0, 0, 300],
               stops: [
                  [0, Highcharts.theme.colors[0]],
                  [1, 'rgba(2,0,0,0)']
               ]
            },
            lineWidth: 1,
            marker: {
               enabled: false,
               states: {
                  hover: {
                     enabled: true,
                     radius: 2
                  }
               }
            },
            shadow: false,
            states: {
               hover: {
                  lineWidth: 1
               }
            }
         }
      },
      series: [{
         type: 'column',
         name: 'Posts by year',
         yAxis: 1,
         data: result_data.posts_year_data
      }, {
        type: 'spline',
         name: 'Posts by month',
        data: result_data.posts_month_data}]
   });


   chart2 = new Highcharts.Chart({
      chart: {
         renderTo: 'word_pie',
         defaultSeriesType: 'column',
      },
      title: {
         text: 'Most common words in all wall posts and comments'
      },
      tooltip: {
         formatter: function() {
            return '<b>'+ this.point.name +'</b>: '+ this.y;
         }
      },
      xAxis: {
      },
      yAxis: {
        title : {
          text: 'Occurences of word'
        }
      },
       series: [{
         type: 'pie',
         name: 'Browser share',
         data: result_data.word_pie
      }]
   });

   chart3 = new Highcharts.Chart({
      chart: {
         renderTo: 'bad_word_pie',
         defaultSeriesType: 'column'
      },
      title: {
         text: 'Most swear words in all wall posts and comments'
      },
      tooltip: {
         formatter: function() {
            return '<b>'+ this.point.name +'</b>: '+ this.y;
         }
      },
      xAxis: {
      },
      yAxis: {
        title : {
          text: 'Occurences of word'
        }
      },
       series: [{
         type: 'pie',
         name: 'Browser share',
         data: result_data.bad_word_pie
      }]
   });

   chart5 = new Highcharts.Chart({
      chart: {
         renderTo: 'profile_pie',
      },
      title: {
         text: 'Most common profiles on wall (includes comments).'
      },
      tooltip: {
         formatter: function() {
            return '<b>'+ this.point.name +'</b>: '+ this.y;
         }
      },
      xAxis: {
      },
      yAxis: {
        title : {
          text: 'Occurences of profile name on wall.'
        }
      },
       series: [{
         type: 'pie',
         data: result_data.top_profile_pie
      }]
   });
});
