import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const drawLine = ( color, matrix, ) => {
	const material = new THREE.LineBasicMaterial( { color } );
	const points = matrix.map( ( [ x, y, z ] ) => new THREE.Vector3( x, y, z, ) );
	const geometry = new THREE.BufferGeometry().setFromPoints( points );
	return new THREE.Line( geometry, material );
};

const init = () => {
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
	camera.position.set( 0, 0, 100 );
	camera.lookAt( 0, 0, 0 );

	const renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
	const controls = new OrbitControls( camera, renderer.domElement );

	const geometry = new THREE.BoxGeometry( 10, 10, 10 );
	const material = new THREE.MeshBasicMaterial( { color: 0x00ff00, transparent: true, opacity: 0.2 } );
	const cube = new THREE.Mesh( geometry, material );
	scene.add( cube );

	const line = drawLine(
		0x0000ff,
		[
			[ -10, 0, 0 ],
			[ 0, 10, 0 ],
			[ 10, 0, 0 ],
			[ 0, -10, 0 ],
			[ -10, 0, 0 ],
			[ 0, 0, 10 ],
			[ 10, 0, 0 ],
			[ 0, 0, -10 ],
			[ -10, 0, 0 ],
			[ 0, 0, 10 ],
			[ 0, 10, 0 ],
			[ 0, 0, -10 ],
			[ 0, -10, 0 ],
			[ 0, 0, 10 ]
		]
	);
	scene.add( line );

	const axisZ = drawLine(
		0xff0000,
		[
			[ 0, 0, 10 ],
			[ 0, 0, -10 ]
		],
	);
	scene.add( axisZ );

	const axisX = drawLine(
		0xff0000,
		[
			[ 10, 0, 0 ],
			[ -10, 0, 0 ]
		],
	);
	scene.add( axisX );

	const axisY = drawLine(
		0xff0000,
		[
			[ 0, 10, 0 ],
			[ 0, -10, 0 ]
		],
	);
	scene.add( axisY );

	const animate = () => {
		requestAnimationFrame( animate );
		renderer.render( scene, camera );

		controls.update();
	}

	return animate;
}

if ( WebGL.isWebGLAvailable() ) {
	const animate = init();
	animate();
} else {
	const warning = WebGL.getWebGLErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );
}
