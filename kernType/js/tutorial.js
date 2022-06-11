function Tutorial(){

  const el = dom.create({class: "tutorial"}, dom.body);
  const finger = dom.create({class: "finger"}, el);
  const tip = dom.create({class: "tip"}, finger);
  var isPlaying = false;

   var tl = anime.timeline({
      easing: 'easeOutQuint',
      duration: 400
    });

   el.addEventListener("click", stop);
   
   function play(){
     isPlaying = true;
     el.style.display = "block";
     const viewBox = svgRoot.viewBox.baseVal ? svgRoot.viewBox.baseVal : utils.viewBox;
     const letter = stage.letters[2];
     const zoom = viewBox.width/window.innerWidth;
     const ratio = window.innerWidth/window.innerWidth;
     finger.style.transform = `translate(0,${window.innerHeight/2}px)`



     var bbox = letter.path.getBoundingClientRect();


     tl.add({
       targets: finger,
       translateX: bbox.x + bbox.width/2,
       duration: 800,
       delay: 800
     })

     tl.add({
       targets: tip,
       scale: 1.5,
     });

     tl.add({
       targets: letter.rect,
       fill: ["rgba(49, 49, 58, 0.3)", "rgba(181, 230, 253, 0.1)"],
     }, 1600)


     tl.add({
       targets: finger,
       translateX: "-=30",
       easing: "cubicBezier(0.000, .800, 0.485, .800)",
       duration: 800,
       begin: function(anim){
         letter.slide(-30);
       }

     })

     tl.add({
       targets: tip,
       scale: 1,
     });

     tl.add({
       targets: finger,
       opacity: 0
     });

     tl.add({
       targets: letter.rect,
       fill: "rgba(181, 230, 253, 0)",
       delay: 400,
       complete: stop,
     }, 2800)


   }

   function stop(){
     el.style.display = "none";
     if (!isPlaying) return;
     isPlaying = false;
     tl.restart();
     tl.pause();
     const letter = stage.letters[2];
     letter.rect.style.fill = "rgba(0,0,0,0)";
     letter.slide(0);





   }

   this.stop = stop;

   this.play = play;
}