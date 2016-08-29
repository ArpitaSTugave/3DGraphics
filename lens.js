	    var pi=Math.PI; //pi value
	    var init_radius = 100;
	    var theta_increment = 5
	    var radius_increment = 5;
	    var camera, controls, scene, renderer , theta , theta_prev, geom, mesh;
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


				for ( theta = theta_increment ; theta <= 360 ; theta = theta + theta_increment){

				 	v1 = new THREE.Vector3(0,0,0);
				 	radius = radius_increment;

					while(radius <= init_radius){

						geom = new THREE.Geometry();
						z_value = Math.sqrt((radius*radius)-(radius * Math.cos(theta*pi/180))-(radius * Math.sin(theta*pi/180)));
						v2 = new THREE.Vector3(radius * Math.cos(theta*pi/180),radius * Math.sin(theta*pi/180),z_value);
						v3 = new THREE.Vector3(radius * Math.cos(theta_prev*pi/180),radius * Math.sin(theta_prev*pi/180),z_value);

						geom.vertices.push( v1 );
						geom.vertices.push( v2 );
						geom.vertices.push( v3 );

						geom.faces.push( new THREE.Face3( 0, 1, 2 ) );
						geom.computeFaceNormals();

						mesh = new THREE.Mesh( geom, material);
                		scene.add(mesh);
                		render();
                		v1 = v2;
                		radius = radius + radius_increment;
					}
					theta_prev = theta;
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
