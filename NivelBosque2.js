import * as THREE from './libs/three.module.js'
import { MTLLoader } from './libs/MTLLoader.js'
import { OBJLoader } from './libs/OBJLoader.js'
import * as TWEEN from '../libs/tween.esm.js'
import { Vector3 } from './libs/three.module.js'
import {Arbusto} from './Arbusto.js'

import {Roca} from './Roca.js'
import { Camino } from './Camino.js'
import {Octorok_with_attack} from './Octorok_with_attack.js'

import {Tektite} from './Tektite.js'


class NivelBosque2 extends THREE.Object3D{
    constructor(){
        super();


        this.array_obstaculos = new Array()
        this.crearArboleda()

        this.camino1 = new Camino();
        this.camino1.position.z = 2.5
        this.camino1.position.x = -30
        this.add(this.camino1)


        this.camino2 = new Camino();
        this.camino2.position.z = -2.5
        this.camino2.position.x = -30
        this.add(this.camino2)

        this.tektite = new Tektite()
        this.name = "Tektite"
        this.tektite.position.x = -60
        //va desde x = -60 hasta x = -80
        this.tektite.position.z = -1
        this.tektite.rotateY(Math.PI/2)

        this.add(this.tektite)
        //array enemigos

        

        this.array_enemigos = new Array()
        this.array_enemigos = [this.tektite]

        this.array_obstaculos = [
            this.roca, this.roca2, this.roca3, this.roca4,this.roca5, this.roca6, this.arbusto7, this.arbusto8,
            this.arbusto9, this.arbusto10, this.arbusto11, this.arbusto12,this.roca13, this.roca14, this.roca15, this.roca16,
            this.roca17, this.roca18, this.arbusto19, this.arbusto20,this.arbusto21, this.arbusto22, this.arbusto23, this.arbusto24,
            this.camino1, this.camino2
        ]

    }

    devolverEnemigos(){
       return this.array_enemigos
    }

    devolverObstaculos(){
        //TODO añadir los objetos que meta despues
        return this.array_obstaculos
    }

    crearArboleda(){
        this.roca = new Roca()
        this.roca.position.z = 18
        this.roca.position.x = -40
        this.add(this.roca)


        this.roca2 = new Roca()
        this.roca2.position.z = 8
        this.roca2.position.x = -40
        this.add(this.roca2)

        this.roca3 =  new Roca()
        this.roca3.position.z = 18
        this.roca3.position.x = -48
        this.add(this.roca3)


        this.roca4 =   new Roca()
        this.roca4.position.z = 8
        this.roca4.position.x = -48
        this.add(this.roca4)

        this.roca5 = new Roca()
        this.roca5.position.z = 18
        this.roca5.position.x = -54
        this.add(this.roca5)


        this.roca6 = new Roca()
        this.roca6.position.z = 8
        this.roca6.position.x = -54
        this.add(this.roca6)





        
        this.arbusto7 = new Arbusto()
        this.arbusto7.position.z = 3.5
        this.arbusto7.position.x = -40
        this.add(this.arbusto7)


        this.arbusto8 = new Arbusto()
        this.arbusto8.position.z = -5
        this.arbusto8.position.x = -40
        this.add(this.arbusto8)


        this.arbusto9 = new Arbusto()
        this.arbusto9.position.z = 3.5
        this.arbusto9.position.x = -48
        this.add(this.arbusto9)


        this.arbusto10 = new Arbusto()
        this.arbusto10.position.z = -5
        this.arbusto10.position.x = -48
        this.add(this.arbusto10)

        this.arbusto11 = new Arbusto()
        this.arbusto11.position.z = 3.5
        this.arbusto11.position.x = -54
        this.add(this.arbusto11)


        this.arbusto12 = new Arbusto()
        this.arbusto12.position.z = -5
        this.arbusto12.position.x = -54
        this.add(this.arbusto12)




        this.roca13 = new Roca()
        this.roca13.position.z = 18
        this.roca13.position.x = -60
        this.add(this.roca13)


        this.roca14 = new Roca()
        this.roca14.position.z = 8
        this.roca14.position.x = -60
        this.add(this.roca14)

        this.roca15 = new Roca()
        this.roca15.position.z = 18
        this.roca15.position.x = -70
        this.add(this.roca15)


        this.roca16 = new Roca()
        this.roca16.position.z = 8
        this.roca16.position.x = -70
        this.add(this.roca16)

        this.roca17 = new Roca()
        this.roca17.position.z = 18
        this.roca17.position.x = -74
        this.add(this.roca17)

        this.roca18 = new Roca()
        this.roca18.position.z = 8
        this.roca18.position.x = -74
        this.add(this.roca18)

        



        this.arbusto19 = new Arbusto()
        this.arbusto19.position.z = 3.5
        this.arbusto19.position.x = -60
        this.add(this.arbusto19)


        this.arbusto20 = new Arbusto()
        this.arbusto20.position.z = -5
        this.arbusto20.position.x = -60
        this.add(this.arbusto20)

        this.arbusto21 = new Arbusto()
        this.arbusto21.position.z = 3.5
        this.arbusto21.position.x = -68
        this.add(this.arbusto21)


        this.arbusto22 = new Arbusto()
        this.arbusto22.position.z = -5
        this.arbusto22.position.x = -68
        this.add(this.arbusto22)

        this.arbusto23 = new Arbusto()
        this.arbusto23.position.z = 3.5
        this.arbusto23.position.x = -74
        this.add(this.arbusto23)

        this.arbusto24 = new Arbusto()
        this.arbusto24.position.z = -5
        this.arbusto24.position.x = -74
        this.add(this.arbusto24)
    }

    update(){
        this.tektite.rutaTektite()
    }
    
}

export { NivelBosque2 };
