$(document).ready(function () {
    $(window).scroll(function (e) {
        if ($(this).scrollTop() > 200) {
            $('header').css({ 'display': 'none' });
        }
        if ($(this).scrollTop() < 200) {
            $('header').css({ 'display': 'block' });
        }
    });
    /*=========================== Open and Close Menu Event ===========================*/
    var sidebar_menu = document.getElementById('sidebar-menu');
    var sidebar_menu_icon = document.querySelector('.header-section-sidebarMenuIcon');

    sidebar_menu_icon.addEventListener('click', () => {
        if (sidebar_menu_icon.style.right == '2%') {
            if (sidebar_menu.style.backgroundColor === 'rgb(0, 28, 41)') {
                sidebar_menu.style = 'right: 0%; transition: 1s; background-color: rgb(0, 28, 41)';
                sidebar_menu_icon.style = 'right: 25% ; transition: 1s;position: absolute;width: 3%;height: 50%;top: 10%;margin-top: 15px; ';
            }
            else {
                sidebar_menu.style = 'right: 0%; transition: 1s';
                sidebar_menu_icon.style = 'right: 25% ; transition: 1s;position: absolute;width: 3%;height: 50%;top: 10%;margin-top: 15px; ';
            }
        }
        else {
            if (sidebar_menu.style.backgroundColor === 'rgb(0, 28, 41)') {
                sidebar_menu.style = 'right: -25%; transition: 1s; background-color: rgb(0, 28, 41)';
                sidebar_menu_icon.style = 'right: 2% ; transition: 1s;position: absolute;width: 3%;height: 50%;top: 10%;margin-top: 15px; ';
            }
            else {
                sidebar_menu.style = 'right: -25%; transition: 1s;';
                sidebar_menu_icon.style = 'right: 2% ; transition: 1s;position: absolute;width: 3%;height: 50%;top: 10%;margin-top: 15px; ';
            }
        }
    })
    /*=========================== change theme ========================================*/
    var moving_button = document.querySelector('.moving-button');
    moving_button.addEventListener('click', () => {
        if (moving_button.style.right == '55%') {
            moving_button.style = 'left: 55%; right: 5%; transition:0.5s;';
            $('body').css({ 'background-color': 'rgb(0, 13, 24)', 'color': 'white' });
            $('#world-map').css({ 'background-color': 'rgb(0, 13, 24)' });
            $('header').css('background-color', ' rgb(0, 29, 41)');
            $('footer').css('background-color', ' rgb(0, 29, 41)');
            $('#sidebar-menu').css('background-color', 'rgb(0, 28, 41)');
            $('.theme-div').css('background-color', 'rgb(0, 24, 36)');
            $('.display-statistic li').css('background-color', 'rgb(2, 21, 32)');
            $('.main-section-section2-div1-statistic').css('background-color', 'rgb(0, 24, 36)');
            $('.sidebar-menu-routes li a').css('color', 'rgba(255, 255, 255, 0.781)');
            $('.section2 .div1').css('background-color', 'rgba(0, 43, 56, 0.774)');
            $('.section2 .div2').css('background-color', 'rgba(0, 43, 56, 0.774)');
            $('.section2 .div3').css('background-color', 'rgba(0, 43, 56, 0.774)');
            $('.section3 .div1').css('background-color', 'rgba(0, 43, 56, 0.774)');
            $('.section3 .div2').css('background-color', 'rgba(0, 43, 56, 0.774)');
            $('.section3 .div3').css('background-color', 'rgba(0, 43, 56, 0.774)');
            $('.section3 .div4').css('background-color', 'rgba(0, 43, 56, 0.774)');
            $('.section4').css('background-color', 'rgba(0, 43, 56, 0.774)');
            $('.section5').css('background-color', 'rgba(0, 43, 56, 0.774)');
            $('.section6').css('background-color', 'rgba(0, 43, 56, 0.774)');
            $('.section1-table').css('background-color', 'rgba(6, 51, 56, 0.842)');
            $('.section2-chart').css('background-color', 'rgba(6, 51, 56, 0.842)');
            $('.section2-map').css('background-color', 'rgba(6, 51, 56, 0.842)');
            $('.section1-chart-div4').css('background-color', 'rgba(6, 51, 56, 0.842)');
            $('.table').css('color', 'rgb(192, 192, 192)');
        }
        else {
            moving_button.style = 'left: 5%; right: 55%; transition:0.5s;';
            $('body').css({ 'background-color': 'white', 'color': 'black' });
            $('#world-map').css({ 'background-color': 'white' });
            $('header').css('background-color', 'white');
            $('footer').css('background-color', 'white');
            $('#sidebar-menu').css('background-color', 'white');
            $('.theme-div').css('background-color', 'white');
            $('.display-statistic li').css('background-color', 'white');
            $('.main-section-section2-div1-statistic').css('background-color', 'white');
            $('.sidebar-menu-routes li a').css('color', 'black');
            $('.section2 .div1').css('background-color', 'white');
            $('.section2 .div2').css('background-color', 'white');
            $('.section2 .div3').css('background-color', 'white');
            $('.section3 .div1').css('background-color', 'white');
            $('.section3 .div2').css('background-color', 'white');
            $('.section3 .div3').css('background-color', 'white');
            $('.section3 .div4').css('background-color', 'white');
            $('.section4').css('background-color', 'white');
            $('.section5').css('background-color', 'white');
            $('.section6').css('background-color', 'white');
            $('.section1-table').css('background-color', 'white');
            $('.section2-chart').css('background-color', 'white');
            $('.section2-map').css('background-color', 'white');
            $('.section1-chart-div4').css('background-color', 'white');
            $('.table').css('color', 'black');
        }
    })
})