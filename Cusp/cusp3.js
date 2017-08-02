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
	counter=5;

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


	var center2=canvas.width/2;
	var center1=canvas.height/2; //canvas center declaration
 	context.clearRect(0, 0, canvas.width, canvas.height);
	a2=a*a;
	var cen1=((Math.sqrt(a2-1))/a); //2 foci points
	cen1=((cen1*half_radius) + center1 );
	var cen2= -((Math.sqrt(a2-1))/a);
	cen2=((cen2*half_radius) + center1 );

	x_ce=(x_e-center2)/(half_radius);//normalized co-ordinates.
	y_ce=-(y_e-center1)/(half_radius);
	var xs=(x_e-center2);
	var ys=(y_e-((center1-half_radius/a)-30));
if(x_e ==0)
{
	x1=cen1;
	y1=center2;

}

//condition to move the point inside ellipse
if( ((x_ce*x_ce) + (y_ce*y_ce*a2)) < 0.98) 
{
	x1=x_e;
	y1=y_e;
}
else if((xs*xs + ys*ys -400) < 0.01 )
{
	a=((half_radius)/(center1-y_e-30));
	a=Math.abs(a);
	a=(Math.min(a,4));
	a=(Math.max(a,1));
	a2=a*a;
	x1=cen1;
	y1=center2;
}



 //ellipse
	context.beginPath();
      	context.save();
      	context.translate(canvas.width / 2, canvas.height / 2);
      	context.scale(1, 1/a);
      	context.beginPath();
      	context.arc(centerX, centerY, half_radius, 0, 2 * Math.PI, false);
      	context.restore();
      	context.strokeStyle = 'green';
      	context.stroke();

//rhombus above ellipse to pull it	
	gradient = context.createLinearGradient(center2-10, (center1-(half_radius/a))-30, center2+10, (center1-(half_radius/a))-10);
  	gradient.addColorStop("0","green");
 	gradient.addColorStop(".25","yellow");
  	gradient.addColorStop(".50","green");
  	gradient.addColorStop(".75","yellow");
  	gradient.addColorStop("1.0","green");
	context.beginPath();
	context.diamond(center2-10, (center1-(half_radius/a)) - 30, 20, 20);
  	context.fillStyle = gradient;
	context.strokeStyle = 'green';
  	context.fill();
  	context.stroke();
	context.beginPath();
	context.moveTo(center2,(center1-(half_radius/a)));
	context.lineTo(center2,(center1-(half_radius/a))-10);
	context.lineWidth=2;
	context.lineCap="round";
	context.strokeStyle = 'green';
	context.stroke();
//rays in ellipse spanning 360 degrees
	for(var theta=0; theta<360; theta=theta+1)
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
	context.strokeStyle = 'red';
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
	context.strokeStyle = 'red';
	context.stroke();


}



//immovable foci
	context.beginPath();
	context.arc( cen1,center2, 3, 0, 2 * Math.PI, false);
	context.fillStyle ='green';
	context.strokeStyle = 'green';
	context.fill();
	context.stroke();
	context.beginPath();
	context.arc(cen2, center2,3, 0, 2 * Math.PI, false);
	context.fillStyle ='green';
	context.strokeStyle = 'green';
	context.fill();
	context.stroke();


counter--; // to make the source blink
if(counter<=0)
{
//movable focus=source
	context.beginPath();
	var gradient = context.createRadialGradient(x1,y1,2,x1,y1,5);
	gradient.addColorStop(1,"green");
	gradient.addColorStop(0,"yellow");
	context.arc(x1,y1, 4, 0, 2 * Math.PI, false);
	context.fillStyle = gradient;
	context.fill();
	context.stroke();
if(counter == -5)
counter=5;
}


	setTimeout("drawFunction(mouseX, mouseY)", 20);
    }

