import * as THREE from '../libs/three.module.js'
 
class Interruptor extends THREE.Object3D {
  constructor() {
    super();

    // Un Mesh se compone de geometría y material
    var sphereGeom = new THREE.SphereGeometry (2,8,30);
    // Como material se crea uno a partir de un color
    var sphereMat =new THREE.MeshBasicMaterial( {color: 0xff0000});

    //TODO revisar si ponerle emisse

    this.name = "interruptor"
    
    
    // Ya podemos construir el Mesh
    this.sphere = new THREE.Mesh (sphereGeom, sphereMat);
    // Y añadirlo como hijo del Object3D (el this)
    this.sphere.position.y = 2 
    //un poco menos de 4 para la unión de ambas partes
    this.add (this.sphere);

    this.interruptor_on = false

   }

   cambiarColor(){
     if(!this.interruptor_on) {
      // Como material se crea uno a partir de un color
      var sphereMat =new THREE.MeshBasicMaterial( {color:0xffff00} );
      this.sphere.material = sphereMat
      // create an AudioListener and add it to the camera
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
