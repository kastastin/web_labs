let exercices = Array.from(document.querySelectorAll('.exercise-item')),
    content4 = document.querySelector('.aside'),
    content4p = document.querySelector('.aside p'),
    content5 = document.querySelector('.main');


document.addEventListener('DOMContentLoaded', () => {
    let isAllowCookie = false;
    if (readCookie('num') != null) {
        isAllowCookie = confirm(`Зберегти дані з куків?\nnum=${readCookie('num')};\ndividers=${readCookie('dividers')}`);
    }
    if (isAllowCookie) {
        alert('Необхідно перезагрузити сторінку!\nКуки є в наявності.');
        runThirdExercise(false);
    } else {
        deleteAllCookie();
        runThirdExercise();
    }
    content4p.style.textTransform = (localStorage.radio == 'first') ? 'capitalize' : 'none';
});   


(function addExerciseListeners() {
    for (let [index, exercise] of exercices.entries()) {
        exercise.addEventListener('click', () => {
            let isConfirm = confirm(textExercises[index]);
            if (isConfirm) {
                exerciseFunctionsToRun[index]();
            }
        });
    }
}());

const exerciseFunctionsToRun = [
    runFirstExercise,
    runSecondExercise,
    runThirdExercise,
    runFourthExercise,
    runFifthExercise
];


// -----  Exercise 1  -----
function runFirstExercise() {
    let a = document.querySelector('.section3 p'),
        b = document.querySelector('.section6 p');
    
    [a.textContent, b.textContent] = [b.textContent, a.textContent];
}


// -----  Exercise 2  -----
function runSecondExercise() {
    clearContent5();
    const getSquareTrapezoid = (a, b, h) => ( (a + b) / 2 ) * h;

    if (content5.textContent.length < 138) {
        content5.firstChild.textContent += `Площа трапеції = ${getSquareTrapezoid(10, 20, 5)}`;
    } 
}


// -----  Exercise 3  -----
function runThirdExercise(isInitial=true) {
    let form = document.createElement('div'),
        input = document.createElement('input'),
        button = document.createElement('input'),
        p = document.createElement('p'),
        p2 = document.createElement('p');

    clearContent5(); 
    displayForm();
    isInitial ? initializeBefore() : initializeAfter();

    function initializeBefore() {
        form.appendChild(input);
        button.addEventListener('click', () => {
            p.textContent = `Число: ${input.value}`;
            let choosenNum = +document.querySelector('.choosenNum').textContent.substr(7);

            if (choosenNum < 0) {
                p2.textContent = 'Число повинно бути натуральним';
            } else {
                p2.textContent = getDividers(choosenNum);
                alert(getDividers(choosenNum));
                document.cookie = `num=${choosenNum}`;
                document.cookie = `dividers=${getDividers(choosenNum)}`;
            }
        });
    }

    function initializeAfter() {
        p.textContent = `Число: ${readCookie('num')}`;
        p2.textContent = readCookie('dividers');
        button.value = 'Видалити куки і ввести самостійно'
        button.addEventListener('click', () => {
            deleteAllCookie();
            window.location.reload();
        });
    }

    function displayForm() {
        content5.appendChild(form);
        form.style.margin = '0 auto';
        form.style.width = '35%';
        form.style.display = 'flex';
        form.appendChild(button);
        content5.appendChild(p);
        p.classList.add('choosenNum');
        content5.appendChild(p2);
        input.type = 'number';
        input.autofocus = true;
        button.type = 'button';
        button.value = 'Визначити';
        button.style.margin = '0 auto';
    }

    function getDividers(num) {
        const dividers = [];
        for (let i = 1; i <= num; i++) {
            if (num % i == 0) dividers.push(i);
        }     
        return `Дільники: ${dividers.join(', ')}`
    }
}


