var canvas = document.getElementById('canvas');
//canvas를 id로 가져옴
var ctx = canvas.getContext('2d');


canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;
//canvas의 가로세로 설정

//공룡 객체
var dino = {
    x : 10,
    y : 200,
    width : 50,
    height : 50,
    //x,y 좌표와 가로세로 크기
    draw(){
        ctx.fillStyle = 'green';
        //색 설정
        ctx.fillRect(this.x, this.y, this.width, this.height);
        //dino를 그리는 함수, 사각형으로 그림(Hit Box)
        //추후에 이미지로 변경 및 대체

    }
}

//장애물 클래스 생성(Cactus : 선인장)
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


var timer = 0;  //프레임 단위로 장애물을 표현하기 위해서 timer 변수 선언
var cactuses = [];  //장애물을 보관한 공간(배열)
var jumpTimer =0;   //dino(공룡 캐릭터)가 공중에 떠 있는 시간
var animation;

function animate(){
    animation = requestAnimationFrame(animate);
    //화면 새로고침
    timer++;
    ctx.clearRect(0, 0 , canvas.width, canvas.height);
    //화면을 지우는 역할(이전의 궤적? 움직임을 지움)
    
    if(timer % 200 === 0){
    //초당 표현하기 위해서 조건문 사용 
    //현재 모니터 프레임이 144z이면 144프레임 당 한번 표현
        var cactus = new Cactus();
        //장애물 생성
        cactuses.push(cactus);
        //여러개의 장애물을 표현하기 위해 배열 공간에 저장      
    }
    
    cactuses.forEach((currentElement, index, array)=>{
        if(currentElement.x < 0){
            //x축이 0보다 작다 = dino를 지나쳤다
            array.splice(index, 1);
            //배열의 해당 index에서 1개의 element를 제거
        }
        //배열의 공간낭비를 방지하기 위해서 
        //지나간 cactuses는 제거
        
        currentElement.x--;
        //장애물이 앞으로 이동
        collision(dino, currentElement);
        //충돌했는지 확인하는 함수
        currentElement.draw();
        //현재 해당 장애물을 그림
    })

    if(jump == true){
        dino.y--;
        jumpTimer++;
    }
    if(jump == false){
        if(dino.y < 200){
            dino.y++;
        }
        
    }
    if(jumpTimer > 100){
        jump = false;
        jumpTimer = 0;
    }
    dino.draw();
    
}

animate();

//충돌
function collision(dino, cactus){
    var col_x = cactus.x - (dino.x + dino.width);
    var col_Y = cactus.y - (dino.y + dino.height);

    if(col_x < 0 && col_Y < 0){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(animation);
        //화면 정지

    }
}



var jump = false;

document.addEventListener('keydown', function(e){
    if(e.code === 'Space'){
        //Space가 눌렸을때(keydown) jump상태를 ture로 바꿈
        jump =true;
    }
})