import { useEffect } from "react";
import Highcharts from 'highcharts';

require('highcharts/modules/item-series')(Highcharts);

let target;
const Parliament = (props) => {
    const { InnerSize, data, rows } = props;
    useEffect(() => {
        if (!target) {
            target = Highcharts.chart('container', {
                chart: {
                    type: 'item'
                },
                title: {
                    text: '의석수'
                },
                legend: {
                    labelFormat: '{name} <span style="opacity: 0.4">{y}</span>'
                },
                credits: {
                    enabled: false,
                },
                series: [{
                    name: '의석수',
                    keys: ['name', 'y', 'color', 'label'],
                    data: data,
                    dataLabels: {
                        enabled: true,
                        format: '{point.label}'
                    },
                    InnerSize: `${InnerSize}'%`,
                    // Circular options
                    center: ['50%', '88%'],
                    size: '170%',
                    startAngle: -100,
                    endAngle: 100
                }]
            });
        } else {
            target.series[0].update({
                data: data,
                rows: Number(rows),
                innerSize: `${InnerSize}'%`
            });
        }
    }, [props]);
    useEffect(() => {
        return () => {
            target.destroy();
            target = null;
        }   
    }, [])

    return (
        <div id="container"></div>
    );
}

export {
    Parliament 
}