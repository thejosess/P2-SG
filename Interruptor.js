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


   }

   cambiarColor(){
    // Como material se crea uno a partir de un color
    var sphereMat =new THREE.MeshBasicMaterial( {color:0xffff00} );
    this.sphere.material = sphereMat

   }
}

export { Interruptor };
