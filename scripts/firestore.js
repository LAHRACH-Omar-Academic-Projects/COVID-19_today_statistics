$(document).ready(function () {
    /*=========================== Firebase Configuration ===========================*/
    const firebaseConfig = {
        apiKey: "AIzaSyCJB0tJffxsLvncILj0Ocwo3so1yKyYzG4",
        authDomain: "covid-19-today.firebaseapp.com",
        databaseURL: "https://covid-19-today.firebaseio.com",
        projectId: "covid-19-today",
        storageBucket: "covid-19-today.appspot.com",
        messagingSenderId: "3021734093",
        appId: "1:3021734093:web:beb3768682f8aca7c92984",
        measurementId: "G-YWHJQTFR40"
    };
    /*=========================== Initialize firebase firestore ===========================*/
    firebase.initializeApp(firebaseConfig);
    /*=========================== Get data from API ===========================*/
    fetch("https://pomber.github.io/covid19/timeseries.json")
        .then(response => response.json())
        .then(data => {
            /*=========================== Add Data into forestore ===========================*/
            function totalConfirmedCases() {
                var totalConfirmedCases = 0;
                for (country in data) {
                    totalConfirmedCases += data[country][i].confirmed;
                }
                return totalConfirmedCases;
            }
            function totalDeathCases() {
                var totalDeathCases = 0;
                for (country in data) {
                    totalDeathCases += data[country][i].deaths;
                }
                return totalDeathCases;
            }
            function totalRecoveredCases() {
                var totalRecoveredCases = 0;
                for (country in data) {
                    totalRecoveredCases += data[country][i].recovered;
                }
                return totalRecoveredCases;
            }
            function totalActiveCases() {
                var totalActiveCases = 0;
                totalActiveCases = totalConfirmedCases() - (totalDeathCases() + totalRecoveredCases());
                return totalActiveCases;
            }
            dates = [];
            data['Morocco'].forEach(element => {
                dates.push(element.date);
            })
            for (var i = 0; i < dates.length; i++) {
                var db = firebase.firestore().collection("statistics").doc(dates[i])
                var dbc = db.collection('countries');
                var dbg = db.collection('global');
                for (country in data) {
                    dbc.doc(country).set({
                        confirmed: data[country][i].confirmed,
                        deaths: data[country][i].deaths,
                        recoveries: data[country][i].recovered,
                        actives: data[country][i].confirmed - (data[country][i].deaths + data[country][i].recovered)
                    })
                }
                dbg.doc('confirmed').set({
                    confirmed: totalConfirmedCases(),
                })
                dbg.doc('deaths').set({
                    deaths: totalDeathCases()
                })
                dbg.doc('recoveries').set({
                    recoveries: totalRecoveredCases()
                })
                dbg.doc('actives').set({
                    actives: totalActiveCases()
                })
            }
        })
})