const BASE_URL = "http://localhost:3000"
const ENTRIES_URL = `${BASE_URL}/entries`

function fetchEntries() {
  return fetch(ENTRIES_URL)
    .then(resp => resp.json())
    .then(json => renderEntries(json))
}

function renderEntries(json) {
  const main = document.querySelector('main')
  json.forEach(entry => {
    const h2 = document.createElement('h2')
    h2.innerHTML = `<h2>${entry.content}</h2>`
    main.appendChild(h2)
  })
}

document.addEventListener('DOMContentLoaded', function() {
  fetchEntries()
})