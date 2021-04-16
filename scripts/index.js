$(document).ready(function () {
    /*=========================== Get data from API ===========================*/
    fetch("https://pomber.github.io/covid19/timeseries.json")
        .then(response => response.json())
        .then(data => {
            /*=========================== Get statistic and put them into infinite animation ===========================*/
            var content = '<ul class="display-statistic">';
            for (country in data) {
                content += '<li id="li"><img id="img" src="ressources/flags/' + country + '.png" width="80" height="50"/><span id="s0">' + country + '</span><span id="s1">' + data[country][data[country].length - 1].confirmed + ' cases</span></li>';
            }
            content += '</ul>';
            $('.main-section-section1-div5').html(content);
            $('.display-statistic li').mouseover(function () {
                $('.display-statistic').css('animation-play-state', 'paused');
            })
            $('.display-statistic li').mouseout(function () {
                $('.display-statistic').css('animation-play-state', 'running');
            })
            $('.display-statistic li #s0').click(function (event) {
                var country = event.target.textContent;
                var dates = [];
                var confirmed = [];
                var deaths = [];
                var recoveries = [];
                var actives = [];
                country_before_last_update = new Country(country, data[country][data[country].length - 2]);
                country_last_update = new Country(country, data[country][data[country].length - 1]);
                difference = new Country(country, { date: country_last_update.dataCountry.date, confirmed: country_last_update.dataCountry.confirmed - country_before_last_update.dataCountry.confirmed, deaths: country_last_update.dataCountry.deaths - country_before_last_update.dataCountry.deaths, recovered: country_last_update.dataCountry.recovered - country_before_last_update.dataCountry.recovered });
                $('#main-section-section2-div1').html('<div class="main-section-section2-div1-part1">' +
                    '<div class="main-section-section2-div1-part1-image"><img src="ressources/flags/' + country + '.png"/></div>' +
                    '<div class="main-section-section2-div1-part1-text"><span>last update: ' + difference.dataCountry.date + '</span></div>' +
                    '</div>' +
                    '<div class="main-section-section2-div1-statistic">' +
                    '<div class="main-section-section2-div1-part2">' +
                    '<img class="img1" src="ressources/icones/case.png"/>' +
                    '<span class="text1">new cases</span>' +
                    '<span class="text2">' + difference.dataCountry.confirmed + '</span>' +
                    '<img class="img2"src="ressources/icones/uporange.png"/>' +
                    '</div>' +
                    '<div class="main-section-section2-div1-part3">' +
                    '<img class="img10" src="ressources/icones/recovered.png"/>' +
                    '<span class="text1">new recoveries</span>' +
                    '<span class="text2">' + difference.dataCountry.recovered + '</span>' +
                    '<img class="img2" src="ressources/icones/upgreen.png"/>' +
                    '</div>' +
                    '<div class="main-section-section2-div1-part4">' +
                    '<img class="img20" src="ressources/icones/death.png"/>' +
                    '<span class="text1">new deaths</span>' +
                    '<span class="text2">' + difference.dataCountry.deaths + '</span>' +
                    '<img class="img2" src="ressources/icones/uppurple.png"/>' +
                    '</div>' +
                    '</div>');

                lastcountry = $('button')[0].title;
                $("input[type='radio'][value='" + lastcountry + "']").prop('checked', false);
                $("input[type='radio'][value='" + country + "']").prop('checked', true);
                $("Button[title='" + lastcountry + "']").prop('title', country);
                $("li[class='active']").prop('class', '');
                $("span[class='multiselect-selected-text'").text(country);
                data[country].forEach(element => {
                    dates.push(element.date);
                    confirmed.push(element.confirmed);
                    deaths.push(element.deaths);
                    recoveries.push(element.recovered);
                    actives.push(element.confirmed - (element.deaths + element.recovered));
                });

                $('.lastConfirmed').html(confirmed[confirmed.length - 1]);
                $('.lastDeaths').html(deaths[deaths.length - 1]);
                $('.lastRecoveries').html(recoveries[recoveries.length - 1]);
                $('.lastActiveCases').html(actives[actives.length - 1]);
                if (window.myline1 !== undefined) {
                    window.myline1.destroy();
                }
                var ctx1 = document.getElementById('myChart1').getContext('2d');
                window.myline1 = new Chart(ctx1, {
                    type: 'line',
                    data: {
                        labels: dates,
                        datasets: [{
                            data: confirmed,
                            fill: true,
                            lineTension: 0.5,
                            backgroundColor: [
                                'rgba(255, 230, 0, 0.3)',
                            ],
                            borderColor: [
                                'rgba(255, 230, 0)',
                            ],
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointHoverBackgroundColor: 'rgba(255, 230, 0)',
                        }]
                    },
                    options: {
                        title: {
                            display: true
                        },
                        legend: {
                            display: false
                        },
                    }
                });
                if (window.myline2 !== undefined) {
                    window.myline2.destroy();
                }
                var ctx2 = document.getElementById('myChart2').getContext('2d');
                window.myline2 = new Chart(ctx2, {
                    type: 'line',
                    data: {
                        labels: dates,
                        datasets: [{
                            data: deaths,
                            fill: true,
                            lineTension: 0.5,
                            backgroundColor: [
                                'rgba(183, 0, 255, 0.3)',
                            ],
                            borderColor: [
                                'rgba(183, 0, 255)',
                            ],
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointHoverBackgroundColor: 'rgba(183, 0, 255)',
                        }]
                    },
                    options: {
                        title: {
                            display: true
                        },
                        legend: {
                            display: false
                        },
                    }
                });
                if (window.myline3 !== undefined) {
                    window.myline3.destroy();
                }
                var ctx3 = document.getElementById('myChart3').getContext('2d');
                window.myline3 = new Chart(ctx3, {
                    type: 'line',
                    data: {
                        labels: dates,
                        datasets: [{
                            data: recoveries,
                            fill: true,
                            lineTension: 0.5,
                            backgroundColor: [
                                'rgba(0, 255, 64, 0.3)',
                            ],
                            borderColor: [
                                'rgba(0, 255, 64)',
                            ],
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointHoverBackgroundColor: 'rgba(0, 255, 64)',
                        }]
                    },
                    options: {
                        title: {
                            display: true
                        },
                        legend: {
                            display: false
                        },
                    }
                });
                if (window.myline4 !== undefined) {
                    window.myline4.destroy();
                }
                var ctx4 = document.getElementById('myChart4').getContext('2d');
                window.myline4 = new Chart(ctx4, {
                    type: 'line',
                    data: {
                        labels: dates,
                        datasets: [{
                            data: actives,
                            fill: true,
                            lineTension: 0.5,
                            backgroundColor: [
                                'rgba(0, 153, 255, 0.3)',
                            ],
                            borderColor: [
                                'rgba(0, 153, 255)',
                            ],
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointHoverBackgroundColor: 'rgba(0, 153, 255)',
                        }]
                    },
                    options: {
                        title: {
                            display: true
                        },
                        legend: {
                            display: false
                        },
                    }
                });
                if (window.myPie1 !== undefined) {
                    window.myPie1.destroy();
                }
                window.myPie1 = new Chart(document.getElementById("myChart5"), {
                    type: 'pie',
                    data: {
                        labels: ['Confirmed', 'Deaths', 'Recoveries', 'Actives'],
                        datasets: [{
                            backgroundColor: ['rgba(255, 230, 0, 0.897)', 'rgba(183, 0, 255, 0.897)', 'rgba(0, 255, 64, 0.897)', 'rgba(0, 153, 255, 0.897)'],
                            data: [confirmed[confirmed.length - 1], deaths[deaths.length - 1], recoveries[recoveries.length - 1], actives[actives.length - 1]]
                        }]
                    },
                    options: {
                        title: {
                            display: true,
                        }
                    }
                });
                if (window.myline5 !== undefined) {
                    window.myline5.destroy();
                }
                var ctx5 = document.getElementById('myChart7').getContext('2d');
                window.myline5 = new Chart(ctx5, {
                    type: 'line',
                    data: {
                        labels: dates,
                        datasets: [
                            {
                                data: confirmed,
                                fill: false,
                                label: 'CONFIRMED',
                                lineTension: 0.5,
                                backgroundColor: [
                                    'rgba(255, 230, 0, 0.3)',
                                ],
                                borderColor: [
                                    'rgba(255, 230, 0)',
                                ],
                                borderCapStyle: 'butt',
                                borderDash: [],
                                borderDashOffset: 0.0,
                                borderJoinStyle: 'miter',
                                pointHoverBackgroundColor: 'rgba(255, 230, 0)',
                            },
                            {
                                data: recoveries,
                                fill: false,
                                label: 'RECOVERED',
                                lineTension: 0.5,
                                backgroundColor: [
                                    'rgba(0, 255, 64, 0.3)',
                                ],
                                borderColor: [
                                    'rgba(0, 255, 64)',
                                ],
                                borderCapStyle: 'butt',
                                borderDash: [],
                                borderDashOffset: 0.0,
                                borderJoinStyle: 'miter',
                                pointHoverBackgroundColor: 'rgba(0, 255, 64)',
                            },
                            {
                                data: deaths,
                                fill: false,
                                label: 'DEATHS',
                                lineTension: 0.5,
                                backgroundColor: [
                                    'rgba(183, 0, 255, 0.3)',
                                ],
                                borderColor: [
                                    'rgba(183, 0, 255)',
                                ],
                                borderCapStyle: 'butt',
                                borderDash: [],
                                borderDashOffset: 0.0,
                                borderJoinStyle: 'miter',
                                pointHoverBackgroundColor: 'rgba(183, 0, 255)',
                            },
                            {
                                data: actives,
                                fill: false,
                                label: 'ACTIVES',
                                lineTension: 0.5,
                                backgroundColor: [
                                    'rgba(0, 153, 255, 0.3)',
                                ],
                                borderColor: [
                                    'rgba(0, 153, 255)',
                                ],
                                borderCapStyle: 'butt',
                                borderDash: [],
                                borderDashOffset: 0.0,
                                borderJoinStyle: 'miter',
                                pointHoverBackgroundColor: 'rgba(0, 153, 255)',
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
                $('.image-text1').html('<img src="ressources/flags/' + country + '.png"/><span>' + country + '</span>');
                $('.cases1').html(confirmed[confirmed.length - 1]);
                $('.deaths1').html(deaths[deaths.length - 1]);
                $('.recoveries1').html(recoveries[recoveries.length - 1]);
                $('.actives1').html(confirmed[confirmed.length - 1] - (deaths[deaths.length - 1] + recoveries[recoveries.length - 1]));
            })
            /*=========================== Get countries from API and put them into Select tag ===========================*/
            function fillHeaderCountries() {
                var countryOptions = '';
                for (country in data) {
                    countryOptions += '<option value="' + country + '">' + country + '</option>';
                }
                return countryOptions;
            }
            $('#main-section-section2-div1-select').html(fillHeaderCountries());
            /*========================== Select's settings ===========================*/
            $('#main-section-section2-div1-select').multiselect({
                nonSelectedText: 'Select country',
                enableFiltering: true,
                enableCaseInsensitiveFiltering: true,
                buttonWidth: '350px',
            });
            /*=========================== Push last data of each country into newData array ===========================*/
            var newData = [];
            class Country {
                constructor(name, dataCountry) {
                    this.name = name;
                    this.dataCountry = dataCountry;
                }
            }
            for (country in data) {
                var country_before_last_update = new Country(country, data[country][data[country].length - 2]);
                var country_last_update = new Country(country, data[country][data[country].length - 1]);
                var difference = new Country(country, { date: country_last_update.dataCountry.date, confirmed: country_last_update.dataCountry.confirmed - country_before_last_update.dataCountry.confirmed, deaths: country_last_update.dataCountry.deaths - country_before_last_update.dataCountry.deaths, recovered: country_last_update.dataCountry.recovered - country_before_last_update.dataCountry.recovered });
                newData.push(difference);
            }
            /*=========================== Send the important initial data ===========================*/
            var dates = [];
            var confirmed = [];
            var deaths = [];
            var recoveries = [];
            var actives = [];
            var lastcases = [];

            for (country in data) {
                lastcases.push({ country: country, lastConfirmed: data[country][data[country].length - 1].confirmed });
            }

            var country = '';
            function maxConfirmed() {
                var maxConfirmed = 0;
                lastcases.forEach(element => {
                    if (element.lastConfirmed > maxConfirmed) {
                        maxConfirmed = element.lastConfirmed;
                        country = element.country;
                    }
                })
                return maxConfirmed;
            }
            maxConfirmed();

            lastcountry = $('button')[0].title;
            $("input[type='radio'][value='" + lastcountry + "']").prop('checked', false);
            $("input[type='radio'][value='" + country + "']").prop('checked', true);
            $("Button[title='" + lastcountry + "']").prop('title', country);
            $("li[class='active']").prop('class', '');
            $("span[class='multiselect-selected-text'").text(country);


            var country_before_last_update = new Country(country, data[country][data[country].length - 2]);
            var country_last_update = new Country(country, data[country][data[country].length - 1]);
            var difference = new Country(country, { date: country_last_update.dataCountry.date, confirmed: country_last_update.dataCountry.confirmed - country_before_last_update.dataCountry.confirmed, deaths: country_last_update.dataCountry.deaths - country_before_last_update.dataCountry.deaths, recovered: country_last_update.dataCountry.recovered - country_before_last_update.dataCountry.recovered });
            $('#main-section-section2-div1').html('<div class="main-section-section2-div1-part1">' +
                '<div class="main-section-section2-div1-part1-image"><img src="ressources/flags/' + country + '.png"/></div>' +
                '<div class="main-section-section2-div1-part1-text"><span>last update: ' + difference.dataCountry.date + '</span></div>' +
                '</div>' +
                '<div class="main-section-section2-div1-statistic">' +
                '<div class="main-section-section2-div1-part2">' +
                '<img class="img1" src="ressources/icones/case.png"/>' +
                '<span class="text1">new cases</span>' +
                '<span class="text2">' + difference.dataCountry.confirmed + '</span>' +
                '<img class="img2"src="ressources/icones/uporange.png"/>' +
                '</div>' +
                '<div class="main-section-section2-div1-part3">' +
                '<img class="img10" src="ressources/icones/recovered.png"/>' +
                '<span class="text1">new recoveries</span>' +
                '<span class="text2">' + difference.dataCountry.recovered + '</span>' +
                '<img class="img2" src="ressources/icones/upgreen.png"/>' +
                '</div>' +
                '<div class="main-section-section2-div1-part4">' +
                '<img class="img20" src="ressources/icones/death.png"/>' +
                '<span class="text1">new deaths</span>' +
                '<span class="text2">' + difference.dataCountry.deaths + '</span>' +
                '<img class="img2" src="ressources/icones/uppurple.png"/>' +
                '</div>' +
                '</div>');

            data[country].forEach(element => {
                dates.push(element.date);
                confirmed.push(element.confirmed);
                deaths.push(element.deaths);
                recoveries.push(element.recovered);
                actives.push(element.confirmed - (element.deaths + element.recovered));
            });

            $('.lastConfirmed').html(confirmed[confirmed.length - 1]);
            $('.lastDeaths').html(deaths[deaths.length - 1]);
            $('.lastRecoveries').html(recoveries[recoveries.length - 1]);
            $('.lastActiveCases').html(actives[actives.length - 1]);
            if (window.myline1 !== undefined) {
                window.myline1.destroy();
            }
            var ctx1 = document.getElementById('myChart1').getContext('2d');
            window.myline1 = new Chart(ctx1, {
                type: 'line',
                data: {
                    labels: dates,
                    datasets: [{
                        data: confirmed,
                        fill: true,
                        lineTension: 0.5,
                        backgroundColor: [
                            'rgba(255, 230, 0, 0.3)',
                        ],
                        borderColor: [
                            'rgba(255, 230, 0)',
                        ],
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointHoverBackgroundColor: 'rgba(255, 230, 0)',
                    }]
                },
                options: {
                    title: {
                        display: true
                    },
                    legend: {
                        display: false
                    },
                }
            });
            if (window.myline2 !== undefined) {
                window.myline2.destroy();
            }
            var ctx2 = document.getElementById('myChart2').getContext('2d');
            window.myline2 = new Chart(ctx2, {
                type: 'line',
                data: {
                    labels: dates,
                    datasets: [{
                        data: deaths,
                        fill: true,
                        lineTension: 0.5,
                        backgroundColor: [
                            'rgba(183, 0, 255, 0.3)',
                        ],
                        borderColor: [
                            'rgba(183, 0, 255)',
                        ],
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointHoverBackgroundColor: 'rgba(183, 0, 255)',
                    }]
                },
                options: {
                    title: {
                        display: true
                    },
                    legend: {
                        display: false
                    },
                }
            });
            if (window.myline3 !== undefined) {
                window.myline3.destroy();
            }
            var ctx3 = document.getElementById('myChart3').getContext('2d');
            window.myline3 = new Chart(ctx3, {
                type: 'line',
                data: {
                    labels: dates,
                    datasets: [{
                        data: recoveries,
                        fill: true,
                        lineTension: 0.5,
                        backgroundColor: [
                            'rgba(0, 255, 64, 0.3)',
                        ],
                        borderColor: [
                            'rgba(0, 255, 64)',
                        ],
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointHoverBackgroundColor: 'rgba(0, 255, 64)',
                    }]
                },
                options: {
                    title: {
                        display: true
                    },
                    legend: {
                        display: false
                    },
                }
            });
            if (window.myline4 !== undefined) {
                window.myline4.destroy();
            }
            var ctx4 = document.getElementById('myChart4').getContext('2d');
            window.myline4 = new Chart(ctx4, {
                type: 'line',
                data: {
                    labels: dates,
                    datasets: [{
                        data: actives,
                        fill: true,
                        lineTension: 0.5,
                        backgroundColor: [
                            'rgba(0, 153, 255, 0.3)',
                        ],
                        borderColor: [
                            'rgba(0, 153, 255)',
                        ],
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointHoverBackgroundColor: 'rgba(0, 153, 255)',
                    }]
                },
                options: {
                    title: {
                        display: true
                    },
                    legend: {
                        display: false
                    },
                }
            });
            if (window.myPie1 !== undefined) {
                window.myPie1.destroy();
            }
            window.myPie1 = new Chart(document.getElementById("myChart5"), {
                type: 'pie',
                data: {
                    labels: ['Confirmed', 'Deaths', 'Recoveries', 'Actives'],
                    datasets: [{
                        backgroundColor: ['rgba(255, 230, 0, 0.897)', 'rgba(183, 0, 255, 0.897)', 'rgba(0, 255, 64, 0.897)', 'rgba(0, 153, 255, 0.897)'],
                        data: [maxConfirmed(), deaths[deaths.length - 1], recoveries[recoveries.length - 1], actives[actives.length - 1]]
                    }]
                },
                options: {
                    title: {
                        display: true,
                    }
                }
            });
            if (window.myline5 !== undefined) {
                window.myline5.destroy();
            }
            var ctx5 = document.getElementById('myChart7').getContext('2d');
            window.myline5 = new Chart(ctx5, {
                type: 'line',
                data: {
                    labels: dates,
                    datasets: [
                        {
                            data: confirmed,
                            fill: false,
                            label: 'CONFIRMED',
                            lineTension: 0.5,
                            backgroundColor: [
                                'rgba(255, 230, 0, 0.3)',
                            ],
                            borderColor: [
                                'rgba(255, 230, 0)',
                            ],
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointHoverBackgroundColor: 'rgba(255, 230, 0)',
                        },
                        {
                            data: recoveries,
                            fill: false,
                            label: 'RECOVERED',
                            lineTension: 0.5,
                            backgroundColor: [
                                'rgba(0, 255, 64, 0.3)',
                            ],
                            borderColor: [
                                'rgba(0, 255, 64)',
                            ],
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointHoverBackgroundColor: 'rgba(0, 255, 64)',
                        },
                        {
                            data: deaths,
                            fill: false,
                            label: 'DEATHS',
                            lineTension: 0.5,
                            backgroundColor: [
                                'rgba(183, 0, 255, 0.3)',
                            ],
                            borderColor: [
                                'rgba(183, 0, 255)',
                            ],
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointHoverBackgroundColor: 'rgba(183, 0, 255)',
                        },
                        {
                            data: actives,
                            fill: false,
                            label: 'ACTIVES',
                            lineTension: 0.5,
                            backgroundColor: [
                                'rgba(0, 153, 255, 0.3)',
                            ],
                            borderColor: [
                                'rgba(0, 153, 255)',
                            ],
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointHoverBackgroundColor: 'rgba(0, 153, 255)',
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
            $('.image-text1').html('<img src="ressources/flags/' + country + '.png"/><span>' + country + '</span>');
            $('.cases1').html(confirmed[confirmed.length - 1]);
            $('.deaths1').html(deaths[deaths.length - 1]);
            $('.recoveries1').html(recoveries[recoveries.length - 1]);
            $('.actives1').html(confirmed[confirmed.length - 1] - (deaths[deaths.length - 1] + recoveries[recoveries.length - 1]));
            /*=========================== Send global data ===========================*/
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
            if (window.myPie2 !== undefined) {
                window.myPie2.destroy();
            }
            window.myPie2 = new Chart(document.getElementById("myChart6"), {
                type: 'pie',
                data: {
                    labels: ['Confirmed', 'Deaths', 'Recoveries', 'Actives'],
                    datasets: [{
                        backgroundColor: ['rgba(255, 230, 0, 0.897)', 'rgba(183, 0, 255, 0.897)', 'rgba(0, 255, 64, 0.897)', 'rgba(0, 153, 255, 0.897)'],
                        data: [totalConfirmedCases(), totalDeathCases(), totalRecoveredCases(), totalActiveCases()]
                    }]
                },
                options: {
                    title: {
                        display: true,
                    }
                }
            });
            $('.image-text2').html('<img src="ressources/icones/global.png"/><span>global</span>');
            $('.cases2').html(totalConfirmedCases());
            $('.deaths2').html(totalDeathCases());
            $('.recoveries2').html(totalRecoveredCases());
            $('.actives2').html(totalActiveCases());
            /*=========================== Send data of selected country ===========================*/

            $('li').change(() => {
                $('.main-section-section2-div1-statistic').css('background-color', '');
                var dates = [];
                var confirmed = [];
                var deaths = [];
                var recoveries = [];
                var actives = [];
                var country = $('button')[0].title;
                country_before_last_update = new Country(country, data[country][data[country].length - 2]);
                country_last_update = new Country(country, data[country][data[country].length - 1]);
                difference = new Country(country, { date: country_last_update.dataCountry.date, confirmed: country_last_update.dataCountry.confirmed - country_before_last_update.dataCountry.confirmed, deaths: country_last_update.dataCountry.deaths - country_before_last_update.dataCountry.deaths, recovered: country_last_update.dataCountry.recovered - country_before_last_update.dataCountry.recovered });
                $('#main-section-section2-div1').html('<div class="main-section-section2-div1-part1">' +
                    '<div class="main-section-section2-div1-part1-image"><img src="ressources/flags/' + country + '.png"/></div>' +
                    '<div class="main-section-section2-div1-part1-text"><span>last update: ' + difference.dataCountry.date + '</span></div>' +
                    '</div>' +
                    '<div class="main-section-section2-div1-statistic">' +
                    '<div class="main-section-section2-div1-part2">' +
                    '<img class="img1" src="ressources/icones/case.png"/>' +
                    '<span class="text1">new cases</span>' +
                    '<span class="text2">' + difference.dataCountry.confirmed + '</span>' +
                    '<img class="img2"src="ressources/icones/uporange.png"/>' +
                    '</div>' +
                    '<div class="main-section-section2-div1-part3">' +
                    '<img class="img10" src="ressources/icones/recovered.png"/>' +
                    '<span class="text1">new recoveries</span>' +
                    '<span class="text2">' + difference.dataCountry.recovered + '</span>' +
                    '<img class="img2" src="ressources/icones/upgreen.png"/>' +
                    '</div>' +
                    '<div class="main-section-section2-div1-part4">' +
                    '<img class="img20" src="ressources/icones/death.png"/>' +
                    '<span class="text1">new deaths</span>' +
                    '<span class="text2">' + difference.dataCountry.deaths + '</span>' +
                    '<img class="img2" src="ressources/icones/uppurple.png"/>' +
                    '</div>' +
                    '</div>');
                    
                data[country].forEach(element => {
                    dates.push(element.date);
                    confirmed.push(element.confirmed);
                    deaths.push(element.deaths);
                    recoveries.push(element.recovered);
                    actives.push(element.confirmed - (element.deaths + element.recovered));
                });
                $('.lastConfirmed').html(confirmed[confirmed.length - 1]);
                $('.lastDeaths').html(deaths[deaths.length - 1]);
                $('.lastRecoveries').html(recoveries[recoveries.length - 1]);
                $('.lastActiveCases').html(actives[actives.length - 1]);
                if (window.myline1 !== undefined) {
                    window.myline1.destroy();
                }
                var ctx1 = document.getElementById('myChart1').getContext('2d');
                window.myline1 = new Chart(ctx1, {
                    type: 'line',
                    data: {
                        labels: dates,
                        datasets: [{
                            data: confirmed,
                            fill: true,
                            lineTension: 0.5,
                            backgroundColor: [
                                'rgba(255, 230, 0, 0.3)',
                            ],
                            borderColor: [
                                'rgba(255, 230, 0)',
                            ],
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointHoverBackgroundColor: 'rgba(255, 230, 0)',
                        }]
                    },
                    options: {
                        title: {
                            display: true
                        },
                        legend: {
                            display: false
                        },
                    }
                });
                if (window.myline2 !== undefined) {
                    window.myline2.destroy();
                }
                var ctx2 = document.getElementById('myChart2').getContext('2d');
                window.myline2 = new Chart(ctx2, {
                    type: 'line',
                    data: {
                        labels: dates,
                        datasets: [{
                            data: deaths,
                            fill: true,
                            lineTension: 0.5,
                            backgroundColor: [
                                'rgba(183, 0, 255, 0.3)',
                            ],
                            borderColor: [
                                'rgba(183, 0, 255)',
                            ],
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointHoverBackgroundColor: 'rgba(183, 0, 255)',
                        }]
                    },
                    options: {
                        title: {
                            display: true
                        },
                        legend: {
                            display: false
                        },
                    }
                });
                if (window.myline3 !== undefined) {
                    window.myline3.destroy();
                }
                var ctx3 = document.getElementById('myChart3').getContext('2d');
                window.myline3 = new Chart(ctx3, {
                    type: 'line',
                    data: {
                        labels: dates,
                        datasets: [{
                            data: recoveries,
                            fill: true,
                            lineTension: 0.5,
                            backgroundColor: [
                                'rgba(0, 255, 64, 0.3)',
                            ],
                            borderColor: [
                                'rgba(0, 255, 64)',
                            ],
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointHoverBackgroundColor: 'rgba(0, 255, 64)',
                        }]
                    },
                    options: {
                        title: {
                            display: true
                        },
                        legend: {
                            display: false
                        },
                    }
                });
                if (window.myline4 !== undefined) {
                    window.myline4.destroy();
                }
                var ctx4 = document.getElementById('myChart4').getContext('2d');
                window.myline4 = new Chart(ctx4, {
                    type: 'line',
                    data: {
                        labels: dates,
                        datasets: [{
                            data: actives,
                            fill: true,
                            lineTension: 0.5,
                            backgroundColor: [
                                'rgba(0, 153, 255, 0.3)',
                            ],
                            borderColor: [
                                'rgba(0, 153, 255)',
                            ],
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointHoverBackgroundColor: 'rgba(0, 153, 255)',
                        }]
                    },
                    options: {
                        title: {
                            display: true
                        },
                        legend: {
                            display: false
                        },
                    }
                });
                if (window.myPie1 !== undefined) {
                    window.myPie1.destroy();
                }
                window.myPie1 = new Chart(document.getElementById("myChart5"), {
                    type: 'pie',
                    data: {
                        labels: ['Confirmed', 'Deaths', 'Recoveries', 'Actives'],
                        datasets: [{
                            backgroundColor: ['rgba(255, 230, 0, 0.897)', 'rgba(183, 0, 255, 0.897)', 'rgba(0, 255, 64, 0.897)', 'rgba(0, 153, 255, 0.897)'],
                            data: [confirmed[confirmed.length - 1], deaths[deaths.length - 1], recoveries[recoveries.length - 1], actives[actives.length - 1]]
                        }]
                    },
                    options: {
                        title: {
                            display: true,
                        }
                    }
                });
                if (window.myline5 !== undefined) {
                    window.myline5.destroy();
                }
                var ctx5 = document.getElementById('myChart7').getContext('2d');
                window.myline5 = new Chart(ctx5, {
                    type: 'line',
                    data: {
                        labels: dates,
                        datasets: [
                            {
                                data: confirmed,
                                fill: false,
                                label: 'CONFIRMED',
                                lineTension: 0.5,
                                backgroundColor: [
                                    'rgba(255, 230, 0, 0.3)',
                                ],
                                borderColor: [
                                    'rgba(255, 230, 0)',
                                ],
                                borderCapStyle: 'butt',
                                borderDash: [],
                                borderDashOffset: 0.0,
                                borderJoinStyle: 'miter',
                                pointHoverBackgroundColor: 'rgba(255, 230, 0)',
                            },
                            {
                                data: recoveries,
                                fill: false,
                                label: 'RECOVERED',
                                lineTension: 0.5,
                                backgroundColor: [
                                    'rgba(0, 255, 64, 0.3)',
                                ],
                                borderColor: [
                                    'rgba(0, 255, 64)',
                                ],
                                borderCapStyle: 'butt',
                                borderDash: [],
                                borderDashOffset: 0.0,
                                borderJoinStyle: 'miter',
                                pointHoverBackgroundColor: 'rgba(0, 255, 64)',
                            },
                            {
                                data: deaths,
                                fill: false,
                                label: 'DEATHS',
                                lineTension: 0.5,
                                backgroundColor: [
                                    'rgba(183, 0, 255, 0.3)',
                                ],
                                borderColor: [
                                    'rgba(183, 0, 255)',
                                ],
                                borderCapStyle: 'butt',
                                borderDash: [],
                                borderDashOffset: 0.0,
                                borderJoinStyle: 'miter',
                                pointHoverBackgroundColor: 'rgba(183, 0, 255)',
                            },
                            {
                                data: actives,
                                fill: false,
                                label: 'ACTIVES',
                                lineTension: 0.5,
                                backgroundColor: [
                                    'rgba(0, 153, 255, 0.3)',
                                ],
                                borderColor: [
                                    'rgba(0, 153, 255)',
                                ],
                                borderCapStyle: 'butt',
                                borderDash: [],
                                borderDashOffset: 0.0,
                                borderJoinStyle: 'miter',
                                pointHoverBackgroundColor: 'rgba(0, 153, 255)',
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
                
                $('.image-text1').html('<img src="ressources/flags/' + country + '.png"/><span>' + country + '</span>');
                $('.cases1').html(confirmed[confirmed.length - 1]);
                $('.deaths1').html(deaths[deaths.length - 1]);
                $('.recoveries1').html(recoveries[recoveries.length - 1]);
                $('.actives1').html(confirmed[confirmed.length - 1] - (deaths[deaths.length - 1] + recoveries[recoveries.length - 1]));
            })
            /*=========================== display last data infinitly ===========================*/
            $('#main-section-section1-div1').html('<span>' + newData[0].name + '</span></br>' + '<span>last update ' + newData[0].dataCountry.date + '</span>');
            $('.main-section-section1-div2').html('<img src="ressources/flags/' + newData[0].name + '.png"/>');
            $('#main-section-section1-div3').html('<p><strong>new cases</strong><strong>new deaths</strong><strong>new recoveries</strong></p>' + '<span><img src="ressources/icones/uporange.png" width="20" height="35"/>' + newData[0].dataCountry.confirmed + '</span>' + '<span><img src="ressources/icones/uppurple.png" width="20" height="35"/>' + newData[0].dataCountry.deaths + '</span>' + '<span><img src="ressources/icones/upgreen.png" width="20" height="35"/>' + newData[0].dataCountry.recovered + '</span>');
            let i = 1;
            setInterval(function () {
                $('#main-section-section1-div1').html('<span>' + newData[i].name + '</span></br>' + '<span>last update ' + newData[i].dataCountry.date + '</span>');
                $('.main-section-section1-div2').html('<img src="ressources/flags/' + newData[i].name + '.png"/>');
                $('#main-section-section1-div3').html('<p><strong>new cases</strong><strong>new deaths</strong><strong>new recoveries</strong></p>' + '<span><img src="ressources/icones/uporange.png" width="20" height="35"/>' + newData[i].dataCountry.confirmed + '</span>' + '<span><img src="ressources/icones/uppurple.png" width="20" height="35"/>' + newData[i].dataCountry.deaths + '</span>' + '<span><img src="ressources/icones/upgreen.png" width="20" height="35"/>' + newData[i].dataCountry.recovered + '</span>');
                if (i == newData.length-1) {
                    i = 0;
                }
                else if (i !== newData.length-1) {
                    i = i + 1;
                }
            }, 5000);
        })
})