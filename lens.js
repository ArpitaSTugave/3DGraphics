	    var pi=Math.PI; //pi value
	    var radius = 100;
	    var latitude = 50;
	    var longitude = 50;
	    var camera, controls, scene, renderer , i=0, j=0, geom, mesh;
	    var v1,v2,v3;

        init();
        animate();

        function init(){

                renderer = new THREE.WebGLRenderer();
                renderer.setSize(window.innerWidth, window.innerHeight)
                document.body.appendChild(renderer.domElement);

                camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
				camera.position.z = 400;
                controls = new THREE.TrackballControls( camera );
                controls.addEventListener('change', render);
                scene = new THREE.Scene();

				theta_prev = 0;
				var material =  new THREE.MeshBasicMaterial({
					color: 'lightblue',
					wireframe: true,
					wireframeLinewidth: 40 
					});

				latitude0 = pi * (-0.5 + (i-1)/latitude);
				z0 = Math.sin(latitude0);
				zr0 = Math.cos(latitude0);

				latitude1 = pi * (-0.5 + i/latitude);
				z1 = Math.sin(latitude1);
				zr1 = Math.cos(latitude1);

				longitude0 = 2 * pi * (j - 1) / longitude;
				x = Math.cos(longitude0);
				y = Math.sin(longitude0);

				geom = new THREE.Geometry();
				x_value = x * zr0;
				y_value = y * zr0;
				z_value = z0;
				x_value_prev = x * zr1;
				y_value_prev = y * zr1;
				z_value_prev = z1;
				v1 = new THREE.Vector3(x_value,y_value,z_value);

				for ( i = 0 ; i <=  latitude; i++){

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
						x_value = x * zr0;
						y_value = y * zr0;
						z_value = z0;
						x_value_prev = x * zr1;
						y_value_prev = y * zr1;
						z_value_prev = z1;
						v2 = new THREE.Vector3(x_value,y_value,z_value);
						v3 = new THREE.Vector3(x_value_prev,y_value_prev,z_value_prev);

						geom.vertices.push( v1 );
						geom.vertices.push( v2 );
						geom.vertices.push( v3 );

						geom.faces.push( new THREE.Face3( 0, 1, 2 ) );
						geom.computeFaceNormals();

						mesh = new THREE.Mesh( geom, material);
	                	scene.add(mesh);
	                	render();
	                	v1 = v2;
            	}
        	}

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