//declarations
	
	var context;
	var mouseX = 0;
	var mouseY = 0;
	var x1=520 ;
	var y1=100;
	var xg=200;
	var yg=300;
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





//main function 
    function drawFunction(x_e,y_e){

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

if( x_e > 5 && x_e < canvas.width-5 && y_e > 23 && y_e < canvas.height-50)
{
if( (xcr*xcr + ycr*ycr ) < 144)  // if (x1,y1) near the mouse point
{
	x1=x_e;
	y1=y_e;
}
else if( (xcl*xcl + ycl*ycl ) < 144) // if (xg,yg) near the mouse point
{
	xg=x_e;
	yg=y_e;
}
}




 //draw reflector
	context.beginPath();
      	context.beginPath();
	context.moveTo(100,canvas.height-50 );
	context.lineTo(canvas.width-100,canvas.height-50 );
      	context.strokeStyle = 'blue';
	context.lineWidth=3;
      	context.stroke();





//for green lines

	var q11=center1+ canvas.height / 2 -50;

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


//draw shortest path
	var q111=(canvas.height) -50;
	var h1 = q111 - y1 ;
	var hg = q111 - yg ;
	var w = (x1-xg) ;
	var hr = hg / h1 ;
	var p111 = xg + hr*w/(1+hr) ;

	context.beginPath();
	context.setLineDash([15,5]);
	context.lineDashOffset=offset;
	context.lineWidth=1;
	context.lineCap="round";
	context.moveTo(x1,y1);
	context.lineTo(p111,q111);
	context.lineTo(xg,yg);
	context.stroke();

// draw the normal
	context.strokeStyle = 'red';
	context.setLineDash([0,0]);
	context.beginPath();
	context.moveTo(p111,q111);
	context.lineTo(p111,q111-canvas.height/1.5);
	context.stroke();
  	context.font = 'italic 25px Times';
	context.fillStyle = 'red';
  	context.fillText("N", p111-5,q111-canvas.height/1.48);
	context.strokeStyle = 'black';
	context.fillStyle = 'black';
  	context.fillText("p", x1-5,y1-12);
  	context.fillText("q", xg-5,yg-12);
	context.fillStyle = 'blue';
  	context.fillText("R", canvas.width / 2,canvas.height*0.95);

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

