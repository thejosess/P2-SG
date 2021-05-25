import * as THREE from '../libs/three.module.js'
 
class Arbol extends THREE.Object3D {
  constructor() {
    super();

    // Un Mesh se compone de geometría y material
    var sphereGeom = new THREE.SphereGeometry (2,8,5);
    // Como material se crea uno a partir de un color
    var texture = new THREE.TextureLoader().load('./imgs/leaf_2.jpeg');
    var sphereMat = new THREE.MeshLambertMaterial({map: texture, emissive:0xbebd8a, emissiveIntensity:0.1});
    //TODO revisar si ponerle emisse


    
    
    // Ya podemos construir el Mesh
    this.sphere = new THREE.Mesh (sphereGeom, sphereMat);
    // Y añadirlo como hijo del Object3D (el this)
    this.sphere.position.y = 2 + 3.5
    //un poco menos de 4 para la unión de ambas partes
    this.add (this.sphere);


    // Un Mesh se compone de geometría y material
    var cylinderGeom = new THREE.CylinderGeometry (0.5,0.5,4,10);
    // Como material se crea uno a partir de un color
    
    texture = new THREE.TextureLoader().load('./imgs/woods_2.jpeg');
    var cylinderMat = new THREE.MeshLambertMaterial({map: texture, emissive:0xbebd8a, emissiveIntensity:0.1});
    //TODO revisar si ponerle emisse

    cylinderMat.flatShading = true;
    cylinderMat.needsUpdate = true;
    
    // Ya podemos construir el Mesh
    this.cylinder = new THREE.Mesh (cylinderGeom, cylinderMat);
    // Y añadirlo como hijo del Object3D (el this)
    this.cylinder.position.y = 2
    this.add (this.cylinder);

   }
}

export { Arbol };
