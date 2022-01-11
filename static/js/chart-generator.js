function getChartBlock(width=null, height=null) {
    let parser = new DOMParser();
    const chartBlock = `
      <div class="pt-3 pr-4 pl-4 entry">
        <div class="card h-100">
          <div class="card-body p-0">
            <div class="chart-block" style="width: ${width ?? 430}px;height:${height ?? 285}px;"></div>
          </div>
        </div>
      </div>`;


    var doc = parser.parseFromString(chartBlock, 'text/html');
    return doc.body.firstChild;
}

function generateBarChart(title, labels, xLabel, data) {
    let itemStyle = {
        barBorderRadius: [6, 6, 0, 0],
    };
    let barMaxWidth = 24;

    let series = [];

    let widthChartPx = 0;
    // create series from labels and data
    for (let i=0; i < labels.length; i++) {
        widthChartPx += labels[i].length
        series.push(
            {
                name: labels[i],
                type: 'bar',
                data: data[i],
                itemStyle: itemStyle,
                barMaxWidth: barMaxWidth
            }
        );
    }

    // Initialize the echarts instance based on the prepared dom
    let chart = getChartBlock(widthChartPx * 9);
    var myChart = echarts.init(chart.getElementsByClassName('chart-block')[0], 'echarts.config', { renderer: 'svg' });

    // Specify the configuration items and data for the chart
    var option = {

        textStyle: {
            align: "center",
            fontSize: 12,
            fontFamily: 'quicksand',
            fontWeight: 600,
            lineHeight: 24
        },

        title: {
            top: '5%',
            left: 'center',
            textStyle: {
                fontSize: 16,
                fontWeight: 600
            },
            text: title,
            // subtext: 'Subtitle'
        },
        tooltip: {},
        legend: {
            itemHeight: 12,
            itemWidth: 12,
            bottom: '3%',
            //itemGap: '1%',
            data: labels
        },
        xAxis: {
            //type: 'category',
            data: [xLabel],
            axisTick: {
                alignWithLabel: true,
                show: false
            },
        },
        yAxis: {
            splitLine: {
                lineStyle: {
                    type: [7, 5],
                    dashOffset: 3
                }
            },
            type: 'value',
        },
        series: series
    };

    // Display the chart using the configuration items and data just specified.
    myChart.setOption(option);

    return chart;
}