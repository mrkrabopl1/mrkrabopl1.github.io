let body = document.querySelector("body")
let burger = document.querySelector(".first-page_burger-cont")
let burger_menu = document.querySelector(".first-page_burger-menu")
let pageButtons= document.querySelectorAll(".callUs")
let activeBlock = document.querySelector(".activeBlockCont")
let close = document.querySelector(".close")
let personInfo = document.querySelectorAll(".activeBlock_input")
let activeBlockButton = document.querySelector(".activeBlock_button")
let activeBlockThanks = document.querySelector(".activeBlock_thanks-cont")
let seventhPageInput = document.querySelectorAll(".seventh-page_top")
let seventhPageText = document.querySelector(".seventh-page_bottom-input")
let seventhPageButton = document.querySelector(".seventh-page_button")
let galleryLeftAr = document.querySelector(".al")
let galleryRightAr = document.querySelector(".ar")
let gallerySlider = document.querySelector(".sixth-page_gallery-cont_slider")
let galleryElem = document.querySelector(".gallery1")
let gallerySlides = 5
let galleryContSize = 3
var marginLeft = parseInt(getComputedStyle(galleryElem, true).marginLeft);
var marginRight = parseInt(getComputedStyle(galleryElem, true).marginRight);
let stepSize = galleryElem.offsetWidth + marginLeft + marginRight
let gallerySlidePosition = 0
let personsInfo ={}
let massageText = ""
let flagRegistr = true

galleryLeftAr.addEventListener("click",()=>{
    let cach =  gallerySlidePosition
    let  gallerySlidePosition1
    if(gallerySlidePosition > 0){
    for (let i =0; i<=100;i+=1){
        setTimeout(()=>{
            gallerySlidePosition1 =cach -stepSize/100*i
            console.log(gallerySlidePosition1)
            gallerySlider.style.left = "-"+gallerySlidePosition1 +"px"
        },2*i)
    }
    }
    gallerySlidePosition -=stepSize
})
galleryRightAr.addEventListener("click",()=>{
    let max = (gallerySlides - galleryContSize)*stepSize
    let  gallerySlidePosition1
    let cach =  gallerySlidePosition
    if(gallerySlidePosition<=max){
        for (let i =0; i<=100;i+=1){
            setTimeout(()=>{
                gallerySlidePosition1 =cach+stepSize/100*i
                console.log(gallerySlidePosition1)
                gallerySlider.style.left = "-"+gallerySlidePosition1 +"px"
            },2*i)
        }
        gallerySlidePosition +=stepSize

    }
})
seventhPageButton.addEventListener("click",()=>{

    for (let i of seventhPageInput) {
        personsInfo[i.placeholder] = i.value
        i.value = ""
    }
    massageText = seventhPageText.value
    seventhPageText.value = ""
    flagRegistr = false
})
for(let i of pageButtons){
    i.addEventListener("click",()=>{
        activeBlock.style.display = "flex"
        body.style.overflow="hidden"

    })
}

activeBlockButton.addEventListener("click",()=>{
    if (flagRegistr){
        for (let i of personInfo){
            personsInfo[i.placeholder] = i.value
        }
        activeBlockThanks.style.display = "block"
        activeBlockInput.style.display = "none"
        activeBlockButton.innerHTML = "Ок"
        flagRegistr = false
    }
    else {
        activeBlock.style.display = "none"
        flagRegistr = true
    }
})
close.addEventListener("click",()=>{
    activeBlock.style.display = "none"
    body.style.overflow="visible"

})
burger.addEventListener('mouseover',()=>{
    burger_menu.style.display = "inline-block"
})
burger.addEventListener('mouseout',()=>{
    burger_menu.style.display = "none"
})
let write = document.createElement("div")

