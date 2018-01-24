var search = document.getElementById("mySearch");
(search).autocomplete = "off";
var searchFor;
var list = document.getElementById("myUL");


$(search).on("keyup", function (e) {
    searchFor = search.value;
    var keycode = e.keyCode;
    console.log(keycode)

    if (keycode = '13') {
        console.log(searchFor.name)
    }


    searchFor = search.value;
    if (searchFor.length !== 0) {
        list.innerHTML = "";
        searchMe(searchFor);
    } else {
        list.innerHTML = "";
    }

});



function searchMe(item) {
    var apiRequest = new XMLHttpRequest();
    apiRequest.open('GET', 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&search=' + item + '&namespace=0&limit=10')
    apiRequest.send();


    apiRequest.onload = function () {
        var data = JSON.parse(apiRequest.responseText);
        var searchList = data[1];
        var url = (data[3]);
        for (var i = 0; i < searchList.length; i++) {
            list.innerHTML += "<li class='searchPreview'><a target='_blank' href=" + url[i] + ">" + searchList[i] + "</a></li>"

        }


    }


}
