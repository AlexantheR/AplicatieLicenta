import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart } from 'chart.js';
import { CategoryScale, LinearScale, Title, BarElement } from 'chart.js';
import 'chartjs-plugin-datalabels';

Chart.register(CategoryScale, LinearScale, Title, BarElement);

export default function Graph({ orders = [] }) {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        if (orders.length > 0) {
            const monthlySoldItems = calculateMonthlySoldItems(orders);
            const chartData = prepareChartData(monthlySoldItems);
            const options = prepareChartOptions(monthlySoldItems);
            setChartData({ data: chartData, options: options });
        }
    }, [orders]);

    const calculateMonthlySoldItems = (orders) => {
        const monthlySoldItems = {
            Ianuarie: 0,
            Februarie: 0,
            Martie: 0,
            Aprilie: 0,
            Mai: 0,
            Iunie: 0,
            Iulie: 0,
            August: 0,
            Septembrie: 0,
            Octombrie: 0,
            Noiembrie: 0,
            Decembrie: 0,
        };

        orders.forEach((order) => {
            const month = new Date(order.createdAt).getMonth();
            const orderItems = order.orderItems;

            orderItems.forEach((item) => {
                monthlySoldItems[Object.keys(monthlySoldItems)[month]] += item.price;
            });
        });

        console.log(monthlySoldItems);
        return monthlySoldItems;
    };

    const prepareChartData = (monthlySoldItems) => {
        const labels = Object.keys(monthlySoldItems);
        const data = Object.values(monthlySoldItems);

        const dataset = {
            label: 'Cumulated Price',
            backgroundColor: '#e74646',
            borderColor: 'rgba(0, 0, 0, 1)',
            borderWidth: 2,
            data: data,
        };

        const chartData = {
            labels: labels,
            datasets: [dataset],
        };

        return chartData;
    };

    const prepareChartOptions = (monthlySoldItems) => {
        const options = {
            plugins: {
                datalabels: {
                    anchor: 'end',
                    align: 'end',
                    color: 'black',
                    formatter: (value, context) => {
                        const datasetIndex = context.datasetIndex;
                        const dataIndex = context.dataIndex;
                        const dataset = context.chart.data.datasets[datasetIndex];
                        const label = dataset.label;
                        const orderItemName = Object.keys(monthlySoldItems)[dataIndex];
                        return `${orderItemName}: ${value.toFixed(2)}`; // Display the value with two decimal places
                    },
                },
            },
            maintainAspectRatio: false,
            responsive: true,
            scales: {
                x: {
                    grid: {
                        display: false,
                    },
                    ticks: {
                        font: {
                            size: 12,
                        },
                    },
                },
                y: {
                    grid: {
                        color: '#e0e0e0',
                    },
                    ticks: {
                        font: {
                            size: 12,
                        },
                        maxTicksLimit: 10, // Adjust the number of ticks displayed on the y-axis
                    },
                },
            },
            tooltips: {
                displayColors: false,
                titleFont: {
                    size: 14,
                    weight: 'bold',
                },
                bodyFont: {
                    size: 12,
                },
                callbacks: {
                    label: (context) => {
                        const datasetIndex = context.datasetIndex;
                        const dataIndex = context.dataIndex;
                        const dataset = context.chart.data.datasets[datasetIndex];
                        const label = dataset.label;
                        const orderItemName = Object.keys(monthlySoldItems)[dataIndex];
                        const value = dataset.data[dataIndex];
                        return `${orderItemName}: $${value.toFixed(2)}`; // Display the value with two decimal places and prefix with $
                    },
                },
            },
        };

        return options;
    };

    return (
        <div>
            {chartData && <Bar data={chartData.data} options={chartData.options} />}
        </div>
    );
}
