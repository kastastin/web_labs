let exerciseButton = document.querySelector('.read_exercise_btn');


exerciseButton.addEventListener('click', () => {
    let isConfirm = confirm(textExercise);
    
    if (isConfirm) runExercise();
});

function runExercise() {
    let isChooseImgs = confirm("Об'єкт буде створено в блоці '4', тому що він має більші розміри\nОберіть картинки");

    // if (isChooseImgs) window.location.href="pics.html";
    if (isChooseImgs) {
        window.open(
            'pics.html',
            '_blank'
          );
    }
}




const block4 = document.querySelector('aside');

function takePicsFromJSON() {
    const request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:3000/settings');
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    request.send();
    request.addEventListener('load', function() {
        if (request.status == 200) {
            let data = JSON.parse(request.response),
                srcs = data[data.length - 1].srcs,
                cols = data[data.length - 1].columns;
            
            block4.style.columnCount = cols;

            for (let i = 0; i < srcs.length; i++) {
                let figure = document.createElement('figure'),
                    img = document.createElement('img');

                block4.appendChild(figure);
                figure.appendChild(img);
                img.src = srcs[i];
            }
        } else {
            console.error('error lol');
        }
    });
}

takePicsFromJSON();

