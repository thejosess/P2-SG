import * as THREE from './libs/three.module.js'
import { MTLLoader } from './libs/MTLLoader.js'
import { OBJLoader } from './libs/OBJLoader.js'
import * as TWEEN from '../libs/tween.esm.js'
import { Vector3 } from './libs/three.module.js'




class Link extends THREE.Object3D{



    constructor(){
        super();
        var that = this;
        var materiaLoader = new MTLLoader();
        var objectLoader = new OBJLoader();
        materiaLoader.load('models/link_model/link_base.mtl',
        function(materials){
            objectLoader.setMaterials(materials);
            objectLoader.load('models/link_model/link_base.obj',
            function(object){
                var modelo = object;
                var modelo = object
                that.add(modelo);
            },null,null);
        });

        //construccion de las variables del modelo
        //empieza mirando hacia arriba
        this.orientacion = Link.LOOK_AT_UP
        console.log(this.rotation.y)
        
        /* Se hace este escalado tan grande porque en blender al exportar el modelo
        nos salen artifacts que se solucionan si el tamaño en blender es muy pequeño
        y luego al importarlo aqui, se escala a un tamaño apropiado. */
        this.scale.set(2000,2000,2000)

        // El personaje siempre acaba en el mismo valor de Y durante todo el juego
        this.posicion_final_y = this.position.y
        // El personaje siempre acaba con el mismo angulo de rotacion en el eje x
        this.rotation_final_x = this.rotation.x

        //Valores futuros de la posicion del pj tras animar
        //necesario debido al caracter asincrono de javascript

            //variables para conocer la posicion del personaje

        this.posPj_x = this.position.x
        this.posPj_y = this.position.y
        this.posPj_z = this.position.z

    }

    //change_model(string url_modelo)
    //para cambiar el tema del modelo del personaje segun el objeto que lleve?
    //esta que llame a otra vez a load? como se hace arriba?
    //poner lo de los FPS para ver como va

    orientacionLink(orientacion){
        if(this.orientacion != orientacion){

            switch(orientacion) {
                case Link.LOOK_AT_UP:
                  this.orientacion = Link.LOOK_AT_UP;
                  this.rotation.y=2*Math.PI
                  console.log("rotacion de up: " + this.rotation.y)
                break;

                case Link.LOOK_AT_DOWN:
                  this.orientacion = Link.LOOK_AT_DOWN;
                  this.rotation.y=Math.PI
                  console.log("rotacion de down: " + this.rotation.y)

                break;

                case Link.LOOK_AT_RIGHT:
                    this.orientacion = Link.LOOK_AT_RIGHT;
                    this.rotation.y=Math.PI/2
                    console.log("rotacion de right: " + this.rotation.y)

                break;

                case Link.LOOK_AT_LEFT:
                  this.orientacion = Link.LOOK_AT_LEFT;
                  this.rotation.y=-Math.PI/2
                  console.log("rotacion de left: " + this.rotation.y)

                break;
              }
        }
    }

    moverLink(direccionMovimiento){
      this.orientacionLink(direccionMovimiento)

      switch(direccionMovimiento) {
        case Link.LOOK_AT_UP:

          this.mover_delante_o_detras(Link.MOVER_DELANTE);
        break;

        case Link.LOOK_AT_DOWN:
          this.mover_delante_o_detras(Link.MOVER_DETRAS);
        break;

        case Link.LOOK_AT_RIGHT:
          this.mover_derecha();
        break;

        case Link.LOOK_AT_LEFT:
          this.mover_izquierda();
        break;
      }
    }

    // se actualiza la informacion del Pj
    //sacar estos valores a contastees y los de abajo?
    actualizarInfoPosicion(movimiento){

      switch(movimiento) {
        case Link.LOOK_AT_UP:
          this.posPj_x += 0;
          this.posPj_y += this.posicion_final_y;
          this.posPj_z += 1.75;
        break;

        case Link.LOOK_AT_DOWN:
          this.posPj_x += 0;
          this.posPj_y += this.posicion_final_y;
          this.posPj_z -= 1.75;
        break;
      }
    }

    mover_delante_o_detras(signo){
      console.log("animacion mover delante")

      var origen = {x: this.posPj_x, y:this.posPj_y, z:this.posPj_z, rotationx:this.rotation_final_x}
      var medio1 = {x: this.posPj_x, y:this.posPj_y+1, z:this.posPj_z+(0.8*signo), rotationx:(Math.PI/7)*signo}
      var medio2 = {x: this.posPj_x, y:this.posPj_y+1, z:this.posPj_z+(1.25*signo),rotationx:(Math.PI/10)*signo}
      var destino = {x: this.posPj_x, y:this.posPj_y = this.posicion_final_y, z:this.posPj_z+(1.75*signo), rotationx:this.rotation_final_x}
      
      //TODO hacer una rotation en x para que el muñeco gire hacía delante
      // y luego vuelva a su estado original de z y se quede recto

      //TODO hay que hacer con javascript que se espere hasta que salga la otra llamada


      // 1000 = 1s, 500 = 0.5s, 50 = 0.05s
      var movimiento1 = new TWEEN.Tween(origen).to(medio1,20)
      var movimiento2 = new TWEEN.Tween(medio1).to(medio2,20)
      var movimiento3 = new TWEEN.Tween(medio2).to(destino,20)

      
      movimiento1.easing(TWEEN.Easing.Linear.None)
      movimiento2.easing(TWEEN.Easing.Linear.None)
      movimiento3.easing(TWEEN.Easing.Linear.None)


      var that = this;

      movimiento1.onUpdate(function(){
        that.rotation.x = origen.rotationx
        that.position.x = origen.x
        that.position.y = origen.y
        that.position.z = origen.z
      })

      movimiento2.onUpdate(function(){
        that.rotation.x = medio1.rotationx
        that.position.x = medio1.x
        that.position.y = medio1.y
        that.position.z = medio1.z
      })

      movimiento3.onUpdate(function(){
        that.rotation.x = medio2.rotationx
        that.position.x = medio2.x
        that.position.y = medio2.y
        that.position.z = medio2.z
      })

      movimiento2.chain(movimiento3);
      movimiento1.chain(movimiento2);
      movimiento1.start();

    }

  




    update(){
      TWEEN.update();

    }
    
}

//Orientaciones de Link
Link.LOOK_AT_UP = 5;
Link.LOOK_AT_DOWN = 6;
Link.LOOK_AT_RIGHT = 7;
Link.LOOK_AT_LEFT = 8;

//delante y detras es igual cambiando los valores + por -
Link.MOVER_DELANTE = 1
Link.MOVER_DETRAS = -1




export { Link };
