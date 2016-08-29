	    var pi=Math.PI; //pi value
	    var radius = 100;
	    var theta_increment = 20;
	    var phi_increment = 20;
	    var camera, controls, scene, renderer , theta , phi, theta_prev, phi_prev, geom, mesh;
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
				v1 = new THREE.Vector3(0,0,0);


				for ( phi = phi_increment ; phi <= 180 ; phi = phi + phi_increment){
					for ( theta = theta_increment ; theta <= 360 ; theta = theta + theta_increment){

							geom = new THREE.Geometry();
							x_value = radius * Math.sin(theta) * Math.cos(phi);
							y_value = radius * Math.sin(theta) * Math.sin(phi);
							z_value = radius * Math.cos(theta);
							x_value_prev = radius * Math.sin(theta_prev) * Math.cos(phi_prev);
							y_value_prev = radius * Math.sin(theta_prev) * Math.sin(phi_prev);
							z_value_prev = radius * Math.cos(theta_prev);
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
	                		theta_prev = theta;
					}
					phi_prev = phi;
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
