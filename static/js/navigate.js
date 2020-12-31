
let host = "http://localhost/hotels/";
let cdn = "http://localhost/hotels/cdn/";

var ThemeColor = "";
var ThemeIcon = "";


$(document).ready(function () {

    window.onhashchange = locationChanged;

    //window.onscroll = pageScrolled;

    window.onresize = reSize;

    FirstRun();

});


function locationChanged() {
    FirstRun();
}

function reSize()
{
    let page_height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    let page_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    $(".f-height").height(page_height);

    let x = $(document).innerHeight();
    let hh = 0;
    if(getElement("page-header") != null)
    {
        hh += $('#page-header').innerHeight();
    }
    if(getElement("page-control-menu") != null)
    {
        hh += $("#page-control-menu").innerHeight();
    }
    if(getElement("header-menu") != null)
    {
        hh += $("#header-menu").innerHeight();
    }

    let r = x - (hh  + 2);
    $("#inventory-item-table-con").height(r);
    $("#inventory-timeline-con").height(r);


}


function getArg(num) {
    let hashes = location.hash.split("/");
    if (num == null) {
        if (hashes.length > 1) {
            return hashes[1];
        }
    }
    else {
        if (hashes.length > (1 + num)) {
            return hashes[(1 + num)];
        }
    }
}


function pageScrolled() {

}


function FirstRun() {
    let hash = location.hash;

    let page = hash.split("/")[0];

    if (page === "") {
        if(Number($("#listed-property").val()) === 1)
        {
            location.hash = "#home";
            $("#home-anchor").attr("href", "#home");
        }
        else if(Number($("#listed-vehicle").val()) === 1)
        {
            location.hash = "#home/cars-list";
            $("#home-anchor").attr("href", "#home/cars-list");
        }
        else if(Number($("#leased").val()) === 1)
        {
            location.hash = "#home/leasing";
            $("#home-anchor").attr("href", "#home/leasing");
        }
        else
        {
            location.hash = "#home";
            $("#home-anchor").attr("href", "#home");
        }
        DrawDashboard();
    }

    if(Number($("#listed-property").val()) === 1)
    {
        $("#home-anchor").attr("href", "#home");
    }
    else if(Number($("#listed-vehicle").val()) === 1)
    {
        $("#home-anchor").attr("href", "#home/cars-list");
    }
    else if(Number($("#leased").val()) === 1)
    {
        $("#home-anchor").attr("href", "#home/leasing");
    }
    else
    {
        $("#home-anchor").attr("href", "#home");
    }

    switch (page)
    {
        case "#home":
            DrawHome();
            break;

        case "#wallet":
            DrawWallet();
            break;

        case "#analytics":
            DrawAnalytics();
            break;

        case "#settings":
            DrawSettings();
            break;

        case "#sign-out":
            DoSignOut();
            break;

        default:
            break;
    }
}