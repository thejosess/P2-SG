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

        // TODO No sé donde se hace el collider y to el rollo
        
        // var geometriCollider = new THREE.BoxGeometry(this.position.x, this.position.y, this.position.z);
        // var matInvisible = new THREE.MeshBasicMaterial({transparent:true, opacity:0});
        // var texture = new THREE.TextureLoader().load('../imgs/wood.jpg');
        // var material = new THREE.MeshPhongMaterial ({map: texture});    
        // var matFisico = Physijs.createMaterial(material, 0.2, 0.1);
        // var collider = new Physijs.BoxMesh(geometriCollider, matFisico, 0);
        // collider.add(AttackSword)
        // raizEscena.add(collider)
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

    superaLimite(orientacionLink) {
        switch(orientacionLink) {
            case Link.LOOK_AT_UP:
                if(this.position.z > this.position.z+10 || this.position.y > this.position.y+10) {
                    return true
                }
            break;

            case Link.LOOK_AT_DOWN:
                this.position.x = this.ref_link.posPj_x-0.8
                this.position.y = this.ref_link.posPj_y+0.15
            break;

            case Link.LOOK_AT_RIGHT:
                this.position.y = this.ref_link.posPj_y+0.1
                this.position.z = this.ref_link.posPj_z+0.8
            break;

            case Link.LOOK_AT_LEFT:
                this.position.y = this.ref_link.posPj_y+1.1
                this.position.z = this.ref_link.posPj_z-0.8
            break;
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