//declarations
	
	var context;
	var mouseX = 0;
	var mouseY = 0;
	var x1=520 ;
	var y1=50;
	var xg=200;
	var yg=600-50;
	window.onload = start_animation;
	var counter=5;
	var offset=20;
	var h=0.001;

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

	var eta= parseFloat(document.getElementById("index").value);//refractive index

	var center2=canvas.width/4;
	var center1=canvas.height/2; //canvas center declaration
 	context.clearRect(0, 0, canvas.width, canvas.height);
        //context.fillStyle = "#EEE8AA";
        //context.fillRect(0,0,canvas.width,canvas.height);

//dragging the points if close to the mouse events
	var xcr= (x_e-x1);
    var ycr= (y_e-y1);
	var xcl= (x_e-xg);
    var ycl= (y_e-yg);

if( x_e > 5 && x_e < canvas.width -5)
{

if( (xcr*xcr + ycr*ycr ) < 144)  // if (x1,y1) near the mouse point
{

if (y_e > 23 && y_e < canvas.height/2 )
{
	x1=x_e;
	y1=y_e;
}
}
else if( (xcl*xcl + ycl*ycl ) < 144) // if (xg,yg) near the mouse point
{
if (y_e < canvas.height-23 && y_e > canvas.height/2 )
{
	xg=x_e;
	yg=y_e;
}
}
}


 //draw refractor
	context.beginPath();
      	context.beginPath();
	context.moveTo(100,canvas.height/2 );
	context.lineTo(canvas.width-100,canvas.height/2 );
      	context.strokeStyle = 'blue';
	context.lineWidth=3;
      	context.stroke();



//find refracted ray's length
	var len = 20/eta;
	vld = (len *3)/4;
	ild = len/4;






//for green lines

	var q11=canvas.height / 2 ;

for(var xx=100; xx<=canvas.width-100; xx += 11)
{
	var p11= xx;

	context.beginPath();
	context.setLineDash([15,5]);
	context.lineDashOffset=offset;
	context.lineWidth=0.65;
	context.lineCap="round";
        context.strokeStyle = 'green';
	context.moveTo(x1,y1);
	context.lineTo(p11,q11);
	context.stroke();
	
	xq = (x1-p11) * (x1-p11);
	yq = (y1-q11) * (y1-q11);
	length = Math.sqrt( xq + yq );
	rem = ((length+offset) % 20);
	offsetd = rem/eta;
	

//different speed
	context.beginPath();
	context.setLineDash([vld,ild]);
	context.lineDashOffset=offsetd;
	context.moveTo(p11,q11);
	context.lineTo(xg,yg);
	context.stroke();
}

	context.setLineDash([0,0]);

//draw arrival point
	context.beginPath();
	context.arc(xg, yg,3.5, 0, 2 * Math.PI, false);
	context.strokeStyle = 'black';
	context.fill();
	context.stroke();
	set=0;


//find the point using point of intersection and newton's method

	xib = x1 + (((xg - x1) * ((canvas.height/2)-y1))/(yg - y1));
	h1= ((canvas.height/2) - y1);
	h12 = h1*h1;
	hg= ((canvas.height/2) - yg);
	hg2 = hg * hg;
	R = eta;
	R2= R*R;

	do
	{
	X1_xib= (x1 - xib)*(x1 - xib);
	Xg_xib= (xg - xib)*(xg - xib);
	g_of_xib = (X1_xib * (Xg_xib + hg2)) - ( R2 * Xg_xib * (X1_xib + h12) );
	var xib_h=xib+h;
	X1_xibh= (x1 - xib_h)*(x1 - xib_h);
	Xg_xibh= (xg - xib_h)*(xg - xib_h);
	g_of_xib_h = (X1_xibh * (Xg_xibh + hg2)) - ( R2 * Xg_xibh * (X1_xibh + h12) );
	g_dash=(g_of_xib_h - g_of_xib )/(h)
	xib=xib - (g_of_xib / (g_dash));

	}while(Math.abs((g_of_xib/(g_dash))) >0.00001);

//draw shortest path
	var q111=(canvas.height)/2;
	var p111 = xib;

	context.beginPath();
	context.setLineDash([15,5]);
	context.lineDashOffset=offset;
	context.lineWidth=1;
	context.lineCap="round";
	context.moveTo(x1,y1);
	context.lineTo(p111,q111);
	context.stroke();

	xq = (x1-p111) * (x1-p111);
	yq = (y1-q111) * (y1-q111);
	length = Math.sqrt( xq + yq );
	rem = ((length+offset) % 20);
	offsetd = rem/eta;

//different speed
	context.beginPath();
	context.setLineDash([vld,ild]);
	context.lineDashOffset=offsetd;
	context.moveTo(p111,q111);
	context.lineTo(xg,yg);
	context.stroke();


// draw the normal
	context.strokeStyle = 'red';
	context.setLineDash([0,0]);
	context.beginPath();
	context.moveTo(p111,q111+canvas.height/4);
	context.lineTo(p111,q111-canvas.height/4);
	context.stroke();


  	context.font = 'italic 25px Times';
	context.fillStyle = 'red';
  	context.fillText("N", p111-5,q111-canvas.height/3.98);
	context.fillStyle = 'red';
  	context.fillText(eta, canvas.width-190,canvas.height/2 + 100);
	context.strokeStyle = 'black';
	context.fillStyle = 'black';
  	context.fillText("p", x1-5,y1-12);
  	context.fillText("q", xg-5,yg+20);
	context.fillStyle = 'blue';
  	context.fillText("R", canvas.width-90,canvas.height/2 +10);

//set back dash lines and its wavefronts.
	offset=offset-1;
	if(offset==0)
	{
	offset=20;
	}


	counter--; // to make the source blink
	if(counter<=0)
{
//draw movable source
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
	context.arc(x1,y1, 4, 0, 2 * Math.PI, false);
	context.fillStyle = gradient;
	context.fill();
	context.stroke();

	if(counter == -5)
	counter=10;
	}


	setTimeout("drawFunction(mouseX, mouseY)", 20);
    }

