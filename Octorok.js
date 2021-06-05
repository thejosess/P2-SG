import * as THREE from './libs/three.module.js'
import { MTLLoader } from './libs/MTLLoader.js'
import { OBJLoader } from './libs/OBJLoader.js'
import * as TWEEN from '../libs/tween.esm.js'
import { Vector3 } from './libs/three.module.js'


class Octorok extends THREE.Object3D{
    constructor(){
        super();
        var that = this;
        var materiaLoader = new MTLLoader();
        var objectLoader = new OBJLoader();
        materiaLoader.load('models/octorok/octorok.mtl',
        function(materials){
            objectLoader.setMaterials(materials);
            objectLoader.load('models/octorok/octorok.obj',
            function(object){
                var modelo = object;
                var modelo = object
                modelo.scale.set(200,200,200)
                that.add(modelo);
            },null,null);
        });

        var geometry = new THREE.BoxGeometry( 5.5, 10, 5.5 );
        var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
        this.cube = new THREE.Mesh( geometry, material );
        this.cube.visible = false
        this.add(this.cube)

        this.vida = 2
        this.name = "Octorok"
        
        /* Se hace este escalado tan grande porque en blender al exportar el modelo
        nos salen artifacts que se solucionan si el tamaño en blender es muy pequeño
        y luego al importarlo aqui, se escala a un tamaño apropiado. */
    }
}

export { Octorok };
