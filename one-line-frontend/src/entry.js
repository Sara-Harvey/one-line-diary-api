/* HTML input type hidden -- the info needs to be updated,
but should be unseen/ not modified by users.
back ticks -- allow multi-line template literals (strings)
with embedded expressions
entryFormFields shows up in newEntryForm */

const entryFormFields = `
    <input type="hidden" id="entryId">
    <input type="text" id="date" placeholder="Date"/>
    <input type="text" id="content"  placeholder="To remember"/>`

class Entry {
    constructor(data) {
        this.id = data.id
        this.date = data.date 
        this.content = data.content
    }
    
/* newEntryForm fires when HTML page loads (index.js)
click to submit calls createEntry 
"return false" cancels the default submit action, 
lets JS handle the submission
static functions vs. global -- maintains its value between
function calls, can't be modified outside of function */

    static newEntryForm() {
        let newEntryFormDiv = document.getElementById('entry-form')
        newEntryFormDiv.innerHTML = 
        `<form onsubmit="createEntry(); return false;">` + 
        entryFormFields + 
        `<input type="submit" value="Add new entry" 
        style="color: white; background-color: peru">
        </form>
        <br/>`
    }
    
    static editEntryForm() {
        let editEntryFormDiv = document.getElementById('entry-form')
        editEntryFormDiv.innerHTML = `
        <form onsubmit="updateEntry(); return false;">` + 
        entryFormFields + 
        `<input type="submit" value="Update info">
        </form>
        <br/>`
    }

}

/* AJAX request to entries_controller.rb #index, 
data is JSON response data */

function getEntries() {
    fetch("http://localhost:3000/entries")
    .then(resp => resp.json())
    .then(data => {
        renderEntriesHtml(data)
        addEntriesClickListeners()
    })
}

function createEntry() {
    const entry = {
        date: document.getElementById('date').value,
        content: document.getElementById('content').value,
    }

    fetch("http://localhost:3000/entries", {
        method: 'POST',
        body: JSON.stringify(entry),
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    })
    .then(resp => resp.json() )
    .then(entry => {
         clearEntriesHtml()
         getEntries()
         Entry.newEntryForm()
      });
    
}

/* called in editEntryForm,
issues patch when user submits edit form 
Use patch with JSON */

function updateEntry() {
    let entryId = this.event.target.entryId.value

    const entry = {
        date: document.getElementById('date').value,
        content: document.getElementById('content').value,
    }

    fetch(`http://localhost:3000/entries/${entryId}`, {
        method: 'PATCH',
        body: JSON.stringify(entry),
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    })
    .then(resp => resp.json() )
    .then(entry => {
         clearEntriesHtml()
         getEntries()
         Entry.newEntryForm()
        });
}

/* renders edit form and populates it with new info */
function editEntry() {
    let entryId = this.parentElement.getAttribute('data-entry-id')

    /* Populates form with info */
        fetch(`http://localhost:3000/entries/${entryId}`)
        .then(resp => resp.json())
        .then(data => {
            Entry.editEntryForm()
            let entryForm = document.getElementById('entry-form')
            entryForm.querySelector('#entryId').value = data.id 
            entryForm.querySelector('#date').value = data.date 
            entryForm.querySelector('#content').value = data.content 
        })
}

/* deletes entry */
function deleteEntry() {
    let entryId = this.parentElement.getAttribute('data-entry-id')
    
    fetch(`http://localhost:3000/entries/${entryId}`, {
        method: 'DELETE'
      })
      .then(resp => resp.json())
      .then(json => {
          let selectedEntry = document.querySelector(`.card[data-entry-id="${entryId}"]`) 
          selectedEntry.remove()
      })
}

function addEntriesClickListeners() {
    document.querySelectorAll('.edit-entry-button').forEach(element => {
        element.addEventListener("click", editEntry)
    })

    document.querySelectorAll('.delete-entry-button').forEach(element => {
        element.addEventListener("click", deleteEntry)
    })
}


function clearEntriesHtml() {
    let entriesIndex = document.getElementById("entries-list")
    entriesIndex.innerHTML = ''
}

Entry.prototype.entryHtml = function () {
     
    return `<div class="card" data-entry-id="${this.id}">  
            
            <strong class="entry-date">${this.date}</strong> <br/>
            ${this.content} <br/>
            </br></br>
            
                <button class="edit-entry-button" style="color: white; 
                background-color: #D4AB7F; font-family: Baskerville; 
                font-weight: bold; border: none; border-radius: 5px">
                Edit</button>  

                <button class="delete-entry-button" style="color: white; 
                background-color: #D4AB7F; font-family: Baskerville; 
                font-weight: bold; border: none; border-radius: 5px">
                Delete</button>

            </div>
        </div>` 
}

function renderEntriesHtml(data) {
    let entriesIndex = document.getElementById("entries-list")

    data.forEach((entry) => {          

        let newEntry = new Entry(entry)
        entriesIndex.innerHTML += newEntry.entryHtml() 
   
        let selectedEntryHtml = document.querySelector(`.card[data-entry-id="${newEntry.id}"]`)           
    });

}