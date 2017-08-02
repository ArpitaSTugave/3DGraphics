
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

var points = function (eta_before, eta_after, q_to, r_to, s_to, q_from , r_from , x_before , y_before, x_from , y_from, center2, center1 , k ) {

	x = x_from - center2;
	y = y_from - center1;

	ny = y;
	nx = (q_from * x) + (r_from);
	n_div = Math.sqrt( (nx*nx) + (ny*ny));
	nx = nx/n_div;//normal
	ny = ny/n_div;

	tx = ny;//tangent
	ty = -nx;

	 wx= x_from - x_before;
	 wy= y_from - y_before;
	 w_div = Math.sqrt( (wx * wx) + ( wy * wy));
	 wx = (wx)/(w_div);
	 wy = (wy)/(w_div);

	sin_theta = (nx * wy - ny * wx);


	sin_thetaO = (sin_theta / eta_after) * eta_before;
	cos_thetaO = Math.sqrt( 1 - ( sin_thetaO * sin_thetaO));
	T = sin_thetaO / cos_thetaO;

	P_x = - nx - (T * tx);
	P_y = - ny - (T * ty);



	a = (q_to * P_x * P_x) + (P_y * P_y);
	b = - 2* ( (q_to *  x * P_x ) + ( r_to * P_x) + ( y * P_y));
	c = (q_to * x * x) + (2* r_to * x) + ( s_to) + (y*y);
	

	 m=Math.sqrt((b*b)-(4*a*c));

	if( k == 0)
	{
	 scale= (-b + m)/(2*a);
	}
	else
	{
	 scale= (-b - m)/(2*a);
	}
	

	
	P_x = x- (scale *P_x) + center2;
	P_y = y- (scale *P_y) + center1;
	
	return [P_x, P_y];


	
}

 function Myplot( x_to, y_to, x_from, y_from, i ) {


	point_X= (x_from * 12) -7150;// points  for big eye
	point_Y= (y_from * 12) -4020;
	point_x= (x_from * 3) -1850;// points  for small eye
	point_y= (y_from * 3) -575;

	point_rX= (x_to * 12) -7150;//refracted rays  for big eye
	point_rY= (y_to * 12) -4020;
	point_rx= (x_to * 3) -1850;// refracted rays  for small eye
	point_ry= (y_to * 3) -575;


	context.lineWidth=0.6;
        context.strokeStyle = "rgb(255,0,0)";
	context.fillStyle = "rgb(255,0,0)";


	if((i%3)==0)//for small eye model = one in every 3 rays
	{
	
	context.beginPath();//refracted rays from small eye
	context.moveTo(point_rx,point_ry);
	context.lineTo(point_x,point_y);
	context.lineCap="round";
	context.stroke();
	}	
	
	context.beginPath();//refracted rays for big eye
	context.moveTo(point_rX,point_rY);
	context.lineTo(point_X,point_Y);
	context.lineCap="round";
	context.stroke();

	}




