import Game from "./SN_gamesnake_index.js";

class InitGame{
    canvasContext;

    static ConectorApp;
    SnakeGame;

    constructor(ConectorApp, canvasContext){
        InitGame.ConectorApp = ConectorApp;
        this.canvasContext = canvasContext;
    }
    
    InitializedGame(){
        this.SnakeGame = new Game(this.canvasContext, this.ConectorInit)
        this.SnakeGame.Init();
        // this.SnakeGame.Show();
        // return this.SnakeGame;
    }
    
    ConectorInit(values, action){
        if(action == "setTexts"){
            if(values.action == "State"){
                InitGame.ConectorApp(values.value, "State")
            }
            if(values.action == "eat"){
                InitGame.ConectorApp(values.value, "eat")
            }
        }
        if(action == "over"){
            InitGame.ConectorApp(values, "over")
        }
    }

    startListener1(btnStartRestart){
        if(btnStartRestart == "restart"){
            this.SnakeGame.Over = true;
            setTimeout(() => {
                this.InitializedGame();            
            }, 1000);
        }
        if(btnStartRestart == true){
            this.SnakeGame.IntervalZone();
        }
    }
}
export default InitGame;