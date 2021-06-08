import * as THREE from '../libs/three.module.js'
 
class Interruptor extends THREE.Object3D {
  constructor() {
    super();

    var sphereGeom = new THREE.SphereGeometry (2,8,30);
    var sphereMat =new THREE.MeshBasicMaterial( {color: 0xff0000});

    this.name = "interruptor"
    
    
    this.sphere = new THREE.Mesh (sphereGeom, sphereMat);
    this.sphere.position.y = 2 
    this.add (this.sphere);

    this.interruptor_on = false

   }

   cambiarColor(){
     if(!this.interruptor_on) {
      var sphereMat =new THREE.MeshBasicMaterial( {color:0xffff00} );
      this.sphere.material = sphereMat
      
      const listener = new THREE.AudioListener();
      this.add( listener );

      // create a global audio source
      const sound = new THREE.Audio( listener );

      // load a sound and set it as the Audio object's buffer
      const audioLoader = new THREE.AudioLoader();
      audioLoader.load( 'sounds/interruptor.ogg', function( buffer ) {
      sound.setBuffer( buffer );
      sound.setLoop( false );
      sound.setVolume( 0.5 );
      sound.play();
      });
      
      this.interruptor_on=true
    }
   }
}

export { Interruptor };
