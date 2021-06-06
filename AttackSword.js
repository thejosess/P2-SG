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

        this.factor_ataque = 1

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
                this.direccion = AttackSword.LOOK_AT_UP
            break;

            case Link.LOOK_AT_DOWN:
                this.position.x = this.ref_link.posPj_x-0.8
                this.position.y = this.ref_link.posPj_y+0.15
                this.position.z = this.ref_link.posPj_z
                this.rotation.x = -Math.PI/2
                this.rotation.z = 0
                this.direccion = AttackSword.LOOK_AT_DOWN
            break;

            case Link.LOOK_AT_RIGHT:
                this.position.x = this.ref_link.posPj_x
                this.position.y = this.ref_link.posPj_y+0.1
                this.position.z = this.ref_link.posPj_z+0.8
                this.rotation.z = Math.PI/2
                this.rotation.x = -Math.PI/2
                this.direccion = AttackSword.LOOK_AT_RIGHT
            break;

            case Link.LOOK_AT_LEFT:
                this.position.x = this.ref_link.posPj_x
                this.position.y = this.ref_link.posPj_y+1.1
                this.position.z = this.ref_link.posPj_z-0.8
                this.rotation.z = -Math.PI/2
                this.rotation.x = Math.PI/2
                this.direccion = AttackSword.LOOK_AT_LEFT
            break;
        }
    }

    cargarObstaculos(array_obstaculos){
        this.array_obstaculos = array_obstaculos
      }
  
      cargarEnemigos(array_enemigos){
        this.array_enemigos = array_enemigos
      }

    comprobarColision(array) {
        switch(this.ref_link.orientacion) {
            case Link.LOOK_AT_UP:
                var casterEspada = new THREE.Raycaster();
    
                var normalized_vector = new THREE.Vector3(0, 0, 1.25)
                normalized_vector = normalized_vector.normalize()
                casterEspada.set(this.position,normalized_vector);
                casterEspada.far = 1.25;
                var objetos = casterEspada.intersectObjects(array,true);

            break

            case Link.LOOK_AT_DOWN:
                var casterEspada = new THREE.Raycaster();
    
                var normalized_vector = new THREE.Vector3(0, 0, -1.25)
                normalized_vector = normalized_vector.normalize()
                casterEspada.set(this.position,normalized_vector);
                casterEspada.far = 1.25;
                var objetos = casterEspada.intersectObjects(array,true);

            break

            case Link.LOOK_AT_LEFT:
                var casterEspada = new THREE.Raycaster();
    
                var normalized_vector = new THREE.Vector3(1.25, 0, 0)
                normalized_vector = normalized_vector.normalize()
                casterEspada.set(this.position,normalized_vector);
                casterEspada.far = 1.25;
                var objetos = casterEspada.intersectObjects(array,true);
            
            break

            case Link.LOOK_AT_RIGHT:
                var casterEspada = new THREE.Raycaster();
        
                var normalized_vector = new THREE.Vector3(-1.25, 0, 0)
                normalized_vector = normalized_vector.normalize()
                casterEspada.set(this.position,normalized_vector);
                casterEspada.far = 1.25;
                var objetos = casterEspada.intersectObjects(array,true);
            
            break
        }

        return objetos;
    }

    comprobarColisionEspadaEnemigo(array) {
        var colisiona_enemigo = this.comprobarColision(array)
        console.log(this.array_enemigos)

        if(colisiona_enemigo.length > 0) {

            if(colisiona_enemigo[0].object.parent.name == "Attack") {
                this.visible=false
                this.aux = false
                this.position.x = this.ref_link.posPj_x
                this.position.y = this.ref_link.posPj_y
                this.position.z = this.ref_link.posPj_z
            }

            else{
            
                var monstruo = colisiona_enemigo[0].object.parent
                this.aux=false
                console.log(monstruo)

                if(monstruo.type != "Group")
                {            
                    monstruo.quitarVida(this.factor_ataque)
                    

                    if(monstruo.vida == 0) {
                        //Eliminar monstruo
                        var pos = this.array_enemigos.indexOf(monstruo)

                        this.array_enemigos.splice(pos,1)

                        var array_children = monstruo.parent.children
                        for(var i=0; i < array_children.length; i++) {
                            if(array_children[i].name == 'Attack'){
                                array_children[i].visible = false
                                array_children[i].muerto = true
                            }
                        }
                    }
                }
            }
            // Quita vida
            this.visible=false
            this.position.x = this.ref_link.posPj_x
            this.position.y = this.ref_link.posPj_y
            this.position.z = this.ref_link.posPj_z
        }
    }

    cambiarAEspadaRoja(){
        this.factor_ataque = 2
        var that = this;
        var materiaLoader = new MTLLoader();
        var objectLoader = new OBJLoader();
        materiaLoader.load('models/attack_sword_model/attack_sword_red.mtl',
        function(materials){
            objectLoader.setMaterials(materials);
            objectLoader.load('models/attack_sword_model/attack_sword_red.obj',
            function(object){
                var modelo = object;
                var modelo = object
                modelo.scale.set(1, 1, 1)
                that.add(modelo);
            },null,null);
        });
    }

    comprobarColisionEspadaObstaculos(array) {
        var colisiona_obstaculo = this.comprobarColision(array)

        if(colisiona_obstaculo.length > 0) {
            var obstaculo = colisiona_obstaculo[0].object.parent
            this.aux=false  
            if(obstaculo.name == "interruptor") {
                //Eliminamos la roca
                var roca = this.getObstaculo("roca")
                // var pos = this.array_enemigos.indexOf(roca)
                // roca.visible = false
                // this.array_obstaculos.splice(pos,1)
                obstaculo.cambiarColor()
                obstaculo.parent.quitarRoca()  
                //console.log(this.array_obstaculos)
            }
            // Quita vida
            this.visible=false
            this.position.x = this.ref_link.posPj_x
            this.position.y = this.ref_link.posPj_y
            this.position.z = this.ref_link.posPj_z
        }
    }

    getObstaculo(nombre) {
        for(var i=0; i < this.array_obstaculos.length; i++) {
           
            if(this.array_obstaculos[i].name == nombre) {
                var pos = this.array_obstaculos.indexOf(this.array_obstaculos[i])
               
                return this.array_obstaculos[pos]
            }
        }
    }



    update() {
        if(this.aux) {
            switch(this.direccion) {
                // LOOK_AT_UP
                case AttackSword.LOOK_AT_UP:
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
                        this.comprobarColisionEspadaEnemigo(this.array_enemigos)
                        this.comprobarColisionEspadaObstaculos(this.array_obstaculos)
                    }

                break;

                // LOOK_AT_DOWN
                case AttackSword.LOOK_AT_DOWN:
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
                        this.comprobarColisionEspadaEnemigo(this.array_enemigos)
                        this.comprobarColisionEspadaObstaculos(this.array_obstaculos)
                    }

                break;

                // LOOK_AT_RIGHT
                case AttackSword.LOOK_AT_RIGHT:
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
                        this.comprobarColisionEspadaEnemigo(this.array_enemigos)
                        this.comprobarColisionEspadaObstaculos(this.array_obstaculos)
                    }

                break;

                // LOOK_AT_LEFT
                case AttackSword.LOOK_AT_LEFT:
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
                        this.comprobarColisionEspadaEnemigo(this.array_enemigos)
                        this.comprobarColisionEspadaObstaculos(this.array_obstaculos)
                    }

                break;
            }
        }
    }   
}

AttackSword.LOOK_AT_UP = 5;
AttackSword.LOOK_AT_DOWN = 6;
AttackSword.LOOK_AT_RIGHT = 7;
AttackSword.LOOK_AT_LEFT = 8;

export { AttackSword };