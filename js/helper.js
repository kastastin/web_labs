indicateCurrentLaba();


const textExercises = [
    'Поміняйте місцями контент блоків «3» та «6»',
    'Напишіть функцію, яка обчислює площу трапеції, беручи необхідні значення із відповідних змінних у скрипті, і виводить отриманий результат в кінці контенту в блоці «5»',
    'Напишіть скрипт, який визначає всі дільники заданого натурального числа, беручи це число із відповідної форми в блоці «5», а отриманий результат виводить за допомогою діалогового вікна і зберігає в куках, причому:\n а) при оновленні документа в броузері користувачу за допомогою діалогового вікна виводиться інформація, збережена в куках, із питанням про необхідність зберегти дані із куків, і не виводиться згадана вище форма;\n б) при підтвердженні питання виводиться наступне діалогове вікно із інформуванням користувача про наявність куків і необхідність перезавантаження документа;\n в) при відмові відповідні куки видаляються, і документ оновлюється з початковим станом із наявною формою для введення даних',
    'Напишіть скрипт, який при настанні події change встановлює верхній регістр перших літер усіх слів у блоці «4» при встановленні користувачем відповідної радіокнопки у формі і зберігає відповідне значення в локальному сховищі броузера так, щоб при наступному відкриванні документа властивість верхнього регістру перших літер усіх слів у блоці «4» встановлювалась із збереженого значення в локальному сховищі',
    'Напишіть скрипт додавання зображень в блок «4»:\n а) необхідні елементи форми появляються у блоці «5» внаслідок кліку на блоці «х» одразу після наявного в блоці «5» контенту;\n б) кількість зображень необмежена, використовуйте зображення з інтернету;\n в) поруч розміщується кнопка, внаслідок натискання на яку внесені дані зображення зберігаються в локальному сховищі броузера (структуровано на ваш розсуд), а саме зображення додається в кінці початкового вмісту блока «4»;\n г) під кожним новим зображенням розміщується кнопка, внаслідок натискання на яку нове зображення видаляється із локального сховища броузера і припиняється його відображення у блоці «4» без перезавантаження документа'
];

const content5Text = 'Це блок номер 5, в ньому нічого немає крім цього тексту і форми для завдання. Пізніше мені знадобиться цей блок для виконання завдання.'

function getLastSign(element) {
    let trimmedTitle = element.textContent.trim();
    return trimmedTitle[trimmedTitle.length - 1] - 1;
}

function indicateCurrentLaba() {
	let labs = Array.from(document.querySelectorAll('.nav-link')), // Nodelist -> Array
        currentLaba = +getLastSign(document.querySelector('.header-title')),
        laba = labs[currentLaba];
    laba.style.borderColor = 'orange';
    laba.style.color = 'orange';
}

function readCookie(name) {
	let nameCook = name + "=",
	    spl = document.cookie.split(';');

	for(var i=0; i<spl.length; i++) {
		var c = spl[i];
		while(c.charAt(0) == " ") {
			c = c.substring(1, c.length);
		}
		if(c.indexOf(nameCook) == 0) {
			return c.substring(nameCook.length, c.length);
		}
	}
	return null;
}

function deleteAllCookie() {
    const cookies = document.cookie.split(/;/);
    for (let i = 0; i < cookies.length; i++) {
	    let cookie = cookies[i].split(/=/);
	    document.cookie = cookie[0] + "=;max-age=-1";
    }
}

function deleteAllChildren(element) {
	while (content5.firstChild) {
		content5.removeChild(content5.firstChild);
	}
}

function clearContent5() {
	deleteAllChildren(content5);

	p = document.createElement('p');
	content5.appendChild(p);
	p.textContent = content5Text;
}

function rnd() {
	min = Math.ceil(10);
	max = Math.floor(99);
	return Math.floor(Math.random() * (99 - 10)) + 1;
}