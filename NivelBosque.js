import * as THREE from './libs/three.module.js'
import { MTLLoader } from './libs/MTLLoader.js'
import { OBJLoader } from './libs/OBJLoader.js'
import * as TWEEN from '../libs/tween.esm.js'
import { Vector3 } from './libs/three.module.js'




class NivelBosque extends THREE.Object3D{
    constructor(altura, anchura){
        super();

        // Se crea un plano para el suelo
        var geometryGround = new THREE.BoxGeometry (altura/5,0.2,anchura/5);
        
        // El material se hará con una textura de arena o tierra
        var texture = new THREE.TextureLoader().load('./imgs/sand_ground.jpg');
        var materialGround = new THREE.MeshPhongMaterial ({map: texture});
        
        // Ya se puede construir el Mesh
        var ground = new THREE.Mesh (geometryGround, materialGround);
        
        // Todas las figuras se crean centradas en el origen.
        // El suelo lo bajamos la mitad de su altura para que el origen del mundo se quede en su lado superior
        ground.position.y = -0.1;
        this.add(ground)
    }
}

export { NivelBosque };
