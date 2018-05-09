$(document).ready(function() {
  $('.movie-search-btn').click(function(){
    fetchMovieDetails();
  });
});

let fetchMovieDetails = () => {
  let searchString = "http://www.omdbapi.com/?";
  let flag = false;
  let id = $('#id').val().trim();
  let title = $('#title').val().trim();
  let year = $('#year').val().trim();

  if((id == null || id == '' || id.length == 0) && (title == null || title == '' || title.length == 0) && (year == null || year == '' || year.length == 0)) {
    alert("At least one field has to be set");
    return;
  }

  if(id != null && id.length > 0 && id != '') {
    searchString += "i=" + id;
  }

  if(title != null && title.length > 0 && title != '') {
    searchString += "&t=" + title;
  }

  if(year != null && year.length > 0 && year != '') {
    searchString += "&y=" + year;
  }

  //attach the api key at the end
  searchString += "&apikey=c079b297";

  //Make the AJAX call with the string
  makeAjaxCall(searchString);
}

let makeAjaxCall = (searchString) => {
  $.ajax({
    type: 'GET',
    dataType: 'json',
    async: true,
    url: searchString,
    success: (response) => {
      updateValues(response);
    },
    error: (err) => {
      displayError();
    }
  });
}

let updateValues = (response) => {
  if(response.Response != null) {
    displayError();
  }

  let title = response.Title;
  let year = response.Year;
  let img = response.Poster;
  let infoString = "";

  if(title != null) {
    infoString += `Title: ${title}<br />`;
  }

  if(year != null) {
    infoString += `Year: ${year}`;
  }

  if(img != null) {
    $('.movie-img').attr('src', img);
  } else {
    $('.movie-img').attr('src', "https://images.pexels.com/photos/277052/pexels-photo-277052.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");
  }

  $('.card-title').html("Movie Information:<br />");
  $('.card-text').html(infoString);
}

let displayError = () => {
  $('.card-title').html("");
  $('.card-text').html("No info available");
  $('.movie-img').attr('src', 'https://images.pexels.com/photos/277052/pexels-photo-277052.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940');
}
