let body=document.querySelector("body")
let imgArr = ["main.jpg","body.jpg","portet.jpg","fashion.jpg","props.jpg","gun.jpg","animal.jpg","planet.jpg","anime.gif","history.jpg","bonus.jpg"]

let hrefArray=[[{

    "ArtStation" :"https://www.artstation.com/?sort_by=community",
    "Pinterest": " https://www.pinterest.ru/",
    "DeviantArt":"https://www.deviantart.com/",
    "Character Design References ":"https://characterdesignreferences.com/artist-of-the-week",
    "PhotoBash.co":"https://www.photobash.co/",
    " Shutterstock": "https://www.shutterstock.com/ru/",
},["один из главных ресурсов для размещения арт-портфолио.","популярный ресурс по поиску и хранению референсов. У него удобные алгоритмы: если вы нажмете на понравившуюся картинку, ресурс подберет вам еще несколько похожих на нее.\n" +
"\n" +
"В аккаунте Pinterest можно создавать тематические доски и прикреплять к ним собранные картинки. Другие пользователи могут подписываться на ваши доски, как и вы — на чужие. Ниже в разделах мы предложим несколько интересных досок и аккаунтов.\n" +
"\n" +
"Также много интересного можно найти на сайте huaban.com — это китайский аналог Pinterest (весь интерфейс на китайском).",
    "когда-то очень популярная социальная сеть для творческих людей. На DeviantArt всё ещё можно найти много интересного, так как там публикуются не только художники и аниматоры, но и фотографы, косплееры, натурщики.",
    " ресурс с множеством концепт-артов персонажей, дизайнов и артбуков от разных художников. Также сайт проводит челленджи и берёт интервью у художников.",
    "большой ресурс, на котором можно купить полноценные паки референсов и фото. Сайт заточен под фотобаш, но материалы можно использовать и как стандартные референсы.",
    " крупнейший подписочный контент-сток. На сервисе можно купить фотографии, изображения, шаблоны, видео, музыку и многое другое."]],[{},[]],[{},[]],[{},[]],[{},[]],[{},[]],[{},[]],[{},[]],[{},[]],[{},[]],[{},[]]]

let name =["Основные ресурсы ","Анатомия человека","Портреты","Одежда и мода","Пропсы и окружение ","Техника и оружие","Животные","Текстуры ","Анимация" ,"Виртуальные экспозиции музеев ","Бонус"]
for (let i = 0;i<name.length;i++){
    let arr=document.createElement("div")
    arr.style.textAlign="center"
    arr.style.fontSize="60px"
    arr.style.fontFamily="Roboto"
    arr.innerHTML=name[i]
    body.append(arr)
    let nameArr=Object.keys(hrefArray[i][0])
    let valeArr=Object.values(hrefArray[i][0])
    let mainInfo= document.createElement("div")
    let img = document.createElement("img")
    img.style.width="80%"
    img.src="img/"+imgArr[i]
    mainInfo.append(img)
    mainInfo.addEventListener("dblclick",()=>{
        mainInfo.style.display='none'
    })

    for (let j=0;j<nameArr.length;j++){
        let div=document.createElement("div")

        console.log(valeArr[j])
        let a = document.createElement("a")
        let text = document.createElement("span")
        text.append(a)
        text.append("\u2014"+hrefArray[i][1][j])



        div.append(text)
        div.style.textAlign="left"
        text.style.fontSize="20px"


        text.style.fontFamily="Roboto"

        text.style.display ="inline-block"
        a.style.fontSize="20px"

        a.style.textAlign="center"
        a.style.fontFamily="Roboto"
        a.href=valeArr[j].toString()
        console.log(valeArr[j])
        a.innerHTML=nameArr[j]

        mainInfo.append(div)
        mainInfo.style.width="80%"
        mainInfo.style.margin="auto"

    }
    arr.append(mainInfo)
 mainInfo.style.display="none"

    arr.addEventListener("click",()=>{
        console.log("dddds")
        mainInfo.style.display="block"



    console.log(mainInfo)



    })


}
