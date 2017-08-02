	var context;
	var mouseX = mouseY = 0;
	window.onload = start_animation;
	var pi=Math.PI; //pi value
	var THETA_p = [];//from paper
	var X_e=0,Y_e=0;
	var t;
	var flag = 0;
	var count = 0;

	

//function which runs on load
function start_animation()
{
    mouseX = 0;
    mouseY = 0;
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

function reset() {
        clearTimeout(t);
	start_animation()
}
function scale() {
	count = count + 1;
	if ((count % 2) != 0)
	{
 	flag = 1;
	}
 	else
	{
	flag = 0;
	}

}
//main function 
    function drawFunction(X_e,Y_e){
//X_e and Y_e stands for co-ordinates of the mouse in the geometery


//get center
	var center2=canvas.width/2 +200;
	var center1=canvas.height/2; //canvas center declaration
 	context.clearRect(0, 0, canvas.width, canvas.height);
 	contextA.clearRect(0, 0, canvasA.width, canvasA.height);
	var cen1m=center1-100;
	var cen1n=center1+100;
//lens properties:
	var delta=1;//for the curve
	var eta= parseFloat(document.getElementById("index").value);//refractive index
	var f= parseFloat(document.getElementById("focus").value);//focus
	var y_step=75;
	var step_size=8;
	var h=0.001;
	var total=0;
	var total1=0;
	var Xp_b=center2;
	var Xp_bp=center2;
	var Yp_b=center1;
	var Yp_a=center1;
	var Yp_bp=center1;
	var Yp_ap=center1;
//run for loop which give us points on this circle
	var X_b = [];//store x co-ordinates of the geometry
	var Y_b = [];
	var Y_a = [];
	var Q_X_b = [];//meeting point (refer pdf)
	var Q_Y_b = [];
	var Q_Y_a = [];
	var i=0; 
	var j=0;
	var normal = [];
	var xi=0;
	var yi=0;
	var yib=0;
	var xib=0;
	var X1,X2,Y1,Y2;
	var m_a=[];
	var c_a=[];
	var X=[];
	var Y=[];
	var Xb=[];
	var Yb=[];

//small black box
	context.beginPath();
	context.strokeStyle = "rgb(0,0,0)";
	context.lineWidth=0.5;
	context.rect(f+center2-30, center1-25, 60, 50);
	context.stroke();
	context.lineWidth=1;


if(eta >1)
{


	for(j=0;j<=(y_step/delta);j=j+1)
{


	yi = (((2*j) + 1)*delta)/2;
	yib=(j+1)*delta;
	k=0;
	
	do
	{
	angle_g=Math.atan((2*(xi-xib))/delta);
	g_of_xib = (Math.atan(yib/(f - xib)))-(Math.asin(eta* Math.sin(angle_g))) + angle_g;
	var xib_h=xib+h;
	angle_g_h=Math.atan((2*(xi-xib_h))/delta);
	g_of_xib_h = (Math.atan(yib/(f - xib_h)))-(Math.asin(eta* Math.sin(angle_g_h))) + angle_g_h;
	g_dash=(g_of_xib_h - g_of_xib )/(h)
	xib=xib - (g_of_xib / (g_dash));

	}while(Math.abs((g_of_xib/(g_dash))) >0.00001);
	

	X_b[i]=xi+center2;	
	Y_b[i]=yi+center1;
	Q_X_b[i]=xib+center2;
	Q_Y_b[i]=yib+center1;	
	Y_a[i]=center1-yi;
	Q_Y_a[i]=center1-yib;
	Xb[i]=xib;
	Yb[i]=yib;


	THETA_p[i]=Math.atan((2*(xi-xib))/delta);
	//var PHI_p=(Math.asin(eta* Math.sin(THETA_p[i])));
	//normal[i]=PHI_p - THETA_p[i];


	xi  = (2*xib) - xi ;

///////////////////////////////////////////////////////////////
	i=i+1;//increment 
total=i;
}
i=0;
	for(j=total-1;j>=0;j=j-1)
{
	X[i]=Xb[j]+center2;
	Y[i]=center1-Yb[j];
	normal[i]=-THETA_p[j];
	normal[i]=(normal[i]*180)/pi;
	i=i+1;
}
	for(j=0;j<total;j=j+1)
{
	X[i]=Xb[j]+center2;
	Y[i]=center1+Yb[j];
	normal[i]=THETA_p[j];
	normal[i]=(normal[i]*180)/pi;
	i=i+1;
}



	var infinity=2;//initialize

//draw the strip
	context.beginPath();
	context.moveTo(20,20);
	context.lineTo(20,canvas.height-20);
	context.strokeStyle = "rgba(200,200,200,0.5)";
	context.lineCap="square";
	context.lineWidth=30;
	context.stroke();


	for(i=1;i<total;i=i+4)
{
//draw the curve
	context.beginPath();
	context.moveTo(Xp_bp,Yp_bp);
	context.lineTo(X_b[i],Y_b[i]);
	context.moveTo(Xp_bp,Yp_ap);
	context.lineTo(X_b[i],Y_a[i]);
	context.lineCap="round";
	context.lineWidth=1;
	context.strokeStyle = "rgb(0,0,0)";
	context.stroke();


	var check=isNaN(X_b[i]);
//for ends
	if(!isNaN(X_b[i]))
{
	Xp_bp=X_b[i];
	Yp_bp=Y_b[i];
	Yp_ap=Y_a[i];
	total1=i;
}

}


//focus should not be equal to y_step,join ends
	context.beginPath();
	context.moveTo(Xp_bp,Yp_bp);
	context.lineTo(Xp_bp,Yp_ap);
	context.lineCap="round";
	context.lineWidth=1;
	context.strokeStyle = "rgb(0,0,0)";
	context.stroke();

	if(X_e==0 && Y_e==0) //when application starts
	{
	X_e=1;
	Y_e=center1;
	infinity=0;
	}


//condition to move mouse
        if(X_e < Xp_bp-10 && X_e>40)
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
	var len= Math.abs(Yp_bp - Yp_ap);
        context.beginPath();
 	var gradient = context.createLinearGradient(5, 0, 30, 0);
 	gradient.addColorStop(0, "rgb(200,200,200)");
 	gradient.addColorStop(1, 'yellow');
	context.rect(5, Y2-(len/2), 30, len);
  	context.fillStyle = gradient;
 	context.fill();
        context.lineWidth = 2;
        context.strokeStyle = gradient;
        context.stroke();
	}



	for(var y_add=Yp_ap+0.001+5; y_add<=Yp_bp-0.001; y_add=y_add+step_size)
{

	context.lineWidth=0.6;
        context.strokeStyle = "rgb(255,0,0)";


	if(infinity == 1) //on the strip
	{

	var diff= center1-Y2;

//line 1
	context.beginPath();
	context.moveTo(0,y_add-diff);
	context.lineTo(Xp_bp,y_add);
	context.stroke();

//find angle thetad
	var thetadr=y_add-diff-y_add;
	var denom=Xp_bp;
	}

	else if(infinity==0)
	{
//line 1
	context.beginPath();
	context.moveTo(X1,Y1);
	context.lineTo(Xp_bp,y_add);
	context.stroke();

//find angle thetad
	var thetadr=Y1-y_add;
	var denom=Math.abs(X1-Xp_bp);


	context.beginPath();
	var gradient = context.createRadialGradient(X1,Y1,2,X1,Y1,3);
	gradient.addColorStop(1,"red");
	gradient.addColorStop(0,"yellow");
	context.arc(X1,Y1, 3, 0, 2 * Math.PI, false);
	context.fillStyle = gradient;
	context.fill();
        context.strokeStyle = "rgb(255,0,0)";
	context.stroke();

	context.fillStyle = "rgb(255,0,0)";
	

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
	var U= (1*u);
	var sint=Math.sin(omegadr);
	var v=sint;
	var V= (1*v);

	var P=(Xp_bp+ 650*U);
	var Q=(y_add+ 650*V);

var Xr=Xp_bp;

//find point of intersection
	var m=(y_add-Q)/(Xr-P); //slope
	var c=y_add - (m*Xr); //intercept
	var arr=[];




	for(var j=0;j<=(2*total-2);j++)
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

	context.beginPath();
	context.moveTo(Xr,y_add);
	context.lineTo(X_c,Y_c);
	context.stroke();

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
	var U_c= (440*u_c);
	var sint_c=Math.sin(omegad_cr);
	var v_c=sint_c;
	var V_c= (440*v_c);
	var P_c=(X_c+ U_c);
	var Q_c=(Y_c+ V_c);

//draw lines
	if(450 >= omegad )
	{
	if( omegad>=270)
	{
	context.beginPath();
	context.moveTo(X_c,Y_c);
	context.lineTo(P_c,Q_c);
        context.strokeStyle = "rgb(255,0,0)";
	context.stroke();


	xd = P_c - X_c;
	yd = Q_c - Y_c;
	Y_from = (((f+center2-30 -X_c)* yd )/xd) + Y_c;
	Y_to = (((f+center2+30 - X_c)* yd )/xd) + Y_c;

      	context.save();

      	contextA.save();


	contextA.translate(-4450-(6*f),-1100);
	contextA.scale(6,6);

//canvas2 rays

	contextA.lineWidth=0.1;
	contextA.beginPath();
        contextA.strokeStyle = "rgb(255,0,0)";
	contextA.moveTo(f+center2-30,Y_from);
	contextA.lineTo(f+center2+30,Y_to);
	contextA.stroke();

	contextA.translate(4450+(6*f),1100);
	contextA.scale(1/6,1/6);





   	contextA.restore();

   	context.restore();
	}
	} 




}

}

      	context.save();

      	contextA.save();


	contextA.translate(-4450-(6*f),0);
	contextA.scale(6,6);

//canvas2 box
	contextA.lineWidth=0.2;
	contextA.beginPath();
        contextA.strokeStyle = "rgb(0,0,0)";
	contextA.rect(f+center2-30,0, 60, 33.2);
	contextA.stroke();
        contextA.strokeStyle = "rgb(255,0,0)";


	contextA.translate(4450+(6*f),0);
	contextA.scale(1/6,1/6);




   	contextA.restore();

   	context.restore();




//////////////////////////////////////////////////////////////////////////////
	t=setTimeout("drawFunction(mouseX, mouseY)", 20);

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
	