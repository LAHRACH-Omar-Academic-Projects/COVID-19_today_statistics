$(document).ready(function () {
    fetch("https://pomber.github.io/covid19/timeseries.json")
        .then(response => response.json())
        .then(data => {
            /*================================== last update/new data ===================================*/
            class Country {
                constructor(name, dataCountry) {
                    this.name = name;
                    this.dataCountry = dataCountry;
                }
            }
            var last_update_date = '';
            var last_update_cases = 0;
            var last_update_deaths = 0;
            var last_update_recoveries = 0;
            for (country in data) {
                var country_before_last_data = new Country(country, data[country][data[country].length - 2]);
                var country_last_data = new Country(country, data[country][data[country].length - 1]);
                last_update_date = country_last_data.dataCountry.date;
                last_update_cases += country_last_data.dataCountry.confirmed - country_before_last_data.dataCountry.confirmed;
                last_update_deaths += country_last_data.dataCountry.deaths - country_before_last_data.dataCountry.deaths;
                last_update_recoveries += country_last_data.dataCountry.recovered - country_before_last_data.dataCountry.recovered;
            }
            $('.section2 .div1 .part4').html(last_update_cases);
            $('.section2 .div2 .part4').html(last_update_recoveries);
            $('.section2 .div3 .part4').html(last_update_deaths);
            $('.section2 .div1 .part6').html('last update: ' + last_update_date);
            $('.section2 .div2 .part6').html('last update: ' + last_update_date);
            $('.section2 .div3 .part6').html('last update: ' + last_update_date);
            $('.section3 .div1 .part5').html('last update: ' + last_update_date);
            $('.section3 .div2 .part5').html('last update: ' + last_update_date);
            $('.section3 .div3 .part5').html('last update: ' + last_update_date);
            $('.section3 .div4 .part5').html('last update: ' + last_update_date);
            /*=============================== last update/total data ===================================*/
            function totalConfirmedCases() {
                var totalConfirmedCases = 0;
                for (country in data) {
                    var dataOfCountry = data[country];
                    var lastDataOfCountryNumber = dataOfCountry.length - 1;
                    totalConfirmedCases += dataOfCountry[lastDataOfCountryNumber].confirmed;
                }
                return totalConfirmedCases;
            }
            function totalDeathCases() {
                var totalDeathCases = 0;
                for (country in data) {
                    var dataOfCountry = data[country];
                    var lastDataOfCountryNumber = dataOfCountry.length - 1;
                    totalDeathCases += dataOfCountry[lastDataOfCountryNumber].deaths;
                }
                return totalDeathCases;
            }
            function totalRecoveredCases() {
                var totalRecoveredCases = 0;
                for (country in data) {
                    var dataOfCountry = data[country];
                    var lastDataOfCountryNumber = dataOfCountry.length - 1;
                    totalRecoveredCases += dataOfCountry[lastDataOfCountryNumber].recovered;
                }
                return totalRecoveredCases;
            }
            function totalActiveCases() {
                var totalActiveCases = 0;
                totalActiveCases = totalConfirmedCases() - (totalDeathCases() + totalRecoveredCases());
                return totalActiveCases;
            }
            $('.section3 .div1 .part4').html(totalConfirmedCases());
            $('.section3 .div2 .part4').html(totalRecoveredCases());
            $('.section3 .div3 .part4').html(totalDeathCases());
            $('.section3 .div4 .part4').html(totalActiveCases());
            /*====================================== first chart =====================================*/
            var tcases = [];
            var tdeaths = [];
            var trecoveries = [];
            var tactives = [];
            var dates = [];
            var titleColor = "";
            var listBoxShadow = '';
            var chartFillColor = "";
            var chartLineColor = "";
            var chartPointColor = "";
            var datas = [];
            var i = 0;
            data["Morocco"].forEach(element => {
                var date = new Date(element.date);
                dates[i] = (date.getMonth() + 1) + '/' + date.getDate();
                i += 1;
            })
            $('.section4 .title').html("total cases of coronavirus");
            for (var i = 0; i < dates.length; i++) {
                var cases = 0;
                var recoveries = 0;
                var deaths = 0;
                var actives = 0;
                for (country in data) {
                    cases += data[country][i].confirmed;
                    deaths += data[country][i].deaths;
                    recoveries += data[country][i].recovered;
                    actives += data[country][i].confirmed - (data[country][i].deaths + data[country][i].recovered);
                }
                tcases[i] = cases;
                tdeaths[i] = deaths;
                trecoveries[i] = recoveries;
                tactives[i] = actives;
                datas[i] = cases;
            }
            titleColor = "rgb(255, 208, 0)";
            listBoxShadow = '0px 0px 10px rgb(255, 208, 0)';
            chartFillColor = 'rgb(255, 208, 0, 0.3)';
            chartLineColor = 'rgb(255, 208, 0)';
            chartPointColor = 'rgb(255, 208, 0)';
            $('.section4 .list').css('box-shadow', listBoxShadow);
            $('.section4 .title').css('color', titleColor);
            if (window.myLine1 !== undefined) {
                window.myLine1.destroy();
            }
            var ctx1 = document.querySelector('.chart1').getContext('2d');
            window.myLine1 = new Chart(ctx1, {
                type: 'line',
                data: {
                    labels: dates,
                    datasets: [{
                        data: datas,
                        fill: true,
                        lineTension: 0.5,
                        backgroundColor: [
                            chartFillColor,
                        ],
                        borderColor: [
                            chartLineColor,
                        ],
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointHoverBackgroundColor: chartPointColor,
                    }]
                },
                options: {
                    title: {
                        display: true,
                    },
                    legend: {
                        display: false
                    },
                }
            });
            if (window.myLine2 !== undefined) {
                window.myLine2.destroy();
            }
            var ctx2 = document.querySelector('.chart2').getContext('2d');
            window.myLine2 = new Chart(ctx2, {
                type: 'line',
                data: {
                    labels: dates,
                    datasets: [
                        {
                            label: 'CONFIRMED',
                            data: tcases,
                            fill: false,
                            lineTension: 0.5,
                            borderColor: [
                                'rgb(255, 208, 0)',
                            ],
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointHoverBackgroundColor: 'rgb(255, 208, 0)',
                        },
                        {
                            label: 'RECOVERIES',
                            data: trecoveries,
                            fill: false,
                            lineTension: 0.5,
                            borderColor: [
                                'rgb(0, 255, 106)',
                            ],
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointHoverBackgroundColor: 'rgb(0, 255, 106)',
                        },
                        {
                            label: 'DEATHS',
                            data: tdeaths,
                            fill: false,
                            lineTension: 0.5,
                            borderColor: [
                                'rgb(162, 0, 255)',
                            ],
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointHoverBackgroundColor: 'rgb(162, 0, 255)',
                        },
                        {
                            label: 'ACTIVE CASES',
                            data: tactives,
                            fill: false,
                            lineTension: 0.5,
                            borderColor: [
                                'rgb(0, 162, 255)',
                            ],
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointHoverBackgroundColor: 'rgb(0, 162, 255)',
                        }
                    ]
                },
                options: {
                    title: {
                        display: true,
                    },
                    legend: {
                        display: true
                    },
                }
            });
            if (window.myPie !== undefined) {
                window.myPie.destroy();
            }
            window.myPie = new Chart(document.querySelector(".chart3"), {
                type: 'pie',
                data: {
                    labels: ['CONFIRMED', 'DEATHS', 'RECOVERIES', 'ACTIVES'],
                    datasets: [{
                        backgroundColor: ['rgba(255, 230, 0, 0.897)', 'rgba(183, 0, 255, 0.897)', 'rgba(0, 255, 64, 0.897)', 'rgba(0, 153, 255, 0.897)'],
                        data: [tcases[tcases.length - 1], tdeaths[tdeaths.length - 1], trecoveries[trecoveries.length - 1], tactives[tactives.length - 1]]
                    }]
                },
                options: {
                    title: {
                        display: true,
                    }
                }
            });
            if (window.mDoughnut !== undefined) {
                window.myDoughnut.destroy();
            }
            window.myDoughnut = new Chart(document.querySelector(".chart4"), {
                type: 'doughnut',
                data: {
                    labels: ['CONFIRMED', 'DEATHS', 'RECOVERIES', 'ACTIVES'],
                    datasets: [{
                        backgroundColor: ['rgba(255, 230, 0, 0.897)', 'rgba(183, 0, 255, 0.897)', 'rgba(0, 255, 64, 0.897)', 'rgba(0, 153, 255, 0.897)'],
                        data: [tcases[tcases.length - 1], tdeaths[tdeaths.length - 1], trecoveries[trecoveries.length - 1], tactives[tactives.length - 1]],
                    }]
                },
                options: {
                    title: {
                        display: true,
                    }
                }
            });
            $('.section4 .list').change((event) => {
                if (event.target.value === 'cases') {
                    titleColor = "rgb(255, 208, 0)";
                    listBoxShadow = '0px 0px 10px rgb(255, 208, 0)';
                    chartFillColor = 'rgb(255, 208, 0, 0.3)';
                    chartLineColor = 'rgb(255, 208, 0)';
                    chartPointColor = 'rgb(255, 208, 0)';
                    $('.section4 .title').html("total cases of coronavirus");
                    for (var i = 0; i < dates.length; i++) {
                        totalCases = 0;
                        for (country in data) {
                            totalCases += data[country][i].confirmed;
                        }
                        datas[i] = totalCases;
                    }
                }
                else if (event.target.value === 'deaths') {
                    titleColor = "rgb(162, 0, 255)";
                    listBoxShadow = '0px 0px 10px rgb(162, 0, 255)';
                    chartFillColor = 'rgb(162, 0, 255, 0.3)';
                    chartLineColor = 'rgb(162, 0, 255)';
                    chartPointColor = 'rgb(162, 0, 255)';
                    $('.section4 .title').html("total deceased from coronavirus");
                    for (var i = 0; i < dates.length; i++) {
                        totalCases = 0;
                        for (country in data) {
                            totalCases += data[country][i].deaths;
                        }
                        datas[i] = totalCases;
                    }
                }
                else if (event.target.value === 'recoveries') {
                    titleColor = "rgb(0, 255, 106)";
                    listBoxShadow = '0px 0px 10px rgb(0, 255, 106)';
                    chartFillColor = 'rgb(0, 255, 106, 0.3)';
                    chartLineColor = 'rgb(0, 255, 106)';
                    chartPointColor = 'rgb(0, 255, 106)';
                    $('.section4 .title').html("total recovered from coronavirus");
                    var i = 0;
                    for (var i = 0; i < dates.length; i++) {
                        totalCases = 0;
                        for (country in data) {
                            totalCases += data[country][i].recovered;
                        }
                        datas[i] = totalCases;
                    }
                }
                else if (event.target.value === 'actives') {
                    titleColor = "rgb(0, 162, 255)";
                    listBoxShadow = '0px 0px 10px rgb(0, 162, 255)';
                    chartFillColor = 'rgb(0, 162, 255, 0.3)';
                    chartLineColor = 'rgb(0, 162, 255)';
                    chartPointColor = 'rgb(0, 162, 255)';
                    $('.section4 .title').html("total actives of coronavirus");
                    for (var i = 0; i < dates.length; i++) {
                        totalCases = 0;
                        for (country in data) {
                            totalCases += data[country][i].confirmed - (data[country][i].recovered + data[country][i].deaths);
                        }
                        datas[i] = totalCases;
                    }
                }
                $('.section4 .list').css('box-shadow', listBoxShadow);
                $('.section4 .title').css('color', titleColor);
                if (window.myLine1 !== undefined) {
                    window.myLine1.destroy();
                }
                var ctx1 = document.querySelector('.chart1').getContext('2d');
                window.myLine1 = new Chart(ctx1, {
                    type: 'line',
                    data: {
                        labels: dates,
                        datasets: [{
                            data: datas,
                            fill: true,
                            lineTension: 0.5,
                            backgroundColor: [
                                chartFillColor,
                            ],
                            borderColor: [
                                chartLineColor,
                            ],
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointHoverBackgroundColor: chartPointColor,
                        }]
                    },
                    options: {
                        title: {
                            display: true,
                        },
                        legend: {
                            display: false
                        },
                    }
                });
            })
        });
})