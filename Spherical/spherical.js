	var context;
	var mouseX = mouseY = 0;
	window.onload = start_animation;
	var pi=Math.PI; //pi value

	


//function which runs on load
function start_animation()
{
 	var element = document.getElementById("canvas");
 	var elementA = document.getElementById("canvasA");
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
	contextA = elementA.getContext("2d");
	drawFunction(mouseX, mouseY);
}


//main function 
    function drawFunction(X_e,Y_e){
//X_e and Y_e stands for co-ordinates of the mouse in the geometery

//get center
	var center2=canvas.width/2 + 400;
	var center1=canvas.height/2; //canvas center declaration
 	context.clearRect(0, 0, canvas.width, canvas.height);
 	contextA.clearRect(0, 0, canvasA.width, canvasA.height);
  	var radius = parseFloat	(document.getElementById("radius").value);
	var cen1m=center1-100;

if ( isNaN(radius) == false )
{


//mirror properties:
	var step=6;//for the curve
	var y_step=100;

	var y=-y_step;
	var y2=y*y;
	var r2=radius*radius;
	var x=Math.sqrt(r2-y2) - radius;
	var Xp=x+center2;
	var Yp=y+center1;
	var infinity=2;//initialize
	var y_s = 0;
	var draw = 1;

//draw the strip
	context.beginPath();
	context.rect(10, 0, 30, canvas.height);
	context.strokeStyle = "rgba(200,200,200,0.5)";
	context.fillStyle = "rgba(200,200,200,0.5)";
	context.lineCap="square";
	context.stroke();
	context.fill();


//condition to move mouse
        if(X_e < center2 && X_e>40)
	{
	X1=X_e;
	Y1=Y_e;
	infinity=0;
	}
	else if(X_e<40 && X_e>0)
	{
	X2=X_e;
	Y2=Y_e;
	infinity=1;

	}

	
	if(X_e==0 && Y_e==0) //when application starts
	{
	X2=0;
	Y2=center1;
	infinity=1;
	}


//////////////////////////////////////////////////////////////////////////////rays and curve


//loop to draw rays
	for(y=-y_step+step;y<=y_step;y=y+step)
	{

	y2=y*y;
	x=Math.sqrt(r2-y2) - radius;

	x_add=x+center2;	

	y_add= y+center1;


	if (isNaN(x_add) == false)
	{
	flag = 1;
	y_s = y_add;	
	}

/*
//normal
	ny_a= y;
	nx_a= x+ radius;

	context.beginPath();
	context.moveTo(x_add + nx_a,y_add + ny_a);
	context.lineTo(x_add - nx_a,y_add - ny_a);
	context.lineCap="round";
	context.lineWidth=1;
	context.strokeStyle = "rgb(0,0,0)";
	context.stroke();
*/



	if ( draw == 0)
	{
	context.beginPath();
	context.moveTo(Xp,Yp);
	context.lineTo(x_add,y_add);
	context.lineCap="round";
	context.lineWidth=1;
	context.strokeStyle = "rgb(0,0,0)";
	context.stroke();
	}
	draw = 0 ;



	Xp=x_add;
	Yp=y_add;
	

//find normal ,x and y are the points on the circle
	normal=Math.atan2(y,x+radius);
	normal=(normal*180)/pi;


	context.lineWidth=0.6;
        context.strokeStyle = "rgba(255,0,0,0.5)";


	if(infinity == 1) //on the strip
	{

	var diff= center1-Y2;

//line 1
	context.beginPath();
	context.moveTo(0,y_add-diff);
	context.lineTo(x_add,y_add);
	context.stroke();

//find angle thetad
	var thetadr=y_add-diff-y_add;
	var denom=x_add;
	}


	else if(infinity==0)
	{
//line 1
	context.beginPath();
	context.moveTo(X1,Y1);
	context.lineTo(x_add,y_add);
	context.stroke();

//find angle thetad
	var thetadr=Y1-y_add;
	var denom=Math.abs(X1-x_add);


	context.beginPath();
	var gradient = context.createRadialGradient(X1,Y1,2,X1,Y1,3);
	gradient.addColorStop(1,"red");
	gradient.addColorStop(0,"yellow");
	context.arc(X1,Y1, 3, 0, 2 * Math.PI, false);
	context.fillStyle = gradient;
	context.fill();
	context.stroke();
	

	}

	else if(infinity==2)
	{
	}

	thetadr=-(thetadr/denom);
	theta=Math.atan(thetadr);
	theta=(theta*180)/pi;

	var omega=180+2*(normal-theta) + theta;
        omega=((omega*pi)/180);


	var cost= Math.cos(omega);
	var u=cost;
	var U= (1000*u);

	var sint=Math.sin(omega);
	var v=sint;
	var V= (1000*v);

	var P=(x_add+ U);
	var Q=(y_add+ V);

        context.strokeStyle = "rgb(255,0,0)";



	context.beginPath();
	context.moveTo(x_add,y_add);
	context.lineTo(P,Q);
	context.stroke();

     	context.save();

      	contextA.save();


	contextA.translate(-750,-300);
	contextA.scale(2,2);

	contextA.lineWidth=0.3;
	context.beginPath();
        contextA.strokeStyle = "rgb(255,0,0)";
	contextA.beginPath();
	contextA.moveTo(x_add,y_add);
	contextA.lineTo(P,Q);
	contextA.stroke();

	contextA.translate(750,300);
	contextA.scale(1/2,1/2);




   	contextA.restore();

   	context.restore();






	}

//////////////////////////////////////////////////////////////////////////////



	if(infinity == 1) //on the strip
	{

//yellow strip
        context.beginPath();
	context.rect(10, Y2-(y_s-center1), 30, 2*(y_s-center1));
 	var gradient = context.createLinearGradient(5, 0, 30, 0);
 	gradient.addColorStop(0, "rgba(200,200,200,0.5)");
 	gradient.addColorStop(1, "rgba(255,255,0,0.5)");
        context.fillStyle = gradient;
 	context.fill();
        context.lineWidth = 2;
        context.strokeStyle = "rgba(255,255,0,0.5)";
        context.stroke();
	context.lineWidth=0.6;
        context.strokeStyle = "rgb(255,0,0)";
	}

	}


	setTimeout("drawFunction(mouseX, mouseY)", 20);
	}


  	context.fillStyle = "#8E8EFF";
  	context.font = '15px Arial';
  	context.fillText("(thetad=",400+100,400);  
  	context.fillText(thetad,400+200,400); 
	context.fillText("omega=",400+100,400+30); 
	context.fillText(omega,400+200,400+30); 
  	context.fillText("omegaid=",400+100,400+60);  
	context.fillText(omegaid,400+200,400+60);
	context.fillText("phi=",400+100,400+90); 
	context.fillText(phi,400+200,400+90);
	context.fillText("omegad=",400+100,400+120);  
	context.fillText(omegad,400+200,400+120);