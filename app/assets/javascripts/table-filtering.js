(function () {
  var table = document.querySelector('.my-work')
  var rows = table.querySelectorAll('tbody');

  function filterTable(value, columns, classesToHide) {
    [].forEach.call(rows, function(row, index) {
      var hideRow = true
      var cells = row.querySelectorAll('td')

      columns.forEach(function(columnIndex) {
        if ( cells[columnIndex].textContent.toLowerCase().indexOf(value.toLowerCase()) !== -1 ) {
          hideRow = false
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

  function hideViewedRows() {
    [].forEach.call(rows, function(row, index) {
      if (row.classList.contains('viewed')) {
        row.classList.add('govuk-visually-hidden')
      }
    })
  }

  // Bind filtering functionality to search box
  var searchBox = document.getElementById('search-input')
  var applicationType = document.getElementById('application-type')
  var applicationProgress = document.getElementById('application-progress')
  var searchForm = document.getElementById('search')
  var hideViewed = document.getElementById('hide-viewed')
  searchForm.addEventListener('submit', function(e) {
    e.preventDefault()
    resetTable()
    filterTable(applicationType.value, [3])
    filterTable(applicationProgress.value, [5])
    filterTable(searchBox.value, [1, 2])

    if (hideViewed.checked) {
        hideViewedRows()
    }

  })


  // Reset link
  document.getElementById('reset')
  reset.addEventListener('click', function(e) {
    e.preventDefault()
    resetTable()

    searchBox.value = ''
    applicationType.value = ''
    applicationProgress.value = ''
    hideViewed.checked = false
  })
})()
