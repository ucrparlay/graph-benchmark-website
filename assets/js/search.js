(function() {
  function displaySearchResults(results, store) {
    var searchResults = document.getElementById('search-results');

    if (results.length) { // Are there any results?
      var appendString = '';

      for (var i = 0; i < results.length; i++) {  // Iterate over the results
        var item = store[results[i].ref];
        appendString += `<tr>
          <td scope="row">
            <a href="${item.url}">${item.title}</a>
          </td>
          <td>${item.categories.map(category => `<a href="/category/${category.url}/index.html">${category.title}</a>`).join("<br />")}</td>
        </tr>`
      }

      searchResults.innerHTML = appendString;
    } else {
      searchResults.innerHTML = '<tr><td colspan="2">No Results Found</td></tr>';
    }
  }

  function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');

    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');

      if (pair[0] === variable) {
        return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
      }
    }
  }

  var searchTerm = getQueryVariable('query');

  if (searchTerm) {
    document.getElementById('search-heading').innerHTML = `Search Results for '${searchTerm}'`;

    // Initalize lunr with the fields it will be searching on. I've given title
    // a boost of 10 to indicate matches on this field are more important.
    var idx = lunr(function () {
      this.field('id');
      this.field('title', { boost: 10 });
      this.field('categories',  { boost: 5 });
      // this.field('content');
    });

    for (var key in window.store) { // Add the data to lunr
      idx.add({
        'id': key,
        'title': window.store[key].title,
        'categories': window.store[key].categories.map(category => category.title).join(", "),
        // 'content': window.store[key].content
      });

      var results = idx.search(searchTerm); // Get lunr to perform a search
      console.log(results)
      displaySearchResults(results, window.store); // We'll write this in the next section
    }
  }
})();
