const BASE_URL = "http://localhost:3000"
const ENTRIES_URL = `${BASE_URL}/entries`

function fetchEntries() {
  return fetch(ENTRIES_URL)
    .then(resp => resp.json())
    .then(json => renderEntries(json))
}

function renderEntries(json) {
  const main = document.getElementById('main')
  json.forEach(entry => {
    var para = document.createElement('P')
    para.innerHTML = `${entry.date} — ${entry.content}`
    main.appendChild(para)
  })
}

document.addEventListener('DOMContentLoaded', function() {
  fetchEntries()
})