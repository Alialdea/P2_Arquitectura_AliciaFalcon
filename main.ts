//********SELECCION JUGADORES*********** */
const nJugadores=prompt("Escoge el numero de jugadores")
    
const valoresAceptados = /^[1-9]+$/;//fuente:https://altruistas.org/determinar-si-una-cadena-alfanumerica-es-un-numero-en-javascript/
if (nJugadores?.match(valoresAceptados)){
  const nRJugadores=parseInt(nJugadores)
  const jugadores:string[]=[]
  let i=1
  //pedimos los nombres de tantos jugadores como se haya indicado que se querian
  while(i<=nRJugadores){
    const nombre=prompt("Introduce el nombre del jugador "+i)
    if(nombre!=null)jugadores.push(nombre)
    i++
  }
  //creamos un array que se encargara de contar los aciertos de cada jugador
  let f=0
  let aciertos:number[]=[]
  while(f<nRJugadores){
    aciertos.push(0)
    f++
  }

 //**********PREGUNTAS*********** */
  const valoresPreguntasAceptados = /^[1-50]+$/;
  //repetimos proceso para las preguntas
  const nPregunas=prompt("Introduce el numero de preguntas que quieres por jugador")
  if(nPregunas?.match(valoresPreguntasAceptados)){
    const nRPreguntas=parseInt(nPregunas)
    
    //creamos una funcion recursiva que se encarga de preguntar a cada jugador el numero de preguntas establecido
    const Preguntar=(jugador:number, pregunta:number)=>{
      if(pregunta<nRPreguntas){
        fetch("https://opentdb.com/api.php?amount=1&type=multiple")
        .then((res)=>{
      
        res.json().then(res=>(res.results
        .forEach((e:any)=>{
      
        console.log(`Pregunta para ${jugadores[jugador]}`)
        console.log(e.question)
        
        //hacemos esto para introducir la respuesta correcta de manera aleatoria y que no este siempre en el mismo sitio
        const arr=[]
        e.incorrect_answers.forEach((n:any)=>arr.push(n))
        arr.push(e.correct_answer)
        arr.sort(()=>Math.random()-0.5) //fuente. https://stackoverflow.com/questions/42661936/whats-the-difference-between-math-random-0-5-and-math-random-0-5
        //las mostramos por pantalla
        arr.forEach((p:any)=>console.log(p))

        const respuesta=prompt("Escribe la respuesta que creas correcta")
        //comprobamos si el usuario ha respondido correctamente o no y en base a eso sumaremos a nuestro array de aciertos 
        if (respuesta==e.correct_answer){
          console.log("Bien hecho crack")
          aciertos[jugador]=aciertos[jugador]+1
        } 
        else console.log("MAl inUtil")
        
        //volvemos a llamar a la misma funcion para el mismo jugador pero una pregunta mas
        Preguntar(jugador,pregunta+1)
        })))
        })
      //cuando ya se hayan hecho todas las preguntas a un jugador llegamos a este else
      }else{
        //si tenemos mas jugadores rellamamos a ka funcion para el jugador siguiente en la pregunta 0
        //si no tenemos llamamos a nuestra funcion resultado que nos dira el resultado del juegp
        if(jugador<nRJugadores-1) Preguntar(jugador+1,0)
        else Resultado()
      }
  }
  //funcion previamente mencionada que simplemente te dice quien ha ganado
  const Resultado=()=>{
    let g=0
    let mayor=0
    let posicion:number[]=[]
    while (g < aciertos.length) {
      if (mayor < aciertos[g]) {
        mayor = aciertos[g]
        posicion = [g]
      }else if(mayor===aciertos[g]){
        posicion.push(g)
      }
      g++
    }
    if(posicion.length===1){
      console.log("El ganador es ",jugadores[posicion[0]])
    }else{
      console.log("Ha habido empate")
      posicion.forEach((p:any)=>{
        console.log(jugadores[posicion[p]], " ")
      })
    }
  }

  //llamamos a la funcion para que pregunte
Preguntar(0,0)

//esto son excepciones por si el dato de cuantos jugadores o cuantas preguntas no era un numero 
//o no estaba dentro del rango deseado

}else{alert ("El dato introducido no es valido")}
   
}else{alert ("El dato introducido no es valido")}

//******************************************************************* */