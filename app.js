var deleteTag = document.getElementsByClassName('delete')[0];
deleteTag.addEventListener('click', function(event){
    event.stopPropagation();
    console.log("Elimina tag")
})


var searchButtun = $("#serch-gif-bnt");
var searchInput = $("#search-gif-input");

/* Click */
searchInput.click(function(event) {
  console.log("event.key")
});

searchButtun.click(function(event) {
  console.log("event")
});


/***************** Chiamata Ajax per API Giphy ******************/
/*httpRequest = new XMLHttpRequest();

httpRequest.open("GET", "http://api.giphy.com/v1/gifs/trending?api_key=Rpme6fWvSm44NF5kliQGmfz111RsNCZI")
httpRequest.send();
httpRequest.onload = function () {
    var gifsData = JSON.parse(httpRequest.response).data;
    var html = "";
    gifsData.forEach(gif => {
        var url = gif.images.downsized_medium.url;
        var width = gif.images.downsized_medium.width;
        var height = gif.images.downsized_medium.height;

        html += "<div class='column is-one-quarter'>";
        html += "<img src=" + url +" width=" + width + " height=" + height + ">";
        html += "</div>"

        document.getElementById("gifs-container").innerHTML = html;
    });

}*/

/***************** Chiamata Ajax per API Giphy con jQuery ******************/
$.getJSON({
    url: "http://api.giphy.com/v1/gifs/trending?api_key=Rpme6fWvSm44NF5kliQGmfz111RsNCZI",
    success: function (response) {
        var gifsData = response.data;
        var html = "";
        gifsData.forEach(gif => {
            var url = gif.images.downsized_medium.url;
            var width = gif.images.downsized_medium.width;
            var height = gif.images.downsized_medium.height;

        html += "<div class='column is-one-quarter'>";
        html += "<img src=" + url +" width=" + width + " height=" + height + ">";
        html += "</div>"

        $("#gifs-container").append(html);
    });

    }
})



