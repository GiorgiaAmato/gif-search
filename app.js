var searchButton = $("#search-gif-btn");
var searchInput = $("#input-text");
var disabledTags = [];
var displayGifs =[];


searchInput.click(function(event) {

});

searchButton.click(function(event) {
    var inputText = searchInput.val();
    $.getJSON({
        url: "http://api.giphy.com/v1/gifs/search?q=" + inputText + "&api_key=Rpme6fWvSm44NF5kliQGmfz111RsNCZI",
        success: function (response) {
            var gifsData = response.data;
            var gifsWithCategory = gifsData.map(function (gif) {
                var gifWithCategory = gif;
                gifWithCategory.category = inputText;

                return gifWithCategory;
            })
            
            displayGifs = displayGifs.concat(gifsWithCategory);
            updateGifsHtml();
            searchInput.val("");

            var html = "";
            html += '<span class="tag is-info is-large favorite-category">';
            html += inputText.charAt(0).toUpperCase() + inputText.slice(1);
            html += '<button class="delete is-small"></button> </span>';

            $(".tags").append(html)
        }
    });
});

/* L'evento click viene assegnato al body di modo da poter applicare 
la function anche per i tag che vengono aggiunti tramite la ricerca */
$('body').on('click', '.tag', function(){
    $(this).toggleClass("is-dark");
    $(this).toggleClass("is-warning");

   if($(this).hasClass("is-warning")){
        disabledTags.push($(this).text().trim().toLowerCase());
   } else {
    disabledTags = disabledTags.filter(function (disabledTags) {
        return disabledTags == $(this).text().trim().toLowerCase();
    });
   }
   hideDisabledGifs();
});

/* L'evento click viene assegnato al body di modo da poter applicare 
la function anche per i tag che vengono aggiunti tramite la ricerca */
$('body').on('click', '.tag .delete', function(event){
    event.stopPropagation();

    var category = $(this).parent().text().trim().toLowerCase();

    displayGifs = displayGifs.filter(function(gif){
        return gif.category != category;
    });
    updateGifsHtml();
    $(this).parent().remove();
});



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
        } else {
            $("#" + gif.id).show();
        }
    });
}


function updateGifsHtml() {
    var html = "";
    shuffle(displayGifs).forEach(gif => {
        var url = gif.images.downsized_medium.url;
        var width = gif.images.downsized_medium.width;
        var height = gif.images.downsized_medium.height;

        html += "<div class='column is-one-quarter' id=" + gif.id + ">";
        html += "<img src=" + url +" width=" + width + " height=" + height + ">";
        html += "</div>"
    }); 
    $("#gifs-container").html(html);
}



/* Questa funzione permette di visualizzare le gifs con tag differenti mescolate, 
andando a invertive gli index dell'array*/
function shuffle(array) {
    var currentIndex;
    var swapElement;
    var randomIndex;

    for (currentIndex = 0; currentIndex < array.length; currentIndex++) {
        randomIndex = Math.floor(Math.random() * array.length);
        swapElement = array[currentIndex];
        array[currentIndex] = array [randomIndex];
        array[randomIndex] = swapElement;
    }

    return array;
}







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