	    //define global variables
	    
	    //variable parameters
	    var radius = 100;
	    var latitude = 20;
	    var longitude = 20;
	    var distance = 0.2;
	    var af=1,bf=1,cf=0.5,ab=1,bb=1,cb=0.7; //parameters for ellipsoid curves
	    var l1 = 0; l2 = 1; l3 = 0; // direction of the light

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

						if(j != 0){

							intensity1 = intensity_lens((x1+x2),(y1+y2),(z11+z2),l1,l2,l3,ab,bb,cb);
							intensity2 = intensity_lens((x2+x3),(y2+y3),(z2+z3),l1,l2,l3,ab,bb,cb);
							intensity3 = intensity_lens((x3+x1),(y3+y1),(z3+z1),l1,l2,l3,ab,bb,cb);
							triangle(v1, v2, v3, camera,material,renderer,scene,controls,intensity1,intensity2,intensity3);


		                	if(i == latitude/2){
		                		v3_back.push(v1);
		                		v3_back_intensity.push(intensity1);
		                	}
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

						x_value = a * x * zr0;y_value = b * y * zr0;z_value = (c * z0) - distance;
						x2 = x_value/2; y2 = y_value/2; z2 = z_value/2;

						x_value_prev = a * x * zr1;y_value_prev = b * y * zr1;z_value_prev = (c * z1) - distance;
						x3 = x_value_prev/2; y3 = y_value_prev/2; z3 = z_value_prev/2;

						v2 = new THREE.Vector3(x_value,y_value,z_value);
						v3 = new THREE.Vector3(x_value_prev,y_value_prev,z_value_prev);

						if(j != 0){
							intensity1 = intensity_lens((x1+x2),(y1+y2),(z11+z2),l1,l2,l3,af,bf,cf);
							intensity2 = intensity_lens((x2+x3),(y2+y3),(z2+z3),l1,l2,l3,af,bf,cf);
							intensity3 = intensity_lens((x3+x1),(y3+y1),(z3+z1),l1,l2,l3,af,bf,cf);

							triangle(v1, v2, v3, camera,material,renderer,scene,controls, intensity1,intensity2,intensity3);
						}

		                	//draw outer lens boundary
							if(i == latitude/2){
								geom_l = new THREE.Geometry();

								geom_l.vertices.push(v3_past);
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
								v3_past = v3;
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