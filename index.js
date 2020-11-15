var start_bell = new Audio("music/start.mp3");
var finish_bell = new Audio("music/fin.mp3");
var timer_run = false;
var inter;
var pl = 1;
var i = -pl;
var pt = -1;

function init(){
    console.log("Hello, this is H-TIMER!!")
    const al = document.querySelector(".al");
    if(localStorage.getItem("pal") == "true"){
        al.checked = true;
    }
    clock();
}
function changeTime(){
    const min_in = document.querySelector(".min")
    const sec_in = document.querySelector(".sec")
    
    var min = parseInt(min_in.value);
    var sec = parseInt(sec_in.value);
    if(sec==0){
        min_in.value = String(min - 1);
        sec_in.value = "59"
    }
    else{
        sec_in.value = String(sec - 1);
    }
}
function clock(){
    const al = document.querySelector(".al")
    i+= pl;
    pt++;

    var canvas = document.querySelector(".clock")
    var pt_q = document.querySelector(".pt")
    pt_q.innerHTML = innerHTML = parseInt(pt/60) + " 분 " + parseInt(pt%60) + " 초 지남";
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = "rgb(236, 88, 88 )";
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.moveTo(500,500);

        ctx.arc(500,500,400,1.5*Math.PI, (i-90)*(Math.PI/180),true);
        ctx.fill();
        ctx.closePath();
        ctx.save();
        ctx.restore();
        ctx.fillStyle = "rgb(250, 250, 250)";
        ctx.beginPath();
        ctx.arc(500,500,100,0*Math.PI, 360*(Math.PI/180),true);
        ctx.fill();
    changeTime();
    if(i == 360){
        clearInterval(inter)
        if(al.checked == true){
            finish_bell.play();
        }
        else{
            localStorage.setItem("pal", false);
        }
        i=0
    }
    }
 }


 function timeGo(){
    const s_button = document.querySelector(".set_t")
    const min_in = document.querySelector(".min")
    const sec_in = document.querySelector(".sec")
    const al = document.querySelector(".al")
    
    if(timer_run == false){
        if(pl==1){
            pl=360/(parseInt(min_in.value)*60 + parseInt(sec_in.value));
        }
        s_button.innerHTML = "타이머 일시정지";
        inter = setInterval(clock, 1000)
        timer_run = true;
        if(al.checked == true){
            start_bell.play();
            localStorage.setItem("pal", true);
        }
        else {
            localStorage.setItem("pal", false);
        }
    }
    else{
        s_button.innerHTML = "시작";
        clearInterval(inter);
        timer_run = false;
    }
 }
 function clearTime(){
    const s_button = document.querySelector(".set_t")
    const min_in = document.querySelector(".min")
    const sec_in = document.querySelector(".sec")
    s_button.innerHTML = "시작";
    clearInterval(inter);
    timer_run = false;
    i=-1;
    pl=1;
    pt=-1
    clock();
    min_in.value = 0;
    sec_in.value = 10;
 }