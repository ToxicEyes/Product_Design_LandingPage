const csr = document.getElementById("cursor");
const links = document.querySelectorAll("a");
const social_links = document.querySelectorAll("#footer h4");
var timeOut;




/**
 * 1.select each section (element) from projects section using querySelectorAll()
 * 2.get position of cursor, means get x and y cordinates of cursor
 * 3.show image corresponding to specific element
 * 
 */
const projects = document.querySelectorAll("#element");

var rotate = 0;
var diffrot = 0;


projects.forEach(function(element){
  element.addEventListener("mousemove",function(dets){

    csr.style.height = '50px';
    csr.style.width = '50px';
    csr.style.top = dets.clientY - element.getBoundingClientRect().top  - 'px' ;
    csr.style.left = dets.clientX- element.getBoundingClientRect().left - 'px';
   
    // to get div distance from every corner
   var diffTop = dets.clientY -  element.getBoundingClientRect();

  //current position of mouse - previous one
   diffrot = dets.clientX - rotate;
   //new current position
   rotate = dets.clientX;

    gsap.to(element.querySelector("img"),{
      opacity:1,
      ease:Power3, 
      top: diffTop, 
      duration:0.5,
      left:dets.clientX,
      rotate:gsap.utils.clamp(-15,20,diffrot),
    })
  })


  element.addEventListener("mouseleave",function(dets){
    csr.style.height = '15px';
    csr.style.width = '15px';
    gsap.to(element.querySelector("img"),{
      opacity:0,
      ease:Power3, 
      duration:0.5,
    })
  })
})






const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});


function csrMover(xSkew, ySkew){
  window.addEventListener("mousemove", function (dets) {
    document.querySelector("#cursor").style.transform = `translate(${
      dets.clientX - 6
    }px, ${dets.clientY - 8}px)  scale(${xSkew},${ySkew})`;
  });
}
csrMover();

function animate() {
  var tl = gsap.timeline();

  tl.from("#nav", {
    y: -50,
    opacity: 0,
    duration: 2,
    delay: -0.8,
    ease: Expo.easeInOut,
  });

  tl.to(".bounding_element", {
    y: 0,
    duration: 1.3,
    ease: Expo.easeInOut,
    stagger: 0.2,
    scrub: 1,
  });

   tl.from("#hero-footer",{
    y:-10,
    duration:1.5,
    opacity:0,
    ease:Expo.easeInOut
   })
}

animate();



function csrSkew() {
  /**
   * 1.define default scale values
   * 2.define previous x and y values
   * 3.max verticle skew : 0.8
   * default value:0
   * 4.max horizontal skew : 1.2
   * 
   * gsap.utils.clamp():clamps a number between minimum and maximum values
   * -if number is less than minimum then it will return minimum limit value
   * -if number is greater then it will return maximum limit value
   * 
   * syntax:
   *clamp(minimum, maximum, valueToClamp)
    minimum : Number - The minimum value
    maximum : Number - The maximum value
    valueToClamp : Number - The value that should be clamped between the first two values.
   */

  var xScale = 1;
  var yScale = 1;

  var xPrevious = 0;
  var yPrevious = 0;

  window.addEventListener("mousemove", function (dets) {
    this.clearTimeout(timeOut);//clear timeout everytime I move my mouse

    var xDiff = dets.clientX - xPrevious; //diffrence between current and previous x position
    var yDiff = dets.clientY - yPrevious; //difference between current and previous y position


    var xSkew = gsap.utils.clamp(0.6,1.2,xDiff);
    var ySkew = gsap.utils.clamp(0.8,1.2,yDiff);

    xPrevious = dets.clientX;
    yPrevious = dets.clientY;    


    csrMover(xSkew,ySkew);

    //when I stop moving my mouse , size of cursor should be normalized again
    timeOut = setTimeout(function(){
      document.querySelector("#cursor").style.transform = `translate(${
        dets.clientX - 6
      }px, ${dets.clientY - 8}px)  scale(1,1)`;
    },100)
    // console.log(xDiff, yDiff);
  });

}

csrSkew();

// or

// window.addEventListener("mousemove",function(){
//  csr.style.left = document.clientX + "px";
//  csr.style.top = document.clientY + "px";
//  csr.style.transition="all 0.1300s ease"
// })

links.forEach(function (el) {
  el.addEventListener("mouseenter", function () {
    csr.style.height = "35px";
    csr.style.width = "35px";
    csr.style.transition = "all 0.1800s ease-out";
  });
});

links.forEach(function (el) {
  el.addEventListener("mouseleave", function () {
    csr.style.height = "15px";
    csr.style.width = "15px";
    csr.style.transition = "all .1800s ease-out";
  });
});

social_links.forEach(function (el) {
  el.addEventListener("mouseenter", function () {
    csr.style.height = "35px";
    csr.style.width = "35px";
    csr.style.transition = "all 0.1800s ease-out";
  });
});

social_links.forEach(function (el) {
  el.addEventListener("mouseleave", function () {
    csr.style.height = "15px";
    csr.style.width = "15px";
    csr.style.transition = "all .01800s ease-out";
  });
});


