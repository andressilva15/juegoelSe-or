// Objeto jugador con sus atributos y metodos
function jugador(nombre){
  this.nombre = nombre;
  this.pv = 200;
  this.sp = 100;

  // Funcion estado del jugador
  this.estado = function(){
    console.log(this.nombre, " pv =", this.pv, " sp =", this.sp);
  };

  this.tirarFlecha = function(objetivo){
    if (this.sp >= 40) { // si la fuerza es mayor o igual a 40 dispara
      console.log(this.nombre + " le disparó a " + objetivo.nombre, "     -", 40, "de fuerza a", this.nombre);
      var daño = Math.round(Math.random() * 100); // calculo el daño aleatoriamente
      objetivo.pv -= daño; // resto el daño al objetivo
      console.log(daño, "de daño a", objetivo.nombre);
      if (objetivo.pv <= 0){ // si el objetivo murio, el juego termina
        objetivo.pv = 0;
        console.error(objetivo.nombre, " pv =", objetivo.pv, " sp =", objetivo.sp);
        console.error(objetivo.nombre + " murio");
      }
      else { // el objetivo no murio
        if (objetivo.sp + 20 <= 100) { // tengo que restituir la fuerza del objetivo
          console.log("+", 20, "de fuerza a", objetivo.nombre);
          objetivo.sp += 20;
        }
        else {
          objetivo.sp = 100;
        }
        console.error(objetivo.nombre, " pv =", objetivo.pv, " sp =", objetivo.sp);
      }
      this.sp -= 40; // resto fuerza al que disparó
    }
    else { // si no posee fuerza para disparar
      console.log(this.nombre + " le disparó a " + objetivo.nombre);
      console.error("No hay fuerza suficiente");
      console.log("+", 10, "de fuerza a", this.nombre);
      this.sp += 10; // restituyo fuerza al disparador por perder el turno
      objetivo.estado();
    }
    this.estado();
    console.log("---------------------------------------------------------");
    console.log("");
  };
};


// funcion de espera 3 segundos
function esperar() {
objetivo = (new Date()).getTime() + 1000 * Math.abs(3);
while ( (new Date()).getTime() < objetivo );
};


//  administrar los turnos
function turno(j1, j2, j3){
  j1.tirarFlecha(j2);
  if (j2.pv == 0) { // si murio false
    return false;
  }
  else {
    return true; //si no murio true
  }
  j2.tirarFlecha(j3);
  if (j3.pv == 0) {
        return false;
  }
  else {
    return true;
  }
  j3.tirarFlecha(j1);
  if (j1.pv == 0) {
    return false;
  }
  else {
    return true;
  }
};


// funcion principal a la que se le pasan los tres jugadores
function jugar(j1, j2, j3){
  console.log("Empieza el juego");
  console.log(" ");
  var jugar = true;
  while (jugar) {
    var random = Math.round(Math.random() * 100); //  numero aleatorio que decide a que jugador le toca disparar
    if (random >= 66) {
      jugar = turno(j1,j2,j3);
      esperar();
    }
    else { if(random>33&& random<66) {
      jugar = turno(j2,j3,j1);
      esperar(); }
      else {if (random<=33){
        jugar = turno(j3,j1,j2);
        esperar();
      }
      }
    }
  }
  console.log("Fin del juego");
};


// creo los tres jugadores
var aragorn = new jugador("Aragorn");
var sauron = new jugador("Sauron");
var legolas = new jugador("Legolas");

// muestro su informacion
console.log(aragorn);
console.log(sauron);
console.log(legolas);

// inicio del juego
jugar(aragorn, sauron, legolas);
