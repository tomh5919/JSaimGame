console.log("Hello World");

var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");
var tx = window.innerWidth;
var ty = window.innerHeight;
canvas.width = tx;
canvas.height = ty;

var mousex = 0;
var mousey = 0;

var Score = 0;
var rate = -.1;
var Lives = 5;

addEventListener("click", function () {
    mousex = event.clientX;
    mousey = event.clientY;
});

var grav = 0.99;
c.strokeWidth = 5;
function randomColor() {
    return (
        "rgba(" +
        Math.round(Math.random() * 250) +
        "," +
        Math.round(Math.random() * 250) +
        "," +
        Math.round(Math.random() * 250) +
        "," +
        Math.ceil(Math.random() * 10) / 10 +
        ")"
    );
}

function DrawBall() {
    this.radius = Math.random() * 80 + 56;
    this.x = Math.random() * (tx - this.radius * 2) + this.radius;
    this.y = Math.random() * (ty - this.radius);
    this.color = "#000000";
    this.gotcha = 0;
    
    this.update = function () {
         c.beginPath();
         c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
         c.fillStyle = this.color;
         c.fill();
    }
}

var bal = [];
for (var i = 0; i < 3; i++) {
    bal.push(new DrawBall());
}

function butt() {

   


       if (tx != window.innerWidth || ty != window.innerHeight) {
            tx = window.innerWidth;
            ty = window.innerHeight;
            canvas.width = tx;
            canvas.height = ty;
         }
  
    requestAnimationFrame(butt);
    c.clearRect(0, 0, tx, ty);
    for (var i = 0; i < bal.length; i++) {
        bal[i].update();
        c.font = '48px Ariel';
        c.fillStyle = 'green';
        c.fillText("Thomas' aim game ", 300, 200);
        c.fillText("Score: " + Score, 300, 250);
        c.fillText("Lives: " + Lives, 300, 300);
        var rad = bal[i].radius;
        if (bal[i].radius > 0) {
            bal[i].radius += rate;
            
        }
        if (bal[i].radius <= 0 && bal[i].gotcha == 0) {
            bal.splice(i, 1);
            bal.push(new DrawBall());
            Lives = Lives - 1;
        }  
        if (bal[i].radius <= 0 && bal[i].gotcha == 1) {
            bal.splice(i, 1);
            bal.push(new DrawBall());
           
        }    

        
        if (mousex > bal[i].x - rad &&
            mousex < bal[i].x + rad &&
            mousey > bal[i].y - rad &&
            mousey < bal[i].y + rad) {
            bal[i].color = "green";  
            bal[i].gotcha = 1;
            Score++;
            rate = rate + -.05;
            mousex = 0;
            mousey = 0;
        }
        if (Lives <= 0) {
            c.clearRect(0, 0, tx, ty);
            c.font = '80px Ariel';
            c.fillStyle = 'red';
            c.fillText("LOSER ", 800, 200);
            c.fillText("Final Score " + Score, 800, 270);
            document.body.style.backgroundColor = "black";
          
        }
    
    }
}

butt();

setInterval(function () {
    bal.push(new DrawBall());
}, 10000); 
