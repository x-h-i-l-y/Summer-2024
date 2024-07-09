"use strict";
let lists = {
    main: `<div>This is the main page</div>`,
    second: `<div>This is the second page</div>`,
    third: `<div>This is the third page</div>`,
    fourth: `<div>This is the fourth page</div>`,
    fifth: `<div>This is the fifth page</div>`,
    other: `<div>Sorry, I can't find that page.</div>`,
};
function getContentFromHash(hash) {
    let contents;
    switch (hash) {
        case '':
        case '#/main':
            contents = lists.main;
            break;
        case '#/2':
            contents = lists.second;
            break;
        case '#/3':
            contents = lists.third;
            break;
        case '#/4':
            contents = lists.fourth;
            break;
        case '#/5':
            contents = lists.fifth;
            break;
        default:
            contents = lists.other;
    }
    return contents;
}
function clickToHash(buttons, hash) {
    // let choosing: boolean[] = new Array(buttons.length)
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function () {
            if (i === 0) {
                hash = '#/main';
            }
            else {
                hash = '#/' + (i + 1).toString();
            }
            window.location.href = './1.html' + hash;
        });
    }
}
function shineButtons(buttons, idChosen) {
    if (idChosen < 5) {
        buttons[idChosen].className = "buttons chosen";
    }
    for (let i = 0; i < buttons.length; i++) {
        if (i != idChosen) {
            buttons[i].className = "buttons";
        }
    }
}
function textToText(text, element) {
    if (element !== null) {
        element.innerHTML = text;
    }
    else {
        throw "Error: No id called \'text\'!";
    }
}
function getShineButtons(buttons, hash) {
    let id;
    switch (hash) {
        case '':
        case '#/main':
            id = 0;
            break;
        case '#/2':
            id = 1;
            break;
        case '#/3':
            id = 2;
            break;
        case '#/4':
            id = 3;
            break;
        case '#/5':
            id = 4;
            break;
        default:
            id = 5;
    }
    shineButtons(buttons, id);
}
const buttons = document.querySelectorAll(".buttons");
const text = document.querySelector("#text");
let hash = window.location.hash;
let content = getContentFromHash(hash);
try {
    textToText(content, text);
}
catch (e) {
    console.error(e);
}
clickToHash(buttons, hash);
getShineButtons(buttons, hash);
window.addEventListener('hashchange', () => {
    hash = window.location.hash;
    console.log(hash);
    let content = getContentFromHash(hash);
    getShineButtons(buttons, hash);
    try {
        textToText(content, text);
    }
    catch (e) {
        console.error(e);
    }
});