// ----- Exrcise 4  -----
function runFourthExercise() {
    let div = document.createElement('div'),
        firstRadio = document.createElement('input'),
        highText = document.createElement('h5'),
        secondRadio = document.createElement('input');
        lowText = document.createElement('h5'),

    
    clearContent5();
    displayRadios();

    function displayRadios() {
        content5.appendChild(div);
        div.style.display = 'flex';
        div.style.justifyContent = 'space-around';
        div.style.alignItems = 'center';
        div.style.margin = '0 auto';
        div.style.width = '48%';
        div.appendChild(firstRadio);
        firstRadio.id = 'first';
        firstRadio.type = 'radio';
        firstRadio.name = 'radios';
        div.appendChild(highText);
        highText.textContent = 'Верхній регістр'
        div.appendChild(secondRadio);
        firstRadio.id = 'second';
        secondRadio.type = 'radio';
        secondRadio.name = 'radios';
        secondRadio.setAttribute('checked', 'true');
        div.appendChild(lowText);
        lowText.textContent = 'Нижній регістр'
    }

    if (localStorage.radio == 'first') firstRadio.checked = 'true';
    if (localStorage.radio == 'second') secondRadio.checked = 'true';
       
    firstRadio.addEventListener('change', () => {
        content4p.style.textTransform = 'capitalize';
        localStorage.radio = 'first';
    });

    secondRadio.addEventListener('change', () => {
        content4p.style.textTransform = 'none';
        localStorage.radio = 'second';
    });
}


// -----  Exercise 5  -----
function runFifthExercise() {
    let h1 = document.querySelector('h1'),
        p = document.createElement('p'),
        div = document.createElement('div'),
        btnAdd = document.createElement('button'),
        btnLimit = document.createElement('p'),
        btnSave = document.createElement('button');


    h1.addEventListener('click', () => {
        content4p.remove();
        clearContent5();
        content4.style.display = 'flex';
        content4.style.flexWrap = 'wrap';
        content5.appendChild(div);
        div.style.display = 'flex';
        div.style.justifyContent = 'center';
        div.style.alignItems = 'center';
        div.style.height = '40%';
        div.appendChild(btnAdd);
        btnAdd.textContent = 'Дадати зображення';
        div.appendChild(btnLimit);
        btnLimit.textContent = `Ще можна додати ${9 - content4.children.length} зображень`;
        div.appendChild(btnSave);
        btnSave.textContent = 'Зберегти';
        
    
        const srcs = localStorage.getItem('srcs').split(',');
        for (let i = 0; i < +localStorage.getItem('imgs'); i++) {

            displayImg(srcs[i]);
            displayDeleteBtns();

        }

        checkImgLimit();
    });
    
    btnAdd.addEventListener('click', () => {
        displayImg(`http://placekitten.com/g/1${rnd()}/1${rnd()}`);
        checkImgLimit();
        displayDeleteBtns();
    });

    btnSave.addEventListener('click', () => {
        if (!content4.children.length) alert('Немає картинок, які можна зберегти');
        addToLocalStorage(content4.children.length);
    });

    function displayImg(link) {
        let imgContainer = document.createElement('div'),
            imgBtn = document.createElement('button'),
            img = document.createElement('img');

        content4.appendChild(imgContainer);
        imgContainer.style.width = '100px';
        imgContainer.style.height = '120px';
        imgContainer.style.display = 'flex';
        imgContainer.style.flexDirection = 'column';
        imgContainer.appendChild(img);
        img.style.width = '100px';
        img.style.height = '100px';
        img.src = link;
        imgContainer.appendChild(imgBtn);
        imgBtn.textContent = 'Видалити';
        btnLimit.textContent = `Ще можна додати ${9 - content4.children.length} зображень`;
    }

    function displayDeleteBtns() {
        let btns = Array.from(document.querySelectorAll('aside button')),
            containers = Array.from(document.querySelectorAll('aside div'));

        for (let i = 0; i < btns.length; i++) {
            btns[i].addEventListener('click', () => {
                containers[i].remove();
                if (localStorage.srcs != null) addToLocalStorage(content4.children.length);
                
                div.firstChild.style.display = 'block';
                btnLimit.textContent = `Ще можна додати ${9 - content4.children.length} зображень`;
            });
        }
    }

    function checkImgLimit() {
        if (content4.children.length == 9) {
            btnAdd.style.display = 'none';
            btnLimit.textContent = `Більше зображень додати не можна`;
        }
    }

    function addToLocalStorage(imgsCount) {
        let imgs = Array.from(document.querySelectorAll('img'));
            srcsRow = [];

        for (let i = 0; i < imgs.length; i++) srcsRow.push(imgs[i].src);
        localStorage.setItem('imgs', imgsCount);
        localStorage.setItem('srcs', srcsRow);
    }
} 