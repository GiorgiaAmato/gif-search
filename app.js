var searchButtun = $("#serch-gif-bnt");
var searchInput = $("#search-gif-input");
var favouriteTags = $(".tag");
var disabledTags = [];
var displayGifs =[];

/* Click */
searchInput.click(function(event) {
  console.log("event.key")
});

searchButtun.click(function(event) {
  console.log("event")
});

favouriteTags.click(function(){
    console.log("Hai cliccato un tag");
    $(this).toggleClass("is-success");
    $(this).toggleClass("is-danger");

   if($(this).hasClass("is-danger")){
        disabledTags.push($(this).text().trim().toLowerCase());
   } else {
    disabledTags = disabledTags.filter(function (disabledTags) {
        return disabledTags == $(this).text().trim().toLowerCase();
    });
   }
   hideDisabledGifs();
   console.log(disabledTags);

})


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
        var gifsWithCategory = gifsData.map(function (gif) {
            var gifWithCategory = gif;
            gifWithCategory.category = "trending";

            return gifWithCategory;
        })
        
        displayGifs = displayGifs.concat(gifsWithCategory);
        updateGifsHtml();
    }
})


function hideDisabledGifs() {
    displayGifs.forEach(function(gif) {
        if(disabledTags.indexOf(gif.category)>= 0) {
            $("#" + gif.id).hide();
        }
    })
}


function updateGifsHtml() {
    var html = "";
    displayGifs.forEach(gif => {
        var url = gif.images.downsized_medium.url;
        var width = gif.images.downsized_medium.width;
        var height = gif.images.downsized_medium.height;

        html += "<div class='column is-one-quarter' id=" + gif.id + ">";
        html += "<img src=" + url +" width=" + width + " height=" + height + ">";
        html += "</div>"

        $("#gifs-container").append(html);
    }); 
}