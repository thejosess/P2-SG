import * as THREE from './libs/three.module.js'
import { MTLLoader } from './libs/MTLLoader.js'
import { OBJLoader } from './libs/OBJLoader.js'
import * as TWEEN from '../libs/tween.esm.js'
import { Vector3 } from './libs/three.module.js'




class Link extends THREE.Object3D{
    constructor(scene){
        super();
        var that = this;
        this.scene = scene;
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
        //console.log(this.rotation.y)
        
        /* Se hace este escalado tan grande porque en blender al exportar el modelo
        nos salen artifacts que se solucionan si el tamaño en blender es muy pequeño
        y luego al importarlo aqui, se escala a un tamaño apropiado. */
        this.scale.set(2000,2000,2000)

        // El personaje siempre acaba en el mismo valor de Y durante todo el juego
        this.posicion_final_y = this.position.y
        // El personaje siempre acaba con el mismo angulo de rotacion en el eje x
        this.rotation_final_x = this.rotation.x
        this.rotation_final_z = this.rotation.z

        //Valores futuros de la posicion del pj tras animar
        //necesario debido al caracter asincrono de javascript

            //variables para conocer la posicion del personaje

        //this.rotation.y = -Math.PI

        //esta posicion es la 0,0
        this.posPj_x = this.position.x
        this.posPj_y = this.position.y
        this.posPj_z = this.position.z

        //el pj empieza en el nivel bosque 1
        this.game_level = Link.BOSQUE_1

        //TODO por defecto la tiene a false, tiene que encontrar la llave, rompiendo algun arbusto o algo?
        this.tieneLlave = true

        //array con los obstaculos segun el nivel en el que estés
        this.array_obstaculos = new Array()

        this.vidas = 3
    }

    cargarObstaculos(array_obstaculos){
      this.array_obstaculos = array_obstaculos
    }

