$(document).ready(() => {

  $(".search-button").click((event) => {
    event.preventDefault()

    /*-- Variables --*/
    let query = $(".search-field").val()
    let userAgent = 'FreeCodeCamp Project https://codepen.io/ericsnell/pen/oYLBGW'

    // Remove any displayed error message
    $('p.error-text').remove()

    // AJAX request to WIkiMedia API for Wikipedia articles containing user's query
    $.ajax({
      url: `https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=${ query }`,
      type: 'GET',
      data: query,
      dataType: 'jsonp',
      success(result) {

        // If user's query returns results, display them. If not, show error message
        if (result.query !== undefined) {
          console.log('result -->', result)
          let results = result.query.pages

          $(".search-container").animate({ marginTop: '50px' })
          $(".results").empty()

          // Delays the display of articles after a short delay
          setTimeout(showResults, 400)

          // Loops through results and adds each article as a list item, then fades them in in sequence
          function showResults() {
            for (var prop in results) {
              $(".results").append(
                $(`<li><a href='https://en.wikipedia.org/wiki?curid=${ results[prop].pageid }' target='_blank'><div class='wiki-article'><h2>${ results[prop].title }<h3><p>${ results[prop].extract }</p></div></a></li>`)
                .hide()
              )
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

    // Handles any AJAX error
    .fail(error => console.log("Error: ", error))

  })

})