//main function 
    function drawFunction(X_e,Y_e){
//X_e and Y_e stands for co-ordinates of the mouse in the geometery

//get center
	var center2=650;
	var center1=350; //canvas center declaration
 	context.clearRect(0, 0, canvas.width, canvas.height);
	var cen1m=center2+100;
	//var cen1n=center1+100;

//load eye images

  	img = document.getElementById("eye");
 	context.drawImage(img, 0, 0);

 	img1 = document.getElementById("smalleye");
 	context.drawImage(img1, 0, 0);

//curve constants
    var q_a = -1.30;
    var r_a = 1.159;
    var s_a = 21.232;
    var q_b = -2.88;
    var r_b = 36.012;
    var s_b = -412.889;
    var q_d = 0.40;
    var r_d = 1.576;
    var s_d = -96.191;
    var q_e = 0.82;
    var r_e = -2.592;
    var s_e = -65.824;

//box

	context.beginPath();
	context.lineWidth=1;
	context.strokeStyle = "rgb(0,0,0)";
  	context.rect(5,360,395,230);
	context.stroke();

//draw the grey strip
	context.beginPath();
	context.moveTo(385,375);
	context.lineTo(385,575);
	context.strokeStyle = "rgba(200,200,200,0.5)";
	context.lineCap="square";
	context.lineWidth=30;
	context.stroke();
	context.lineWidth=0.7;


//rays from any point to layer E
	var r1_ea=r2_ea=0;
	var layer_Ex=[];
	var layer_Ey=[];
	var Xp=0;
	var i=0;
	//curve E
	step=0.3;
	var j=0;
	var a_e=q_e;
	var b_e= 2*r_e;
	context.strokeStyle = "rgba(255,0,0,0.7)";
	//curve D
	var r1_da=r2_da=0;
	//curve D
	var scale = 40;

	 c_e=s_e + (j*j);
	 m_e=Math.sqrt((b_e*b_e)-(4*a_e*c_e));
	 r2_ea= (-b_e + m_e)/(2*a_e);
	Xp=center2+r2_ea;
	Xp= (Xp * 3) -1850;

	Y_zero=center1+j;
	Y_zero= (Y_zero * 3) -575;

	j=-6;

	Y_up=center1+j;
	Y_up= (Y_up * 3) -575;

	Y_diff= Math.abs( Y_up - Y_zero);

/////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////iris


      	context.save();
	context.translate(-7150,-4020);
	context.scale(12,12);

	var minus = -3.75;
	center2=center2+minus;

//starting
	theta = 24;
	var f=0.5;
	var p=14.5;
	var b=14.5;
	Zld2=(p-f)*Math.cos((theta*pi)/180);
	Wld2=(b-f)*Math.sin((theta*pi)/180);

//ending
	theta = 336;
	var f=0.5;
	var p=14.5;
	var b=14.5;
	Zbd2=(p-f)*Math.cos((theta*pi)/180);
	Wbd2=(b-f)*Math.sin((theta*pi)/180);
/*
  	gradient = context.createRadialGradient(X3i, Y3i, 3, X3i, Y3i, Math.abs((Y1i-Y2i)/2)+0.5);
  	gradient.addColorStop("0","white");
  	gradient.addColorStop(".2","blue");
  	gradient.addColorStop(".4","white");
  	gradient.addColorStop(".6","blue");
  	gradient.addColorStop("0.8","white");
  	gradient.addColorStop("1","blue");
*/
	context.beginPath();

	context.moveTo(center2+Zbd2,center1+Wbd2);
	context.lineTo(center2+Zld2,center1+Wld2);
	context.lineCap="round";
	context.strokeStyle = "rgb(198, 66, 0)";
	context.lineWidth=0.1;
	context.stroke(); 

	center2=center2-minus;


	context.translate(7150,4020);
	context.scale(1/12,1/12);
   	context.restore();

      	context.save();
	context.translate(-1850,-575);
	context.scale(3,3);

	var minus = -3.75;
	center2=center2+minus;

//starting
	theta = 24;
	var f=0.5;
	var p=14.5;
	var b=14.5;
	Zld2=(p-f)*Math.cos((theta*pi)/180);
	Wld2=(b-f)*Math.sin((theta*pi)/180);

//ending
	theta = 336;
	var f=0.5;
	var p=14.5;
	var b=14.5;
	Zbd2=(p-f)*Math.cos((theta*pi)/180);
	Wbd2=(b-f)*Math.sin((theta*pi)/180);

	context.beginPath();

	context.moveTo(center2+Zbd2,center1+Wbd2);
	context.lineTo(center2+Zld2,center1+Wld2);
	context.lineCap="round";
	context.strokeStyle = "rgb(198, 66, 0)";
	context.lineWidth=0.1;
	context.stroke();

	center2=center2-minus;



	context.translate(1850,575);
	context.scale(1/3,1/3);
   	context.restore();


  	context.fillStyle = "#8E8EFF";
  	context.font = '15px Arial';
  	context.fillText(center2+Zbd2,400+100,400); 
  	context.fillText(center2+Zld2,400+100,420);
  	context.fillText(center1+Wbd2,400+100,400); 
  	context.fillText(center1+Wld2,400+100,420);



////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////




//condition to move mouse
        if(X_e < 370 && X_e>=Xp)
	{
	if( X_e > 5 && X_e <400 && Y_e > 360 && Y_e <590)
	{
	X1=X_e;
	Y1=Y_e;
	infinity=0;
	//draw_flag = 1;

	}
	}


	else if(X_e<400 && X_e>=370)
	{
	if( X_e > 5 && X_e <400 && Y_e-Y_diff > 360 && Y_e+Y_diff <590)
	{
	X2=X_e;
	Y2=Y_e;
	infinity=1;


	}
	else
	{
	//draw_flag = 1;
	}
	}
	else
	{
	infinity=2;
	//draw_flag = 1;
	}


	if(X_e==0 && Y_e==0) //when application starts
	{
	X2=0;
	Y2=Y_zero;
	infinity=1;
	}







///////////////////////////////////////////////////////////////////////////////// eye model
if( infinity != 2)
{

	for(j=-5.7; j<=5.7; j=j+step)
	{
	 c_e=s_e + (j*j);//find points on layer E for normal eye model
	 m_e=Math.sqrt((b_e*b_e)-(4*a_e*c_e));
	 r1_ea= (-b_e + m_e)/(2*a_e);
	layer_Ex[i]=center2+r1_ea;
	layer_Ey[i]=center1+j;
	ny_e = j;
	nx_e = (q_e * r1_ea) + (r_e);
	n_div = Math.sqrt( (nx_e*nx_e) + (ny_e*ny_e));
	nx_e = nx_e/n_div;//normal
	ny_e = ny_e/n_div;

	tx_e = ny_e;//tangent
	ty_e = -nx_e;


	point_X= (layer_Ex[i] * 12) -7150;// points  for big eye
	point_Y= (layer_Ey[i] * 12) -4020;
	point_x= (layer_Ex[i] * 3) -1850;// points  for small eye
	point_y= (layer_Ey[i] * 3) -575;


	if(infinity == 1) //on the strip
	{
	if((i%3)==0)//for small eye model = one in every 3 rays
	{
	var diff= ((center1*3)-575)-Y2;

	small_ix = 400;
	small_fx = point_x;
	small_iy = point_y-diff;
	small_fy = point_y;

	
	}
	var Y2_normal= (Y2+575)/3;//big eye transforms
	var Y2_big=((Y2_normal * 12) -4020);
	var X2_normal= (1205+1850)/3;
	var X2_big=((X2_normal * 12) -7150);	
	var big_diff= ((center1 * 12) -4020)- Y2_big;

	big_ix = X2_big;
	big_fx = point_X;
	big_iy = point_Y-big_diff;
	big_fy = point_Y;
	 wx_e= layer_Ex[i] - X2_normal;
	 wy_e= layer_Ey[i] - (layer_Ey[i] - (center1 - Y2_normal));
	 w_div = Math.sqrt( (wx_e * wx_e) + ( wy_e * wy_e));
	 wx_e = (wx_e)/(w_div);
	 wy_e = (wy_e)/(w_div);


	}

	else if(infinity==0)
	{


	if((i%3)==0)//for small eye model = one in every 3 rays
	{
	small_ix = X1;
	small_fx = point_x;
	small_iy = Y1;
	small_fy = point_y;

	

	}
	Y1_normal= (Y1+575)/3;//big eye transform
	Y1_big=((Y1_normal * 12) -4020);
	X1_normal= (X1+1850)/3;
	X1_big=((X1_normal * 12) -7150);
	big_ix = X1_big;
	big_fx = point_X;
	big_iy = Y1_big;
	big_fy = point_Y;

	


	 wx_e= layer_Ex[i] - X1_normal;
	 wy_e= layer_Ey[i] - Y1_normal;
	 w_div = Math.sqrt( (wx_e * wx_e) + ( wy_e * wy_e));
	 wx_e = (wx_e)/(w_div);
	 wy_e = (wy_e)/(w_div);


	}

	else if(infinity==2)
	{
	}

	eta_Z=1.362;

	sin_theta = (nx_e * wy_e - ny_e * wx_e);


	sin_thetaO = sin_theta / eta_Z;
	cos_thetaO = Math.sqrt( 1 - ( sin_thetaO * sin_thetaO));
	T = sin_thetaO / cos_thetaO;

	P_xe = - nx_e - (T * tx_e);
	P_ye = - ny_e - (T * ty_e);

	x_d = layer_Ex[i] - center2;
	y_d = layer_Ey[i] - center1;


	a_d = (q_d * P_xe * P_xe) + (P_ye * P_ye);
	b_d = - 2* ( (q_d *  x_d * P_xe ) + ( r_d * P_xe) + ( y_d * P_ye));
	c_d = (q_d * x_d * x_d) + (2* r_d * x_d) + ( s_d) + (y_d*y_d);
	

	 m_d=Math.sqrt((b_d*b_d)-(4*a_d*c_d));
	 scale= (-b_d + m_d)/(2*a_d);

	
	P_xe = layer_Ex[i]- (scale *P_xe);
	P_ye = layer_Ey[i]- (scale *P_ye);



///////////////////////////////from layer D;use direct function
	eta_Y = 1.322;
	x_e = layer_Ex[i];
	y_e = layer_Ey[i];

	x_d = P_xe;
	y_d = P_ye;


	var p_tsd = points(eta_Z,eta_Y, q_b, r_b, s_b, q_d , r_d , x_e , y_e, x_d , y_d, center2, center1 , 0 );//points to from layerD to layer C


	var P_xd = p_tsd[0];
	var P_yd = p_tsd[1];



///////////////////////////////from layer B;use direct function
	eta_X = 1.33;
	x_b = P_xd;
	y_b = P_yd;

	var p_tsb = points(eta_Y,eta_X, q_a, r_a, s_a, q_b , r_b , x_d , y_d, x_b , y_b, center2, center1 , 1 );//points to from layerD to layer C


	if ( p_tsb[1] > -5.7+center1 && p_tsb[1] < 5.7+center1)
	{
	var P_xb = p_tsb[0];
	var P_yb = p_tsb[1];
	}
	else 
	{
	var P_xb = x_b;
	var P_yb = y_b;
	}

	if ( p_tsb[1] > -5.7+center1 && p_tsb[1] < 5.7+center1)
	{

	if (infinity==0)
	{

	context.beginPath();//source
	var gradient = context.createRadialGradient(small_ix,small_iy,2,small_ix,small_iy,3);
	gradient.addColorStop(1,"red");
	gradient.addColorStop(0,"yellow");
	context.arc(small_ix,small_iy, 3, 0, 2 * Math.PI, false);
	context.fillStyle = gradient;
	context.fill();
	context.stroke();
	context.lineWidth=0.6;
        context.strokeStyle = "rgb(255,0,0)";

	context.beginPath();//source
	var gradient = context.createRadialGradient(big_ix,big_iy,2,big_ix,big_iy,3);
	gradient.addColorStop(1,"red");
	gradient.addColorStop(0,"yellow");
	context.arc(big_ix,big_iy, 3, 0, 2 * Math.PI, false);
	context.fillStyle = gradient;
	context.fill();
	context.stroke();

	
	}


	context.beginPath();//draw line from point to layer E
	context.moveTo(big_ix,big_iy);
	context.lineTo(big_fx,big_fy);
	context.stroke();

	if((i%3)==0)//for small eye model = one in every 3 rays
	{
	context.beginPath();//draw line from point to layer E
	context.moveTo(small_ix,small_iy);
	context.lineTo(small_fx,small_fy);
	context.stroke();
	}


 	Myplot( P_xe, P_ye,layer_Ex[i] , layer_Ey[i], i );


 	Myplot( P_xd, P_yd, x_d, y_d, i );



 	Myplot( P_xb, P_yb, x_b, y_b, i );

	

	}

///////////////////////////////from layer A; cannot use direct function

	eta_W = 1.322;

	x = P_xb - center2;
	y = P_yb - center1;

	ny =  y;
	nx = ((q_a * x) + (r_a));
	n_div = Math.sqrt( (nx*nx) + (ny*ny));
	nx = nx/n_div;//normal
	ny = ny/n_div;

	tx = ny;//tangent
	ty = -nx;

	 wx= P_xb - x_b;
	 wy= P_yb - y_b;
	 w_div = Math.sqrt( (wx * wx) + ( wy * wy));
	 wx = -(wx)/(w_div);
	 wy = -(wy)/(w_div);

	sin_theta = (nx * wy - ny * wx);


	sin_thetaO = (sin_theta / eta_W) * eta_X;
	cos_thetaO = Math.sqrt( 1 - ( sin_thetaO * sin_thetaO));
	T = sin_thetaO / cos_thetaO;


	P_x = - nx - (T * tx);
	P_y = - ny - (T * ty);
	

	 scale= 40;

	

	
	P_xa = x- (scale *P_x) + center2;
	P_ya = y- (scale *P_y) + center1;

	Myplot( P_xa, P_ya, P_xb, P_yb, i );
	


	


	


	i=i+1;
	}
}

	if(infinity==1)
	{

        context.beginPath();//yellow infinity strip
 	var gradient = context.createLinearGradient(370, 0, 400, 0);
 	gradient.addColorStop(0, "rgba(200,200,200,0.5)");
 	gradient.addColorStop(1, 'yellow');
	context.rect(370, Y2-Y_diff, 30, Y_diff*2);
  	context.fillStyle = gradient;
 	context.fill();
        context.lineWidth = 2;
        context.strokeStyle = gradient;
        context.stroke();
	context.lineWidth=0.6;
        context.strokeStyle = "rgb(255,0,0)";

	}

////////////////////////////////////////////////////////////////////////////end of eye model
 
	setTimeout("drawFunction(mouseX, mouseY)", 10);
	}