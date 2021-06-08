import * as THREE from './libs/three.module.js'
import { MTLLoader } from './libs/MTLLoader.js'
import { OBJLoader } from './libs/OBJLoader.js'


class Roca extends THREE.Object3D{
    constructor(){
        super();
        var that = this;
        var materiaLoader = new MTLLoader();
        var objectLoader = new OBJLoader();
        materiaLoader.load('models/rock_model/rock.mtl',
        function(materials){
            objectLoader.setMaterials(materials);
            objectLoader.load('models/rock_model/rock.obj',
            function(object){
                var modelo = object;
                var modelo = object
                modelo.scale.set(150,150,150)
                that.add(modelo);
            },null,null);
        });

        this.name="roca"

        var geometry = new THREE.BoxGeometry( 3, 10, 3 );
        var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
        this.cube = new THREE.Mesh( geometry, material );
        this.cube.visible = false
        this.add(this.cube)
        
         
    }
}

export { Roca };
