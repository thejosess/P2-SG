
// Clases de la biblioteca

import * as THREE from './libs/three.module.js'
import { GUI } from './libs/dat.gui.module.js'
import { TrackballControls } from './libs/TrackballControls.js'
import Stats from './libs/Stats.js';


// Clases de mi proyecto

import {Link} from './Link.js'
import {NivelBosque} from './NivelBosque.js'
import {NivelBosque2} from './NivelBosque2.js'
import {NivelSecreto} from './NivelSecreto.js'
import {NivelMazmorra} from './NivelMazmorra.js'
import {NivelBoss} from './NivelBoss.js'
import {NivelMar} from './NivelMar.js'
import {NivelDesierto} from './NivelDesierto.js'
import {AttackSword} from './AttackSword.js'
import {Bomba} from './Bomba.js'








/// La clase fachada del modelo
/**
 * Usaremos una clase derivada de la clase Scene de Three.js para llevar el control de la escena y de todo lo que ocurre en ella.
 */
class MyScene extends THREE.Scene {
  constructor (myCanvas) {
    super();

    this.resolucion_altura = 1920
    this.resolucion_anchura = 915

    // Lo primero, crear el visualizador, pasándole el lienzo sobre el que realizar los renderizados.
    this.renderer = this.createRenderer(myCanvas);

    //creamos la informacion de fps
    this.stats = new Stats();

    this.stats.showPanel(0) ;  // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild( this.stats.dom );

    //variable que cambia a false cuando el jugador pulsa cualquier tecla por primera vez
    this.comienzo = true

    
    // Construimos los distinos elementos que tendremos en la escena
    
    // Todo elemento que se desee sea tenido en cuenta en el renderizado de la escena debe pertenecer a esta. Bien como hijo de la escena (this en esta clase) o como hijo de un elemento que ya esté en la escena.
    // Tras crear cada elemento se añadirá a la escena con   this.add(variable)
    this.createLights ();
    
    // Tendremos una cámara con un control de movimiento con el ratón
    this.createCamera ();

    //el nivel en el que se comienza es en el de bosque 1
    this.game_level = MyScene.MAR

    //estado del juego
    this.estado_juego = MyScene.START
    this.texto
    this.cuadro
    this.crearNiveles();
    this.crearPersonajes();

  }


  crearPersonajes(){
    this.link = new Link(this);
    this.add (this.link);
    //link necesita tener iniciado el array de obstaculos segun el primer nivel
    this.link.cargarObstaculos(this.bosque.devolverObstaculos())
    this.link.cargarEnemigos(this.bosque.devolverEnemigos())
    this.attack_sword = new AttackSword(this.link);
    this.add(this.attack_sword);
    this.attack_sword.cargarObstaculos(this.bosque.devolverObstaculos())
    this.attack_sword.cargarEnemigos(this.bosque.devolverEnemigos())
  }
  
  createCamera () {
    // Para crear una cámara le indicamos
    //   El ángulo del campo de visión en grados sexagesimales
    //   La razón de aspecto ancho/alto
    //   Los planos de recorte cercano y lejano
    //this.camera.position.z = 24.75
    var look = new THREE.Vector3 (101,20,29.75);

    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    this.camera.position.set (0, 35,-5);
    // Y hacia dónde mira
    var look = new THREE.Vector3 (0,20,0);
    // ,Y hacia dónde mira
    //var look = new THREE.Vector3 (0,0,0);
    this.camera.lookAt(look);
    this.add (this.camera);


  }
  
