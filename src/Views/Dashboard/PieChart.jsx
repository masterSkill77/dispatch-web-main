import ReactApexChart from "react-apexcharts"
import { useState } from "react"

const PieChart = ( {width, height} ) => {
    const [state, setState] = useState ({
        
        series: [44, 55, 13],
        options: {
        chart: {
            width: 380,
            type: 'pie',
        },
        labels: ['Team A', 'Team B', 'Team C'],
        responsive: [{
            breakpoint: 480,
            options: {
            chart: {
                width: 200
            },
            legend: {
                position: 'bottom'
            }
            }
        }]
        },
    
    
    })
    return (
        <div id="chart">
            <ReactApexChart options={state.options} series={state.series} type="pie" height={height} width={width} />
        </div>
    )
}

export default PieChart