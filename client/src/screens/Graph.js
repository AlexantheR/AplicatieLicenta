import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { CategoryScale, LinearScale, Title, BarElement, ArcElement, Chart, Legend } from 'chart.js';
import 'chartjs-plugin-datalabels';

Chart.register(CategoryScale, LinearScale, Title, BarElement, ArcElement, Legend);

export default function Graph({ orders = [], users = [] }) {
    const [chartData, setChartData] = useState(null);
    const [totalAmount, setTotalAmount] = useState(0);
    const [pieChartData, setPieChartData] = useState(null);

    useEffect(() => {
        if (orders.length > 0) {
            const monthlySoldItems = calculateMonthlySoldItems(orders);
            const chartData = prepareChartData(monthlySoldItems);
            const options = prepareChartOptions(monthlySoldItems);
            const totalAmount = calculateTotalAmount(monthlySoldItems);
            setChartData({ data: chartData, options: options });
            setTotalAmount(totalAmount);
        }
    }, [orders]);

    useEffect(() => {
        if (users.length > 0) {
            calculateClientType(users);
        }
    }, [users]);

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

        return monthlySoldItems;
    };

    const prepareChartData = (monthlySoldItems) => {
        const labels = Object.keys(monthlySoldItems);
        const data = Object.values(monthlySoldItems);

        const dataset = {
            label: 'Total comenzi lunare',
            backgroundColor: 'rgb(0,0,205)',
            borderColor: 'rgba(0, 0, 191, 1)',
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
                        maxTicksLimit: 10,
                    },
                },
            },
            plugins: {
                legend: {
                    position: 'right',
                },
                tooltip: {
                    enabled: true,
                    titleAlign: 'center',
                    bodyAlign: 'center',
                    titleFont: {
                        size: 14,
                        weight: 'bold',
                    },
                    bodyFont: {
                        size: 12,
                    },
                    callbacks: {
                        label: (context) => {
                            const dataset = context.dataset;
                            const value = dataset.data[context.dataIndex];
                            const orderItemName = Object.keys(monthlySoldItems)[context.dataIndex];
                            return `${orderItemName}: $${value.toFixed(2)}`;
                        },
                        afterLabel: (context) => {
                            const dataset = context.dataset;
                            const value = dataset.data[context.dataIndex];
                            const percent = (value / totalAmount) * 100;
                            return `${percent.toFixed(2)}%`;
                        },
                    },
                },
                datalabels: {
                    color: '#fff',
                    font: {
                        size: 12,
                    },
                    formatter: (value, context) => {
                        const dataset = context.chart.data.datasets[context.datasetIndex];
                        const percent = (dataset.data[context.dataIndex] / totalAmount) * 100;
                        return `${percent.toFixed(2)}%`;
                    },
                },
            },
        };

        return options;
    };

    const calculateTotalAmount = (monthlySoldItems) => {
        const totalAmount = Object.values(monthlySoldItems).reduce((a, b) => a + b, 0);
        return totalAmount;
    };

    const calculateClientType = (users) => {
        let premiumClients = 0;
        let nonPremiumClients = 0;

        users.forEach((user) => {
            if (user.isPremium) {
                premiumClients++;
            } else {
                nonPremiumClients++;
            }
        });

        const totalClients = premiumClients + nonPremiumClients;
        const premiumPercentage = (premiumClients / totalClients) * 100;
        const nonPremiumPercentage = (nonPremiumClients / totalClients) * 100;

        const pieChartData = {
            labels: [
                `Clienti Premium (${premiumClients}) - ${premiumPercentage.toFixed(2)}%`,
                `Clienti Non-Premium (${nonPremiumClients}) - ${nonPremiumPercentage.toFixed(2)}%`
            ],
            datasets: [
                {
                    data: [premiumClients, nonPremiumClients],
                    backgroundColor: ['#25add7', 'rgb(0,0,205)'],
                },
            ],
        };

        setPieChartData(pieChartData);
    };

    return (
        <div>
            {totalAmount > 0 && <h3 className="total-comenzi">Total comenzi: {totalAmount.toFixed(2)} RON</h3>}
            <div className="chart-container">
                {chartData && <Bar data={chartData.data} options={chartData.options} />}
            </div>
            <div className="piechart-container">
                {pieChartData && (
                    <Pie
                        data={pieChartData}
                        options={{
                            maintainAspectRatio: false,
                            responsive: true,
                            plugins: {
                                datalabels: {
                                    color: '#fff',
                                    formatter: (value, context) => {
                                        const dataset = context.chart.data.datasets[0];
                                        const percent = (dataset.data[context.dataIndex] / users.length) * 100;
                                        return `${percent.toFixed(2)}%`;
                                    },
                                },
                            },
                        }}
                    />
                )}
            </div>
        </div>
    );
}
