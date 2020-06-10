function init(){
	canvas=document.getElementById('mycanvas');
	W=H=canvas.width=canvas.height=1000;
	pen=canvas.getContext('2d');
	cs=67;
	game_over=false;
	score=1;

	//craete image object for food
	food_img=new Image();
	food_img.src="apple.png";
	trophy=new Image();
	trophy.src="circle-cropped.png";
	food=getRandomFood();
	snake={
		init_len:1,
		color:"aqua",
		cells:[],
		direction:"right",
		createSnake:function(){
			for(var i=this.init_len;i>0;i--){
				this.cells.push({x:i,y:0});
			}
		},
		drawSnake:function(){
			for(var i=0;i<this.cells.length;i++){
				pen.fillStyle=this.color;
				pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-3,cs-3);
			}
		},
		updateSnake:function(){
			console.log("updating snake");

// check if snake has eaten food,ythen iuncrease thelength of snake
			var headX=this.cells[0].x;
			var headY=this.cells[0].y;
			if(headX==food.x && headY==food.y){
				food=getRandomFood();
				score++;
			}else{
			this.cells.pop();
			}
			var nextX,nextY;
			if(this.direction=="right"){
				nextX=headX+1;
				nextY=headY;
			}
			else if(this.direction=="left"){
				nextX=headX-1;
				nextY=headY;
			}
			else if(this.direction=="down"){
				nextX=headX;
				nextY=headY+1;
			}else{
				nextX=headX;
				nextY=headY-1;
			}
			this.cells.unshift({x:nextX,y:nextY}); 
			var lastX=Math.round(W/cs);
			var lastY=Math.round(H/cs);
			if(this.cells[0].y<0 ||this.cells[0].x<0 || this.cells[0].x>lastX ||this.cells[0].y>lastY){
				game_over=true;
			}
		},

	};
	snake.createSnake();
	//add a event listener to Documnet Object
	function keyPressed(e){
		if(e.key=="ArrowRight"){
			snake.direction="right";
		}else if(e.key=="ArrowLeft"){
			snake.direction="left";
		}else if(e.key=="ArrowDown"){
			snake.direction="down";
		}else{
			snake.direction="up";
		}
	}	
	document.addEventListener('keydown',keyPressed);
}
function draw(){
	//erase the old frame
	pen.clearRect(0,0,W,H);
	snake.drawSnake();	
	pen.fillStyle=food.color;
	pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs);
	pen.drawImage(trophy,18,20,cs+50,cs+50);
	pen.fillStyle="yellow";
	pen.font="50px Roboto"
	pen.fillText(score,70,90);
}
function update(){
	snake.updateSnake();

}
function getRandomFood(){
	var foodX=Math.round(Math.random()*(W-cs)/cs); 
	var foodY=Math.round(Math.random()*(H-cs)/cs);
	var food={
		x:foodX,
		y:foodY,
		color:"red",
	};
	return food;
}

function gameloop(){
	if(game_over==true){
		clearInterval(f);
		alert("Game Over");
	}
	draw();
	update();
}
init();
var f=setInterval(gameloop,120);