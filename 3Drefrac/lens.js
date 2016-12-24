	    //define global variables
	    
	    //variable parameters
	    var radius = 100;
	    var latitude = 20;
	    var longitude = 20;
	    var distance = 0.2;
	    var af=1,bf=1,cf=0.5,ab=1,bb=1,cb=0.7; //parameters for ellipsoid curves
	    var l1 = 0; l2 = 1; l3 = 0; // direction of the light
	    var ni = 1; nr = 1.5; //refractive indices

	    //fixed parameters
	    var pi=Math.PI; //pi value
	    theta_prev = 0;
	    var camera, controls, scene, renderer , i=0, j=0, geom, mesh;
	    var v1,v2,v3;
	    var v3_past=0;
	    var v3_front = [];
	    var v3_front_intensity = [];
	    var v3_back = [];
	    var v3_back_intensity = [];

	    //init fucntion
        init();
        animate();

        //define other functions here
        function init(){

                renderer = new THREE.WebGLRenderer();
                renderer.setSize(window.innerWidth, window.innerHeight)
                document.body.appendChild(renderer.domElement);

                camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
				camera.position.z = 8;           
				controls = new THREE.TrackballControls( camera );
                controls.addEventListener('change', render);
                scene = new THREE.Scene();

				var material;

				//lens function : draws lens
				lens(camera,material,renderer,scene,controls,af,bf,cf,ab,bb,cb,distance);

				//draw rays
				rays(camera,material,renderer,scene,controls,distance);

		window.addEventListener(' resize' , onWindowResize , false);
        }

    	function animate(){
                requestAnimationFrame( animate );
                controls.update();
        }

        function render(){
                renderer.render( scene, camera );
        } 

	    function onWindowResize(){
		camera.aspect = window.innerWidth / window.innerHeight ; 
		camera.updateProjectionMatrix();

		renderer.setSize( window.innerWidth , window.innerHeight );
	    }

	    //draws rays
	    function rays(camera,material,renderer,scene,controls,distance){
	    		
	    		// 1. ray coinciding with the front lens
	    		x0 = 0.2; y0 = 0.5; z00 = -2; //starting point
	    		vx = 0; vy = 0.4; vz = -1; //directional vector (something's off about signs in threejs)
	    		mag_v = Math.sqrt(Math.abs((vx * vx) + (vy * vy) + (vz * vz)));
				vx = vx/mag_v; vy = vy/mag_v; vz = vz/mag_v; //directional vector of 1st refracted ray
	    		z0 = (z00 + distance);
	    		a1 = (1/(af*af));b1 = (1/(bf*bf));c1 = (1/(cf*cf));
	    		a_roots = ((a1*vx*vx) + (b1*vy*vy) + (c1*vz*vz)); //a,b,c value to find roots
	    		b_roots = ((a1*2*x0*vx) + (b1*2*y0*vy) + (c1*2*z0*vz));
	    		c_roots = (a1*x0*x0) + (b1*y0*y0) + (c1*z0*z0) - 1;
	    		det = Math.sqrt(Math.abs((b_roots*b_roots)-(4*a_roots*c_roots)));
	    		roots = (-b_roots + det)/(2*a_roots);
	    		x1 = (x0 + (roots *vx)); y1 = (y0 + (roots *vy)); z1 = (z00 + (roots *vz));
	    		v0 = new THREE.Vector3(x0,y0,z00);
	    		v1 = new THREE.Vector3(x1,y1,z1);
	    		geom = new THREE.Geometry();
	    		geom.vertices.push(v0);
				geom.vertices.push(v1);
				
				// 2. ray refracted from front lens to back lens
				Nx = a1*2*x1; Ny = b1*2*y1; Nz = c1*2*z1;
				mag_N = Math.sqrt(Math.abs((Nx * Nx) + (Ny * Ny) + (Nz * Nz)));
				Nx = Nx/mag_N; Ny = Ny/mag_N; Nz = Nz/mag_N;  
				cos_theta = (Nx * vx) + (Ny * vy) + (Nz * vz);
				dix = vx - (cos_theta * Nx); diy = vy - (cos_theta * Ny); diz = vz - (cos_theta * Nz);
				drx = ni * dix/nr; dry = ni * diy/nr; drz = ni * diz/nr;
				sin_thetar = Math.sqrt(Math.abs((drx * drx) + (dry * dry) + (drz * drz)));
				cos_thetar = Math.sqrt(1 - (sin_thetar * sin_thetar));
				vx = (cos_thetar * Nx) + drx; vy = (cos_thetar * Ny) + dry; vz = (cos_thetar * Nz) + drz;
				mag_v = Math.sqrt(Math.abs((vx * vx) + (vy * vy) + (vz * vz)));
				vx = vx/mag_v; vy = vy/mag_v; vz = vz/mag_v; //directional vector of 1st refracted ray
				a1 = (1/(ab*ab));b1 = (1/(bb*bb));c1 = (1/(cb*cb));
	    		a_roots = ((a1*vx*vx) + (b1*vy*vy) + (c1*vz*vz)); //a,b,c value to find roots
	    		b_roots = ((a1*2*x1*vx) + (b1*2*y1*vy) + (c1*2*z1*vz));
	    		c_roots = (a1*x1*x1) + (b1*y1*y1) + (c1*z1*z1) - 1;
	    		det = Math.sqrt(Math.abs((b_roots*b_roots)-(4*a_roots*c_roots)));
	    		roots = (-b_roots - det)/(2*a_roots);
	    		x2 = (x1 + (roots *vx)); y2 = (y1 + (roots *vy)); z2 = (z1 + (roots *vz));
	    		v2 = new THREE.Vector3(x2,y2,z2);
				geom.vertices.push(v2);

				// 3. ray refracted from front lens to back lens
				Nx = -a1*2*x2; Ny = -b1*2*y2; Nz = -c1*2*z2;
				mag_N = Math.sqrt(Math.abs((Nx * Nx) + (Ny * Ny) + (Nz * Nz)));
				Nx = Nx/mag_N; Ny = Ny/mag_N; Nz = Nz/mag_N;  
				cos_theta = (Nx * vx) + (Ny * vy) + (Nz * vz);
				dix = vx - (cos_theta * Nx); diy = vy - (cos_theta * Ny); diz = vz - (cos_theta * Nz);
				drx = nr * dix/ni; dry = nr * diy/ni; drz = nr * diz/ni;
				sin_thetar = Math.sqrt(Math.abs((drx * drx) + (dry * dry) + (drz * drz)));
				cos_thetar = Math.sqrt(1 - (sin_thetar * sin_thetar));
				vx = (cos_thetar * Nx) + drx; vy = (cos_thetar * Ny) + dry; vz = (cos_thetar * Nz) + drz;
	    		x3 = (x2 - (7 *vx)); y3 = (y2 - (7 *vy)); z3 = (z2 - (7 *vz));
	    		v3 = new THREE.Vector3(x3,y3,z3);
				geom.vertices.push(v3);
				

				/////////////////////////////////////text
	    		var text2 = document.createElement('div');
				text2.style.position = 'absolute';
				//text2.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
				text2.style.width = 100;
				text2.style.height = 20;
				text2.style.top = 120 + 'px';
				text2.style.left = 100 + 'px';
				text2.style.backgroundColor = "white";
				text2.innerHTML = Ny;
				document.body.appendChild(text2);
				////////////////////////////////////////

				var mat =  new THREE.LineBasicMaterial({
					wireframe: true,
					wireframeLinewidth: 1
				});
				mat.color.r = 0.7; mat.color.g = 0.2; mat.color.b = 0.2;
				line = new THREE.Line(geom, mat);
				line.rotation.y = 90 * Math.PI / 180;   
				line.position.x = 0; 
				scene.add(line);
				render();
	    }

	    //draws lens
	    function lens(camera,material,renderer,scene,controls,af,bf,cf,ab,bb,cb,distance){

		    	material =  new THREE.MeshBasicMaterial({
						color: 'lightblue',
						wireframe: true,
						wireframeLinewidth: 1
						});

	    		fronthalflens(camera,material,renderer,scene,controls,af,bf,cf,distance);
				backhalflens(camera,material,renderer,scene,controls,ab,bb,cb);
				joinlens(camera,material,renderer,scene,controls);

	    }

	    //calculate intensity
	    function intensity_lens(x,y,z,l1,l2,l3,a,b,c){
	    	intensity = 0;
	    	Nx = 2*x/(a*a);Ny = 2*y/(b*b);Nz = 2*z/(c*c);
	    	sum = Math.sqrt((Nx*Nx)+(Ny*Ny)+(Nz*Nz));
	    	Nx = Nx/sum; Ny = Ny/sum; Nz = Nz/sum;
	    	m = ((Nx*l1) + (Ny*l2) + (Nz*l3));
	    	intensity =  (1.5+m)/2.5;
	    	return intensity;
	    }

	    //draw triangle
	    function triangle(v1, v2, v3,camera,material,renderer,scene,controls,intensity1,intensity2,intensity3){

	    		geom = new THREE.Geometry();
	    		geom.vertices.push(v1);
				geom.vertices.push(v2);
				var mat =  new THREE.LineBasicMaterial({
					wireframe: true,
					wireframeLinewidth: 1
				});
				mat.color.r = intensity1; mat.color.g = intensity1; mat.color.b = intensity1;
				line = new THREE.Line(geom, mat);
				line.rotation.y = 90 * Math.PI / 180;   
				line.position.x = 0; 
				scene.add(line);
				render();

				geom = new THREE.Geometry();
	    		geom.vertices.push(v2);
				geom.vertices.push(v3);
				var mat =  new THREE.LineBasicMaterial({
					wireframe: true,
					wireframeLinewidth: 1
				});
				mat.color.r = intensity2; mat.color.g = intensity2; mat.color.b = intensity2;
				line = new THREE.Line(geom, mat);
				line.rotation.y = 90 * Math.PI / 180;   
				line.position.x = 0; 
				scene.add(line);
				render();

				geom = new THREE.Geometry();
	    		geom.vertices.push(v3);
				geom.vertices.push(v1);
				var mat =  new THREE.LineBasicMaterial({
					wireframe: true,
					wireframeLinewidth: 1
				});
				mat.color.r = intensity3; mat.color.g = intensity3; mat.color.b = intensity3;
				line = new THREE.Line(geom, mat);
				line.rotation.y = 90 * Math.PI / 180;   
				line.position.x = 0; 
				scene.add(line);
				render();

	    }

	    //join two lenses
	    function joinlens(camera,material,renderer,scene,controls){

	    	for(i=0; i <= v3_back.length-1; i++){

	    		geom = new THREE.Geometry();
	    		geom.vertices.push(v3_front[i]);
				geom.vertices.push(v3_back[i]);
				//average of two intensity values
				intensity = (v3_back_intensity[i] + v3_front_intensity[i])/2;
				var mat =  new THREE.LineBasicMaterial({
					wireframe: true,
					wireframeLinewidth: 1
				});
				mat.color.r = intensity; mat.color.g = intensity; mat.color.b = intensity;
				line = new THREE.Line(geom, mat);
				line.rotation.y = 90 * Math.PI / 180;   
				line.position.x = 0; 
				scene.add(line);
				render();

				geom = new THREE.Geometry();
				if((i+1)<=(v3_back.length-1)){
	    		geom.vertices.push(v3_back[i+1]);}
	    		else{geom.vertices.push(v3_back[0]);}
				geom.vertices.push(v3_front[i]);
				//average of two intensity values
				intensity = (v3_back_intensity[i] + v3_front_intensity[i])/2;
				var mat =  new THREE.LineBasicMaterial({
					wireframe: true,
					wireframeLinewidth: 1
				});
				mat.color.r = intensity; mat.color.g = intensity; mat.color.b = intensity;
				line = new THREE.Line(geom, mat);
				line.rotation.y = 90 * Math.PI / 180;   
				line.position.x = 0; 
				scene.add(line);
				render();
				
	    	}
	    }

	    //draws back portion of the lens
	    function backhalflens(camera,material,renderer,scene,controls,a,b,c){
	    		i = latitude/2;
	    		v1 = 0;
	    		v3_past = 0;
	    		v2_past = 0;

				for ( i = latitude/2 ; i <= latitude; i++){

					latitude0 = pi * (-0.5 + (i-1)/latitude);
					z0 = Math.sin(latitude0);
					zr0 = Math.cos(latitude0);

					latitude1 = pi * (-0.5 + i/latitude);
					z1 = Math.sin(latitude1);
					zr1 = Math.cos(latitude1);

					for (j = 0; j <= longitude; j++){

						longitude0 = 2 * pi * (j - 1) / longitude;
						x = Math.cos(longitude0);
						y = Math.sin(longitude0);

						x_value = a * x * zr0;y_value = b * y * zr0;z_value = c * z0;
						x2 = x_value/2; y2 = y_value/2; z2 = z_value/2;

						x_value_prev = a * x * zr1;y_value_prev = b * y * zr1;z_value_prev = c * z1;
						x3 = x_value_prev/2; y3 = y_value_prev/2; z3 = z_value_prev/2;

						v2 = new THREE.Vector3(x_value,y_value,z_value);
						v3 = new THREE.Vector3(x_value_prev,y_value_prev,z_value_prev);
						intensity1 = intensity_lens((x1+x2),(y1+y2),(z11+z2),l1,l2,l3,ab,bb,cb);
						intensity2 = intensity_lens((x2+x3),(y2+y3),(z2+z3),l1,l2,l3,ab,bb,cb);
						intensity3 = intensity_lens((x3+x1),(y3+y1),(z3+z1),l1,l2,l3,ab,bb,cb);

						if(i == (latitude)){
						}

						if(j != 0){

							if(i < (latitude)){
								triangle(v1, v2, v3, camera,material,renderer,scene,controls,intensity1,intensity2,intensity3);
							}

		                	if(i == latitude/2){
		                		v3_back.push(v1);
		                		v3_back_intensity.push(intensity1);
		                	}
	                	}

	                	//elliminate triangles at the pole
							if(i == (latitude)){
								v3 = new THREE.Vector3((x2+x3),(y2+y3),(z2+z3));
								geom = new THREE.Geometry();
					    		geom.vertices.push(v2);
								geom.vertices.push(v3);
								var mat =  new THREE.LineBasicMaterial({
									wireframe: true,
									wireframeLinewidth: 1
								});
								mat.color.r = intensity2; mat.color.g = intensity2; mat.color.b = intensity2;
								line = new THREE.Line(geom, mat);
								line.rotation.y = 90 * Math.PI / 180;   
								line.position.x = 0; 
								scene.add(line);
								render();

								if(v3_past == 0){
									v3_past = v3;
								}

								geom = new THREE.Geometry();
								geom.vertices.push(v3_past);
								geom.vertices.push(v3);
								var mat =  new THREE.LineBasicMaterial({
									wireframe: true,
									wireframeLinewidth: 1
								});
								mat.color.r = intensity2; mat.color.g = intensity2; mat.color.b = intensity2;
								line = new THREE.Line(geom, mat);
								line.rotation.y = 90 * Math.PI / 180;   
								line.position.x = 0; 
								scene.add(line);
								render();

								v3_past = v3;

								if(v2_past == 0){
									v2_past = v3;
								}

								geom = new THREE.Geometry();
								geom.vertices.push(v2_past);
								geom.vertices.push(v2);
								var mat =  new THREE.LineBasicMaterial({
									wireframe: true,
									wireframeLinewidth: 1
								});
								mat.color.r = intensity2; mat.color.g = intensity2; mat.color.b = intensity2;
								line = new THREE.Line(geom, mat);
								line.rotation.y = 90 * Math.PI / 180;   
								line.position.x = 0; 
								scene.add(line);
								render();

								v2_past = v2;
							}

	                	v1 = v2;
	                	x1 = x_value/2; y1 = y_value/2; z11 = z_value/2;
            	}
            }
	    }

	    //draws front portion of the lens
	    function fronthalflens(camera,material,renderer,scene,controls,a,b,c,distance){
	    		i = 0;
	    		j = 0;
	    		v1 = 0;
	    		v3_past = 0;
	    		v3_pasti = 0;
	    		v2_past = 0;
	    		v3_arr = [];

				for ( i = 0 ; i <= latitude/2; i++){

					latitude0 = pi * (-0.5 + (i-1)/latitude);
					z0 = Math.sin(latitude0);
					zr0 = Math.cos(latitude0);

					latitude1 = pi * (-0.5 + i/latitude);
					z1 = Math.sin(latitude1);
					zr1 = Math.cos(latitude1);

					for (j = 0; j <= longitude; j++){

						longitude0 = 2 * pi * (j - 1) / longitude;
						x = Math.cos(longitude0);
						y = Math.sin(longitude0);

						geom = new THREE.Geometry();

						x_value = a * x * zr0;y_value = b * y * zr0;z_value = (c * (z0))-distance;
						x2 = x_value/2; y2 = y_value/2; z2 = z_value/2;

						x_value_prev = a * x * zr1;y_value_prev = b * y * zr1;z_value_prev = (c * (z1))-distance;
						x3 = x_value_prev/2; y3 = y_value_prev/2; z3 = z_value_prev/2;

						v2 = new THREE.Vector3(x_value,y_value,z_value);
						v3 = new THREE.Vector3(x_value_prev,y_value_prev,z_value_prev);

						if(i == 1){		
							intensity2 = intensity_lens((x2+x3),(y2+y3),(z2+z3),l1,l2,l3,af,bf,cf);						
							v3 = new THREE.Vector3((x2+x3),(y2+y3),(z2+z3));
							geom = new THREE.Geometry();
					    	geom.vertices.push(v3_past);
							geom.vertices.push(v3);
							var mat =  new THREE.LineBasicMaterial({
								wireframe: true,
								wireframeLinewidth: 1
							});
							mat.color.r = intensity2; mat.color.g = intensity2; mat.color.b = intensity2;
							line = new THREE.Line(geom, mat);
							line.rotation.y = 90 * Math.PI / 180;   
							line.position.x = 0; 
							scene.add(line);
							render();

							if(v3_past == 0){
								v3_past = v3;
							}
							v3_past = v3;
							v3_arr.push(v3);
						}

						if(i == 2){
							geom = new THREE.Geometry();
					    	geom.vertices.push(v3_arr[j]);
							geom.vertices.push(v2);
							var mat =  new THREE.LineBasicMaterial({
								wireframe: true,
								wireframeLinewidth: 1
							});
							mat.color.r = intensity2; mat.color.g = intensity2; mat.color.b = intensity2;
							line = new THREE.Line(geom, mat);
							line.rotation.y = 90 * Math.PI / 180;   
							line.position.x = 0; 
							scene.add(line);
							render();
						}

						if(j != 0 && v1 != 0){
							intensity1 = intensity_lens((x1+x2),(y1+y2),(z11+z2),l1,l2,l3,af,bf,cf);
							intensity2 = intensity_lens((x2+x3),(y2+y3),(z2+z3),l1,l2,l3,af,bf,cf);
							intensity3 = intensity_lens((x3+x1),(y3+y1),(z3+z1),l1,l2,l3,af,bf,cf);

							if(i > 1){
								triangle(v1, v2, v3, camera,material,renderer,scene,controls, intensity1,intensity2,intensity3);
							}
						}

		                	//draw outer lens boundary
						if(i == latitude/2 && v1 != 0){
							geom_l = new THREE.Geometry();

							geom_l.vertices.push(v3_pasti);
							geom_l.vertices.push(v3);
							intensity = intensity_lens((x3+x3_past),(y3+y3_past),(z3+z3_past),l1,l2,l3,af,bf,cf);
							var mat =  new THREE.LineBasicMaterial({
								wireframe: true,
								wireframeLinewidth: 1
							});
							mat.color.r = intensity; mat.color.g = intensity; mat.color.b = intensity;
							line = new THREE.Line(geom_l, mat);
							line.rotation.y = 90 * Math.PI / 180;   
							line.position.x = 0; 
							scene.add(line);
							render();
							v3_pasti = v3;
							v3_front.push(v3);
							v3_front_intensity.push(intensity);
						}

	                	v1 = v2;
	                	x1 = x_value/2; y1 = y_value/2; z11 = z_value/2;
	                	x3_past = x_value_prev/2; y3_past = y_value_prev/2; z3_past = z_value_prev/2;
            	}
            }
            v3_front.push(v3_front[0]);
		    v3_front_intensity.push(v3_front_intensity[0]);
/*
                /////////////////////////////////////text
	    		var text2 = document.createElement('div');
				text2.style.position = 'absolute';
				//text2.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
				text2.style.width = 100;
				text2.style.height = 20;
				text2.style.top = 120 + 'px';
				text2.style.left = 100 + 'px';
				text2.style.backgroundColor = "white";
				text2.innerHTML = intensity2;
				document.body.appendChild(text2);
				////////////////////////////////////////
*/
	    }
	    