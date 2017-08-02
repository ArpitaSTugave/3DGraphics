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
//to draw spline curve
CanvasRenderingContext2D.prototype.curve=function(h,t,f,c)
{t=(typeof t==="number")?t:0.5;f=f?f:25;
var j,m=(h.length-2)*f+2+(c?2*f:0),n=0,k=new Float32Array(m),e=h.length,d,a=new Float32Array((f+2)*4),b=4;
j=h.slice(0);
if(c){j.unshift(h[e-1]);
j.unshift(h[e-2]);j.push(h[0],h[1])}else{j.unshift(h[1]);
j.unshift(h[0]);
j.push(h[e-2],h[e-1])}a[0]=1;
for(d=1;d<f;d++){var o=d/f,p=o*o,r=p*o,q=r*2,s=p*3;
a[b++]=q-s+1;
a[b++]=s-q;a[b++]=r-2*p+o;a[b++]=r-p}a[++b]=1;
g(j,a,e);if(c){j=[];j.push(h[e-4],h[e-3],h[e-2],h[e-1]);
j.push(h[0],h[1],h[2],h[3]);
g(j,a,4)}
function g(G,z,B){for(var A=2;A<B;A+=2)
{var C=G[A],D=G[A+1],E=G[A+2],F=G[A+3],I=(E-G[A-2])*t,J=(F-G[A-1])*t,K=(G[A+4]-C)*t,L=(G[A+5]-D)*t;
for(var H=0;H<f;H++)
{var u=H<<2,v=z[u],w=z[u+1],x=z[u+2],y=z[u+3];
k[n++]=v*C+w*E+x*I+y*K;k[n++]=v*D+w*F+x*J+y*L}}}e=c?0:h.length-2;
k[n++]=h[e];
k[n]=h[e+1];
for(d=0,e=k.length;d<e;d+=2)
{this.lineTo(k[d],k[d+1])}return k};

