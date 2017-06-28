//declarations
	
	var context;
	var centerX = 0;
	var centerY = 0;
	var mouseX = mouseY = 0;
	window.onload = start_animation;
	beta = 0.1;

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
	i = -2; j = -(i*1.5)+beta;
	context.moveTo(center2+(i*100),center1-(j*100));
	for(var i=-2; i<=2; i=i+0.05) {
		j = -(i*1.5)+beta;
		context.lineTo(center2+(i*100),center1-(j*100));
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
	i = -2; j =  -(i*1.5)+(i*i*i)+beta;
	context.moveTo(center2+(i*100),center1-(j*100));
	for(var i=-2; i<=2; i=i+0.05) {
		j =  -(i*1.5)+(i*i*i)+beta;
		context.lineTo(center2+(i*100),center1-(j*100));
	}
	context.stroke();



 }