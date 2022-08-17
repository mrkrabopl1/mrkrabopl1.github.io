let burger = document.querySelector(".first-page_burger-cont")
let burger_menu = document.querySelector(".first-page_burger-menu")
burger.addEventListener('mouseover',()=>{
    burger_menu.style.display = "inline-block"
})
burger.addEventListener('mouseout',()=>{
    burger_menu.style.display = "none"
})
// burger.addEventListener('mouseout',()=>{
//     burger_menu.style.display = "none"
// })