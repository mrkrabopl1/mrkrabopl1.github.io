const tabEl = document.querySelector('aside')
const contentEl = document.querySelector('.wrapper')
const serifEl = document.querySelector('.play-serif')
const sansSerifEl = document.querySelector('.play-sans-serif')
const bodyEl = document.querySelector('body')
let toggle = 0
serifEl.addEventListener('click',playSerif)

sansSerifEl.addEventListener('click',playSansSerif)

bodyEl.addEventListener('keydown', function(evt){
    if (evt.keyCode == 9){
        console.log("?")
        evt.preventDefault()
        tabEl.style.display = 'block'
        contentEl.style.marginTop = '-44px'
        if (toggle === 0){
            sansSerifEl.focus()
            toggle++
        }
        else{
            serifEl.focus()
            toggle--
        }
    }    
})

function playSerif(){
    localStorage.setItem("gameversion","Serif")
}

function playSansSerif(){
    localStorage.setItem("gameversion", "Sans-Serif");
}