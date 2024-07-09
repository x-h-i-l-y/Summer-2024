let lists: {
    main: string,
    second: string,
    third: string,
    fourth: string,
    fifth: string,
    other: string,
} = {
    main: `<div>This is the main page</div>`,
    second: `<div>This is the second page</div>`,
    third: `<div>This is the third page</div>`,
    fourth: `<div>This is the fourth page</div>`,
    fifth: `<div>This is the fifth page</div>`,
    other: `<div>Sorry, I can't find that page.</div>`,
}

console.log(window.location)

const buttons: NodeListOf<Element> = document.querySelectorAll(".buttons")
const text: Element | null = document.querySelector("#text")

let hash: string = window.location.hash;

function getContentFromHash(hash: string): string {
    let contents: string
    switch (hash) {
        case '':
        case '#main':
            contents = lists.main
            break
        case '#2':
            contents = lists.second
            break
        case '#3':
            contents = lists.third
            break
        case '#4':
            contents = lists.fourth
            break
        case '#5':
            contents = lists.fifth
            break
        default:
            contents = lists.other
    }

    return contents
}

function clickToHash(buttons: NodeListOf<Element>): void {
    // let choosing: boolean[] = new Array(buttons.length)
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function () {
            if (i === 0) {
                hash = '#main'
            } else {
                hash = '#' + (i + 1).toString()
            }
            window.location.href = './1.html' + hash

        })
    }
}

function shineButtons(buttons: NodeListOf<Element>, idChosen: number): void {
    if(idChosen < 5) {
        buttons[idChosen].className = "buttons chosen"
    }
    for (let i = 0; i < buttons.length; i++) {
        if (i != idChosen) {
            buttons[i].className = "buttons"
        }
    }
}

function textToText(text: string, element: Element | null): void {
    if (element !== null) {
        element.innerHTML = text
    } else {
        throw "Error: No id called \'text\'!"
    }
}

function getShineButtons(buttons: NodeListOf<Element>, hash: string): void {
    let id: number = 0
    switch (hash) {
        case '':
        case '#main':
            id = 0
            break
        case '#2':
            id = 1
            break
        case '#3':
            id = 2
            break
        case '#4':
            id = 3
            break
        case '#5':
            id = 4
            break
        default:
            id = 5
    }
    shineButtons(buttons, id)
}

let content: string = getContentFromHash(hash)
try {
    textToText(content, text)
} catch (e) {
    console.error(e)
}

clickToHash(buttons)
getShineButtons(buttons, hash)

window.addEventListener('hashchange', () => {
    hash = window.location.hash
    console.log(hash)
    let content: string = getContentFromHash(hash)
    getShineButtons(buttons, hash)
    try {
        textToText(content, text)
    } catch (e: any) {
        console.error(e)
    }
})