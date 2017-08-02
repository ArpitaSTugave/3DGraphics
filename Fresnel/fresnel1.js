	var context;
	var mouseX = mouseY = 0;
	window.onload = start_animation;
	var counter=20;
	var pi=Math.PI; //pi value
	var option=1;
	var step_size=5;
	var eta=1.5;//refractive index
	var y_step=75;
	


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



function option_1() {
option=1;
}
function option_2() {
option=2;
}
function option_3() {
option=3;
}
function option_4() {
option=4;
}
function option_5() {
option=5;
}
function option_6() {
option=6;
}

//main function 
    function drawFunction(x_e,y_e){

	var center2=canvas.width/2;
	var center1=canvas.height/2; //canvas center declaration
 	context.clearRect(0, 0, canvas.width, canvas.height);
	var axis_cen=canvas.width/2;
	var cen1m=center1-100;
	var cen1n=center1+100;


//draw the strip
	context.beginPath();
	context.moveTo(20,20);
	context.lineTo(20,canvas.height-20);
	context.strokeStyle = "rgba(200,200,200,0.5)";
	context.lineCap="square";
	context.lineWidth=30;
	context.stroke();


//draw axis
	context.beginPath();
	context.lineWidth=2;
	context.lineCap="round";
        context.strokeStyle = "rgb(0,0,0)";
	context.moveTo(axis_cen,center1-75);
	context.lineTo(axis_cen,center1+75);
	context.stroke();

	context.beginPath();
	context.moveTo(axis_cen,0);
	context.lineTo(axis_cen,canvas.height);
	context.lineWidth=0.25;
	context.lineCap="round";
        context.strokeStyle = "rgb(0,0,0)";
	context.stroke();
	context.beginPath();
       	context.moveTo(0,center1);
	context.lineTo(canvas.width,center1);
	context.lineWidth=0.5;
	context.stroke();

	var infinity=2;
//condition to move mouse

	if(x_e < axis_cen-10 && x_e>40)
	{
	x1=x_e;
	y1=y_e;
	infinity=0;
	}
	else if(x_e<40 && x_e>0)
	{
	x2=x_e;
	y2=y_e;
	infinity=1;
//yellow strip
        context.beginPath();
 	var gradient = context.createLinearGradient(5, 0, 30, 0);
 	gradient.addColorStop(0, "rgb(200,200,200)");
 	gradient.addColorStop(1, 'yellow');
	context.rect(5, y2-y_step, 30, (y_step*2));
  	context.fillStyle = gradient;
 	context.fill();
        context.lineWidth = 2;
        context.strokeStyle = gradient;
        context.stroke();
	context.lineWidth=0.6;
        context.strokeStyle = "rgb(255,0,0)";
	}
	if(x_e==0 && y_e==0)
	{
	x1=cen1m;
	y1=center1;
	infinity=0;
	}


	var y=0;
	for(var xcal=0; xcal<=y_step; xcal=xcal+step_size)
	{
	y=y+step_size;
	}
	for(var x_add=center1-y_step; x_add<=center1+y_step; x_add=x_add+step_size)
	{
//for phi

	if(x_add>center1)
	{
	y=y+step_size;
	var yscale=-y/y_step;
	var sign_change=0;
	}
	 if(x_add==center1)
	{
	y=0;
	var yscale=0;
	var sign_change=1;
	}
	if(x_add<center1)
	{
	y=y-step_size;
	var yscale=y/y_step;
	var sign_change=2;
	}


  	var focus = parseFloat	(document.getElementById("Focus").value);
	var k=(y_step)/focus;

	if(option==1)
	var angle=(yscale*k);
	if(option==2)
	var angle=(Math.atan(yscale)*k);	
	if(option==3)
	var angle=(Math.atan(yscale*k));	
	if(option==4)
	var angle=(Math.asin(yscale)*k);	
	if(option==5)
	var angle=(Math.asin(yscale*k));

	angle=(angle*180)/pi;
	var phi=2*(angle);
	context.lineWidth=0.75;
        context.strokeStyle = "rgb(255,0,0)";


	if(option==6)
	{
	yscale=Math.abs(yscale);
	var angle=Math.atan(Math.abs((center1-x_add)/focus));
	angle=(angle*180)/pi;

	if(sign_change==2)
	var phi=2*(angle);
	else
	var phi=-(2*angle);


	}	



	if(infinity == 1)
	{

	var diff= center1-y2;

//line 1
	context.beginPath();
	context.moveTo(axis_cen-center2,x_add-diff);
	context.lineTo(axis_cen,x_add);
	context.stroke();
	var thetadr=x_add-diff-x_add;
	var denom=center2;
	}


	else if(infinity==0)
	{
	context.beginPath();
	context.moveTo(x1,y1);
	context.lineTo(axis_cen,x_add);
	context.stroke();

	//find angle thetad
	var thetadr=y1-x_add;
	var denom=Math.abs(x1-axis_cen);

	//movable focus
	counter--; // to make the source blink
	if(counter<=0)
	{
	//movable focus=source
	context.beginPath();
	var gradient = context.createRadialGradient(x1,y1,2,x1,y1,3);
	gradient.addColorStop(1,"blue");
	gradient.addColorStop(0,"yellow");
	context.arc(x1,y1, 3, 0, 2 * Math.PI, false);
	context.fillStyle = gradient;
	context.fill();
	context.stroke();
	

	if(counter == -20)
	counter=10;
	}
	else
	{
	context.beginPath();
	context.arc(x1,y1, 3, 0, 2 * Math.PI, false);
	context.fillStyle = "rgb(255,0,0)";
        context.strokeStyle = "rgb(255,0,0)";
	context.fill();
	context.stroke();
	}
	}
	else if(infinity==2)
	{
	}

	thetadr=thetadr/denom;
	thetadr=Math.atan(thetadr);
	var thetad=((thetadr*180)/pi);


	var omega=(thetad-phi);
	var omegaid=eta*omega;
	omegad=360-omegaid-phi;
        omegadr=((omegad*pi)/180);
	var cost= Math.cos(omegadr);
	var u=cost;
	var u1= (640*u);
	var sint=Math.sin(omegadr);
	var v=sint;
	var v1= (640*v);
	var p1=(axis_cen+ u1);
	var q1=(x_add+ v1);
	context.lineWidth=0.75;
        context.strokeStyle = "rgb(255,0,0)";
	if(450 >= omegad )
	{
	if( omegad>=270)
	{
	context.beginPath();
	context.moveTo(axis_cen,x_add);
	context.lineTo(p1,q1);
	context.stroke();
	}
	} 
	}

	context.fillStyle = "#000000";
  	context.font = '12px Arial';
  	context.fillText("F",focus+axis_cen,center1); 



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