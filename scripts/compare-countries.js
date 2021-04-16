$(document).ready(function () {
    fetch("https://pomber.github.io/covid19/timeseries.json")
        .then(response => response.json())
        .then(data => {
            function fillHeaderDatesFrom() {
                var dateOptionsFrom = '';
                data['Morocco'].forEach(element => {
                    dateOptionsFrom += '<option value="' + element.date + '">from date: ' + element.date + '</option>';
                });
                return dateOptionsFrom;
            }
            function fillHeaderDatesTo() {
                var dateOptionsTo = '';
                data['Morocco'].forEach(element => {
                    dateOptionsTo += '<option value="' + element.date + '">to date: ' + element.date + '</option>';
                });
                return dateOptionsTo;
            }
            function fillHeaderCountries() {
                var countryOptions = '';
                for (country in data) {
                    countryOptions += '<option value="' + country + '">' + country + '</option>';
                }
                return countryOptions;
            }
            function listsSettings() {
                $('.header-select').multiselect({
                    nonSelectedText: 'Select countries',
                    enableFiltering: true,
                    enableCaseInsensitiveFiltering: true,
                    buttonWidth: '350px',
                });
                $('.header-date-from').multiselect({
                    nonSelectedText: 'from date',
                    enableFiltering: true,
                    enableCaseInsensitiveFiltering: true,
                    buttonWidth: '350px',
                });
                $('.header-date-to').multiselect({
                    nonSelectedText: 'to date',
                    enableFiltering: true,
                    enableCaseInsensitiveFiltering: true,
                    buttonWidth: '350px',
                });
            }

            $('.header-date-from').html(fillHeaderDatesFrom());
            $('.header-date-to').html(fillHeaderDatesTo());
            $('.header-select').html(fillHeaderCountries());
            listsSettings();

            $('li').change(() => {
                var fromDate = new Date($('button')[0].title).getTime();
                var toDate = new Date($('button')[2].title).getTime();
                var countries = $('button')[4].title;
                var arrayCountries = countries.split(', ');
                var contents = '';
                var totalCases = 0;
                var totaDeaths = 0;
                var totalRecoveries = 0;

                var chartLabels = [];
                chartLabels[0] = $('button')[0].title;
                data['Morocco'].forEach(element => {
                    date = new Date(element.date).getTime();
                    if (date > fromDate && date < toDate) {
                        chartLabels.push(element.date);
                    }
                })
                if (toDate !== fromDate) {
                    chartLabels.push($('button')[2].title);
                }
                var myPieChartCasesData = [];
                var chartCasesDatas = [];
                var chartRecoveriesDatas = [];
                var chartDeathsDatas = [];
                for (var i = 0; i < chartLabels.length; i++) {
                    chartCasesDatas[i] = 0;
                    chartDeathsDatas[i] = 0;
                    chartRecoveriesDatas[i] = 0;
                }
                arrayCountries.forEach(country => {
                    if (country !== "Select countries") {
                        var chartCasesData = [];
                        var chartRecoveriesData = [];
                        var chartDeathsData = [];
                        for (var i = 0; i < data[country].length; i++) {
                            var cases_difference;
                            var first_confirmed;
                            var last_confirmed;
                            var deaths_difference;
                            var first_deaths;
                            var last_deaths;
                            var recoveries_difference;
                            var first_recoveries;
                            var last_recoveries;
                            var date = new Date(data[country][i].date).getTime();
                            if (date === fromDate) {
                                first_confirmed = data[country][i].confirmed;
                                cases_difference = 0;
                                chartCasesData.push(cases_difference);
                                first_deaths = data[country][i].deaths;
                                deaths_difference = 0;
                                chartDeathsData.push(deaths_difference);
                                first_recoveries = data[country][i].recovered;
                                recoveries_difference = 0;
                                chartRecoveriesData.push(recoveries_difference);
                            }
                            if (date <= toDate && date > fromDate) {
                                last_confirmed = data[country][i].confirmed;
                                cases_difference = last_confirmed - first_confirmed;
                                chartCasesData.push(cases_difference);
                                last_deaths = data[country][i].deaths;
                                deaths_difference = last_deaths - first_deaths;
                                chartDeathsData.push(deaths_difference);
                                last_recoveries = data[country][i].recovered;
                                recoveries_difference = last_recoveries - first_recoveries;
                                chartRecoveriesData.push(recoveries_difference);
                            }
                        }
                        for (var i = 0; i < chartLabels.length; i++) {
                            chartCasesDatas[i] += chartCasesData[i];
                            chartDeathsDatas[i] += chartDeathsData[i];
                            chartRecoveriesDatas[i] += chartRecoveriesData[i];
                        }
                        function cases() {
                            var total;
                            for (var i = 0; i < data[country].length; i++) {
                                var date = new Date(data[country][i].date).getTime();
                                if (date === fromDate) {
                                    var firstConfirmed = data[country][i].confirmed;
                                }
                                if (date === toDate) {
                                    var lastConfirmed = data[country][i].confirmed;
                                }
                            }
                            total = lastConfirmed - firstConfirmed;
                            return total;
                        }
                        function deaths() {
                            var total;
                            for (var i = 0; i < data[country].length; i++) {
                                var date = new Date(data[country][i].date).getTime();
                                if (date === fromDate) {
                                    var firstDeaths = data[country][i].deaths;
                                }
                                if (date === toDate) {
                                    var lastDeaths = data[country][i].deaths;
                                }
                            }
                            total = lastDeaths - firstDeaths;
                            return total;
                        }
                        function recoveries() {
                            var total;
                            for (var i = 0; i < data[country].length; i++) {
                                var date = new Date(data[country][i].date).getTime();
                                if (date === fromDate) {
                                    var firstRecoveries = data[country][i].recovered;
                                }
                                if (date === toDate) {
                                    var lastRecoveries = data[country][i].recovered;
                                }
                            }
                            total = lastRecoveries - firstRecoveries;
                            return total;
                        }
                        contents += '<tr">'
                            + '<td id="country"><img src="../ressources/flags/' + country +  '.png" id="flag"/>' + country + '</td>'
                            + '<td>' + cases() + '</td>'
                            + '<td>' + recoveries() + '</td>'
                            + '<td>' + deaths() + '</td>'
                            + '</tr>';


                        myPieChartCasesData.push(cases());
                        totalCases += cases();
                        totaDeaths += deaths();
                        totalRecoveries += recoveries();
                    }
                })
                console.log(myPieChartCasesData);
                console.log(countries);
                $('.tbody').html(contents);
                $('.div1-number').html(totalCases);
                $('.div2-number').html(totalRecoveries);
                $('.div3-number').html(totaDeaths);

                var ctx = document.getElementById('myLineChart').getContext('2d');
                if (window.myLine !== undefined) {
                    window.myLine.destroy();
                }
                window.myLine = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: chartLabels,
                        datasets: [
                            {
                                label: 'Cases',
                                data: chartCasesDatas,
                                fill: false,
                                lineTension: 0.5,
                                borderColor: [
                                    'rgb(0, 154, 226)',
                                ],
                                borderCapStyle: 'butt',
                                borderDash: [],
                                borderDashOffset: 0.0,
                                borderJoinStyle: 'miter',
                                pointHoverBackgroundColor: 'rgb(0, 154, 226)',
                            },
                            {
                                label: 'Deaths',
                                data: chartDeathsDatas,
                                fill: false,
                                lineTension: 0.5,
                                borderColor: [
                                    'rgb(255, 3, 36)',
                                ],
                                borderCapStyle: 'butt',
                                borderDash: [],
                                borderDashOffset: 0.0,
                                borderJoinStyle: 'miter',
                                pointHoverBackgroundColor: 'rgb(255, 3, 36)',
                            },
                            {
                                label: 'Recoveries',
                                color: 'green',
                                data: chartRecoveriesDatas,
                                fill: false,
                                lineTension: 0.5,
                                borderColor: [
                                    'rgb(14, 175, 36)',
                                ],
                                borderCapStyle: 'butt',
                                borderDash: [],
                                borderDashOffset: 0.0,
                                borderJoinStyle: 'miter',
                                pointHoverBackgroundColor: 'rgb(14, 175, 36)',
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
                window.myPie = new Chart(document.getElementById("myPieChart"), {
                    type: 'pie',
                    data: {
                        labels: arrayCountries,
                        datasets: [{
                            backgroundColor: ['rgb(245, 33, 33)', 'rgb(47, 173, 21)', 'rgb(18, 121, 238)', 'rgb(202, 28, 164)', 'rgb(211, 255, 15)', 'rgb(36, 9, 194)', 'rgb(167, 0, 0)', 'rgb(83, 168, 4)', 'rgb(13, 148, 107)', 'rgb(228, 66, 88)', 'rgb(78, 73, 73)', 'rgb(211, 99, 8)', 'rgb(44, 2, 78)', 'rgb(13, 107, 79)', 'rgb(180, 102, 0)', 'rgb(194, 9, 9)'],
                            data: myPieChartCasesData
                        }]
                    },
                    options: {
                        title: {
                            display: true,
                        }
                    }
                });

            })
        })
})
