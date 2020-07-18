import { createApp } from 'vue'
import App from './App.vue'

const
	doc = document,
	body = doc.querySelector('body'),
	isUserScript = typeof GM_info != 'undefined';

function start() {
	body.innerHTML = '';
	body.setAttribute('class', 'h-full p-4 bg-gray-900');

	if (isUserScript) { // UserScript-ben futunk :)

		// takaritsunk
		for (let link of doc.styleSheets) {
			link.disabled = true;
		}

		for (let script of doc.scripts) {
			script.remove();
		}

		// mutassuk meg hogy nez ki egy rendes design
		const cssLink = document.createElement('link');
		cssLink.setAttribute('rel', 'stylesheet');
		cssLink.href = 'https://samzlab.hu/ncn/style.css';

		doc.head.appendChild(cssLink)
	}

	createApp(App).mount(body);
}

if (!isUserScript) { // csak dev mode-ban
	start()
} else if (location.pathname !== '/login.php') { // csak ha mar beleptunk
	// csinaljunk egy 'nCore next' "gombot"
	const span = document.createElement('span');
	span.classList.add('list_alert');
	span.style.cursor = 'pointer';
	span.textContent = 'nCore next';

	span.addEventListener('click', start);

	// tegyuk be a felso menusorba
	body.querySelector('#infosav_adatok').appendChild(span);
}