  createLights () {
    // Se crea una luz ambiental, evita que se vean complentamente negras las zonas donde no incide de manera directa una fuente de luz
    // La luz ambiental solo tiene un color y una intensidad
    // Se declara como   var   y va a ser una variable local a este método
    //    se hace así puesto que no va a ser accedida desde otros métodos
    var ambientLight = new THREE.AmbientLight(0xccddee, 0.35);
    // La añadimos a la escena
    this.add (ambientLight);
    
    // Se crea una luz focal que va a ser la luz principal de la escena
    // La luz focal, además tiene una posición, y un punto de mira
    // Si no se le da punto de mira, apuntará al (0,0,0) en coordenadas del mundo
    // En este caso se declara como   this.atributo   para que sea un atributo accesible desde otros métodos.
    this.spotLight = new THREE.SpotLight( 0xffffff, 1 );
    this.spotLight.position.set( 60, 60, 40 );
    this.add (this.spotLight);
  }
  
  createRenderer (myCanvas) {
    // Se recibe el lienzo sobre el que se van a hacer los renderizados. Un div definido en el html.
    
    // Se instancia un Renderer   WebGL
    var renderer = new THREE.WebGLRenderer();
    
    // Se establece un color de fondo en las imágenes que genera el render
    renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);
    
    // Se establece el tamaño, se aprovecha la totalidad de la ventana del navegador
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // La visualización se muestra en el lienzo recibido
    $(myCanvas).append(renderer.domElement);
    
