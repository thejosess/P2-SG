import * as THREE from './libs/three.module.js'
import { MTLLoader } from './libs/MTLLoader.js'
import { OBJLoader } from './libs/OBJLoader.js'
import * as TWEEN from '../libs/tween.esm.js'
import { Vector3 } from './libs/three.module.js'
import { Roca3 } from './Roca3.js'
import { Libro } from './Libro.js'
import { RedSword} from './RedSword.js'




class NivelSecreto extends THREE.Object3D{
    constructor(anchura, altura){
        super();

        // Se crea un plano para el suelo
        // altura/5,0.2,anchura/5
        //tal y como tenemos el juego, no queremos altura
        // y la altura será nuestra profundidad
        var geometryGround = new THREE.BoxGeometry (anchura/26,0.2,altura/26);
        
        // El material se hará con una textura de arena o tierra
        var texture = new THREE.TextureLoader().load('./imgs/dungeon_floor.jpeg');
        var materialGround = new THREE.MeshPhongMaterial ({map: texture});
        
        // Ya se puede construir el Mesh
        var ground = new THREE.Mesh (geometryGround, materialGround);
        
        // Todas las figuras se crean centradas en el origen.
        ground.position.y = -0.08;

        //posiciones del suelo para que quede en su lugar correspondiente
        //ground.position.x = 
        ground.position.z = 43

        this.add(ground)


        this.array_obstaculos = new Array ();


        this.roca = new Roca3();
        this.roca.position.z = 55
        this.roca.position.x = -24
        this.add(this.roca)

        this.roca2 = new Roca3();
        this.roca2.position.z =44
        this.roca2.position.x = -24
        this.add(this.roca2)

        this.roca3 = new Roca3();
        this.roca3.position.z =32.5
        this.roca3.position.x = -24
        this.add(this.roca3)

        this.libro = new Libro()
        this.libro.position.z = 32
        this.libro.position.x = -10
        this.libro.rotateY(Math.PI /8)
        this.add(this.libro)

        this.libro2 = new Libro()
        this.libro2.position.z = 52
        this.libro2.position.x = 5
        this.libro2.rotateY(-Math.PI /8)
        this.add(this.libro2)

        this.libro3 = new Libro()
        this.libro3.position.z = 48
        this.libro3.position.x = 15
        this.libro3.rotateY(-Math.PI /4)
        this.add(this.libro3)
        
        this.espada_roja = new RedSword()
        this.espada_roja.position.z = 48
        this.espada_roja.position.x = -12
        this.espada_roja.scale.set(300, 300, 300)
        this.espada_roja.rotateY(-35)
        this.add(this.espada_roja)
        this.espada_roja.cube.position.z = 46
        this.espada_roja.cube.position.x = -11
        this.add(this.espada_roja.cube)

        this.array_obstaculos = [
            this.roca,this.roca2, this.roca3, this.libro, this.libro2, this.libro3, this.espada_roja, this.espada_roja.cube
        ]
    }




    devolverObstaculos(){
        //TODO añadir los objetos que meta despues
        return this.array_obstaculos
    }

/*     resizeSecreto(anchura,altura){
        // Se cambia el tamaño de la geometria y por tanto de la textura 
        this.geometry.parameters.depth = altura/6;
        this.geometry.parameters.width = anchura/6;
    } */
}

export { NivelSecreto };
