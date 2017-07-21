//declarations
	
	var context;
	var a=1.2; //scale
	var a2=1;
	var pi=Math.PI; //pi value
	var half_radius=275; //set radius
	var centerX = 0;
	var centerY = 0;
	var mouseX = mouseY = 0;
	var x1=0;
	var x2=0;
	window.onload = start_animation;
	var counter=5;
	var offset=20;

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





//function for rhombus on top of ellipse
	if (window.CanvasRenderingContext2D) {
 	CanvasRenderingContext2D.prototype.diamond = function(x, y, width, height) {
// if values are not set just exit
    if(!x || !y || !width || !height) { return true; }
 
    this.beginPath();
    this.moveTo(x + width*0.5, y);
    this.lineTo(x, y + height*0.5);
    this.lineTo(x + width*0.5, y + height);
    this.lineTo(x + width, y +height*0.5);
    this.lineTo(x + width*0.5, y);
    this.closePath();  
  };
}



//main function 
    function drawFunction(x_e,y_e){


	var center2=canvas.width/4;
	var center1=canvas.height/2; //canvas center declaration
 	context.clearRect(0, 0, canvas.width, canvas.height);
        //context.fillStyle = "#EEE8AA";
        //context.fillRect(0,0,canvas.width,canvas.height);
	a2=a*a;
	var cen1=((Math.sqrt(a2-1))/a); //2 foci points
	cen1=((cen1*half_radius) + center2 );
	var cen2= -((Math.sqrt(a2-1))/a);
	cen2=((cen2*half_radius) + center2 );
        var cen1m=center2+half_radius;
        cen1m=((Math.abs(cen1-cen1m))/2)+cen1;
        var cen2m=center2-half_radius;
        cen2m=cen2-((Math.abs(cen2-cen2m))/2);

	var x_ce=(x_e-center2)/(half_radius);//normalized co-ordinates.
	var y_ce=-(y_e-center1)/(half_radius);
	var xs=(x_e-center2);
	var ys=(y_e-((center1-half_radius/a)-30));

if(x_e ==0)
{
	x1=cen1m;
	y1=center2;
	xg=cen2m;
	yg=center2;

}
	var xcr= (x_e-x1);
        var ycr= (y_e-y1);
	var xcl= (x_e-xg);
        var ycl= (y_e-yg);


//condition to move the point inside the ellipse
if( ((x_ce*x_ce) + (y_ce*y_ce*a2)) < 0.98) 
{
if( (xcr*xcr + ycr*ycr -100) < 0.01)
{
	x1=x_e;
	y1=y_e;
}
else if( (xcl*xcl + ycl*ycl -100) < 0.01)
{
	xg=x_e;
	yg=y_e;
}
}
else if((xs*xs + ys*ys -400) < 0.01 )
{
	a=((half_radius)/(center1-y_e-30));
	a=Math.abs(a);
	a=(Math.min(a,4));
	a=(Math.max(a,1));
	a2=a*a;
	x1=cen1m;
	y1=center2;
	xg=cen2m;
	yg=center2;

}



 //ellipse
	context.beginPath();
      	context.save();
      	context.translate(canvas.width / 4, canvas.height / 2);
      	context.scale(1, 1/a);
      	context.beginPath();
      	context.arc(centerX, centerY, half_radius, 0, 2 * Math.PI, false);
      	context.restore();
      	context.strokeStyle = 'black';
      	context.stroke();

//rhombus above ellipse to pull it	
	gradient = context.createLinearGradient(center2-10, (center1-(half_radius/a))-30, center2+10, (center1-(half_radius/a))-10);
  	gradient.addColorStop("0","red");
 	gradient.addColorStop(".25","white");
  	gradient.addColorStop(".50","red");
  	gradient.addColorStop(".75","white");
  	gradient.addColorStop("1.0","red");
	context.beginPath();
	context.diamond(center2-10, (center1-(half_radius/a)) - 30, 20, 20);
  	context.fillStyle = gradient;
	context.strokeStyle = 'black';
  	context.fill();
  	context.stroke();
	context.beginPath();
	context.moveTo(center2,(center1-(half_radius/a)));
	context.lineTo(center2,(center1-(half_radius/a))-10);
	context.lineWidth=1;
	context.lineCap="round";
 	context.strokeStyle = 'black';
	context.stroke();




//for green lines
	var theta_space = 5;
	var l = [];

	for(var theta1=0; theta1<=360; theta1++)
{
	theta_space--;
//refection line1
	var thetar=((theta1*pi)/180);
	var cost= Math.cos(thetar);
	var u=cost;
	var u1= (half_radius*u);
	var sint=Math.sin(thetar);
	var v=sint/a;
	var v1= (half_radius*v);
	var p11=(center2+u1);
	var q11=(center1+ v1);
//find distance for plot
	var x1_dis = Math.abs(x1-p11);
	var y1_dis = Math.abs(y1-q11);
	var x12_dis = x1_dis * x1_dis;
	var y12_dis = y1_dis * y1_dis;
	var l1=Math.sqrt((x12_dis) + (y12_dis));
	var x2_dis = Math.abs(xg-p11);
	var y2_dis = Math.abs(yg-q11);
	var x22_dis = x2_dis * x2_dis;
	var y22_dis = y2_dis * y2_dis;
	var l2=Math.sqrt((x22_dis) + (y22_dis));
	l[theta1]=l1+l2;
	
	
if(theta_space == 0 )
{

	context.beginPath();
	context.setLineDash([15,5]);
	context.lineDashOffset=offset;
	context.lineWidth=0.65;
	context.lineCap="round";
        context.strokeStyle = 'green';
	context.moveTo(x1,y1);
	context.lineTo(p11,q11);
	context.lineTo(xg,yg);
	context.stroke();
	theta_space=5;

}
}

	context.setLineDash([0,0]);


//plot 
	var plot_centerx =  canvas.width/2 + 50;
	var plot_centery =  canvas.height - 200;
	var largest = Math.max.apply(Math, l);
	var set=0;

	for(var theta2=0; theta2<=360; theta2++)
{

	theta2r=Math.abs(360-theta2);
	context.lineWidth=0.5;
	context.lineCap="round";
	context.fillStyle ="rgb(100,100,255)";
	var nor_l=(l[theta2r] / largest );
	var less=0.000001;
	var thetab=theta2r-1;
	var thetaa=theta2r+1;
	var nor_lb=(l[thetab] / largest );//before
	var nor_la=(l[thetaa] / largest );//after
	var org_y=plot_centery-(nor_l* (canvas.height - 400)) ;
	var org_x=plot_centerx+theta2;
	var y_len=Math.abs(org_y - plot_centery);
      context.beginPath();
      context.rect(org_x, org_y, 0.5, 0.5);
      context.strokeStyle = 'black';
      context.stroke();
      context.beginPath();
      context.rect(org_x, org_y, 0.5, y_len);
      context.strokeStyle = "rgba(100,255,100,0.3)";
      context.stroke();
//for first and last rays
	//if(thetab== -1 || thetaa==361 )
	//set=1;

//finding maximum or the minimum
/*
	else if( nor_l < nor_lb && nor_l < nor_la) //for minimum
	{
	if(Math.abs(nor_l - nor_lb) > less && Math.abs(nor_l - nor_la) > less )
	{
	set=1;
	}
	}
        else if( nor_l > nor_lb && nor_l > nor_la) //for maximum
	{
	if(Math.abs(nor_l - nor_lb) > less && Math.abs(nor_l - nor_la) > less )
	{
	set=1;
	}
	}
*/ 
	var comp1=nor_l+less;
	var comp2=nor_l-less;
if( ((comp1 < nor_lb) && (comp1 < nor_la))
 || ( (comp2 > nor_lb) && (comp2 > nor_la))
 || (thetab== -1) || (thetaa==361) )
	{
	set=1;
	}
	if(set==1)
	{
        context.beginPath();
        context.rect(org_x, org_y, 0.5, y_len);
        context.strokeStyle = 'green';
        context.stroke();
	context.beginPath();
	context.arc(org_x, org_y-3,1.5, 0, 2 * Math.PI, false);
	context.strokeStyle = 'black';
	context.fill();
	context.stroke();
	set=0;
//draw black lines inside ellipse
	var thetar1=((theta2r*pi)/180);
	var cost1= Math.cos(thetar1);
	var u1=cost1;
	var u11= (half_radius*u1);
	var sint1=Math.sin(thetar1);
	var v1=sint1/a;
	var v11= (half_radius*v1);
	var p111=(center2+u11);
	var q111=(center1+ v11);

	context.beginPath();
	context.setLineDash([15,5]);
	context.lineDashOffset=offset;
	context.lineWidth=1;
	context.lineCap="round";
	context.moveTo(x1,y1);
	context.lineTo(p111,q111);
	context.lineTo(xg,yg);
	context.stroke();
	theta_space=5;
	context.setLineDash([0,0]);
}

}

//set back dash lines and its wavefronts.
	offset=offset-1;
	if(offset==0)
	{
	offset=20;
	}
	context.setLineDash([0,0]);
	context.lineDashOffset=0;

//draw axis
	context.beginPath();
    context.strokeStyle = 'black';
	context.moveTo(plot_centerx,plot_centery);
	context.lineTo(plot_centerx,(plot_centery)-(canvas.height - 400)-10);
	context.lineWidth=1;
	context.lineCap="round";
	context.stroke();
	context.beginPath();
	context.moveTo(plot_centerx,plot_centery);
	context.lineTo(plot_centerx+theta2+10,plot_centery);
	context.stroke();
//draw arrows
	context.beginPath();
	context.moveTo(plot_centerx,(plot_centery)-(canvas.height - 400)-10);
	context.lineTo(plot_centerx-3,(plot_centery)-(canvas.height - 400)-10);
	context.lineTo(plot_centerx,(plot_centery)-(canvas.height - 400)-16);
	context.lineTo(plot_centerx+3,(plot_centery)-(canvas.height - 400)-10);
 	context.closePath();
  	context.fill();
  	context.stroke();
	context.beginPath();
	context.moveTo(plot_centerx+theta2+10,plot_centery);
	context.lineTo(plot_centerx+theta2+10,plot_centery-3);
	context.lineTo(plot_centerx+theta2+16,plot_centery);
	context.lineTo(plot_centerx+theta2+10,plot_centery+3);
 	context.closePath();
  	context.fill();
  	context.stroke();
//name axis
  	context.fillStyle = "#8E8EFF";
  	context.font = '15px Arial';
  	context.fillText("Normalized Length",plot_centerx-40,(plot_centery)-(canvas.height - 400) -25 );
  	context.fillText("Angle in degrees", plot_centerx+theta2+15,plot_centery-10);
//dividing axis and naming
 	context.fillStyle = "#000000";
  	context.font = '10px Arial';
	context.beginPath();
	context.moveTo(plot_centerx,(plot_centery)-(canvas.height - 400));
	context.lineTo(plot_centerx-5,(plot_centery)-(canvas.height - 400));
  	context.stroke();
	context.fillText("Max",plot_centerx-30,(plot_centery)-(canvas.height - 400)+5);
	context.fillText("(0,0)",plot_centerx-10,(plot_centery)+10);
	context.beginPath();
	context.moveTo(plot_centerx+theta2,plot_centery);
	context.lineTo(plot_centerx+theta2,plot_centery+5);
  	context.stroke();
	context.fillText("360", plot_centerx+theta2-10,plot_centery+15);
	context.beginPath();
	context.moveTo(plot_centerx+(3*theta2/4),plot_centery);
	context.lineTo(plot_centerx+(3*theta2/4),plot_centery+5);
  	context.stroke();
	context.fillText("270", plot_centerx+(3*theta2/4)-10,plot_centery+15);
	context.beginPath();
	context.moveTo(plot_centerx+(theta2/2),plot_centery);
	context.lineTo(plot_centerx+(theta2/2),plot_centery+5);
  	context.stroke();
	context.fillText("180", plot_centerx+(theta2/2)-10,plot_centery+15);
	context.beginPath();
	context.moveTo(plot_centerx+(theta2/4),plot_centery);
	context.lineTo(plot_centerx+(theta2/4),plot_centery+5);
  	context.stroke();
	context.fillText("90", plot_centerx+(theta2/4)-5,plot_centery+15);





//rays in ellipse spanning 360 degrees
	for(var theta=0; theta<360; theta++)
{
//refection line1
	var x=((x1-center2)/(half_radius ));
	var y=((y1-center1)/(half_radius ));
	var thetar=((theta*pi)/180);
	var cost= Math.cos(thetar);
	var u=cost;
	var u1= (half_radius*u);
	var sint=Math.sin(thetar);
	var v=sint;
	var v1= (half_radius*v);
	var A=(u*u + a2*v*v);
	var B=(2*(x*u + a2*y*v));
	var C= (x*x + a2*y*y -1);
	var t=((-B + Math.sqrt(B*B - 4*A*C))/(2*A));
	var p1=(x1+ t*u1);
	var q1=(y1+ t*v1);
	context.beginPath();
	context.moveTo(x1,y1);
	context.lineTo(p1,q1);
	context.lineWidth=0.75;
	context.lineCap="round";
        context.strokeStyle = "rgba(255,0,0,0.5)";
	context.stroke();

//reflection line2
	var p=(x+ t*u);
	var q=(y+ t*v);
	var c1=( (-u*p) - (v*a2*q));
	var c2=( (-a2*q*u) + (v*p));
	var ud=((c1*p) - (c2*a2*q));
	var vd=((c1*a2*q) + (c2*p));
	var Ad=(ud*ud + a2*vd*vd);
	var Bd=(2*(p*ud + a2*q*vd));
	var Cd= (p*p + a2*q*q -1);
	var td=((-Bd + Math.sqrt(Bd*Bd - 4*Ad*Cd))/(2*Ad));
	var ud1=(half_radius*ud);
	var vd1= (half_radius*vd);
	var xd=((p1) + (td*ud1*0.98));
	var yd=((q1) + (td*vd1*0.98));
	context.beginPath();
	context.moveTo(xd,yd);
	context.lineTo(p1,q1);
	context.lineWidth=0.5;
	context.lineCap="round";
	context.strokeStyle = "rgba(255,0,0,0.25)";
	context.stroke();

}




//immovable foci
	context.beginPath();
	context.arc( cen1,center2, 3, 0, 2 * Math.PI, false);
	context.fillStyle ='green';
	context.strokeStyle = 'black';
	context.fill();
	context.stroke();
	context.beginPath();
	context.arc(cen2, center2,3, 0, 2 * Math.PI, false);
	context.fillStyle ='green';
	context.strokeStyle = 'black';
	context.fill();
	context.stroke();


	counter--; // to make the source blink
	if(counter<=0)
{
//movable focus=source
	context.beginPath();
	var gradient = context.createRadialGradient(x1,y1,2,x1,y1,4);
	gradient.addColorStop(1,"green");
	gradient.addColorStop(0,"yellow");
	context.arc(x1,y1, 4, 0, 2 * Math.PI, false);
	context.fillStyle = gradient;
	context.fill();
	context.stroke();
	context.beginPath();
	var gradient = context.createRadialGradient(xg,yg,2,xg,yg,4);
	gradient.addColorStop(1,"green");
	gradient.addColorStop(0,"red");
	context.arc(xg,yg, 4, 0, 2 * Math.PI, false);
	context.fillStyle = gradient;
	context.fill();
	context.stroke();

	

	if(counter == -5)
	counter=5;
	}


	setTimeout("drawFunction(mouseX, mouseY)", 20);
    }
