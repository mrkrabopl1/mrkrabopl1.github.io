let btnTextArr =document.querySelectorAll('.openText')
let textAreaArr =document.querySelectorAll('.text')

let textContArr =document.querySelectorAll('.textCont')

console.log(btnTextArr)
for (let i=0;i< btnTextArr.length;i++){
    (function func(i){
        console.log( btnTextArr[i])
        btnTextArr[i].addEventListener("mouseover",()=>{
            btnTextArr[i].style.color="black"
            btnTextArr[i].style.backgroundColor="rgba(255,255,255,0.5)"

        })
    })(i)

    btnTextArr[i].addEventListener("mouseout",()=>{
       btnTextArr[i].style.color="transparent"
        btnTextArr[i].style.backgroundColor="transparent"

    })
    btnTextArr[i].addEventListener("click",()=>{
        if(textAreaArr[i].clientHeight!== textContArr[i].clientHeight){
            textContArr[i].style.height=textAreaArr[i].clientHeight+"px"
        }
        else{
            textContArr[i].style.height =" 60px"
        }



    })
}