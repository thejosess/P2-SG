import * as THREE from './libs/three.module.js'
import { Camino } from './Camino.js'
import { Samu_with_attack } from './Samu_with_attack.js'




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
        var materialGround = new THREE.MeshPhongMaterial ({map: texture,emissive:0xFFFFFF, emissiveIntensity:0.3 /*color:0x00FF00*/});
        //se pone emissive para dar la sensación de estar en una zona de boss, con menos luz y menos directa como la general
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

        this.camino1 = new Camino();
        this.camino1.position.z = 2.5
        this.camino1.position.x = -194
        this.add(this.camino1)


        this.camino2 = new Camino();
        this.camino2.position.z = -2.5
        this.camino2.position.x = -194
        this.add(this.camino2)

        this.add(ground)

        this.array_obstaculos = new Array ();
        this.array_obstaculos = [ this.camino1, this.camino2]

        //array enemigos
        this.array_enemigos = new Array

        this.samu = new Samu_with_attack()
        this.samu.position.x = -245
        this.add(this.samu)

        this.array_enemigos = [this.samu]
        
    }

    devolverEnemigos(){
        return this.array_enemigos
    }

    devolverObstaculos(){
        return this.array_obstaculos
    }

    update(){
        this.samu.update()
    }

}

export { NivelBoss };
