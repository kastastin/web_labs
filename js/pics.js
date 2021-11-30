document.addEventListener('DOMContentLoaded', () => {
    let pics = Array.from(document.querySelectorAll('.pic'));


    showPics(linkOnPics, pics);
    setAttributeChoosen(pics);
    setHighlight();

    
});

function showPics(links, pictures) {
    for (let i = 0; i < links.length; i++) {
        pictures[i].appendChild(document.createElement('img'));
        pictures[i].children[0].src = links[i];
        pictures[i].children[0].setAttribute('data-isChoosen', 'false');
    }
}


function setAttributeChoosen(pictures) {

    const request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:3000/settings');
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    request.send();
    request.addEventListener('load', function() {
        if (request.status == 200) {
            let data = JSON.parse(request.response),
                srcs = data[data.length - 1].srcs,
                cols = data[data.length - 1].columns;

            let defaultCheckbox = document.querySelector('#two'),
                checkbox = document.querySelector('#three'),
                countOfColumns = cols;
            
            if (countOfColumns == '3') {
                defaultCheckbox.checked = false;
                checkbox.checked = true;
            }
            
            for (let i = 0; i < pictures.length; i++) {
                if (srcs.includes(pictures[i].children[0].src)) {
                    pictures[i].children[0].setAttribute('data-isChoosen', 'true');
                }
            }
        } else {
            console.error('error lol');
        }
    });
}

function setHighlight() {
    let imgs = Array.from(document.querySelectorAll('img'))
        choosenPicSrcs = [];
        
    imgs.forEach(img => {
        img.addEventListener('load', () => {
            if (img.getAttribute('data-ischoosen') == 'true') {
                img.style.border = '4px solid yellow'; 
                choosenPicSrcs.push(img.src);
            }
        });

        img.addEventListener('click', () => {
            if (img.getAttribute('data-ischoosen') == 'false') {
                img.setAttribute('data-isChoosen', 'true');
                img.style.border = '4px solid yellow';  
                choosenPicSrcs.push(img.src);
            } else {
                img.setAttribute('data-ischoosen', 'false');
                img.style.border = 'none'; 
                let index = choosenPicSrcs.indexOf(img.src);
                if (index !== -1) {
                    choosenPicSrcs.splice(index, 1);
                }
            }
        });
    });

    let defaultCheckbox = document.querySelector('#two'),
        checkbox = document.querySelector('#three'),
        countOfColumns = '2';
    
    checkbox.addEventListener('change', () => {
        defaultCheckbox.checked  = false;
        countOfColumns = '3';
    }); 
    defaultCheckbox.addEventListener('change', () => {
        checkbox.checked  = false;
        countOfColumns = '2';
    }); 

    document.querySelector('button').addEventListener('click', (event) => sendWithXML(event, choosenPicSrcs, imgs, countOfColumns));
}

function sendWithXML(e, choosenSrcs, images, cols) {
    e.preventDefault();

    images.forEach(img => {
        img.addEventListener('load', () => {
            if (img.getAttribute('data-ischoosen') == 'true') {
                img.style.border = '4px solid yellow';
            }
        });
    });

    

    let body = {
        srcs: choosenSrcs,
        columns: cols
    };

    let json = JSON.stringify(body);

    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:3000/settings");
    request.setRequestHeader("Content-type", "application/json; charset=utf-8");
    request.send(json);
    request.addEventListener('load', function() {
        if (request.status == 200) {
            let data = JSON.parse(request.response);
            console.log(data);
        } else {
            console.error('ooo error');
        }
    });
}








































const linkOnPics = [
    'https://images.unsplash.com/photo-1633113090205-cc1ac795b5f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1637788917619-aa664489e60c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0Nnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1637798104600-2abd425af051?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1637782571837-2402d978404f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1M3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1633114130148-3f40987134d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1637768441273-185b28f529bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1OXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1558427405-d8dcc49ae7c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1637778078228-5ce31cf34f3d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw2Mnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1593642532009-6ba71e22f468?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxNnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1637740000677-12a6d7ddc801?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw2N3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1637784848689-c77f90f35c2b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyM3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1637580981035-ddfe9a4ace7f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3NHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1633114127408-af671c774b39?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwyNXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1637795065483-b234aa446fea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1OHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1633113089631-6456cccaadad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwyOHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1637785530814-290a07e48e52?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1637824265952-23d3af326954?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzNXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1637686824826-fe0912cc7e61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxM3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1637819425915-b756d2d2292e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0MXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1637576306143-0262e56c5231?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60'
];