(function () {
  var table = document.querySelector('.my-work')
  var rows = table.querySelectorAll('tbody');

  function filterTable(value, columns, classesToHide) {
    [].forEach.call(rows, function(row, index) {
      var hideRow = true
      var cells = row.querySelectorAll('td')

      columns.forEach(function(columnIndex) {
        // value might be an array of values...
        if( Array.isArray(value)) {
          value.forEach(function(item) {
            if ( cells[columnIndex].textContent.toLowerCase().indexOf(item.toLowerCase()) !== -1 ) {
              hideRow = false
            }
          })
        } else {
          if ( cells[columnIndex].textContent.toLowerCase().indexOf(value.toLowerCase()) !== -1 ) {
            hideRow = false
          }
        }

      })

      if (hideRow) {
        row.classList.add('govuk-visually-hidden')
      }
    })
  }

  function resetTable() {
    [].forEach.call(rows, function(row, index) {
      row.classList.remove('govuk-visually-hidden')
    })
  }

  // function hideViewedRows() {
  //   [].forEach.call(rows, function(row, index) {
  //     if (row.classList.contains('viewed')) {
  //       row.classList.add('govuk-visually-hidden')
  //     }
  //   })
  // }

  // Bind filtering functionality to search box
  var searchBox = document.getElementById('search-input')
  var applicationType = document.getElementById('application-type')
  var applicationProgress = document.getElementById('application-progress')
  var searchForm = document.getElementById('search')
  var hideViewed = document.getElementById('hide-viewed')
  searchForm.addEventListener('submit', function(e) {
    e.preventDefault()
    updateSearch()
  })

  // Change handler on the checkboxes
  applicationProgressCheckboxes = Array.prototype.slice.call(document.querySelectorAll('[name="application-progress"]'));
  applicationTypeCheckboxes = Array.prototype.slice.call(document.querySelectorAll('[name="application-type"]'));
  applicationProgressCheckboxes.concat(applicationTypeCheckboxes).forEach(function(checkbox, index) {
    checkbox.addEventListener('change', function(e) {
      updateSearch()
    })
  })

  function getSelectedCheckboxValues(checkboxes) {
    return checkboxes.reduce(function(accumulator, currentCheckbox, currentIndex, array) {
      if(currentCheckbox.checked) {
          return accumulator.concat(currentCheckbox.value)
      } else {
          return accumulator
      }
    }, [])
  }

  function updateSearch() {
    resetTable()

    const applicationProgressChoices = getSelectedCheckboxValues(applicationProgressCheckboxes)
    if (applicationProgressChoices.length > 0) {
        filterTable(applicationProgressChoices, [5])
    }

    const applicationTypeChoices = getSelectedCheckboxValues(applicationTypeCheckboxes)
    if (applicationTypeChoices.length > 0) {
        filterTable(applicationTypeChoices, [3])
    }

    if(searchBox.value.length > 0) {
      filterTable(searchBox.value, [1, 2])
    }

    // if (hideViewed.checked) {
    //     hideViewedRows()
    // }
  }


  // Reset link
  document.getElementById('reset')
  reset.addEventListener('click', function(e) {
    e.preventDefault()
    resetTable()

    searchBox.value = ''
    applicationTypeCheckboxes.concat(applicationProgressCheckboxes).forEach(function(checkbox) {
      checkbox.checked = false
    })
    // hideViewed.checked = false
  })
})()


var coll = document.getElementsByClassName("filter");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}
