//declarations
	
	var context;
	var centerX = 0;
	var centerY = 0;
	var mouseX = mouseY = 0;
	window.onload = start_animation;
	beta = 0.1;
	m = 1.5 //slope
	counter = 10; //controls rate of blinking

//function which runs on load
function start_animation()
{
 	var element = document.getElementById("canvas");
	// implement mouse drag	
	var flag = 0;
	element.addEventListener("mousedown", function(event){
        flag = 1;
	}, false);
	element.addEventListener("mousemove", function(event){
	if(flag === 1)
{
        console.log("drag");
   	mouseX = event.layerX;
  	mouseY = event.layerY;

}

	}, false);
	element.addEventListener("mouseup", function(event){
 	flag=0;
	}, false);

	context = element.getContext("2d");
	drawFunction(mouseX, mouseY);

 }

 //main function 
    function drawFunction(x_e,y_e){


	var center2=canvas.width/2;
	var center1=canvas.height/2; //canvas center declaration
 	context.clearRect(0, 0, canvas.width, canvas.height);

 	//draw axis
 	context.beginPath();
    	context.strokeStyle = 'black';
	context.moveTo(center2-300,center1);
	context.lineTo(center2+300,center1);
	context.lineWidth=1;
	context.lineCap="round";
	context.stroke();
	context.beginPath();
	context.moveTo(center2,center1-200);
	context.lineTo(center2,center1+200);
	context.stroke();

	//there are three curves
	//curve1 equation: y = beta-1.5x
	context.beginPath();
	context.strokeStyle ="rgb(150,0,0)";
	i = -2; j = -(i*m)+beta;
	context.moveTo(center2+(i*100),center1-(j*100));
	for(var i=-2; i<=2; i=i+0.5) {
		j = -(i*m)+beta;
		context.lineTo(center2+(i*100),center1-(j*100));
		if (i == 1) {
			context.fillStyle = "rgb(150,0,0)";
			context.font = '15px Verdana';
			context.fillText(String.fromCharCode(946),center2+(i*100)+5,center1-(j*100));
			context.fillText("-",center2+(i*100)+17,center1-(j*100));
			context.fillText(m,center2+(i*100)+24,center1-(j*100));
			context.fillText("X",center2+(i*100)+50,center1-(j*100));
		}
	}
	context.stroke();

	//curve2 equation: y = beta+x^3
	context.beginPath();
	context.strokeStyle ="rgb(100,100,255)";
	i = -2; j = (i*i*i)+beta;
	context.moveTo(center2+(i*100),center1-(j*100));
	for(var i=-2; i<=2; i=i+0.05) {
		j = (i*i*i)+beta;
		context.lineTo(center2+(i*100),center1-(j*100));
	}
	context.stroke();

	//curve3 equation: y = beta-1.5x+x^3
	context.beginPath();
	context.strokeStyle ="green";
	i = -2; j =  -(i*m)+(i*i*i)+beta;
	context.moveTo(center2+(i*100),center1-(j*100));
	for(var i=-2; i<=2; i=i+0.05) {
		j =  -(i*m)+(i*i*i)+beta;
		context.lineTo(center2+(i*100),center1-(j*100));
	}
	context.stroke();
	//drop critical points onto x-axis
	context.beginPath();
	context.strokeStyle = 'black';
	i = Math.abs(Math.sqrt(0.5));
	j =  -(i*1.5)+(i*i*i)+beta;
	context.lineTo(center2+(i*100),center1-(j*100));
	context.lineTo(center2+(i*100),center1);
	context.stroke();
	context.beginPath();
	context.strokeStyle = 'black';
	i = -i;
	j =  -(i*1.5)+(i*i*i)+beta;
	context.lineTo(center2+(i*100),center1-(j*100));
	context.lineTo(center2+(i*100),center1);
	context.stroke();
	context.fillStyle = "green";
	context.font = '15px Verdana';
	context.fillText(String.fromCharCode(946),center2+(i*100)-100+5,center1-(j*100)-10);
	context.fillText("-",center2+(i*100)+17-100,center1-(j*100)-10);
	context.fillText(m,center2+(i*100)+24-100,center1-(j*100)-10);
	context.fillText("X+X",center2+(i*100)+50-100,center1-(j*100)-10);
	context.font = '10px Verdana';
	context.fillText("3",center2+(i*100)+83-100,center1-(j*100)-22);

	//additional text 
	context.fillStyle = 'black';
	context.font = '15px Verdana';
	context.fillText("0",center2-15,center1+15);
	context.fillText("1",center2+100-5,center1-5);
	context.fillText("-1",center2-100-5,center1-5);
	context.fillText("X",center2+150,center1+15);
	context.fillStyle = 'blue';
	context.fillText(String.fromCharCode(946),center2-115,center1+170);
	context.fillText("+X",center2-105,center1+170);
	context.font = '10px Verdana';
	context.fillText("3",center2-82,center1+158);

	//makes arc to blink
	counter--;
	if(counter<=0) {

		i = Math.abs(Math.sqrt(0.5));
		j =  -(i*1.5)+(i*i*i)+beta;
		context.beginPath();
		context.fillStyle = 'white';
		context.strokeStyle = 'green';
		context.arc(center2+(i*100),center1,3,0,2*Math.PI);
		context.fill();
		context.stroke();
		i = -i;
		j =  -(i*1.5)+(i*i*i)+beta;
		context.beginPath();
		context.fillStyle = 'white';
		context.strokeStyle = 'green';
		context.arc(center2+(i*100),center1,3,0,2*Math.PI);
		context.fill();
		context.stroke();
		context.beginPath();
		context.fillStyle = 'black';
		context.arc(center2+100,center1,2,0,2*Math.PI);
		context.fill();
		context.beginPath();
		context.fillStyle = 'black';
		context.arc(center2-100,center1,2,0,2*Math.PI);
		context.fill();
		if(counter == -10)
			counter = 10;
	}

	setTimeout("drawFunction(mouseX, mouseY)",20);

 }
