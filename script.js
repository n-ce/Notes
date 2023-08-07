/*
we store data using local storage
we store list of all titles in a map separetly

each note title is its own localstorage id

*/
// array of strings : note titles 
const savedNotes = localStorage.getItem('notes');

const noteList = savedNotes ?
	savedNotes.split(',') : [];


let currentNote = '';


function closeBtn() {
	const closeBtn = document.createElement('button');
	closeBtn.textContent = '<';
	closeBtn.id = 'close_button';
	closeBtn.addEventListener('click', () => {
		if (!pageTitle.value && pageText.value)
			if (!confirm('Your note won\'t be saved without a title. Continue?'))
				return;
		page.style.display = 'none';
		page.innerHTML = '';
		currentNote = '';
	});
	return closeBtn;
}


function heading(string) {
	const heading = document.createElement('input');
	heading.type = 'text';
	heading.id = 'pageTitle';
	heading.addEventListener('input', e => {
		if (e.data === ',') {
			heading.value = heading.value.slice(0, heading.value.length - 1);
			alert('comma not allowed.')
			return;
		}
		if (currentNote) {
			localStorage.removeItem(currentNote);
			noteList.splice(noteList.indexOf(currentNote), 1);
			document.getElementById(currentNote).remove();
		}
		currentNote = heading.value;
		localStorage.setItem(currentNote, pageText.value);
		noteList.push(currentNote);
		newNote(currentNote);
		localStorage.setItem('notes', noteList.toString());

	})
	string ?
		heading.value = string :
		heading.placeholder = 'Enter Note Title Here';
	return heading;
}

function openNote(title) {
	if (page.style.display === 'flex') {
		close_button.click();
		return;
	}
	currentNote = title;
	page.style.display = 'flex';
	const body = document.createElement('textarea');
	body.id = 'pageText';
	body.placeholder = 'Enter text here';
	body.value = localStorage.getItem(title);
	body.addEventListener('input', () => {
		if (pageTitle.value)
			localStorage.setItem(pageTitle.value, body.value);
	});
	const div = document.createElement('div');
	div.append(closeBtn(), heading(title));
	page.append(div, body);
}


function route(path) {
	history.pushState({}, '', new URL(path, location.origin));
	openNote(path);
}

function newNote(title) {
	const li = document.createElement('li');
	li.id = title;
	const anchor = document.createElement('a');
	anchor.href = "/" + title;
	anchor.textContent = title;
	anchor.addEventListener('click', e => {
		e.preventDefault();
		route(e.target.textContent)
	});
	li.addEventListener('click', () => {
		anchor.click();
	});
	li.appendChild(anchor);
	document.querySelector('ul').appendChild(li)
}

for (const note of noteList)
	newNote(note);



add_button.addEventListener('click', (e) => {
	e.preventDefault();
	history.pushState({}, '', location.origin);
	openNote();
})

search.addEventListener('keyup', () => {
	for (const i of list.children) {
		i.style.display =
			i.textContent.toLowerCase()
			.includes(search.value.toLowerCase()) ?
			'list-item' : 'none';
	}
})

addEventListener('popstate', _ => openNote(location.pathname.substring(1)))