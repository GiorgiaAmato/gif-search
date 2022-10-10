var deleteTag = document.getElementsByClassName('delete')[0];
deleteTag.addEventListener('click', function(event){
    event.stopPropagation();
    console.log("Elimina tag")
})


httpRequest = new XMLHttpRequest();

httpRequest.open("GET", "http://api.giphy.com/v1/gifs/trending?api_key=Rpme6fWvSm44NF5kliQGmfz111RsNCZI")