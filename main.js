var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

var dino = {
    x : 10,
    y : 200,
    width : 50,
    height : 50,

    draw(){
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}


class Cactus{
    constructor(){
        this.x = 500;
        this.y = 200;
        this.width = 50;
        this.height = 50;
    }
    draw(){
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}


var timer = 0;
var cactuses = [];
var jumpTimer =0;

function animate(){
    requestAnimationFrame(animate);
    timer++;
    ctx.clearRect(0, 0 , canvas.width, canvas.height);
    
    if(timer % 120 === 0){
    //초당 표현하기 위해서 조건문 사용 
    //현재 모니터 프레임이 120hz이면 120프레임 당 한번 표현
        var cactus = new Cactus();
        cactuses.push(cactus);
        
    }
    
    cactuses.forEach((a, i, o)=>{
        if(a.x < 0){
            o.splice(i, 1)
        }
        //배열의 공간낭비를 방지하기 위해서 
        //지나간 cactuses는 제거
        a.draw();
    })

    if(jump == true){
        dino.y--;
        jumpTimer++;
    }
    if(jumpTimer > 100){
        jump = false;
    }
    dino.draw()
    
}

animate();

var jump = false;

document.addEventListener('keydown', function(e){
    if(e.code === 'Space'){
        jump =true;
    }
})