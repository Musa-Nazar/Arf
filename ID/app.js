const LSCtrl = (function() {
    let obj ={};
    return {
      setInLs : function (data) {
          if(data.previousElementSibling.id === "S"){
              obj.S = data.previousElementSibling.textContent;
          }else if(data.previousElementSibling.id === "A"){
              obj.A = data.previousElementSibling.textContent;
          }else if(data.previousElementSibling.id === "B"){
              obj.B = data.previousElementSibling.textContent;
          }else if(data.previousElementSibling.id === "C"){
              obj.C = data.previousElementSibling.textContent;
          }else{
              obj.D = data.previousElementSibling.textContent;
          }
         localStorage.setItem("obj",JSON.stringify(obj));
      }
    }
})();
const countCtrl =(function(){
    return {
        add : function(e) {
            if(e.target.classList.contains('btn')){
            let count = parseInt(e.target.previousElementSibling.textContent),
            elem = e.target.previousElementSibling;
            if (count !== 100) {
            count = count + 1;
            elem.textContent= count;
            }
            else{
            return count;
            }
            return e.target;
            }
            
        }
    }
})();
const UICtrl = (function(){
    const _UIElements = {
        balls : document.querySelectorAll('.ball'),
        ball1 : document.getElementsByClassName('one')[0],
        ball2 : document.getElementsByClassName('two')[0],
        ball3 : document.getElementsByClassName('three')[0],
        ball4 : document.getElementsByClassName('four')[0],
        ball5 : document.getElementsByClassName('five')[0],
        container : document.getElementsByClassName("container"),
        btns : document.querySelectorAll('.btn'),
        body : document.querySelector('.left-panel'),
        scs: document.querySelectorAll("#count")
    }
    return {
        getUiElements: function() {
            return _UIElements;
        }
    }
})();
const AnimationCtrl = (function() {
    return {
        animateBall : function(element,ball1,ball2,ball5,balls) {
            let 
            pageHeight = window.outerHeight,
            ballHeight = element.clientHeight;
            element.style.transform =`translateY(${pageHeight-ballHeight}px)`;
            ball1.style.transform =`translateY(100%)`;
            ball1.style.top="none";
            ball2.style.transform =`translateY(200%)`;
            ball5.style.transform =`translateY(0)`;
            AnimationCtrl.addTransition(balls);
        },
        addTransition : function(balls) {
            balls.forEach((ball)=>{
                ball.style.transition="all 0.5s ease";
            })
        },
        removeTransition : function(element,ball1,ball2,ball5,balls) {
            balls.forEach((ball)=>{
                ball.style.transition= "none";
            })
            let 
            pageHeight = window.outerHeight,
            ballHeight = element.clientHeight;
            element.style.transform =`translateY(200%)`;
            element.style.marginTop="4px";
            ball1.style.transform =`translateY(0)`;
            ball1.style.top="none";
            ball2.style.transform =`translateY(100%)`;
            ball5.style.transform =`translateY(-100%)`;
        }
    }
})();
const AppCtrl = (function(UICtrl,AnimationCtrl,countCtrl) {
    function loadEventListeners() {
        UICtrl.getUiElements().body.addEventListener("click",increment);
        UICtrl.getUiElements().balls.forEach((ball)=>{
            ball.addEventListener("transitionend",returnState);
        UICtrl.getUiElements().scs.forEach((sc)=>{
            sc.addEventListener("click",toggle)
        })
        })
    }
    function increment(e) {
        if (e.target.classList.contains('btn')) {
        const
        balls =UICtrl.getUiElements().balls,
        ball = UICtrl.getUiElements().ball3,
        ball1 = UICtrl.getUiElements().ball1,
        ball2 = UICtrl.getUiElements().ball2,
        ball5 = UICtrl.getUiElements().ball5,
        body = UICtrl.getUiElements().body,
       count = countCtrl.add(e);
       LSCtrl.setInLs(count);
       if (count===100) {
           
       }else{
          AnimationCtrl.animateBall(ball,ball1,ball2,ball5,balls); 
       }
        }
    }
    function returnState() {
        const
        balls =UICtrl.getUiElements().balls,
        ball = UICtrl.getUiElements().ball3,
        ball1 = UICtrl.getUiElements().ball1,
        ball2 = UICtrl.getUiElements().ball2,
        ball5 = UICtrl.getUiElements().ball5;
        AnimationCtrl.removeTransition(ball,ball1,ball2,ball5,balls)
    }
    
    function toggle(e) {
        e.target.classList.toggle('rem');
        console.log(e.target);
    }
    return {
        init : function() {
            loadEventListeners();
        }
    }
})(UICtrl,AnimationCtrl,countCtrl);
AppCtrl.init()