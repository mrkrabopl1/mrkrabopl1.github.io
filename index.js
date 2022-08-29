let body = document.querySelector("body")
const initializeSecondPageSlider=()=>{
    let secondArrLeft = document.querySelector(".second-page_arrow-left")
    let secondArrRight = document.querySelector(".second-page_arrow-right")
    let selfLink = document.querySelector(".self")
    let textCont = document.querySelector(".second-page_pointers_text")
    let detEasyLink = document.querySelector(".detEasy")
    let secondSliderCont  = document.querySelectorAll(".second-page_slider-block")
    let secondSlider =  document.querySelector(".second-page_main_slider")
    let comTrLink = document.querySelector(".comTr")
    let nameArr = [{"name":"Детейлинг своими руками","size":3},
        {"name":"2","size":1},
        {"name":"3","size":3}]
    let counter = 1
    let count = nameArr.length
    if (body.clientWidth <= 780 ){
        count = 0
        for (let i = 0 ;i < nameArr.length;i++){
            count +=nameArr[i].size
        }

    }
    let nameNum = 0
    let ss = 1
    secondArrLeft.addEventListener("click",()=> {

            let secondSliderPosition1
            let cach = secondSliderPosition

            if (body.clientWidth <=780){
                if(ss>=nameArr[nameNum].size){
                    ss = 1
                    nameNum -=1
                }
            }
            if(counter>1 && counter<=count){
                counter-=1

                if (body.clientWidth >780){
                    nameNum = counter -1
                }

                ss +=1
                for (let i = 0; i <= 100; i += 1) {
                    setTimeout(() => {
                        secondSliderPosition1 = secondSlider.clientWidth / 100 * i
                        secondSlider.style.left = cach + secondSliderPosition1 + "px"
                    }, 2 * i)
                }
                secondSliderPosition += secondSlider.clientWidth
                let numText = Math.round(secondSliderPosition*(-1)/secondSlider.clientWidth)
                textCont.innerHTML =  nameArr[nameNum].name



            }

        }
    )
    secondArrRight.addEventListener("click",()=> {
        let secondSliderPosition1
        let cach = secondSliderPosition

        if(counter<count){
            ss += 1
            if (body.clientWidth >780){
                nameNum = counter
            }
            counter = counter + 1

            for (let i = 0; i <= 100; i += 1) {
                setTimeout(() => {
                    secondSliderPosition1 = secondSlider.clientWidth / 100 * i
                    secondSlider.style.left = cach - secondSliderPosition1 + "px"
                }, 2 * i)
            }
            secondSliderPosition -= secondSlider.clientWidth

        }
        if (body.clientWidth <=780){
            if(ss>nameArr[nameNum].size){
                ss = 1
                nameNum +=1
            }
        }
        textCont.innerHTML = nameArr[nameNum].name


        }
    )
    selfLink.addEventListener(
        "click",()=> {
            let secondSliderPosition1
            let cach =  secondSlider.offsetLeft
            for (let i = 0; i <= 100; i += 1) {
                setTimeout(() => {
                    secondSliderPosition1 = cach / 100 * i
                    secondSlider.style.left = cach - cach / 100 * i + "px"
                }, 2 * i)
            }
            secondSliderPosition = 0
        }
    )
    detEasyLink.addEventListener(
        "click",()=> {
            let secondSliderPosition1
            let cach = secondSlider.offsetLeft
            for (let i = 0; i <= 100; i += 1) {
                setTimeout(() => {
                    secondSliderPosition1 = cach -(cach+secondSlider.clientWidth*2)/100*i

                    secondSlider.style.left = secondSliderPosition1 + "px"

                }, 2 * i)
            }
            secondSliderPosition += 2*secondSlider.clientWidth
        }
    )
    comTrLink.addEventListener("click",()=>{
        console.log("qqqq")
        let  secondSliderPosition1
        let cach = secondSlider.offsetLeft
        console.log(cach)
        for (let i =0; i<=100;i+=1){
            setTimeout(()=>{
                secondSliderPosition1 = cach -(cach+secondSlider.clientWidth)/100*i
                console.log(secondSliderPosition1,-secondSlider.clientWidth)
                secondSlider.style.left = secondSliderPosition1 + "px"
            },2*i)
        }
        secondSliderPosition +=secondSlider.clientWidth
    })
}
initializeSecondPageSlider()
const initializeThirdPageSlider = () =>{
    let thirdSlider =  document.querySelector(".third-page_slider")
    let thirdArRight = document.querySelectorAll(".third-page_rightArr")
    let thirdArLeft = document.querySelectorAll(".third-page_leftArr")
    let thirdCont = document.querySelector(".third-page_cont")
    let thirdStepSize = thirdCont.clientWidth
    let resPointers = document.querySelectorAll(".resFlag")
    let pointers = document.querySelectorAll(".flag")
    let thirdSliderPosition = 0
    for (let i=0;i<resPointers.length;i++){



        resPointers[i].addEventListener("click",()=>{
            for (let i=0;i<resPointers.length;i++){
                resPointers[i].style.backgroundColor ="rgba(35, 35, 35, 0.2)"
            }
            resPointers[i].style.backgroundColor ='#74BAA0'
            for (let j =0; j<=100;j+=1){
                let  thirdSliderPosition1
                let cach =  thirdSlider.offsetLeft
                setTimeout(()=>{
                    thirdSliderPosition1 =Math.abs(cach+(Math.abs(cach) - thirdStepSize*Number(i))*j/100)
                    thirdSlider.style.left = "-"+thirdSliderPosition1 +"px"
                },2*j)
            }
            thirdSliderPosition = -thirdStepSize*Number(i)

        })

    }
    for (let i=0;i<pointers.length;i++){



        pointers[i].addEventListener("click",()=>{
            for (let i=0;i<pointers.length;i++){
                pointers[i].style.backgroundColor ="rgba(35, 35, 35, 0.2)"
            }
            pointers[i].style.backgroundColor ='#74BAA0'
            for (let j =0; j<=100;j+=1){
                let  thirdSliderPosition1
                let cach =  thirdSlider.clientLeft
                setTimeout(()=>{
                    thirdSliderPosition1 =Math.abs(cach+(Math.abs(cach) - thirdStepSize*Number(i))*j/100)
                    console.log(cach, thirdSliderPosition1)

                    thirdSlider.style.left = "-"+thirdSliderPosition1 +"px"
                },2*j)
            }
            thirdSliderPosition = -thirdStepSize*Number(i)

        })

    }
    for (let i of thirdArRight){
        let flag = true
        i.addEventListener("click",()=>{
            if(flag){
                let max = thirdStepSize * 4
                let  thirdSliderPosition1
                let cach =  Math.abs(thirdSlider.offsetLeft)
                console.log(cach,thirdSliderPosition,max)
                if(cach<max){
                    for (let i =0; i<=100;i+=1){
                        setTimeout(()=>{
                            thirdSliderPosition1 =cach+thirdStepSize/100*i

                            thirdSlider.style.left = "-"+thirdSliderPosition1 +"px"
                            if (i === 100){
                                flag = true
                            }
                        },2*i)
                    }
                    let page = (cach+thirdStepSize)/thirdStepSize
                    let lastResPointer = resPointers[page-1]
                    let lastPointer = pointers[page-1]
                    let resPointer = resPointers[page]
                    let pointer = pointers[page]
                    console.log(page)
                    lastResPointer.style.backgroundColor ='rgba(35, 35, 35, 0.2)'
                    lastPointer.style.backgroundColor ='rgba(35, 35, 35, 0.2)'
                    resPointer.style.backgroundColor ='#74BAA0'
                    pointer.style.backgroundColor = "#74BAA0"
                }
                thirdSliderPosition = cach
            flag = false
            }


        })
    }
    for (let i of thirdArLeft) {
        let flag = true
        i.addEventListener("click", () => {
            let cach = Math.abs(thirdSlider.offsetLeft)
            let thirdSliderPosition1

            if (cach > 0) {
                if (flag) {
                    flag = false
                    for (let i = 0; i <= 100; i += 1) {
                        setTimeout(() => {
                            thirdSliderPosition1 = cach - thirdStepSize / 100 * i
                            if (i === 100){
                                flag = true
                            }
                            thirdSlider.style.left = "-" + thirdSliderPosition1 + "px"
                        }, 2 * i)
                    }

                    thirdSliderPosition -= thirdStepSize
                    let page = (cach - thirdStepSize) / thirdStepSize
                    let lastResPointer = resPointers[page+1]
                    let lastPointer = pointers[page+1]
                    let resPointer = resPointers[page]
                    let pointer = pointers[page]
                    lastResPointer.style.backgroundColor = 'rgba(35, 35, 35, 0.2)'
                    lastPointer.style.backgroundColor = 'rgba(35, 35, 35, 0.2)'
                    resPointer.style.backgroundColor = '#74BAA0'
                    pointer.style.backgroundColor = "#74BAA0"
                }
            }
            thirdSliderPosition = cach

        })
    }
}
initializeThirdPageSlider()
const burgerInitialization = ()=>{

    let burger = document.querySelector(".first-page_burger-cont")
    let burger_menu = document.querySelector(".first-page_burger-menu")
    burger.addEventListener('mouseover',()=>{
        burger_menu.style.display = "inline-block"
        burger.style.backgroundColor="white"
    })
    burger.addEventListener('mouseout',()=>{
        burger_menu.style.display = "none"
        burger.style.backgroundColor="transparent"
    })
}
burgerInitialization()
const initializeData=()=>{
    let pageButtons= document.querySelectorAll(".callUs")
    let activeBlock = document.querySelector(".activeBlockCont")
    let close = document.querySelector(".close")
    let  activeBlockInput = document.querySelector(".activeBlock_input-cont")
    let personInfo = document.querySelectorAll(".activeBlock_input")
    let personsInfo ={}
    let activeBlockButton = document.querySelector(".activeBlock_button")
    let activeBlockThanks = document.querySelector(".activeBlock_thanks-cont")
    let flagRegistr = true
    for(let i of pageButtons){
        i.addEventListener("click",()=>{
            activeBlock.style.display = "flex"
            body.style.overflow="hidden"
            activeBlockThanks.style.display = "none"
            activeBlockInput.style.display = "block"
            activeBlockButton.innerHTML = "Связаться с нами"
            for (let i =0;i< personInfo.length;i++ ){
                 personInfo[i].value =""
            }

        })
    }

    activeBlockButton.addEventListener("click",()=>{
        if (flagRegistr){
            for (let i of personInfo){
                personsInfo[i.placeholder] = i.value
            }
            (async () => {
                const rawResponse = await fetch('https://httpbin.org/post', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    credentials:"include",
                    body: JSON.stringify(personsInfo)
                });
                const content = await rawResponse.json();

                console.log(content);
            })();
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
}
initializeData()

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

let secondSliderPosition = 0
let massageText = ""




galleryLeftAr.addEventListener("click",()=>{
    let cach =  gallerySlidePosition
    let  gallerySlidePosition1
    if(gallerySlidePosition > 0){
    for (let i =0; i<=100;i+=1){
        setTimeout(()=>{
            gallerySlidePosition1 =cach -stepSize/100*i
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


let write = document.createElement("div")

