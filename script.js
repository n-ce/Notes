

function newNote(title){
	const li = document.createElement('li');
	li.textContent = title;
	li.addEventListener('click', () => {
		page.innerHTML = '';
		page.classList.toggle('hide');
		const heading = document.createElement('input');
		heading.type = 'text';
		heading.id = 'pageTitle';
		heading.placeholder = title;
		const body = document.createElement('textarea');
		body.id = 'pageText';
		body.placeholder = 'Enter text here'
		page.append(heading, body);
	})
	document.querySelector('ul').appendChild(li)
}

add_button.addEventListener('click', () => {
	const title = prompt('Enter Title')
	newNote(title);
});