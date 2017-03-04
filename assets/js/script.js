$(document).ready(() => {

  $(".search-button").click((event) => {
    event.preventDefault()
    $('p.error-text').remove()

    let query = $(".search-field").val()
    let userAgent = 'FreeCodeCamp Project https://codepen.io/ericsnell/pen/oYLBGW'

    // AJAX request for Wikipedia articles containing user's query
    $.ajax({
      url: 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=' + query,
      type: 'GET',
      data: query,
      dataType: 'jsonp',
      success: function(result) {
        if (result.query !== undefined) {
          console.log('result -->', result)
          $(".search-container").animate({ marginTop: '50px' })
          $(".results").empty()
          let results = result.query.pages

          // Delays the display of articles
          setTimeout(showResults, 400)

          // Loops through results and adds each article as a list item, then fades them in in sequence
          function showResults() {
            for (var prop in results) {
              $(".results").append($("<li><a href='https://en.wikipedia.org/wiki?curid=" + results[prop].pageid + "' target='_blank'><div class='wiki-article'><h2>" + results[prop].title + "<h3><p>" + results[prop].extract + "</p></div></a></li>").hide())
            }

            $(".results li").each(function(i) {
              $(this).delay(100 * i).fadeIn()
            })
          }
        } else {
          $(".results").empty()
          $(".search-container").append('<p class="error-text">Couldn\'t find anything. Try again?</p>')
        }
      }
    })
    .fail((error) => {
      console.log("Error: ", error)
    })
  })

})
