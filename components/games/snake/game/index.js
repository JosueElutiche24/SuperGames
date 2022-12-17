class Game{
    static ConectorInit; // comunicador con el inicializador
    context; // contexto del canvas
    canvasLong = {width: 375, height:375}; // longitud del canvas, no lo pudimos obtener del orginal
    count = 0; // cuenta las manzanas comidas

    HeadSnake = new Image(); // imagen de la cabeza
    TailSnake = new Image(); // imagen del cuerpo
    Food = new Image(); // imagen de la hamburguesa
    GOImage = new Image();
    pressStart = new Image();
    soundEating = new this.sound("/SnakeSources/PouEating.mp3"); // sonido de comer
    soundScream = new this.sound("/SnakeSources/GOSound.mp3"); // sponido de morir

    Snake = [] ; // arreglo de cada posicion del cuerpo de la anaconda
    Apples = null; // posicion de la manzana en el mapa

    director = null; // marca el timing
    direction = 2; // direccion en que se mueve la anacondda
    sizeSquare = 15; // tamaño de nuestras cajas
    interval = 250;
    Over = false; // perdiste?

    constructor(canvasContext, ConectorInit){
        Game.ConectorInit = ConectorInit;

        this.context = canvasContext;
        this.HeadSnake.src = "/SnakeSources/HeadLeft.png";
        this.TailSnake.src = "/SnakeSources/BodyMin.png";
        this.Food.src = "/SnakeSources/Food.png"
        this.GOImage.src = "/SnakeSources/gameOver.jpg"
        this.pressStart.src = "/SnakeSources/pressStart.jpg"
    }

    /////////   Metodos Principales
    
    Init(){
        let head = {x:1, y:12, x_old:1, y_old:12};
        this.Snake.push(head);

        document.addEventListener("keypress", (e)=>{
            switch (e.keyCode) {
                case 119:
                    if(this.direction !== 3)
                    this.direction = 1;
                    break;
                case 100:
                    if(this.direction !== 4)
                    this.direction = 2;
                    break;
                case 115:
                    if(this.direction !== 1)
                    this.direction = 3;
                    break;
                case 97:
                    if(this.direction !== 2)
                    this.direction = 4;
                    break;

                default:
                    break;
            }
        })
        this.PrintState("Presione *comenzar*")
        this.context.drawImage(this.pressStart, 0, 0);
    } 

    //ejecutar esta funcion para que comienze el juego
    IntervalZone(){
        this.PrintState("")
        this.director = setInterval(() => {
            if(this.Over == false){
                this.Next();
                this.Show();
            }else{
                clearInterval(this.director)
                this.context.clearRect(0,0,this.canvasLong.width, this.canvasLong.height);
                this.context.drawImage( this.GOImage, 0, 0);
                this.soundScream.play();
                Game.ConectorInit(this.count,"over")
            }
        }, this.interval); 
    }

    Next(){        
        // guardamos a cada cabeza el registro de su anterior posicion
        this.Snake.map((snakeItem)=>{
            snakeItem.x_old = snakeItem.x
            snakeItem.y_old = snakeItem.y
        })

        // movemos la cabeza dependiedo de la direccion
        switch (this.direction) {
            case 1:
                this.Snake[0].y--
                break;
            case 2:
                this.Snake[0].x++
                 break;
            case 3:
                this.Snake[0].y++
                break;
            case 4:
                this.Snake[0].x--
                break;

            default:
                break;
        }

        // movemos los cuerpos con referencia al oldPosition de su anterior
        this.Snake.map((item, index, arraySnake)=>{
            this.Rules();
            if(index == 0)return
            item.x = arraySnake[index-1].x_old;
            item.y = arraySnake[index-1].y_old;
        })

        // verificamos si come fruta
        if(this.Apples !== null){
            this.isEating();
        }        


    }

    Show(){
        // limpiamos la pantalla
        this.context.clearRect(0,0,this.canvasLong.width, this.canvasLong.height);

        // renderizamos la manzana
        if(this.Apples !== null){
            this.context.drawImage( this.Food, this.Apples.x * this.sizeSquare, this.Apples.y * this.sizeSquare)
            // this.context.fillStyle="red";
            // this.context.fillRect(apple.x * this.sizeSquare, apple.y * this.sizeSquare, this.sizeSquare, this.sizeSquare);
        }else{
                this.putFood();
        }

        // renderizamos cada item de la snake
        this.Snake.map((square)=>{
            this.context.drawImage( this.TailSnake, square.x * this.sizeSquare, square.y * this.sizeSquare)
        })

    }

    Rules(){

        // validamos que ninguna piesa este sobre otra
            for (let j = 0; j < this.Snake.length; j++) {
                for (let i = 0; i < this.Snake.length; i++) {
                    if(j !== i){
                        if(this.Snake[j].x == this.Snake[i].x && this.Snake[j].y == this.Snake[i].y){
                            this.Over = true;
                        }
                    }     
                }
            }

            // validar si salimos de la pantalla
            if(this.Snake[0].x < 0 || this.Snake[0].x >= (this.canvasLong.width/this.sizeSquare) || this.Snake[0].y < 0 || this.Snake[0].y >= (this.canvasLong.height/this.sizeSquare)){
                this.Over = true;
            }
    }

    ////////// Metodos complementarios

    putFood(){
            let x = Math.floor(Math.random()*25)
            let y = Math.floor(Math.random()*25)
            this.Apples ={x:x, y:y};
    }
    isEating(){
        if(this.Snake[0].x == this.Apples.x && this.Snake[0].y == this.Apples.y){
            this.Apples = null;
            this.count++
            this.soundEating.play();

            let newSquare = {x: this.Snake[this.Snake.length -1].x_old ,y: this.Snake[this.Snake.length -1].y_old};
            this.Snake.push(newSquare);
            this.PrintPoints();
        }
    }

    //    Helpers

    PrintState(text){
        Game.ConectorInit({value:text, action:"State"},"setTexts");
    }
    PrintPoints(){
        Game.ConectorInit({value:this.count, action:"eat"},"setTexts");
    }

    startListener(){
        // reseteamos todos los valores pr si se estaban ya utilizando
        this.Snake = [];
        clearInterval(this.director)
        this.Init();
    }

    sound(src) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
        this.play = function(){
          this.sound.play();
        }
        this.stop = function(){
          this.sound.pause();
        }
      }
}


export default Game;