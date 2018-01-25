var search = document.getElementById("mySearch");
(search).autocomplete = "off";
var searchFor;
var list = document.getElementById("myUL");
var preview = document.getElementsByClassName("searchPreview");


$(search).on("keyup", function (e) {
    searchFor = search.value;
    var keycode = e.keyCode;
    searchFor = search.value;
    //    $(list).empty();
    searchMe(searchFor);



});

//if someone copy pastes detect

$(search).on("keydown", function (e) {
    var key = e.which;
    if (key === 13 && searchFor.length > 0) {
        e.preventDefault();
        click();
    }
});

function click() {
    var anchor = $('ul li:first-child a').attr('href');
    window.open(anchor);
    list.innerHTML = "";
    $(search).val('')
}

function searchMe(item) {
    var apiRequest = new XMLHttpRequest();
    apiRequest.open('GET', 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&search=' + item + '&namespace=0&limit=5')
    apiRequest.send();

    apiRequest.onload = function () {
        var data = JSON.parse(apiRequest.responseText);
        var searchList = data[1];
        var url = (data[3]);
        $(list).empty();

        for (var i = 0; i < searchList.length; i++) {
            list.innerHTML += "<li class='searchPreview'><a target='_blank' href=" + url[i] + ">" + searchList[i] + "</a></li>"

        }
    }
}
