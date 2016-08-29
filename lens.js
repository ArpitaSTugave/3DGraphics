	    //define global variables
	    var pi=Math.PI; //pi value
	    var radius = 100;
	    var latitude = 20;
	    var longitude = 20;
	    theta_prev = 0;
	    var camera, controls, scene, renderer , i=0, j=0, geom, mesh;
	    var v1,v2,v3;
	    var af=1,bf=1,cf=0.5,ab=1,bb=1,cb=0.7,v3_past=0;
	    var distance = 0.3;
	    var v3_front = [];
	    var v3_back = [];

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

	    //join two lenses
	    function joinlens(camera,material,renderer,scene,controls){

	    	for(i=0; i <= v3_back.length-1; i++){

	    		geom_l = new THREE.Geometry();

	    		geom_l.vertices.push(v3_front[i]);
				geom_l.vertices.push(v3_back[i]);
				line = new THREE.Line(geom_l, new THREE.LineBasicMaterial({
					color: 'lightblue',
					wireframe: true,
					wireframeLinewidth: 1
				}));
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

						geom = new THREE.Geometry();
						x_value = a * x * zr0;
						y_value = b * y * zr0;
						z_value = c * z0;
						x_value_prev = a * x * zr1;
						y_value_prev = b * y * zr1;
						z_value_prev = c * z1;
						v2 = new THREE.Vector3(x_value,y_value,z_value);
						v3 = new THREE.Vector3(x_value_prev,y_value_prev,z_value_prev);

						if(v1 != 0){

						geom.vertices.push( v1 );
						geom.vertices.push( v2 );
						geom.vertices.push( v3 );

						geom.faces.push( new THREE.Face3( 0, 1, 2 ) );
						geom.computeFaceNormals();

						mesh = new THREE.Mesh( geom, material);
						mesh.rotation.y = 90 * Math.PI / 180;   
						mesh.position.x = 0; 
	                	scene.add(mesh);


	                	if(i == latitude/2){
	                		v3_back.push(v1);
	                	}

	                	render();
	                	}

	                	v1 = v2;
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
						x_value = a * x * zr0;
						y_value = b * y * zr0;
						z_value = c * z0-distance;
						x_value_prev = a * x * zr1;
						y_value_prev = b * y * zr1;
						z_value_prev = c * z1-distance;
						v2 = new THREE.Vector3(x_value,y_value,z_value);
						v3 = new THREE.Vector3(x_value_prev,y_value_prev,z_value_prev);

						if(v1 != 0){

						geom.vertices.push( v1 );
						geom.vertices.push( v2 );
						geom.vertices.push( v3 );

						geom.faces.push( new THREE.Face3( 0, 1, 2 ) );
						geom.computeFaceNormals();

						mesh = new THREE.Mesh( geom, material);
						mesh.rotation.y = 90 * Math.PI / 180;   
						mesh.position.x = 0; 
	                	scene.add(mesh);

	                	//draw outer lens boundary
						if(i == latitude/2){
							geom_l = new THREE.Geometry();

							//initial point
							if(v3_past == 0){
								v3_past = v3;
							}

							geom_l.vertices.push(v3_past);
							geom_l.vertices.push(v3);
							line = new THREE.Line(geom_l, new THREE.LineBasicMaterial({
								color: 'lightblue',
								wireframe: true,
								wireframeLinewidth: 1
							}));
							line.rotation.y = 90 * Math.PI / 180;   
							line.position.x = 0; 
							scene.add(line);
							v3_past = v3;
							v3_front.push(v3);
						}

	                	render();
	                	}
	                	v1 = v2;
            	}
            }
	    }