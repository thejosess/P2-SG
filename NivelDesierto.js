import * as THREE from './libs/three.module.js'
import { MTLLoader } from './libs/MTLLoader.js'
import { OBJLoader } from './libs/OBJLoader.js'
import * as TWEEN from '../libs/tween.esm.js'
import { Vector3 } from './libs/three.module.js'
import {Arbusto} from './Arbusto.js'

import {Roca} from './Roca.js'
import { Camino } from './Camino.js'
import { Arbusto_desierto } from './Arbusto_desierto.js'



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

        this.desert_grass = new Arbusto_desierto()
        this.add(this.desert_grass)
        this.desert_grass.position.x = -130
        this.desert_grass.position.z = 5.5


        this.desert_grass2 = new Arbusto_desierto()
        this.add(this.desert_grass2)
        this.desert_grass2.position.x = -100
        this.desert_grass2.position.z = 8.5
        
        this.desert_grass3 = new Arbusto_desierto()
        this.add(this.desert_grass3)
        this.desert_grass3.position.x = -110
        this.desert_grass3.position.z = 11.5

        this.desert_grass4 = new Arbusto_desierto()
        this.add(this.desert_grass4)
        this.desert_grass4.position.x = -95
        this.desert_grass4.position.z = 20.5



        this.array_obstaculos = [
            this.camino1, this.camino2, this.desert_grass, this.desert_grass2, this.desert_grass3, this.desert_grass4
        ]


        this.array_enemigos = new Array
        
    }

    devolverEnemigos(){
        return this.array_enemigos
    }
    
    devolverObstaculos(){
        //TODO añadir los objetos que meta despues
        return this.array_obstaculos
    }


  
    }
    


export { NivelDesierto };
