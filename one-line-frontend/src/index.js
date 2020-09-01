/* when the HTML document loads, the program fetches the list 
of entries, and renders the form for a new entry */

document.addEventListener("DOMContentLoaded", () => {
    getEntries();
    Entry.newEntryForm()
 })