    return renderer;  
  }
  
  getCamera () {
    // En principio se devuelve la única cámara que tenemos
    // Si hubiera varias cámaras, este método decidiría qué cámara devuelve cada vez que es consultado
    return this.camera;
  }
  
  setCameraAspect (ratio) {
    // Cada vez que el usuario modifica el tamaño de la ventana desde el gestor de ventanas de
    // su sistema operativo hay que actualizar el ratio de aspecto de la cámara
    this.camera.aspect = ratio;
    // Y si se cambia ese dato hay que actualizar la matriz de proyección de la cámara
    this.camera.updateProjectionMatrix();
  }
  
  onWindowResize () {
    // Este método es llamado cada vez que el usuario modifica el tamapo de la ventana de la aplicación
    // Hay que actualizar el ratio de aspecto de la cámara
    this.setCameraAspect (window.innerWidth / window.innerHeight);
    
    // Y también el tamaño del renderizador
    this.renderer.setSize (window.innerWidth, window.innerHeight);

  }

  quitarBomba() {
    this.remove(this.bomba)
  }

  usarBomba(position) {
    this.bomba = new Bomba()
    this.bomba.position.x = position.x
    this.bomba.position.y = position.y + 0.5
    this.bomba.position.z = position.z

    this.add(this.bomba)
    this.link.bombas -= 1
    this.bomba.explotando=true

    switch(this.link.game_level) {

      case MyScene.BOSQUE_1:
        if((this.bomba.position.x <= 5.25) && (this.bomba.position.x >= -8.75) && 
        ((this.bomba.position.z == 19.25) || (this.bomba.position.z == 17.5))) {
          for(var i = 0; i < this.link.array_obstaculos.length; i++) {
            if(this.link.array_obstaculos[i]['name'] == "roca") {
              this.link.array_obstaculos[i].visible = false
              this.link.array_obstaculos[i+1].visible = false
              this.link.array_obstaculos[i+2].visible = false
              this.link.array_obstaculos[i+3].visible = false
              this.link.array_obstaculos.splice(i,4)
            }
          }
        }
        
      break;

      case MyScene.BOSQUE_2:
      break;

      case MyScene.DESIERTO:
      break;

      case MyScene.MAZMORRA:
      break;

      case MyScene.BOSS:
      break;

      case MyScene.MAR:
      break;

      case MyScene.SECRETA:
      break;
    }


    // create an AudioListener and add it to the camera
    const listener = new THREE.AudioListener();
    this.camera.add( listener );

    // create a global audio source
    const sound = new THREE.Audio( listener );

    // load a sound and set it as the Audio object's buffer
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load( 'sounds/explosion.ogg', function( buffer ) {
      sound.setBuffer( buffer );
      sound.setLoop( false );
      sound.setVolume( 0.5 );
      sound.play();
    });

}

  changeCamera(game_level){
    //Metodo para cambiar la camara de posicion
    //this.camera.
    switch(game_level){
      case MyScene.BOSQUE_1:
        this.camera.position.set (0, this.camera.position.y,-5);
        //this.camera.position.x = 0
        var look = new THREE.Vector3 (0,20,0);
        this.camera.lookAt(look);

        this.estado_juego = MyScene.START
      break;

      case MyScene.BOSQUE_2:
        this.camera.position.set (-56, this.camera.position.y,-5);
        //this.camera.position.x = -56
        var look = new THREE.Vector3 (-56,20,0);
        this.camera.lookAt(look);

        this.estado_juego = MyScene.START
      break;

      case MyScene.DESIERTO:
        this.camera.position.set (-110.25, this.camera.position.y,-5);
        //this.camera.position.x = -56
        var look = new THREE.Vector3 (-110.25,20,0);
        this.camera.lookAt(look);

        this.estado_juego = MyScene.START
      break;

      case MyScene.MAZMORRA:
        this.camera.position.set (-166.25, this.camera.position.y,-5);
        //this.camera.position.x = -56
        var look = new THREE.Vector3 (-166.25,20,0);
        this.camera.lookAt(look);

        this.estado_juego = MyScene.START
      break;

      case MyScene.BOSS:
        this.camera.position.set (-224, this.camera.position.y,-5);
        //this.camera.position.x = -56
        var look = new THREE.Vector3 (-224,20,0);
        this.camera.lookAt(look);

        this.estado_juego = MyScene.START
      break;

      case MyScene.MAR:
        this.camera.position.set (-56, this.camera.position.y,24.75);
        //this.camera.position.z = 24.75
        var look = new THREE.Vector3 (-56,20,29.75);
        this.camera.lookAt(look);

        this.estado_juego = MyScene.START
      break;

      case MyScene.SECRETA:
        this.camera.position.set (this.camera.position.x, this.camera.position.y,24.75);
        //this.camera.position.z = 24.75
        var look = new THREE.Vector3 (0,20,29.75);
        this.camera.lookAt(look);

        this.estado_juego = MyScene.START
      break;

    }
    
  }



  onKeyPressed(event){
    var key = event.which || event.keyCode
    var key_int = event.which || event.keyCode


    //se admite tanto w como W, por eso se hace lowerCase de la key

    key = String.fromCharCode(key).toLowerCase()

    if(this.comienzo){

      // create an AudioListener and add it to the camera
      const listener = new THREE.AudioListener();
      this.add( listener );

      // create a global audio source
      const sound = new THREE.Audio( listener );

      // load a sound and set it as the Audio object's buffer
      const audioLoader = new THREE.AudioLoader();
      audioLoader.load( 'sounds/zelda.mp3', function( buffer ) {
        sound.setBuffer( buffer );
        sound.setLoop( true );
        sound.setVolume( 0.5 );
        sound.play();
      });

      this.comienzo = false
      this.sound = sound
    }


    if(this.estado_juego == MyScene.DEAD && key_int == 32){
      window.location.reload()
    }

    if(this.estado_juego == MyScene.TEXTO && key_int == 13) {
      document.getElementById("message").style.display = "none";
      this.estado_juego = MyScene.START
    }

    if(this.estado_juego != MyScene.CHANGE_CAMERA && this.estado_juego != MyScene.DEAD && this.estado_juego != MyScene.TEXTO) {
      if (key == 'w' ){
        if(this.link.moverLink(MyScene.LOOK_AT_UP)){
          this.link.actualizarInfoPosicion(MyScene.LOOK_AT_UP)
        }
        this.link.comprobarMovimientoColisionEnemigo()
      }

      if (key == 'a'){
        if(this.link.moverLink(MyScene.LOOK_AT_LEFT)){
          this.link.actualizarInfoPosicion(MyScene.LOOK_AT_LEFT)
        }
        this.link.comprobarMovimientoColisionEnemigo()
      }

      if (key == 'd'){
        if(this.link.moverLink(MyScene.LOOK_AT_RIGHT)){
          this.link.actualizarInfoPosicion(MyScene.LOOK_AT_RIGHT)
        }
        this.link.comprobarMovimientoColisionEnemigo()
      }

      if (key == 's'){
        if(this.link.moverLink(MyScene.LOOK_AT_DOWN)){
          this.link.actualizarInfoPosicion(MyScene.LOOK_AT_DOWN)
        }
        this.link.comprobarMovimientoColisionEnemigo()
      }
      if (key_int == 32){
        this.attack_sword.lanzarEspada(this.link.orientacion)
      }
      
      if(this.link.bombas > 0) {
        if (key == 'e'){
          this.usarBomba(this.link.position)
        }
      }
      
      if(this.link.espada_roja){
        this.attack_sword.cambiarAEspadaRoja()
        this.link.espada_roja = false
      }
    }

    if(this.estado_juego != MyScene.DEAD){
      this.comprobarCambioNivel()
    }



  }

  comprobarCambioNivel(){
    //comprobar si hay cambio de estado de nivel
    //this.link.comprobar_cambio_nivel()
    //cambia el nivel tambien en Myscene
    //si cambia de nivel, hay que hacerle el cambio de la camara
    switch (this.link.game_level){
      case MyScene.BOSQUE_1:
        if(this.link.posPj_x == -28 && this.link.posPj_y == 0 && (this.link.posPj_z == 0 ||
          this.link.posPj_z == 1.75 || this.link.posPj_z == 3.5 || this.link.posPj_z == 5.25)){
          this.estado_juego = MyScene.CHANGE_CAMERA
          this.link.game_level = MyScene.BOSQUE_2
          this.game_level = MyScene.BOSQUE_2
          this.changeCamera(MyScene.BOSQUE_2)

          //cargas los obstaculos del mundo que se cambia
          this.link.cargarObstaculos(this.bosque2.devolverObstaculos())
          this.link.cargarEnemigos(this.bosque2.devolverEnemigos())

          this.attack_sword.cargarObstaculos(this.bosque2.devolverObstaculos())
          this.attack_sword.cargarEnemigos(this.bosque2.devolverEnemigos())
        }

        if((this.link.posPj_x == 0 ||this.link.posPj_x == -1.75 || this.link.posPj_x == -3.5 || this.link.posPj_x == -5.25 || this.link.posPj_x == 1.75)
        && this.link.posPj_y == 0 && this.link.posPj_z == 22.75){
          this.estado_juego = MyScene.CHANGE_CAMERA
          this.link.game_level = MyScene.SECRETA
          this.game_level =  MyScene.SECRETA
          this.changeCamera( MyScene.SECRETA)

          this.link.cargarObstaculos(this.secreto.devolverObstaculos())
          this.attack_sword.cargarObstaculos(this.secreto.devolverObstaculos())
        }        
        break;

      case MyScene.BOSQUE_2:
        if(this.link.posPj_x == -28 && this.link.posPj_y == 0 && (this.link.posPj_z == 0 ||
          this.link.posPj_z == 1.75 || this.link.posPj_z == 3.5 || this.link.posPj_z == 5.25)){
            this.estado_juego = MyScene.CHANGE_CAMERA
            this.link.game_level = MyScene.BOSQUE_1
            this.game_level = MyScene.BOSQUE_1
            this.changeCamera(MyScene.BOSQUE_1)

            this.link.cargarObstaculos(this.bosque.devolverObstaculos())
            this.link.cargarEnemigos(this.bosque.devolverEnemigos())
            
            this.attack_sword.cargarObstaculos(this.bosque.devolverObstaculos())
            this.attack_sword.cargarEnemigos(this.bosque.devolverEnemigos())
        }

        if(this.link.posPj_x == -82.25 && this.link.posPj_y == 0 && this.link.posPj_z == 0){
          this.estado_juego = MyScene.CHANGE_CAMERA
          this.link.game_level = MyScene.DESIERTO
          this.game_level = MyScene.DESIERTO
          this.changeCamera(MyScene.DESIERTO)

          this.link.cargarObstaculos(this.desierto.devolverObstaculos())
          this.link.cargarEnemigos(this.desierto.devolverEnemigos())

          this.attack_sword.cargarObstaculos(this.desierto.devolverObstaculos())
          this.attack_sword.cargarEnemigos(this.desierto.devolverEnemigos())
        }

        if(this.link.posPj_x == -64.75 && this.link.posPj_y == 0 && this.link.posPj_z == 22.75){
          this.estado_juego = MyScene.CHANGE_CAMERA
          this.link.game_level = MyScene.MAR
          this.game_level =  MyScene.MAR
          this.changeCamera( MyScene.MAR)

          this.link.cargarObstaculos(this.mar.devolverObstaculos())
          this.link.cargarEnemigos(this.mar.devolverEnemigos())

          this.attack_sword.cargarObstaculos(this.mar.devolverObstaculos())
          this.attack_sword.cargarEnemigos(this.mar.devolverEnemigos())
        } 
      break;

      case MyScene.MAR:
        if(this.link.posPj_x == -64.75 && this.link.posPj_y == 0 && this.link.posPj_z == 22.75){
          this.estado_juego = MyScene.CHANGE_CAMERA
          this.link.game_level = MyScene.BOSQUE_2
          this.game_level =  MyScene.BOSQUE_2
          this.changeCamera( MyScene.BOSQUE_2)

          this.link.cargarObstaculos(this.bosque2.devolverObstaculos())
          this.link.cargarEnemigos(this.bosque2.devolverEnemigos())

          this.attack_sword.cargarObstaculos(this.bosque2.devolverObstaculos())
          this.attack_sword.cargarEnemigos(this.bosque2.devolverEnemigos())

        } 
      break;

      case MyScene.DESIERTO:
        if(this.link.posPj_x == -82.25 && this.link.posPj_y == 0 && this.link.posPj_z == 0){
          this.estado_juego = MyScene.CHANGE_CAMERA
          this.link.game_level = MyScene.BOSQUE_2
          this.game_level = MyScene.BOSQUE_2
          this.changeCamera(MyScene.BOSQUE_2)

          this.link.cargarObstaculos(this.bosque2.devolverObstaculos())
          this.link.cargarEnemigos(this.bosque2.devolverEnemigos())

          this.attack_sword.cargarObstaculos(this.bosque2.devolverObstaculos())
          this.attack_sword.cargarEnemigos(this.bosque2.devolverEnemigos())

        }

        if(this.link.posPj_x == -138.25 && this.link.posPj_y == 0 && this.link.posPj_z == 0){
          this.estado_juego = MyScene.CHANGE_CAMERA
          this.link.game_level = MyScene.MAZMORRA
          this.game_level = MyScene.MAZMORRA
          this.changeCamera(MyScene.MAZMORRA)

          this.link.cargarObstaculos(this.mazmorra.devolverObstaculos())
          this.link.cargarEnemigos(this.mazmorra.devolverEnemigos())

          this.attack_sword.cargarObstaculos(this.mazmorra.devolverObstaculos())
          this.attack_sword.cargarEnemigos(this.mazmorra.devolverEnemigos())
        } 

       break;
      

       case MyScene.MAZMORRA:
        if(this.link.posPj_x == -138.25 && this.link.posPj_y == 0 && this.link.posPj_z == 0){
          this.estado_juego = MyScene.CHANGE_CAMERA
          this.link.game_level = MyScene.DESIERTO
          this.game_level = MyScene.DESIERTO
          this.changeCamera(MyScene.DESIERTO)

          this.link.cargarObstaculos(this.desierto.devolverObstaculos())
          this.link.cargarEnemigos(this.desierto.devolverEnemigos())

          this.attack_sword.cargarObstaculos(this.desierto.devolverObstaculos())
          this.attack_sword.cargarEnemigos(this.desierto.devolverEnemigos())
        }
        
        if(this.link.posPj_x == -196 && this.link.posPj_y == 0 && this.link.posPj_z == 0){
          this.estado_juego = MyScene.CHANGE_CAMERA
          this.link.game_level = MyScene.BOSS
          this.game_level = MyScene.BOSS
          this.changeCamera(MyScene.BOSS)

          this.link.cargarObstaculos(this.boss.devolverObstaculos())
          this.link.cargarEnemigos(this.boss.devolverEnemigos())

          this.attack_sword.cargarObstaculos(this.boss.devolverObstaculos())
          this.attack_sword.cargarEnemigos(this.boss.devolverEnemigos())
        } 
        
      break;

      case MyScene.BOSS:
        if(this.link.posPj_x == -196 && this.link.posPj_y == 0 && this.link.posPj_z == 0){
          this.estado_juego = MyScene.CHANGE_CAMERA
          this.link.game_level = MyScene.MAZMORRA
          this.game_level = MyScene.MAZMORRA
          this.changeCamera(MyScene.MAZMORRA)

          this.link.cargarObstaculos(this.mazmorra.devolverObstaculos())
          this.link.cargarEnemigos(this.mazmorra.devolverEnemigos())

          this.attack_sword.cargarObstaculos(this.mazmorra.devolverObstaculos())
          this.attack_sword.cargarEnemigos(this.mazmorra.devolverEnemigos())
        }
      break;

      case MyScene.SECRETA:
        //solo puedes acceder a esta posicion se rompes las rocas y te acercas despues

        if((this.link.posPj_x == 0 ||this.link.posPj_x == -1.75 || this.link.posPj_x == -3.5 || this.link.posPj_x == -5.25 || this.link.posPj_x == 1.75)
        && this.link.posPj_y == 0 && this.link.posPj_z == 22.75){        
          this.estado_juego = MyScene.CHANGE_CAMERA
          this.link.game_level = MyScene.BOSQUE_1
          this.game_level = MyScene.BOSQUE_1
          this.changeCamera(MyScene.BOSQUE_1)

          this.link.cargarObstaculos(this.bosque.devolverObstaculos())
          this.link.cargarEnemigos(this.bosque.devolverEnemigos())

          this.attack_sword.cargarObstaculos(this.bosque.devolverObstaculos())
          this.attack_sword.cargarEnemigos(this.bosque.devolverEnemigos())
        }
      break; 
      
    }
  }

  bombaCogida() {
    this.estado_juego = MyScene.TEXTO
    document.getElementById("message").style.display = "block";
    this.texto = document.getElementById("message").innerHTML = "<p>Nuevo Objeto: Bomba </p><p><p><p><p>Pulsa la 'e' para usar la bomba y destruir un muro de rocas </p><p><p><p><p>Pulsa 'Enter' para continuar</p>"
  }

  espadaCogida() {
    this.estado_juego = MyScene.TEXTO
    this.cuadro = document.getElementById("message").style.display = "block";
    this.texto = document.getElementById("message").innerHTML = "<p>Nuevo Objeto: Espada </p><p><p><p><p>El daño de tu espada a aumentado x2 </p><p><p><p><p>Pulsa 'Enter' para continuar</p>"
  }

  terminarJuego(){
    this.estado_juego = MyScene.DEAD

    document.getElementById("message").style.display = "block";
    document.getElementById("message").innerHTML = "<p>Has muerto :(</p><p><p><p><p>Pulsa espacio para reinicar</p>"
    this.sound.pause()
  }

  terminarJuegoGanar(){
    this.estado_juego = MyScene.WIN

    document.getElementById("message").style.display = "block";
    document.getElementById("message").innerHTML = "<p>Has GANADO :)</p><p><p><p><p>Pulsa espacio para reinicar</p>"
    this.sound.pause()
  }
 
  update () {

    this.stats.begin();
        
    var fin_juego = this.link.comprobarFinJuego()
    if(fin_juego){
      this.terminarJuego();
    }

    if(this.boss.samu.samu.vida == 0){
      this.terminarJuegoGanar();
    }
    
    if(this.estado_juego != MyScene.DEAD){
      // Se actualiza el resto del modelo
      this.link.update();
      this.attack_sword.update();
      this.bosque.update();
      this.bosque2.update()
      this.desierto.update();
      this.mar.update();
      this.boss.update();
    }
    // Le decimos al renderizador "visualiza la escena que te indico usando la cámara que te estoy pasando"
    this.renderer.render (this, this.getCamera());

    // Este método debe ser llamado cada vez que queramos visualizar la escena de nuevo.
    // Literalmente le decimos al navegador: "La próxima vez que haya que refrescar la pantalla, llama al método que te indico".
    // Si no existiera esta línea,  update()  se ejecutaría solo la primera vez.
    requestAnimationFrame(() => this.update())

    if(this.bomba) {
      if(this.bomba.explotando) {
        this.bomba.update()
      }
    }
    

    this.stats.end();

  }


  crearNiveles(){
    this.resolucion_altura
    this.bosque = new NivelBosque(this.resolucion_altura, this.resolucion_anchura)
    this.add(this.bosque)

    this.bosque2 = new NivelBosque2(this.resolucion_altura, this.resolucion_anchura)
    this.add(this.bosque2)

    this.desierto = new NivelDesierto()
    this.add(this.desierto)

    this.secreto = new NivelSecreto(this.resolucion_altura, this.resolucion_anchura)
    this.add(this.secreto)

    this.mazmorra = new NivelMazmorra(this.resolucion_altura, this.resolucion_anchura)
    this.add(this.mazmorra)

    this.boss = new NivelBoss(this.resolucion_altura, this.resolucion_anchura)
    this.add(this.boss)

    this.mar = new NivelMar(this.resolucion_altura, this.resolucion_anchura)
    this.add(this.mar)
    
  }


}

  /* ESTADOS DEL JUEGO */
  MyScene.NO_START = 0;
  MyScene.START = 1;
  MyScene.DEAD = 2;
  MyScene.CHANGE_CAMERA = 3;
  MyScene.WIN = 4;
  MyScene.TEXTO = 5;



  /* ESTADOS ORIENTACION MUÑECO */
  MyScene.LOOK_AT_UP = 5;
  MyScene.LOOK_AT_DOWN = 6;
  MyScene.LOOK_AT_RIGHT = 7;
  MyScene.LOOK_AT_LEFT = 8;


  /*ESTADOS NIVEL EN QUE SE ENCUENTRA EL PJ*/
  MyScene.BOSQUE_1 = 15
  MyScene.BOSQUE_2 = 16
  MyScene.MAR = 17
  MyScene.DESIERTO = 18
  MyScene.MAZMORRA = 19
  MyScene.BOSS = 20
  MyScene.SECRETA = 21


/// La función   main
$(function () {
  
  // Se instancia la escena pasándole el  div  que se ha creado en el html para visualizar
  var scene = new MyScene("#WebGL-output");

  // Se añaden los listener de la aplicación. En este caso, el que va a comprobar cuándo se modifica el tamaño de la ventana de la aplicación.
  window.addEventListener ("resize", () => scene.onWindowResize());

  // Se añaden los listener de la aplicación. En este caso, el que va a comprobar cuándo se pulsa una tecla
  window.addEventListener ("keypress", (event) => scene.onKeyPressed(event));

  scene.update();

});
