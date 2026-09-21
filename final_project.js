const cards = [
	{ word: "la lumière", translation: "the light" },
	{ word: "le voyage", translation: "the journey" },
	{ word: "apprendre", translation: "to learn" }
];

let cardIndex = 0;
let showingAnswer = false;
const toast = document.querySelector('.toast');

function notify(message) {
	toast.textContent = message;
	toast.classList.add('show');
	window.clearTimeout(window.toastTimer);
	window.toastTimer = window.setTimeout(() => toast.classList.remove('show'), 2400);
}

document.querySelectorAll('[data-action]').forEach((button) => {
	button.addEventListener('click', () => {
		const action = button.dataset.action;
		if (action === 'next-card') {
			cardIndex = (cardIndex + 1) % cards.length;
			showingAnswer = false;
			document.querySelector('#word').textContent = cards[cardIndex].word;
			document.querySelector('#translation').textContent = cards[cardIndex].translation;
			document.querySelector('#card-count').textContent = `Card ${String(cardIndex + 4).padStart(2, '0')} of 20`;
		} else if (action === 'flip') {
			showingAnswer = !showingAnswer;
			document.querySelector('#translation').textContent = showingAnswer ? 'Say it out loud, then tap next.' : cards[cardIndex].translation;
		} else if (action === 'quiz') {
			notify('Quiz started.');
		} else if (action === 'lesson') {
			notify('Lesson started.');
		} else {
			notify('This section is ready.');
		}
	});
});

document.querySelectorAll('.nav button').forEach((button) => button.addEventListener('click', () => {
	document.querySelector('.nav button.active').classList.remove('active');
	button.classList.add('active');
	notify(`${button.textContent.trim()} selected`);
}));
