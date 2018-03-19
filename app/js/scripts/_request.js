var search = document.getElementById("mySearch");
(search).autocomplete = "off";
var searchFor;
var list = document.getElementById("myUL");
var preview = document.getElementsByClassName("searchPreview");
var previewViewer = document.getElementById("previewViewer");
var previewViewerList = document.getElementById("previewViewerList");
var centered = document.getElementsByClassName("centered--content");

$(search).on("keyup", function (e) {
    searchFor = search.value;
    var keycode = e.keyCode;
    searchFor = search.value;

    if (searchFor.length > 0) {
        //if the input box has content call a function to handle api call
        searchMe(searchFor);
        // on mobile hide the title to show descriptions
        $(centered).addClass("hidden");

    } else {
        $(centered).removeClass("hidden");
        // if list is empty delete everything
        $(list).empty();
        $(previewViewer).empty();
        $(previewViewerList).empty();
    }





});



$(search).on("keydown", function (e) {
    var key = e.which;
    if (key === 13 && searchFor.length > 0) {
        if (searchFor.length > 0) {
            click();
        } else {
            alert("type something")
        }

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
        //empty everything on every api call
        $(list).empty();
        $(previewViewer).empty();
        $(previewViewerList).empty();

        // sent request
        var data = JSON.parse(apiRequest.responseText);
        // description of first in the array


        //list that displays underneath search
        var searchList = data[1];
        // url that displays next to each one
        var url = (data[3]);

        //if the first element description can refer to several other things
        var description = data[2][0];

        if (description.indexOf("may refer to") !== -1 || description.indexOf("most commonly refers to") !== -1) {
            // make a list of such descriptions
            var descriptionList = data[2];

            // iterate thru all of them
            for (var j = 1; j < descriptionList.length; j++) {
                //limit it at 10 words or characters
                var descriptionMin = descriptionList[j].split(" ").splice(0, 10).join(" ");

                // display them and italicize
                previewViewerList.innerHTML += "<li><em>" + descriptionMin + "...</em></li>";
            }
        }



        // if the first element comes back with an empty description
        if (description.length === 0) {
            // show the second one
            //data[2][1]
            previewViewer.innerHTML = "<p>Description not available. Press enter to be redirected to the correct page.</p>";


        } else {
            // just display the first
            previewViewer.innerHTML = "<p>" + description + "</p>";

        }


        // search list logic 

        for (var i = 0; i < searchList.length; i++) {
            // get each link
            var anchorName = url[i];
            // split at a certain point to not have too much content
            anchorName = anchorName.split("").splice((anchorName.indexOf(".") + 1)).join("");

            //display and style accordingly 

            list.innerHTML += "<li class='searchPreview'><span class = 'searchName'>" + searchList[i] + "</span><a target='_blank' href=" + url[i] + ">" + anchorName + "<span><i class='fa fa-external-link' aria-hidden='true'></i></span></a></li>";

        }
    }
}
