import * as THREE from './libs/three.module.js'
import { MTLLoader } from './libs/MTLLoader.js'
import { OBJLoader } from './libs/OBJLoader.js'
import * as TWEEN from '../libs/tween.esm.js'
import { Vector3 } from './libs/three.module.js'
import { Camino } from './Camino.js'
import { Alga } from './Alga.js'
import { Walrus } from './Walrus.js'



class NivelMar extends THREE.Object3D{
    constructor(anchura, altura){
        super();

        // Se crea un plano para el suelo
        // altura/5,0.2,anchura/5
        //tal y como tenemos el juego, no queremos altura
        // y la altura será nuestra profundidad
        var geometryGround = new THREE.BoxGeometry (anchura/26,0.2,altura/26);
        
        // El material se hará con una textura de arena o tierra
        var texture = new THREE.TextureLoader().load('./imgs/water_2.png');
        var materialGround = new THREE.MeshPhongMaterial ({map: texture});
        
        // Ya se puede construir el Mesh
        var ground = new THREE.Mesh (geometryGround, materialGround);
        
        // Todas las figuras se crean centradas en el origen.
        ground.position.y = -0.08;

        //posiciones del suelo para que quede en su lugar correspondiente
        ground.position.x = -56
        ground.position.z = 43

        this.add(ground)

        this.camino1 = new Camino();
        this.camino1.rotateY(-Math.PI/2)
        this.camino1.position.z = 22.5
        this.camino1.position.x = -67
        this.add(this.camino1)


        this.camino2 = new Camino();
        this.camino2.rotateY(-Math.PI/2)
        this.camino2.position.z = 22.5
        this.camino2.position.x = -61
        this.add(this.camino2)

        this.alga1 = new Alga()
        this.add(this.alga1)
        this.alga1.position.z = 28
        this.alga1.position.x = -42

        this.alga2 = new Alga()
        this.add(this.alga2)
        this.alga2.position.z = 50
        this.alga2.position.x = -80

        this.walrus = new Walrus()
        this.add(this.walrus)
        this.walrus.position.x = -70
        this.walrus.position.z = 50
        this.fin_recorrido_x = false
        this.fin_recorrido_z = true
        //walrus se desplaza saltando de su posicion en x
        //hasta -42
        this.walrus_signo_recorrido = +1

        this.array_obstaculos = new Array ();
        this.array_obstaculos = [this.camino1, this.camino2, this.alga1, this.alga2]
        
        this.array_enemigos = new Array
        this.array_enemigos = [this.walrus]
        
    }

    devolverEnemigos(){
        return this.array_enemigos
    }


    devolverObstaculos(){
        //TODO añadir los objetos que meta despues
        return this.array_obstaculos
    }

    rutaWalrus(){
        if(!this.fin_recorrido_x){
            if(this.walrus.position.x == -42){
                this.walrus_signo_recorrido = -1
                this.fin_recorrido_x = true
                this.fin_recorrido_z = false
                this.walrus.rotateY(Math.PI/2)
            }
            if(this.walrus.position.x == -71){
                this.walrus_signo_recorrido = 1
                this.walrus.rotateY(Math.PI)
            }
            this.walrus.position.x = (this.walrus.position.x) + (1 * this.walrus_signo_recorrido)
        }
        if(this.fin_recorrido_x && !this.fin_recorrido_z){
            if(this.walrus.position.z == 40){
                this.fin_recorrido_z = true
                this.walrus.rotateY(Math.PI)
            }

            this.walrus.position.z -= 0.5
        }   
        
        if(this.fin_recorrido_z && this.fin_recorrido_x){
            if(this.walrus.position.z == 50){
                this.fin_recorrido_x = false
                this.walrus.rotateY(-Math.PI/2)
            }
            this.walrus.position.z += 0.5
        }

        /* if(this.walrus.position.x == -70){
            this.walrus_signo_recorrido = +1
        }  */


    }

/*     resizeSecreto(anchura,altura){
        // Se cambia el tamaño de la geometria y por tanto de la textura 
        this.geometry.parameters.depth = altura/6;
        this.geometry.parameters.width = anchura/6;
    } */

    update(){
        this.rutaWalrus()
    }
}

export { NivelMar };
