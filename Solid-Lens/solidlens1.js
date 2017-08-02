	var context;
	var mouseX = mouseY = 0;
	window.onload = start_animation;
	var pi=Math.PI; //pi value

	


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
    function drawFunction(X_e,Y_e){
//X_e and Y_e stands for co-ordinates of the mouse in the geometery

//get center
	var center2=canvas.width/2;
	var center1=canvas.height/2; //canvas center declaration
 	context.clearRect(0, 0, canvas.width, canvas.height);
  	var radius = parseFloat	(document.getElementById("radius").value);
	var cen1m=center1-100;
	var cen1n=center1+100;
//lens properties:
	var step=3;//for the curve
	var step_size=4;
	var eta= parseFloat(document.getElementById("index").value);//refractive index
	var y_step=75;

if(radius > 149) // my y co-ordinte of lens portion is 75+75
{
//run for loop which give us points on this circle
	var X = [];//store x co-ordinates of the geometry
	var Y = [];
	var i=0;
	var normal = [];

	var y=-y_step;
	var y2=y*y;
	var r2=radius*radius;
	var x=Math.sqrt(r2-y2) - radius;
	var Xp=Xr=x+center2;
	var Yp=Yr=y+center1;

	for(y=-y_step;y<=y_step;y=y+step)
{
	y2=y*y;
	r2=radius*radius;
	x=Math.sqrt(r2-y2) - radius;
	X[i]=x+center2;	
	Y[i]=y+center1;

	context.beginPath();
	context.moveTo(Xp,Yp);
	context.lineTo(X[i],Y[i]);
	context.lineCap="round";
	context.lineWidth=1;
	context.strokeStyle = "rgb(0,0,0)";
	context.stroke();

	Xp=X[i];
	Yp=Y[i];
	

//find normal ,x and y are the points on the circle
	normal[i]=Math.atan2(y,x+radius);
	normal[i]=(normal[i]*180)/pi;

	i=i+1;//increment 


}



//draw the ends for plane lens
	context.beginPath();
	context.moveTo(Xr,Yr);
	context.lineTo(Xp,Yp);
	context.stroke();

	var infinity=2;//initialize

//draw the strip
	context.beginPath();
	context.moveTo(20,20);
	context.lineTo(20,canvas.height-20);
	context.strokeStyle = "rgba(200,200,200,0.5)";
	context.lineCap="square";
	context.lineWidth=30;
	context.stroke();

//condition to move mouse
        if(X_e < Xp-10 && X_e>40)
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

//yellow strip
        context.beginPath();
 	var gradient = context.createLinearGradient(5, 0, 30, 0);
 	gradient.addColorStop(0, "rgb(200,200,200)");
 	gradient.addColorStop(1, 'yellow');
	context.rect(5, Y2-y_step, 30, 2*y_step);
  	context.fillStyle = gradient;
 	context.fill();
        context.lineWidth = 2;
        context.strokeStyle = gradient;
        context.stroke();
	context.lineWidth=0.6;
        context.strokeStyle = "rgb(255,0,0)";

	}

	if(X_e==0 && Y_e==0) //when application starts
	{
	X1=cen1m;
	Y1=center1;
	infinity=0;
	}


//////////////////////////////////////////////////////////////////////////////


//loop to draw rays
	for(var y_add=center1-y_step+0.001; y_add<=center1+y_step-0.001; y_add=y_add+step_size)
	{

	context.lineWidth=0.6;
        context.strokeStyle = "rgb(255,0,0)";


	if(infinity == 1) //on the strip
	{

	var diff= center1-Y2;

//line 1
	context.beginPath();
	context.moveTo(0,y_add-diff);
	context.lineTo(Xr,y_add);
	context.stroke();

//find angle thetad
	var thetadr=y_add-diff-y_add;
	var denom=Xr;
	}


	else if(infinity==0)
	{
//line 1
	context.beginPath();
	context.moveTo(X1,Y1);
	context.lineTo(Xr,y_add);
	context.stroke();

//find angle thetad
	var thetadr=Y1-y_add;
	var denom=Math.abs(X1-Xr);


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

//line from plane lens
	thetadr=thetadr/denom;
	thetadr=Math.atan(thetadr);
	var omegaidr=Math.asin((Math.sin(thetadr))/eta);//snell's law
	var omegaid=((omegaidr*180)/pi);
	omegad=360-omegaid;
        omegadr=((omegad*pi)/180);

	var cost= Math.cos(omegadr);
	var u=cost;
	var U= (radius*u);
	var sint=Math.sin(omegadr);
	var v=sint;
	var V= (radius*v);

	var P=(Xr+ 650*U);
	var Q=(y_add+ 650*V);



//find point of intersection
	var m=(y_add-Q)/(Xr-P); //slope
	var c=y_add - (m*Xr); //intercept
	var arr=[];

	for(var j=0;j<=i;j++)
{
	Y_i=Y[j]; //points to be inserted in line equation
	X_i=X[j];

	if(j!=0)
	{
	var upper=arr[j-1];
	var uppx=X[j-1];
	var uppn=normal[j-1];
	var uppy=Y[j-1];
	}

	arr[j]=(m*X_i)+c - Y_i ;

	if(arr[j] < 0)
	{
	var lower=arr[j];
	var lowx=X[j];
	var lowy=Y[j];
	var lown=normal[j];
	break;
	}
}

	var dem_c=upper-lower;
	var X_c=Math.abs(((uppx*lower)-(lowx*upper))/(dem_c));//coincident points
	var Y_c=Math.abs(((uppy*lower)-(lowy*upper))/(dem_c));
	var normal_c=(((uppn*lower)-(lown*upper))/(dem_c));//linear interpolation


//find the angle refracted out of curved surface
	var theta_cr = Math.atan((Y_c-y_add)/(X_c-Xr));
	var theta_c=((theta_cr*180)/pi);

	
	var omega_c=theta_c+normal_c;
        var omega_cr=((omega_c*pi)/180);
	var omegaid_cr=Math.asin((Math.sin(omega_cr))*eta);
	var omegaid_c=((omegaid_cr*180)/pi);

	var omegad_c=360+omegaid_c-normal_c;
        var omegad_cr=((omegad_c*pi)/180);

	var cost_c= Math.cos(omegad_cr);
	var u_c=cost_c;
	var U_c= (640*u_c);
	var sint_c=Math.sin(omegad_cr);
	var v_c=sint_c;
	var V_c= (640*v_c);
	var P_c=(X_c+ U_c);
	var Q_c=(Y_c+ V_c);

//draw lines
	context.lineWidth=0.6;
        context.strokeStyle = "rgb(255,0,0)";
	if(450 >= omegad )
	{
	if( omegad>=270)
	{
	context.beginPath();
	context.moveTo(Xr,y_add);
	context.lineTo(X_c,Y_c);
	context.stroke();
	context.beginPath();
	context.moveTo(X_c,Y_c);
	context.lineTo(P_c,Q_c);
	context.stroke();
	}
	} 

	}


}//radius<149 loop closed
//////////////////////////////////////////////////////////////////////////////
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