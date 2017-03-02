$(document).ready(() => {

  $(".search-button").click((event) => {
    event.preventDefault();
    let query = $(".search-field").val();
    let userAgent = 'FreeCodeCamp Project https://codepen.io/ericsnell/pen/oYLBGW'

    // AJAX request for Wikipedia articles containing user's query
    $.ajax({
      url: 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=' + query,
      type: 'GET',
      data: query,
      dataType: 'jsonp',
      success: function(result) {
        console.log('result -->', result);
        $(".search-container").removeClass("center").addClass("top");
        $(".results").empty();
        let results = result.query.pages;

        for (var prop in results) {
          $(".results").append("<li><a href='https://en.wikipedia.org/wiki?curid=" + results[prop].pageid + "' target='_blank'><div class='wiki-article'><h2>" + results[prop].title + "<h3><p>" + results[prop].extract + "</p></div></a></li>")
        }
      }
    })
    .fail((error) => {
      console.log("Error: ", error);
    })
  });

})
