function newNote(title) {
	const li = document.createElement('li');
	li.textContent = title;
	li.addEventListener('click', () => {
		page.style.display = 'flex';
		const closeBtn = document.createElement('button');
		closeBtn.textContent = '<';
		closeBtn.id = 'close_button';
		closeBtn.addEventListener('click', () => {
			page.style.display = 'none';
			page.innerHTML = '';
		})
		const heading = document.createElement('input');
		heading.type = 'text';
		heading.id = 'pageTitle';
		heading.value = title;
		const div = document.createElement('div');
		div.append(closeBtn, heading);
		const body = document.createElement('textarea');
		body.id = 'pageText';
		body.placeholder = 'Enter text here'
		page.append(div, body);
	})
	document.querySelector('ul').appendChild(li)
}

add_button.addEventListener('click', () => {
	const title = prompt('Enter Title')
	newNote(title);
});