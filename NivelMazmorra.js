import * as THREE from './libs/three.module.js'
import { MTLLoader } from './libs/MTLLoader.js'
import { OBJLoader } from './libs/OBJLoader.js'
import * as TWEEN from '../libs/tween.esm.js'
import { Vector3 } from './libs/three.module.js'
import { Camino } from './Camino.js'
import { Interruptor } from './Interruptor.js'
import { Fire } from './Fire.js'
import { Roca } from './Roca.js'




class NivelMazmorra extends THREE.Object3D{
    constructor(anchura, altura){
        super();

        // Se crea un plano para el suelo
        // altura/5,0.2,anchura/5
        //tal y como tenemos el juego, no queremos altura
        // y la altura será nuestra profundidad
        var geometryGround = new THREE.BoxGeometry (anchura/30,0.2,altura/18);
        
        // El material se hará con una textura de arena o tierra
        var texture = new THREE.TextureLoader().load('./imgs/mazmorra_4.png');
        var materialGround = new THREE.MeshPhongMaterial ({map: texture,emissive:0xbebd8a, emissiveIntensity:0.2 /*color:0x00FF00*/});
        //este crea la textura mas larga para el resto de niveles porque es la misma
        //y asi no se ven los "cortes" de la textura
        
        // Ya se puede construir el Mesh
        var ground = new THREE.Mesh (geometryGround, materialGround);
        
        // Todas las figuras se crean centradas en el origen.
        // El suelo lo bajamos la mitad de su altura para que el origen del mundo se quede en su lado superior
        ground.position.y = 0.1;

        //posiciones del suelo para que quede en su lugar correspondiente
        //ground.position.x = 
        ground.position.x = -175

        this.add(ground)

        this.array_obstaculos = new Array()

        this.camino1 = new Camino();
        this.camino1.position.z = 2.5
        this.camino1.position.x = -142
        this.add(this.camino1)


        this.camino2 = new Camino();
        this.camino2.position.z = -2.5
        this.camino2.position.x = -142
        this.add(this.camino2)

        this.fire = new Fire();
        this.fire.position.x = -185
        this.fire.position.z = 3
        this.add(this.fire)

        this.fire2 = new Fire();
        this.fire2.position.x = -185
        this.fire2.position.z = -5
        this.add(this.fire2)

        this.fire3 = new Fire();
        this.fire3.position.x = -185
        this.fire3.position.z = 6
        this.add(this.fire3)

        this.fire4 = new Fire();
        this.fire4.position.x = -185
        this.fire4.position.z = -8
        this.add(this.fire4)

        //luz puntual por cada antorcha
        var pointLight = new THREE.PointLight (0xfcfcfc, 0.5,10)
        pointLight.position.set(-185,3,3)
        this.add(pointLight)

        //luz puntual por cada antorcha
        var pointLight2 = new THREE.PointLight (0xfcfcfc, 0.5,10)
        pointLight2.position.set(-185,3,-5)
        this.add(pointLight2)

        //luz puntual por cada antorcha
        var pointLight3 = new THREE.PointLight (0xfcfcfc, 0.5,10)
        pointLight3.position.set(-185,3,6)
        this.add(pointLight3)

        //luz puntual por cada antorcha
        var pointLight4 = new THREE.PointLight (0xfcfcfc, 0.5,25)
        pointLight4.position.set(-185,3,-8)
        this.add(pointLight4)
        


        this.interruptor  = new Interruptor()
        this.interruptor.position.x = -175
        this.interruptor.position.z = 18
        this.add(this.interruptor)


        this.roca = new Roca()
        this.roca.position.x = -185
        this.roca.position.z = 0
        this.add(this.roca)

        this.array_obstaculos = new Array ();
        this.array_obstaculos = [this.camino1, this.camino2, this.fire, this.fire3, this.fire4, this.interruptor, this.roca]

        this.array_enemigos = new Array
        
    }

    devolverEnemigos(){
        return this.array_enemigos
    }

    quitarRoca(){
        //ponemos roca invisible y en el array de obstaculos la quitamos
        this.roca.visible = false
        this.array_obstaculos.splice(6,1)
    }

    cambiarColorInterruptor(){
        this.interruptor.cambiarColor()
    }

    devolverObstaculos(){
        //TODO añadir los objetos que meta despues
        return this.array_obstaculos
    }

    update(){
        this.cambiarColorInterruptor()
    }

/*     resizeMazmorra(anchura,altura){
        // Se cambia el tamaño de la geometria y por tanto de la textura 
        this.geometry.parameters.depth = altura/6;
        this.geometry.parameters.width = anchura/6;
    } */
}

export { NivelMazmorra };
