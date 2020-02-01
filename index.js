// All the global variables
let data ={
    sliderImgNumber : 0,
    cubeImgNumber : 0
}



let sliderImgs, sliderNav, sliderButtons, cubeNav
$().ready(() => {
    // all DOM items
    sliderImgs = document.querySelectorAll(".slider__hero__photo");
    sliderNav = document.querySelector(".slider__nav");
    cubeNav = document.querySelector(".cubeContainer__nav")
    sliderImgs.forEach((item,index) =>{
        let sliderButton = document.createElement("div")
        sliderButton.classList.add("slider__nav__button")
        sliderButton.setAttribute("onclick","sliderView("+index+")")
        sliderNav.appendChild(sliderButton);
    }) 
     
    for(i=0;i<6;i++){
        let cubeNavButton = document.createElement("div")
        cubeNavButton.classList.add("cubeContainer__nav__button")
        cubeNavButton.setAttribute("onclick","cubeView("+i+")")
        cubeNav.appendChild(cubeNavButton);
        
    }
    
    
    
})
window.onscroll = () => {
    if(document.body.scrollTop > 100 || document.documentElement.scrollTop > 100){
        document.querySelector("header").classList.add("header--scroll");   
    
    }else{
        document.querySelector("header").classList.remove("header--scroll");
    
    }
    if(document.documentElement.scrollTop > document.querySelector(".photoSlider").offsetTop - 200 ){
        // node.classList.remove(clsOut)
        // document.querySelectorAll(".photoSlider__textBoxContainer")[0].style.position = "fixed";
        // document.querySelectorAll(".photoSlider__textBoxContainer")[1].style.position = "fixed";
        photoSlider();
     } 
     //else {
    //     document.querySelectorAll(".photoSlider__textBoxContainer")[0].style.position = "absolute";
    //     document.querySelectorAll(".photoSlider__textBoxContainer")[1].style.position = "absolute";
    // }
    setTimeout(animateOnScroll(".placesBox__text__header", ".placesBox")  ,500)
    setTimeout(animateOnScroll(".placesBox__text__content", ".placesBox") ,5000)
    setTimeout(animateOnScroll(".placesBox__cubeContainer", ".placesBox") ,30000)
    
    animateOnScroll(".blueBar__h1Container", ".blueBar")






}




let sliderFlow = setInterval(sliderFlow1,6000)
let cubeFlow = setInterval(cubeFlow1,5000)

function sliderFlow1(){
    sliderView(data.sliderImgNumber)
    data.sliderImgNumber++;
}
function cubeFlow1(){
    cubeView(data.cubeImgNumber)
    data.cubeImgNumber++
}
function sliderView(imgNumber){
    data.sliderImgNumber = imgNumber;
    sliderButtons = document.querySelectorAll(".slider__nav__button")
    $(".slider__hero").css("transform", "translateX(-"+imgNumber % 5+"00vw)");
    sliderButtons.forEach(item => {
        item.classList.remove("slider__nav__button--active");
    })
    sliderButtons[imgNumber % 5].classList.add("slider__nav__button--active")
}

function cubeView(imgNumber){
    cubeImgs =document.querySelector(".placesBox__cube")
    cubeNavButtons = document.querySelectorAll(".cubeContainer__nav__button")
    data.cubeImgNumber = imgNumber ;
    
    cubeImgs.className = "placesBox__cube"
    cubeImgs.classList.add("cube--show"+imgNumber % 6);
    cubeNavButtons.forEach(item => {
        item.classList.remove("cubeContainer__nav__button--active");
    })
    cubeNavButtons[imgNumber % 6].classList.add("cubeContainer__nav__button--active")
}



function animateOnScroll(ele, triggerEle, clsIn = "bounceIn" , clsOut = "bounceOut"){
    let node = document.querySelector(ele);
    let trigNode = document.querySelector(triggerEle);
    
    node.classList.add("animated")
    
    if(document.documentElement.scrollTop > trigNode.offsetTop - (document.documentElement.clientHeight / 2) && document.documentElement.scrollTop < trigNode.offsetTop + trigNode.offsetHeight  + (document.documentElement.clientHeight / 2)){
        // node.classList.remove(clsOut)
        node.classList.add(clsIn)
    }
    //  else {
    //     node.classList.remove(clsIn)
    //     node.classList.add(clsOut)
        
    // }

}

function photoSlider() {
    let textBoxHeaders  = document.querySelectorAll(".textBoxContainer__header") 
    let textBoxContents = document.querySelectorAll(".textBoxContainer__textBox")
    let scrollAmount = document.documentElement.scrollTop ;
    let imgs = document.querySelectorAll(".photoBox")
    imgs.forEach((item,index) => {
        a = item.offsetTop + item.parentElement.parentElement.offsetTop - 200
        c =  between(scrollAmount , a)
        if(c){
            textBoxHeaders.forEach(item => {  item.style.display="none" ; item.classList.remove("bounceIn")})
            textBoxContents.forEach(item => { item.style.display="none" ; item.classList.remove("bounceIn")})
             textBoxHeaders[index].classList.add("bounceIn") ;
             textBoxHeaders[index].style.display= "inline";
            textBoxContents[index].classList.add("bounceIn");
            textBoxContents[index].style.display= "block";
        
        }
    })
    
}



function between(range, num){
    return (range + 100) >= num && (range - 100) <= num
}