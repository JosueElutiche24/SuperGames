class mineArray{
    // propertys
    static prototypeArray = [];
    static Booms = [];
    // Constructor
    constructor(Level){
        mineArray.prototypeArray = [];
        for(let i = 1; i <= Level+3 ;i ++){
            mineArray.prototypeArray.push(new Array(Level+3))
          }
        mineArray.Booms = [];
        mineArray.generarBooms(Level)
        mineArray.rellenar(Level)
        this.mapArray = mineArray.prototypeArray
    }
    // Methods
    mostrar(){
        console.log(this.mapArray)
        console.log(mineArray.Booms)
    }
    static generarBooms(Level){
        let cant;
        if(Level == 1) cant = 3
        if(Level == 2) cant = 5
        if(Level == 3) cant = 8
        function aleatory(){
            return Math.floor(Math.random()*(Level+3)*(Level+3))+1
        }
        for(let i = 1; i<= cant ; i++){
            let f = aleatory();
            while (mineArray.Booms.includes(f)) {
                f = aleatory();
            }
            mineArray.Booms.push(f)
        }
    }
    static rellenar(Level){
        const LastRowCol = Level+3
        /////////////////// for para colocar Booms
        for(let rows = 1; rows <= LastRowCol ;rows ++){
            for(let cols = 1; cols <= LastRowCol ; cols++){
                // numero de boton en el que estamos
                let numPosition = ((rows-1)*(LastRowCol))+cols
                // verificamos si esta casilla fue implantada con bomba y la agregamos al arrayPrototype con 9
                if(mineArray.Booms.includes(numPosition)){
                    mineArray.prototypeArray[rows-1][cols-1] = 9
                }                
            }
        }
        ////////////////// for para colocar el resto
        for(let rows = 1; rows <= LastRowCol ;rows ++){
            for(let cols = 1; cols <= LastRowCol ; cols++){        
                // numero de boton en el que estamos
                let numPosition = ((rows-1)*(LastRowCol))+cols
                // vewrificamos si esta casilla no fue diseñada con bomba
                if(!mineArray.Booms.includes(numPosition)){
                    // contador de bombas adyacentes
                    let countBooms = 0;
                    // creamos un objeto con los datos de posicionamientos adyacentes a nuestra celda
                    let positions={
                        N : 1,
                        NE : 1,
                        E : 1,
                        SE : 1,
                        S : 1,
                        SO : 1,
                        O : 1,
                        NO : 1,
                    };
                    {// N NE-NO
                    if(rows-1 == 0){
                        positions.N = 0
                        positions.NE = 0
                        positions.NO = 0
                    }
                    // S SE-SO
                    if(rows-1 == LastRowCol-1){
                        positions.S = 0
                        positions.SE = 0
                        positions.SO = 0
                    }
                    // E NE-SE
                    if(cols-1 == LastRowCol-1){
                        positions.E = 0
                        positions.NE = 0
                        positions.SE = 0
                    }
                    // O NO-SO
                    if(cols-1 == 0){
                        positions.O = 0
                        positions.NO = 0
                        positions.SO = 0
                    }
                    }
                    // recorremos las positiones para deducir si habita una bomba en ellas, y se la asignamos al countBooms
                    for(let k in positions){
                        // k nos devuelve la clave
                        // obtenemos el valor con positions[k]
                        if(positions[k] !== 0){
                            // si la celda adyacente k existe entonces
                            switch (k) {
                                // en cda caso verificamos con una formula que depende de la direccionen la que querramos mirar, y si deducimos que hay un 9 entonces el setount Booms se suma
                                case "N":
                                    if(mineArray.prototypeArray[(rows-1)-1][cols-1] == 9){
                                        countBooms = countBooms+1
                                    }
                                    break;
                                case "S":
                                    if(mineArray.prototypeArray[(rows-1)+1][cols-1] == 9){
                                        countBooms = countBooms+1
                                    }
                                    break;
                                case "E":
                                    if(mineArray.prototypeArray[rows-1][(cols-1)+1] == 9){
                                        countBooms = countBooms+1
                                    } 
                                    break;
                                case "O":
                                    if(mineArray.prototypeArray[rows-1][(cols-1)-1] == 9){
                                        countBooms = countBooms+1
                                    }    
                                    break;
                                case "NE":
                                    if(mineArray.prototypeArray[(rows-1)-1][(cols-1)+1] == 9){
                                        countBooms = countBooms+1
                                    }
                                    break;
                                case "NO":
                                    if(mineArray.prototypeArray[(rows-1)-1][(cols-1)-1] == 9){
                                        countBooms = countBooms+1
                                    }    
                                    break;
                                case "SE":
                                    if(mineArray.prototypeArray[(rows-1)+1][(cols-1)+1] == 9){
                                        countBooms = countBooms+1
                                    }
                                    break;
                                case "SO":
                                    if(mineArray.prototypeArray[(rows-1)+1][(cols-1)-1] == 9){
                                        countBooms = countBooms+1
                                    }
                                    break;
                                default:
                                    console.log("default")
                                    break;
                            }
                        }
                    }
                    // agregamos el numero correspóndiente de bombas al arrayPrototype
                    mineArray.prototypeArray[rows-1][cols-1] = countBooms
                }  
            }
        }
    }
}

export default mineArray;