//main function 
    function drawFunction(x_e,y_e){

	var center2=canvas.width/2;
	var center1=canvas.height/2; //canvas center declaration
 	context.clearRect(0, 0, canvas.width, canvas.height);
	var cen1m=center1-100;
	var i=0;



	context.translate(-7450,-3300);
	context.scale(12,12);
///////////////////////////////////////////////////////////////////////////////////////////
//draw curves




	var j=0;
	var step=0.4;

	var r1_aa=r2_aa=0;
	var w_a=-5.0;
	var w_b=-5;
	var w_d=-6;
	var w_e=-6;
	
	//curve A
	var q_a=-1.3;
	var r_a=1.159;
	var s_a=21.232;
	var a_a=q_a;
	var b_a= 2*r_a;
	var c_a=s_a + (w_a*w_a);
	var m_a=Math.sqrt((b_a*b_a)-(4*a_a*c_a));
	var r1_ab= (-b_a + m_a)/(2*a_a);
	var r2_ab= (-b_a - m_a)/(2*a_a);

	var r1_ba=r2_ba=0;
	//curve B
	var q_b=-2.88;
	var r_b=36.012;
	var s_b=-412.889;
	var a_b=q_b;
	var b_b= 2*r_b;
	var c_b=s_b + (w_b*w_b);
	var m_b=Math.sqrt((b_b*b_b)-(4*a_b*c_b));
	var r1_bb= (-b_b + m_b)/(2*a_b);
	var r2_bb= (-b_b - m_b)/(2*a_b);

	var r1_da=r2_da=0;
	//curve D
	var q_d=0.4;
	var r_d=1.576;
	var s_d=-96.191;
	var a_d=q_d;
	var b_d= 2*r_d;
	var c_d=s_d + (w_d*w_d);
	var m_d=Math.sqrt((b_d*b_d)-(4*a_d*c_d));
	var r1_db= (-b_d + m_d)/(2*a_d);
	var r2_db= (-b_d - m_d)/(2*a_d);

	var r1_ea=r2_ea=0;
	//curve E
	var q_e=0.82;
	var r_e=-2.592;
	var s_e=-65.824;
	var a_e=q_e;
	var b_e= 2*r_e;
	var c_e=s_e + (w_e*w_e);
	var m_e=Math.sqrt((b_e*b_e)-(4*a_e*c_e));
	var r1_eb= (-b_e + m_e)/(2*a_e);
	var r2_eb= (-b_e - m_e)/(2*a_e);
	var minus = -3.75;

	context.strokeStyle = "rgb(178, 46, 0)";

	for(w_a=-4.5; w_a<=5.0; w_a=w_a+0.5)
	{

	 c_a=s_a + (w_a*w_a);
	 m_a=Math.sqrt((b_a*b_a)-(4*a_a*c_a));
	r2_aa= (-b_a - m_a)/(2*a_a);




	context.beginPath();
	context.moveTo(center2+r2_aa,center1+w_a);
	context.lineTo(center2+r2_ab,center1+w_a-0.5);
	context.lineCap="round";
	context.lineWidth=0.1;
	context.stroke();
/*

//normal
	ny_a= w_a;
	nx_a= (q_a * r2_aa) + (r_a );
	
	context.beginPath();
	context.moveTo(center2+r2_aa,center1+w_a);
	context.lineTo(center2+(nx_a/4)+r2_aa,center1+(ny_a/4)+w_a); //exact normals
	//context.lineTo(center2-(ny_a/4)+r2_aa,center1+(nx_a/4)+w_a); //exact tangents
	context.lineCap="round";
	context.lineWidth=0.1;
	context.stroke();

*/

	r2_ab=r2_aa;
	}


	

	for(w_b=-4; w_b<=5; w_b=w_b+1)
	{

	 c_b=s_b + (w_b*w_b);
	 m_b=Math.sqrt((b_b*b_b)-(4*a_b*c_b));
	 r1_ba= (-b_b + m_b)/(2*a_b);

	context.beginPath();
	context.moveTo(center2+r1_ba,center1+w_b);
	context.lineTo(center2+r1_bb,center1+w_b-1);
	context.lineCap="round";
	context.lineWidth=0.1;
	context.stroke();
/*
//normal
	ny_b= w_b;
	nx_b= (q_b * r1_ba) + (r_b );
	
	context.beginPath();
	context.moveTo(center2+r1_ba,center1+(w_b));
	context.lineTo(center2+(nx_b/24)+r1_ba,center1+(ny_b/24)+w_b);//exact normals
	//context.lineTo(center2-(ny_b/24)+r1_ba,center1+(nx_b/24)+(w_b));//exact tangents
	context.lineCap="round";
	context.lineWidth=0.1;
	context.stroke();

*/

	r1_bb=r1_ba;
	}

////////////////////////////////////////////////////////////////spline

	w_a=-5;
	 c_a=s_a + (w_a*w_a);
	 m_a=Math.sqrt((b_a*b_a)-(4*a_a*c_a));
	 r2_aa= (-b_a - m_a)/(2*a_a);
	x1=center2+r2_aa;
	y1=center1+w_a;

	w_a=-5.5;
	 c_a=s_a + (w_a*w_a);
	 m_a=Math.sqrt((b_a*b_a)-(4*a_a*c_a));
	 r2_aa= (-b_a - m_a)/(2*a_a);
	w_b=-5.5;
	c_b=s_b + (w_b*w_b);
	 m_b=Math.sqrt((b_b*b_b)-(4*a_b*c_b));
	 r1_ba= (-b_b + m_b)/(2*a_b);
	x2=center2+((r1_ba+r2_aa)/2);
	y2=center1+w_b;


	w_b=-5;
	c_b=s_b + (w_b*w_b);
	 m_b=Math.sqrt((b_b*b_b)-(4*a_b*c_b));
	 r1_ba= (-b_b + m_b)/(2*a_b);
	x3=center2+r1_ba;
	y3=center1+w_b;

	w_a=5;
	 c_a=s_a + (w_a*w_a);
	 m_a=Math.sqrt((b_a*b_a)-(4*a_a*c_a));
	 r2_aa= (-b_a - m_a)/(2*a_a);
	x4=center2+r2_aa;
	y4=center1+w_a;

	w_a=5.5;
	 c_a=s_a + (w_a*w_a);
	 m_a=Math.sqrt((b_a*b_a)-(4*a_a*c_a));
	 r2_aa= (-b_a - m_a)/(2*a_a);
	w_b=5.5;
	c_b=s_b + (w_b*w_b);
	 m_b=Math.sqrt((b_b*b_b)-(4*a_b*c_b));
	 r1_ba= (-b_b + m_b)/(2*a_b);
	x5=center2+((r1_ba+r2_aa)/2);
	y5=center1+w_b;

	w_b=5;
	c_b=s_b + (w_b*w_b);
	 m_b=Math.sqrt((b_b*b_b)-(4*a_b*c_b));
	 r1_ba= (-b_b + m_b)/(2*a_b);
	x6=center2+r1_ba;
	y6=center1+w_b;





	var points1 = [x1,y1,  x2, y2, x3,y3];
	var points2 = [x4, y4,  x5, y5, x6,y6];


	context.beginPath();
	context.moveTo(x1,y1);
	context.curve(points1);
	context.lineCap="round";
	context.lineWidth=0.1;
	context.stroke();


	context.beginPath();
	context.moveTo(x4,y4);
	context.curve(points2);
	context.lineCap="round";
	context.lineWidth=0.1;
	context.stroke();

//muscles
	context.strokeStyle = "rgb(215, 189, 140)";
	center2=center2+minus;
	var f=0.5;
	var p=14.5;
	var b=14.5;




	X1m=(p-f)*Math.cos((45*pi)/180)+center2;
	Y1m=(b-f)*Math.sin((45*pi)/180)+center1;

	X2m=(p-f)*Math.cos((315*pi)/180)+center2;
	Y2m=(b-f)*Math.sin((315*pi)/180)+center1;

	var points3 = [x1,y1,  X2m,Y2m];
	var points4 = [x2,y2,X2m,Y2m];
	var points5 = [x3,y3,  X2m,Y2m];
	var points6 = [x4,y4,X1m,Y1m];
	var points7 = [x5,y5,  X1m,Y1m];
	var points8 = [x6,y6,X1m,Y1m];

	context.beginPath();
	context.moveTo(x1,y1);
	context.curve(points3);
	context.lineCap="round";
	context.lineWidth=0.1;
	context.stroke();


	context.beginPath();
	context.moveTo(x2,y2);
	context.curve(points4);
	context.lineCap="round";
	context.lineWidth=0.1;
	context.stroke();

	context.beginPath();
	context.moveTo(x3,y3);
	context.curve(points5);
	context.lineCap="round";
	context.lineWidth=0.1;
	context.stroke();


	context.beginPath();
	context.moveTo(x4,y4);
	context.curve(points6);
	context.lineCap="round";
	context.lineWidth=0.1;
	context.stroke();

	context.beginPath();
	context.moveTo(x5,y5);
	context.curve(points7);
	context.lineCap="round";
	context.lineWidth=0.1;
	context.stroke();


	context.beginPath();
	context.moveTo(x6,y6);
	context.curve(points8);
	context.lineCap="round";
	context.lineWidth=0.1;
	context.stroke();



	center2=center2-minus;


///////////////////////////////////////////////////////////////////////////////////
	context.strokeStyle = "rgb(198, 66, 0)";

	for(w_d=-5; w_d<=6; w_d=w_d+1)
	{

	 c_d=s_d + (w_d*w_d);
	 m_d=Math.sqrt((b_d*b_d)-(4*a_d*c_d));
	 r1_da= (-b_d + m_d)/(2*a_d);


	context.beginPath();
	context.moveTo(center2+r1_da,center1+w_d);
	context.lineTo(center2+r1_db,center1+w_d-1);
	context.lineWidth=1;
	context.lineCap="round";
	context.lineWidth=0.1;
	context.stroke();


/*

//normal
	ny_d= w_d;
	nx_d= (q_d * r1_da) + (r_d );
	
	context.beginPath();
	context.moveTo(center2+r1_da,center1+w_d);
	context.lineTo(center2+(nx_d/8)+r1_da,center1+(ny_d/8)+w_d);
	//context.lineTo(center2-(ny_d/8)+r1_da,center1+(nx_d/8)+w_d);//exact tangents
	context.lineCap="round";
	context.lineWidth=0.1;
	context.stroke();

*/

	r1_db=r1_da;

	}

	for(w_e=-5; w_e<=6; w_e=w_e+1)
	{

	 c_e=s_e + (w_e*w_e);
	 m_e=Math.sqrt((b_e*b_e)-(4*a_e*c_e));
	 r1_ea= (-b_e + m_e)/(2*a_e);


	context.beginPath();
	context.moveTo(center2+r1_ea,center1+w_e);
	context.lineTo(center2+r1_eb,center1+w_e-1);
	context.lineCap="round";
	context.lineWidth=0.1;
	context.stroke();

/*
//normal
	ny_e= w_e;
	nx_e= (q_e * r1_ea) + (r_e );
	
	context.beginPath();
	context.moveTo(center2+r1_ea,center1+w_e);
	context.lineTo(center2+(nx_e/8)+r1_ea,center1+(ny_e/8)+w_e);
	//context.lineTo(center2-(ny_e/8)+r1_ea,center1+(nx_e/8)+w_e);//exact tangents
	context.lineCap="round";
	context.lineWidth=0.1;
	context.stroke();

*/


	r1_eb=r1_ea;
	}



////////////////////////////////////////////////////////////////////////////////outer curve
	center2=center2+minus;



	w_bi=0;
	c_bi=s_b + (w_bi*w_bi);
	 m_bi=Math.sqrt((b_b*b_b)-(4*a_b*c_bi));
	 r2_bai= (-b_b - m_bi)/(2*a_b);
	X3i=center2+r2_bai;
	Y3i=center1+w_bi;



	
        var theta=25;
	var Zb=p*Math.cos((theta*pi)/180);
	var Wb=b*Math.sin((theta*pi)/180);
	var Zbd=(p+f)*Math.cos((theta*pi)/180);
	var Wbd=(b+f)*Math.sin((theta*pi)/180);
	var Zbd2=(p-f)*Math.cos((theta*pi)/180);
	var Wbd2=(b-f)*Math.sin((theta*pi)/180);



	for(theta=24; theta<337; theta=theta+1)
	{
	Zl=p*Math.cos((theta*pi)/180);
	Wl=b*Math.sin((theta*pi)/180);

	context.beginPath();
	context.moveTo(center2+Zb,center1+Wb);
	context.lineTo(center2+Zl,center1+Wl);
	context.lineCap="round";
	context.strokeStyle = "rgb(255, 186, 119)";
	context.lineWidth=0.85;
	context.stroke();


	Zb=Zl;
	Wb=Wl;

	Zld=(p+f)*Math.cos((theta*pi)/180);
	Wld=(b+f)*Math.sin((theta*pi)/180);

	context.beginPath();
	context.moveTo(center2+Zbd,center1+Wbd);
	context.lineTo(center2+Zld,center1+Wld);
	context.lineCap="round";
	context.strokeStyle = "rgb(198, 66, 0)";
	context.lineWidth=0.1;
	context.stroke();

	Zbd=Zld;
	Wbd=Wld;

	Zld2=(p-f)*Math.cos((theta*pi)/180);
	Wld2=(b-f)*Math.sin((theta*pi)/180);

	context.beginPath();
	context.moveTo(center2+Zbd2,center1+Wbd2);
	context.lineTo(center2+Zld2,center1+Wld2);
	context.lineCap="round";
	context.strokeStyle = "rgb(198, 66, 0)";
	context.lineWidth=0.1;
	context.stroke();


	Zbd2=Zld2;
	Wbd2=Wld2;		

	}




	center2=center2-minus;






//////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////

	context.translate(7450,3300);
	context.scale(1/12,1/12);




	

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



