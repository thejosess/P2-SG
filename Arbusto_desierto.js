import * as THREE from './libs/three.module.js'
import { MTLLoader } from './libs/MTLLoader.js'
import { OBJLoader } from './libs/OBJLoader.js'


class Arbusto_desierto extends THREE.Object3D{
    constructor(){
        super();
        var that = this;
        var materiaLoader = new MTLLoader();
        var objectLoader = new OBJLoader();
        materiaLoader.load('models/desert_grass/desert_grass.mtl',
        function(materials){
            objectLoader.setMaterials(materials);
            objectLoader.load('models/desert_grass/desert_grass.obj',
            function(object){
                var modelo = object;
                var modelo = object
                that.add(modelo);
            },null,null);
        });

        this.scale.set(175,175,175)
    }
}

export { Arbusto_desierto };
