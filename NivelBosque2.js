import * as THREE from './libs/three.module.js'
import { MTLLoader } from './libs/MTLLoader.js'
import { OBJLoader } from './libs/OBJLoader.js'
import * as TWEEN from '../libs/tween.esm.js'
import { Vector3 } from './libs/three.module.js'
import {Arbusto} from './Arbusto.js'




class NivelBosque2 extends THREE.Object3D{
    constructor(){
        super();


        this.array_obstaculos = new Array()







        
        this.arbusto7 = new Arbusto()
        this.arbusto7.position.z = 2
        this.arbusto7.position.x = -40


        this.arbusto8 = new Arbusto()
        this.arbusto8.position.z = -5
        this.arbusto8.position.x = -40

        this.arbusto9 = new Arbusto()
        this.arbusto9.position.z = 2
        this.arbusto9.position.x = -48


        this.arbusto10 = new Arbusto()
        this.arbusto10.position.z = -5
        this.arbusto10.position.x = -48

        this.arbusto11 = new Arbusto()
        this.arbusto11.position.z = 2
        this.arbusto11.position.x = -54


        this.arbusto12 = new Arbusto()
        this.arbusto12.position.z = -5
        this.arbusto12.position.x = -54


        this.arbusto19 = new Arbusto()
        this.arbusto19.position.z = 2
        this.arbusto19.position.x = -60


        this.arbusto20 = new Arbusto()
        this.arbusto20.position.z = -5
        this.arbusto20.position.x = -60

        this.arbusto21 = new Arbusto()
        this.arbusto21.position.z = 2
        this.arbusto21.position.x = -68


        this.arbusto22 = new Arbusto()
        this.arbusto22.position.z = -5
        this.arbusto22.position.x = -68

        this.arbusto23 = new Arbusto()
        this.arbusto23.position.z = 2
        this.arbusto23.position.x = -74

        this.arbusto24 = new Arbusto()
        this.arbusto24.position.z = -5
        this.arbusto24.position.x = -74




        this.add(this.arbusto7)
        this.add(this.arbusto8)
        this.add(this.arbusto9)
        this.add(this.arbusto10)
        this.add(this.arbusto11)
        this.add(this.arbusto12)


        this.add(this.arbusto19)
        this.add(this.arbusto20)
        this.add(this.arbusto21)
        this.add(this.arbusto22)
        this.add(this.arbusto23)
        this.add(this.arbusto24)




        this.array_obstaculos = [
             this.arbusto7, this.arbusto8,
            this.arbusto9, this.arbusto10, this.arbusto11, this.arbusto12,
            this.arbusto19, this.arbusto20,this.arbusto21, this.arbusto22, this.arbusto23, this.arbusto24
        ]

    }

    devolverObstaculos(){
        //TODO añadir los objetos que meta despues
        return this.array_obstaculos
    }

    resizeBosque(anchura,altura){
        // Se cambia el tamaño de la geometria y por tanto de la textura 
        this.geometry.parameters.depth = altura/6;
        this.geometry.parameters.width = anchura/6;
    }
}

export { NivelBosque2 };
