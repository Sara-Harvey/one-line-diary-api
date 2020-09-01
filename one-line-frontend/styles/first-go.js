const entryFormFields = `
    <input type="hidden" id="entryId">
    <input type="text" id="date" placeholder="Date"/>
    <input type="text" id="content"  placeholder="What to remember?"/>`

class Entry {
    constructor(data) {
        this.id = data.id
        this.date = data.date 
        this.content = data.content
    }
    

    static newEntryForm() {
        let newEntryFormDiv = document.getElementById('entry-form')
        newEntryFormDiv.innerHTML = `
        <form onsubmit="createEntry(); return false;">` + 
        entryFormFields + 
        `<input type="submit" value="Add new entry" style="color:white;background-color:green">
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

function getEntries() {
    fetch("http://localhost:3000/entries")
    .then(resp => resp.json())
    .then(data => {
        renderEntriesHtml(data)
        addEntriesClickListeners()
        addEventsClickListeners()
    })
}

// Handler to create new entry
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

/*
// Click on entry to view/hide additional info
function showMoreInfo() {
    console.log("this", this)
    console.log(this.parentElement.querySelector('.additional-info'))
    toggleHideDisplay(this.parentElement.querySelector('.additional-info'))
}
*/

// Issue a patch when the edit entry form is submitted
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

// Handler to render the edit form and populate it with current info
function editEntry() {
    let entryId = this.parentElement.getAttribute('data-entry-id')

    // Populate the form with entry info
        fetch(`http://localhost:3000/entries/${entryId}`)
        .then(resp => resp.json())
        .then(data => {
            Entry.editEntryForm()
            let entryForm = document.getElementById('entry-form')
            entryForm.querySelector('#date').value = data.date 
            entryForm.querySelector('#content').value = data.content 
        })
}

// Handler to delete an entry
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

/*
function addEntriesClickListeners() {
     document.querySelectorAll('.entry-name').forEach(element => {
        element.addEventListener("click", showMoreInfo)
    })

    document.querySelectorAll('.edit-entry-button').forEach(element => {
        element.addEventListener("click", editEntry)
    })

    document.querySelectorAll('.delete-entry-button').forEach(element => {
        element.addEventListener("click", deleteEntry)
    })

    document.querySelector('.sort-button').addEventListener("click", sortEntries)
    
}
*/

/*
function sortEntries() { 

    fetch("http://localhost:3000/entries")
    .then(resp => resp.json())
    .then(data => {

        data.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)); 
        console.log(data)
        clearEntriesHtml()
        renderEntriesHtml(data)
        addEntriesClickListeners()
        addEventsClickListeners()
    })


}
*/

function clearEntriesHtml() {
    let entriesIndex = document.getElementById("entries-list")
    entriesIndex.innerHTML = ''
}


/*
Entry.prototype.entryEventsHtml = function () {

	let entryEvents = this.events.map(event => {
        let date = parseDate(event.updated_at)

        return (`
        <div class="card" event-id="${event.id}" >
        <i>Last update: </i>${date} <br/>
        <strong>Title: </strong>${event.title} <br/>
        <strong>Description: </strong>${event.description} <br/>
        
        <button class="edit-event-button" style="background-color:orange">Edit Record</button>  
        <button class="delete-event-button" style="background-color:red">Delete Record</button>  
        </div>
		`)
    }).join('')

    return (entryEvents)
}
*/


Entry.prototype.entryHtml = function () {
     
    return `<div class="card" data-entry-id="${this.id}">
            <button class="view-events-entry-button" style="background-color:blue">View Record</button>  
            <button class="edit-entry-button" style="background-color:orange">Edit Info</button>  
            <button class="delete-entry-button" style="background-color:red">Delete entry</button>
            </br></br>
            <strong class="entry-date">${this.date}</strong> <br/>
            <strong>Content: </strong>${this.content} <br/>
            </div>
        </div>` 
}

Entry.prototype.addEventButton = function () {

    let addNewEventButton = document.createElement('button')
    addNewEventButton.className = 'add-event-button'
    addNewEventButton.id = this.id 
    /* addNewEventButton.innerText = "Add Event" */
    /* addNewEventButton.style.backgroundColor = "green" */
     
    /* return addNewEventButton */

}

function renderEntriesHtml(data) {
    let entriesIndex = document.getElementById("entries-list")

    data.forEach((entry) => {
  
        /* let eventsIndexHtml = document.createElement('div') */
        /* eventsIndexHtml.className = 'events' */
        /* eventsIndexHtml.style.display = 'none' */
        /* let emptyEventsHtml = eventsIndexHtml */
          

        let newEntry = new Entry(entry)
        /* eventsIndexHtml.innerHTML = newEntry.entryEventsHtml() */    
   
        entriesIndex.innerHTML += newEntry.entryHtml() 
   
        let selectedEntryHtml = document.querySelector(`.card[data-entry-id="${newEntry.id}"]`)           
        selectedEntryHtml.append(eventsIndexHtml.childElementCount ? eventsIndexHtml : emptyEventsHtml )
        /* selectedEntryHtml.querySelector('.events').appendChild(newEntry.addEventButton()) */

    });

}