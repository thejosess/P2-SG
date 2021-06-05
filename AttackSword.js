import * as THREE from './libs/three.module.js'
import { MTLLoader } from './libs/MTLLoader.js'
import { OBJLoader } from './libs/OBJLoader.js'
import { Vector3 } from './libs/three.module.js'
import { Tween } from './libs/tween.esm.js';
import { Link } from './Link.js';

class AttackSword extends THREE.Object3D {
    constructor(link) {
        super();
        this.ref_link = link;
        var that = this;
        var materiaLoader = new MTLLoader();
        var objectLoader = new OBJLoader();
        materiaLoader.load('models/attack_sword_model/attack_sword.mtl',
            function(materials) {
                objectLoader.setMaterials(materials);
                objectLoader.load('models/attack_sword_model/attack_sword.obj',
                    function(object) {
                        var modelo = object;
                        that.add(modelo);
                    }, null, null);
            });

        this.visible = false

        this.scale.set(70,70,70)

        this.direccion = 0  
        this.aux = false

        //array con los obstaculos segun el nivel en el que estés
        this.array_obstaculos = new Array()
    }

    lanzarEspada(orientacionLink) {
        console.log("Lanzando espada ...")
        this.aux=true

        switch(orientacionLink) {
            case Link.LOOK_AT_UP:
                this.position.x = this.ref_link.posPj_x+0.8
                this.position.y = this.ref_link.posPj_y+1.1 
                this.position.z = this.ref_link.posPj_z
                this.rotation.x = Math.PI/2
                this.rotation.z = 0
                this.direccion = 1
            break;

            case Link.LOOK_AT_DOWN:
                this.position.x = this.ref_link.posPj_x-0.8
                this.position.y = this.ref_link.posPj_y+0.15
                this.position.z = this.ref_link.posPj_z
                this.rotation.x = -Math.PI/2
                this.rotation.z = 0
                this.direccion = 2
            break;

            case Link.LOOK_AT_RIGHT:
                this.position.x = this.ref_link.posPj_x
                this.position.y = this.ref_link.posPj_y+0.1
                this.position.z = this.ref_link.posPj_z+0.8
                this.rotation.z = Math.PI/2
                this.rotation.x = -Math.PI/2
                this.direccion = 3
            break;

            case Link.LOOK_AT_LEFT:
                this.position.x = this.ref_link.posPj_x
                this.position.y = this.ref_link.posPj_y+1.1
                this.position.z = this.ref_link.posPj_z-0.8
                this.rotation.z = -Math.PI/2
                this.rotation.x = Math.PI/2
                this.direccion = 4
            break;
        }
    }

    cargarObstaculos(array_obstaculos){
        this.array_obstaculos = array_obstaculos
      }
  
      cargarEnemigos(array_enemigos){
        this.array_enemigos = array_enemigos
      }

    comprobarColisionObjeto() {

    }

    comprobarColisionEnemigo() {
        switch(this.ref_link.orientacion) {
            case Link.LOOK_AT_UP:
                var casterJugador = new THREE.Raycaster();
    
                var normalized_vector = new THREE.Vector3(0, 0, 1.25)
                normalized_vector = normalized_vector.normalize()
                casterJugador.set(this.position,normalized_vector);
                casterJugador.far = 1.25;
                //TODO poner que dependiendo del nivel buscas unos objetos u otros
                //console.log(this.array_enemigos)
                //tienes que comprobar que scene.children[0] su parent sea NivelBosque
                var objetos = casterJugador.intersectObjects(this.array_enemigos,true);

            break

            case Link.LOOK_AT_DOWN:
                var casterJugador = new THREE.Raycaster();
    
                var normalized_vector = new THREE.Vector3(0, 0, -1.25)
                normalized_vector = normalized_vector.normalize()
                casterJugador.set(this.position,normalized_vector);
                casterJugador.far = 1.25;
                //TODO poner que dependiendo del nivel buscas unos objetos u otros
                //console.log(this.array_enemigos)
                //tienes que comprobar que scene.children[0] su parent sea NivelBosque
                var objetos = casterJugador.intersectObjects(this.array_enemigos,true);

            break

            case Link.LOOK_AT_LEFT:
                var casterJugador = new THREE.Raycaster();
    
                var normalized_vector = new THREE.Vector3(1.25, 0, 0)
                normalized_vector = normalized_vector.normalize()
                casterJugador.set(this.position,normalized_vector);
                casterJugador.far = 1.25;
                //TODO poner que dependiendo del nivel buscas unos objetos u otros
                //console.log(this.array_enemigos)
                //tienes que comprobar que scene.children[0] su parent sea NivelBosque
                var objetos = casterJugador.intersectObjects(this.array_enemigos,true);
            
            break

            case Link.LOOK_AT_RIGHT:
                var casterJugador = new THREE.Raycaster();
        
                var normalized_vector = new THREE.Vector3(-1.25, 0, 0)
                normalized_vector = normalized_vector.normalize()
                casterJugador.set(this.position,normalized_vector);
                casterJugador.far = 1.25;
                //TODO poner que dependiendo del nivel buscas unos objetos u otros
                //console.log(this.array_enemigos)
                //tienes que comprobar que scene.children[0] su parent sea NivelBosque
                var objetos = casterJugador.intersectObjects(this.array_enemigos,true);
            
            break
        }

        return objetos;
    }

