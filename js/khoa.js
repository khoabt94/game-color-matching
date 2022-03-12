////////////////////////////////////////////////////////////
// SELECTOR & VARIABLES
const cells = [...document.querySelectorAll('#colorList > li')]
const overlays = [...document.querySelectorAll('#colorList > li > div')]
const board = document.getElementById('colorList')
const timer = document.querySelector('.game__timer')
const playBtn = document.querySelector('.game__button')
const background = document.querySelector('.color-background')

let selection = []
const colors = [
    'rgb(67, 63, 158)',
    'rgb(74, 0, 178)',
    'rgb(5, 145, 52)',
    'rgb(129, 147, 10)',
    'rgb(108, 165, 33)',
    'rgb(186, 237, 144)',
    'rgb(218, 234, 96)',
    'rgb(168, 64, 43)'
    ]
const TIMER_LIMIT = 30

//////////////////////////////////////////////////////////////
// HELPER FUNCTIONS
const shuffleColor = (arr) => {
    const fullArr = [...arr, ...arr]
    for (let i = fullArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i)
        const temp = fullArr[i]
        fullArr[i] = fullArr[j]
        fullArr[j] = temp
    }
    return fullArr
}

const assignColor = (cells, colors) => {
    cells.forEach((cell, i) => {
        cell.style.backgroundColor = colors[i]
    })
}

const clickCell = (e) => {
    // Check previous pair
    let result = checkPair(selection)
    if (result === 'right') {
        selection.forEach(el => el.classList.add('win'))
        removeActive()
    }
    if (result === 'wrong') removeActive()

    // Add current cell to selection
    const target = e.target.closest('li')
    if (!target) return
    target.classList.add('active')
    selection.push(target)
}

const checkPair = (arr) => {
    if (arr.length < 2) return 'loading'
    const color1 = arr[0].querySelector('.overlay').style.backgroundColor
    const color2 = arr[1].querySelector('.overlay').style.backgroundColor

    if (color1 === color2) return 'right'     
    else return 'wrong'
}

const checkWin = () => board.querySelectorAll('.win').length === 14

const removeActive = () => {
    const active = board.querySelectorAll('.active')
    active.forEach(el => el.classList.remove('active'))
    selection = []
}

const togglePlayBtn = (opacity, visibility) => {
    playBtn.style.opacity = opacity
    playBtn.style.visibility = visibility
}

//////////////////////////////////////////////////////////////
// FUNCTIONAL PROGRAMMING
const gameStatus = () => {
    let i = TIMER_LIMIT
    timer.textContent = TIMER_LIMIT
    
    const countDown = setInterval(() => {
        i--
        timer.textContent = i
        const gameResult = checkWin()
        console.log(board.querySelectorAll('.win').length)
        if (i === 0 || gameResult) {
            clearInterval(countDown)
            board.querySelectorAll('.win').forEach(el => el.classList.add('win'))
            board.removeEventListener('click', clickCell)
            togglePlayBtn('1','visible')
        }
    }, 1000)

}

board.addEventListener('click', clickCell)
playBtn.addEventListener('click', () => {
    gameInit()
    togglePlayBtn('0','hidden')
})

const gameInit = () => {
    const shuffleColorArr = shuffleColor(colors)
    assignColor(overlays, shuffleColorArr)
    gameStatus()
}

gameInit()