    cargarEnemigos(array_enemigos){
      this.array_enemigos = array_enemigos
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
                  //console.log("rotacion de up: " + this.rotation.y)
                break;

                case Link.LOOK_AT_DOWN:
                  this.orientacion = Link.LOOK_AT_DOWN;
                  this.rotation.y=Math.PI
                  //console.log("rotacion de down: " + this.rotation.y)

                break;

                case Link.LOOK_AT_RIGHT:
                    this.orientacion = Link.LOOK_AT_RIGHT;
                    this.rotation.y=-Math.PI/2
                    //console.log("rotacion de right: " + this.rotation.y)

                break;

                case Link.LOOK_AT_LEFT:
                  this.orientacion = Link.LOOK_AT_LEFT;
                  this.rotation.y=+Math.PI/2
                  //console.log("rotacion de left: " + this.rotation.y)

                break;
              }
        }
    }

    moverLink(direccionMovimiento){
      this.orientacionLink(direccionMovimiento)
      //console.log("orientacion Link" + direccionMovimiento)
      var puede_avanzar

      switch(direccionMovimiento) {
        case Link.LOOK_AT_UP:
          //se comprueba que se puede avanzar
          puede_avanzar = this.puede_avanzar(Link.LOOK_AT_UP)
          if(puede_avanzar){
            this.mover_delante_o_detras(Link.MOVER_DELANTE);
          }

          return puede_avanzar
        //break;

        case Link.LOOK_AT_DOWN:
          //se comprueba que se puede avanzar
          puede_avanzar = this.puede_avanzar(Link.LOOK_AT_DOWN)

          if(puede_avanzar){
            this.mover_delante_o_detras(Link.MOVER_DETRAS);
          }
        return puede_avanzar
        //break;

        case Link.LOOK_AT_RIGHT:
          //se comprueba que se puede avanzar
          puede_avanzar = this.puede_avanzar(Link.LOOK_AT_RIGHT)
          if(puede_avanzar){        
            this.mover_izquierda_o_derecha(Link.MOVER_DERECHA);
          }
        return puede_avanzar

        case Link.LOOK_AT_LEFT:
          //se comprueba que se puede avanzar
          puede_avanzar = this.puede_avanzar(Link.LOOK_AT_LEFT)
          if(puede_avanzar){             
            this.mover_izquierda_o_derecha(Link.MOVER_IZQUIERDA);
          }
        return puede_avanzar
      }
    }

    // se actualiza la informacion del Pj
    //esta posicion es necesaria para poder usarla en las animaciones al encadenarse con las llamadas de Scene
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

        case Link.LOOK_AT_RIGHT:
          this.posPj_x -= 1.75;
          this.posPj_y += this.posicion_final_y;
          this.posPj_z += 0;
        break;

        case Link.LOOK_AT_LEFT:
          this.posPj_x += 1.75;
          this.posPj_y += this.posicion_final_y;
          this.posPj_z += 0;
        break;
      }
            //console.log("posicion de link: x:" + this.posPj_x + " , y:" + this.posPj_y +  " , z:" +  this.posPj_z)
    }

    mover_delante_o_detras(signo){
      //console.log("animacion mover delante o detras")



      var origen = {x: this.posPj_x, y:this.posPj_y, z:this.posPj_z, rotationx:this.rotation_final_x}
      var medio1 = {x: this.posPj_x, y:this.posPj_y+1, z:this.posPj_z+(0.8*signo), rotationx:(Math.PI/7)*signo}
      var medio2 = {x: this.posPj_x, y:this.posPj_y+1, z:this.posPj_z+(1.25*signo),rotationx:(Math.PI/10)*signo}
      var destino = {x: this.posPj_x, y:this.posPj_y = this.posicion_final_y, z:this.posPj_z+(1.75*signo), rotationx:this.rotation_final_x}
      
      //TODO hacer una rotation en x para que el muñeco gire hacía delante
      // y luego vuelva a su estado original de z y se quede recto

      //TODO hay que hacer con javascript que se espere hasta que salga la otra llamada


      // 1000 = 1s, 500 = 0.5s, 50 = 0.05s
      var movimiento1 = new TWEEN.Tween(origen).to(medio1,35)
      var movimiento2 = new TWEEN.Tween(medio1).to(medio2,35)
      var movimiento3 = new TWEEN.Tween(medio2).to(destino,35)

      
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


    mover_izquierda_o_derecha(signo){
      //console.log("animacion mover izquierda o derecha")

      var origen = {x: this.posPj_x, y:this.posPj_y, z:this.posPj_z, rotationz:this.rotation_final_z}
      var medio1 = {x: this.posPj_x+(0.8*signo), y:this.posPj_y+1, z:this.posPj_z, rotationz:(Math.PI/7)*signo}
      var medio2 = {x: this.posPj_x+(1.25*signo), y:this.posPj_y+1, z:this.posPj_z,rotationz:(Math.PI/10)*signo}
      var destino = {x: this.posPj_x+(1.75*signo), y:this.posPj_y = this.posicion_final_y, z:this.posPj_z, rotationz:this.rotation_final_z}
      
      //TODO hacer una rotation en x para que el muñeco gire hacía delante
      // y luego vuelva a su estado original de z y se quede recto

      //TODO hay que hacer con javascript que se espere hasta que salga la otra llamada


      // 1000 = 1s, 500 = 0.5s, 50 = 0.05s
      var movimiento1 = new TWEEN.Tween(origen).to(medio1,35)
      var movimiento2 = new TWEEN.Tween(medio1).to(medio2,35)
      var movimiento3 = new TWEEN.Tween(medio2).to(destino,35)

      
      movimiento1.easing(TWEEN.Easing.Linear.None)
      movimiento2.easing(TWEEN.Easing.Linear.None)
      movimiento3.easing(TWEEN.Easing.Linear.None)


      var that = this;

      movimiento1.onUpdate(function(){
        that.rotation.z = origen.rotationz
        that.position.x = origen.x
        that.position.y = origen.y
        that.position.z = origen.z
      })

      movimiento2.onUpdate(function(){
        that.rotation.z = medio1.rotationz
        that.position.x = medio1.x
        that.position.y = medio1.y
        that.position.z = medio1.z
      })

      movimiento3.onUpdate(function(){
        that.rotation.z = medio2.rotationz
        that.position.x = medio2.x
        that.position.y = medio2.y
        that.position.z = medio2.z
      })

      movimiento2.chain(movimiento3);
      movimiento1.chain(movimiento2);
      movimiento1.start();

    }

    //devuelve true o false si puede avanzar
    puede_avanzar(movimiento){
      var puede_avanzar = true
      var posicion_simulada = this.simular_movimiento(movimiento)

      switch(this.game_level) {
        case Link.BOSQUE_1:
          if(posicion_simulada.x == 29.75 || posicion_simulada.x == -29.75 || posicion_simulada.z == -8.75 || posicion_simulada.z == 24.5){
            puede_avanzar = false
            //console.log("BLOQUEANDO")

          }
          //console.log("comprobando si puede avanzar")
        break;

        case Link.BOSQUE_2:
          if((posicion_simulada.x == -84 && posicion_simulada.z !=0)|| (posicion_simulada.x == -28 && posicion_simulada.z !=0)  || posicion_simulada.z == -8.75 || posicion_simulada.z == 24.5){
            puede_avanzar = false
            //console.log("BLOQUEANDO")

          }
          //console.log("comprobando si puede avanzar")
        break;

        case Link.DESIERTO:
          if((posicion_simulada.x == -84 && posicion_simulada.z !=0)|| (posicion_simulada.x == -140 && posicion_simulada.z !=0)  || posicion_simulada.z == -8.75 || posicion_simulada.z == 24.5){
            puede_avanzar = false
            //console.log("BLOQUEANDO")

          }
          //console.log("comprobando si puede avanzar")
        break;


        case Link.MAZMORRA:
          if((posicion_simulada.x == -196 && posicion_simulada.z !=0)|| (posicion_simulada.x == -140 && posicion_simulada.z !=0)  || posicion_simulada.z == -8.75 || posicion_simulada.z == 24.5){
            puede_avanzar = false
            //console.log("BLOQUEANDO")

          }
          //console.log("comprobando si puede avanzar")
        break;

        case Link.BOSS:
          if((posicion_simulada.x == -196 && posicion_simulada.z !=0)|| posicion_simulada.x == -252   || posicion_simulada.z == -8.75 || posicion_simulada.z == 24.5){
            puede_avanzar = false
            //console.log("BLOQUEANDO")

          }
          //console.log("comprobando si puede avanzar")
        break;

        case Link.MAR:
          if(posicion_simulada.x == -28 || posicion_simulada.x == -84  || (posicion_simulada.z == 22.75 && posicion_simulada.x !=-64.75) || posicion_simulada.z == 54.25){
            puede_avanzar = false
            //console.log("BLOQUEANDO")

          }
          //console.log("comprobando si puede avanzar")
        break;


        case Link.SECRETA:
          if(posicion_simulada.x == 29.75 || posicion_simulada.x == -29.75 || (posicion_simulada.z == 22.75 && posicion_simulada.x !=0) || posicion_simulada.z == 54.25){
            puede_avanzar = false
            //console.log("BLOQUEANDO")

          }
          //console.log("comprobando si puede avanzar")
        break;
      }

      //compruebo si colisiona con algun objeto en mitad del nivel
      //solo compruebo cuando no ha sido bloqueado por otra circunstancia
      if(puede_avanzar){
        var pos
        if(this.comprobarColisionesObjetos(posicion_simulada))
          puede_avanzar = false
          //console.log("Bloqueando por objeto")
      }

      return puede_avanzar
    }

    //simula donde iria el PJ dada su posicion actual y una orientación
    simular_movimiento(movimiento){
      var posicion_simulada = new Vector3

      switch(movimiento) {
        case Link.LOOK_AT_UP:
          posicion_simulada.x = this.posPj_x + 0;
          posicion_simulada.y = this.posPj_y + this.posicion_final_y;
          posicion_simulada.z = this.posPj_z + 1.75;
        break;

        case Link.LOOK_AT_DOWN:
          posicion_simulada.x = this.posPj_x + 0;
          posicion_simulada.y = this.posPj_y + this.posicion_final_y;
          posicion_simulada.z = this.posPj_z - 1.75;
        break;

        case Link.LOOK_AT_RIGHT:
          posicion_simulada.x = this.posPj_x - 1.75;
          posicion_simulada.y = this.posPj_y + this.posicion_final_y;
          posicion_simulada.z = this.posPj_z + 0;
        break;

        case Link.LOOK_AT_LEFT:
          posicion_simulada.x = this.posPj_x + 1.75;
          posicion_simulada.y = this.posPj_y + this.posicion_final_y;
          posicion_simulada.z = this.posPj_z + 0;
        break;
      }
      return posicion_simulada
    }

    comprobarMovimientoColisionEnemigo(){
      var colisiona_enemigo = this.comprobarColisionesEnemigo()
      //console.log(this.orientacion)
      switch (this.orientacion){
        case Link.LOOK_AT_UP:
          if(colisiona_enemigo){
            //pequeña animacion que lo haga retrocer para atrás y le quite vida
            this.mover_delante_o_detras(Link.MOVER_DETRAS)
            this.actualizarInfoPosicion(Link.LOOK_AT_DOWN)
            this.mover_delante_o_detras(Link.MOVER_DETRAS)
            this.actualizarInfoPosicion(Link.LOOK_AT_DOWN)
            //console.log("Entra arriba")
          }
        break;
          case Link.LOOK_AT_DOWN:
            if(colisiona_enemigo){
              //pequeña animacion que lo haga retrocer para atrás y le quite vida
              this.mover_delante_o_detras(Link.MOVER_DELANTE)
              this.actualizarInfoPosicion(Link.LOOK_AT_UP)
              this.mover_delante_o_detras(Link.MOVER_DELANTE)
              this.actualizarInfoPosicion(Link.LOOK_AT_UP)
              //console.log("Entra abajo")

            }
          break;

          case Link.LOOK_AT_LEFT:
            if(colisiona_enemigo){
              //pequeña animacion que lo haga retrocer para atrás y le quite vida
              this.mover_izquierda_o_derecha(Link.MOVER_DERECHA)
              this.actualizarInfoPosicion(Link.LOOK_AT_RIGHT)
              this.mover_izquierda_o_derecha(Link.MOVER_DERECHA)
              this.actualizarInfoPosicion(Link.LOOK_AT_RIGHT)
              //console.log("Entra izquierda")

            }
          break;

          
          case Link.LOOK_AT_RIGHT:
            if(colisiona_enemigo){
              //pequeña animacion que lo haga retrocer para atrás y le quite vida
              this.mover_izquierda_o_derecha(Link.MOVER_IZQUIERDA)
              this.actualizarInfoPosicion(Link.LOOK_AT_LEFT)
              this.mover_izquierda_o_derecha(Link.MOVER_IZQUIERDA)
              this.actualizarInfoPosicion(Link.LOOK_AT_LEFT)
              //console.log("Entra derecha")
            }
            break;
      }


    }


    //TODO comprobacion de que la llave la ha conseguido, es decir el collider coincide

    //TODO collider tambien por si te quitan vida

    comprobarColisionesEnemigo(){
      //aqui se usa la posicion actual de Link
      var colision = false;
      switch(this.orientacion){

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
            if(objetos.length>0){
              colision = true;
            }

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
            
            if(objetos.length>0){
              colision = true;
            }

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
            if(objetos.length>0){
              colision = true;
            }

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
              if(objetos.length>0){
                colision = true;
              }

      }
      return colision;  
    }

  

    comprobarColisionesObjetos(position){
      ////console.log("Buscando colision objetos")
      var colision = false;
      switch(this.orientacion){
        case Link.LOOK_AT_DOWN:
          var casterJugador = new THREE.Raycaster();

          var normalized_vector = new THREE.Vector3(0, 0, -1.75)
          normalized_vector = normalized_vector.normalize()
          casterJugador.set(position,normalized_vector);
          casterJugador.far = 1.75;
          //TODO poner que dependiendo del nivel buscas unos objetos u otros
          //console.log(this.array_obstaculos)
          //tienes que comprobar que scene.children[0] su parent sea NivelBosque
          var objetos = casterJugador.intersectObjects(this.array_obstaculos,true);
          if(objetos.length>0){
            //aqui se podria llamar a otras funciones que hagan calculos con esas colisiones
            //si son enemigos y tal
            colision = true;
          }

          case Link.LOOK_AT_UP:
            var casterJugador = new THREE.Raycaster();
  
            var normalized_vector = new THREE.Vector3(0, 0, 1.75)
            normalized_vector = normalized_vector.normalize()
            casterJugador.set(position,normalized_vector);
            casterJugador.far = 1.75;
            //TODO poner que dependiendo del nivel buscas unos objetos u otros
            //console.log(this.array_obstaculos)
            //tienes que comprobar que scene.children[0] su parent sea NivelBosque
            var objetos = casterJugador.intersectObjects(this.array_obstaculos,true);
            if(objetos.length>0){
              colision = true;
            }

            case Link.LOOK_AT_LEFT:
              var casterJugador = new THREE.Raycaster();
    
              var normalized_vector = new THREE.Vector3(1.75, 0, 0)
              normalized_vector = normalized_vector.normalize()
              casterJugador.set(position,normalized_vector);
              casterJugador.far = 1.75;
              //TODO poner que dependiendo del nivel buscas unos objetos u otros
              //console.log(this.array_obstaculos)
              //tienes que comprobar que scene.children[0] su parent sea NivelBosque
              var objetos = casterJugador.intersectObjects(this.array_obstaculos,true);
              if(objetos.length>0){
                colision = true;
              }

              case Link.LOOK_AT_RIGHT:
                var casterJugador = new THREE.Raycaster();
                //TODO revisar si 1.75 o 3.5 que son dos saltos, creo que en 1.75 está bien
                var normalized_vector = new THREE.Vector3(-1.75, 0, 0)
                normalized_vector = normalized_vector.normalize()
                casterJugador.set(position,normalized_vector);
                casterJugador.far = 1.75;
                //TODO poner que dependiendo del nivel buscas unos objetos u otros
                //console.log(this.array_obstaculos)
                //tienes que comprobar que scene.children[0] su parent sea NivelBosque
                var objetos = casterJugador.intersectObjects(this.array_obstaculos,true);
                if(objetos.length>0){
                  colision = true;
                }
      }
      //console.log(colision)
      return colision;  
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

//izquierda y derecha es igual cambiando los valores + por -
Link.MOVER_IZQUIERDA = 1
Link.MOVER_DERECHA = -1

/*ESTADOS NIVEL EN QUE SE ENCUENTRA EL PJ*/
Link.BOSQUE_1 = 15
Link.BOSQUE_2 = 16
Link.MAR = 17
Link.DESIERTO = 18
Link.MAZMORRA = 19
Link.BOSS = 20
Link.SECRETA = 21




export { Link };
