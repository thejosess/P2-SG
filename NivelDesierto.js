import * as THREE from './libs/three.module.js'
import { MTLLoader } from './libs/MTLLoader.js'
import { OBJLoader } from './libs/OBJLoader.js'
import * as TWEEN from '../libs/tween.esm.js'
import { Vector3 } from './libs/three.module.js'
import {Arbusto} from './Arbusto.js'

import {Roca} from './Roca.js'
import { Camino } from './Camino.js'



class NivelDesierto extends THREE.Object3D{
    constructor(){
        super();


        this.array_obstaculos = new Array()

        this.camino1 = new Camino();
        this.camino1.position.z = 2.5
        this.camino1.position.x = -86
        this.add(this.camino1)


        this.camino2 = new Camino();
        this.camino2.position.z = -2.5
        this.camino2.position.x = -86
        this.add(this.camino2)




        this.array_obstaculos = [
            this.camino1, this.camino2
        ]

    }

    devolverObstaculos(){
        //TODO añadir los objetos que meta despues
        return this.array_obstaculos
    }


  
    }
    


export { NivelDesierto };