    comprobarMovimientoColisionEnemigo() {
        var colisiona_enemigo = this.comprobarColisionEnemigo()

        if(colisiona_enemigo.length > 0) {
            var monstruo = colisiona_enemigo[0].object.parent
            this.aux=false
            monstruo.vida -= 1  

            if(monstruo.vida == 0) {
                //Eliminar Octorok
                var pos = this.array_enemigos.indexOf(monstruo)
                monstruo.visible = false
                this.array_enemigos.splice(pos,1)
            }
            // Quita vida
            this.visible=false
            this.position.x = this.ref_link.posPj_x
            this.position.y = this.ref_link.posPj_y
            this.position.z = this.ref_link.posPj_z
        }
    }

    update() {
        if(this.aux) {
            switch(this.direccion) {
                // LOOK_AT_UP
                case 1:
                    if(this.position.z > (this.ref_link.posPj_z+15)) {
                        this.visible=false
                        this.position.x = this.ref_link.posPj_x
                        this.position.y = this.ref_link.posPj_y
                        this.position.z = this.ref_link.posPj_z
                        this.aux=false
                    }

                    else {
                        this.visible = true
                        this.position.z+=0.4
                        this.comprobarMovimientoColisionEnemigo()
                    }

                break;

                // LOOK_AT_DOWN
                case 2:
                    if(this.position.z < (this.ref_link.posPj_z-15)) {
                        this.visible=false
                        this.position.x = this.ref_link.posPj_x
                        this.position.y = this.ref_link.posPj_y
                        this.position.z = this.ref_link.posPj_z
                        this.aux=false
                    }

                    else {
                        this.visible = true
                        this.position.z+=-0.4
                        this.comprobarMovimientoColisionEnemigo()
                    }

                break;

                // LOOK_AT_RIGHT
                case 3:
                    if(this.position.x < (this.ref_link.posPj_x-15)) {
                        this.visible=false
                        this.position.x = this.ref_link.posPj_x
                        this.position.y = this.ref_link.posPj_y
                        this.position.z = this.ref_link.posPj_z
                        this.aux=false
                    }

                    else {
                        this.visible = true
                        this.position.x+=-0.4
                        this.comprobarMovimientoColisionEnemigo()
                    }

                break;

                // LOOK_AT_LEFT
                case 4:
                    if(this.position.x > (this.ref_link.posPj_x+15)) {
                        this.visible=false
                        this.position.x = this.ref_link.posPj_x
                        this.position.y = this.ref_link.posPj_y
                        this.position.z = this.ref_link.posPj_z
                        this.aux=false
                    }

                    else {
                        this.visible = true
                        this.position.x+=0.4
                        this.comprobarMovimientoColisionEnemigo()
                    }

                break;
            }
            /* crear un booleano que sea lanzando = false para 
            que tengas que esperar a tirar otra espada hasta que la
            primera colisione con algo
            */

            /*if (colisiona con algo) {
                visible = false
            }*/
        }
    }   
}

AttackSword.LOOK_AT_UP = 5;
AttackSword.LOOK_AT_DOWN = 6;
AttackSword.LOOK_AT_RIGHT = 7;
AttackSword.LOOK_AT_LEFT = 8;

export { AttackSword };