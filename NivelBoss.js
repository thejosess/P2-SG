import * as THREE from './libs/three.module.js'
import { MTLLoader } from './libs/MTLLoader.js'
import { OBJLoader } from './libs/OBJLoader.js'
import * as TWEEN from '../libs/tween.esm.js'
import { Vector3 } from './libs/three.module.js'




class NivelBoss extends THREE.Object3D{
    constructor(anchura, altura){
        super();

        // Se crea un plano para el suelo
        // altura/5,0.2,anchura/5
        //tal y como tenemos el juego, no queremos altura
        // y la altura será nuestra profundidad
        var geometryGround = new THREE.BoxGeometry (anchura/30,0.2,altura/18);
        
        // El material se hará con una textura de arena o tierra
        var texture = new THREE.TextureLoader().load('./imgs/boss.jpeg');
        var materialGround = new THREE.MeshPhongMaterial ({map: texture,emissive:0xFFFFFF, emissiveIntensity:0.2 /*color:0x00FF00*/});
        //este crea la textura mas larga para el resto de niveles porque es la misma
        //y asi no se ven los "cortes" de la textura
        
        // Ya se puede construir el Mesh
        var ground = new THREE.Mesh (geometryGround, materialGround);
        
        // Todas las figuras se crean centradas en el origen.
        // El suelo lo bajamos la mitad de su altura para que el origen del mundo se quede en su lado superior
        ground.position.y = 0.1;
        ground.position.x = -230

        //posiciones del suelo para que quede en su lugar correspondiente
        //ground.position.x = 

        this.add(ground)
    }

    resizeMazmorra(anchura,altura){
        // Se cambia el tamaño de la geometria y por tanto de la textura 
        this.geometry.parameters.depth = altura/6;
        this.geometry.parameters.width = anchura/6;
    }
}

export { NivelBoss };
