const prompt = require('prompt-sync')();
PaintCalculator(); // calling paint calculator function 
function PaintCalculator(){
    
    let wallSizeArr = []; //array to store the sizes of the walls to be parsed to the pricing function 
    let PaintOverall ;

    const wallcount = parseInt(prompt('how many walls do you need to paint? '));
    if(isNaN(wallcount) == false){
        try{
            for(let i = 0; i < wallcount; i++){ //for loop to iterate over the wall amounts
            let wallHeight = parseInt(prompt('How tall is your wall in meters?' ));
            let wallWidth = parseInt(prompt('How wide is your wall in meters? '));
            let wallSize = sqrMeter(wallWidth,wallHeight);
            let window_size;
            let coatNo = parseInt(prompt('How many coats of paint do you want to apply? '));
            let Window = prompt('does the wall have windows Y/N? ');
            let socket_size = 0;
            let door_size = 0;
            let PaintTotal = 0;
            Window = Window.toUpperCase();
            // conditional statements to check for doors, windows and plug sockets
            if(Window == 'Y'){ 
                let doorComplete = false;
                while(doorComplete == false){
                let doorNumber = parseInt(prompt('How many windows do you have? '))
                    if(isNaN(doorNumber)== false){
                        for(let x = 0; x < doorNumber; x++){
                            let window_Height = parseInt(prompt('How tall is your window in meters? ')) ; 
                            let window_Width =  parseInt(prompt('How wide is your window in meters? ')) ; 
                            window_size = sqrMeter(window_Width, window_Height);
                            doorComplete = true;
                        }
                    }
                    else{
                        console.log('Please enter a number!')
                    }
                }
                                                                                  
            }
            else{
                console.log('ok no windows');
                window_size = 0;
            }

            let socket = prompt('does the wall have any plug sockets? Y/N? ')
            socket= socket.toUpperCase()
            if(socket == 'Y'){
                let socketComplete = false;
                while(socketComplete == false){
                    let socketNumber = parseInt(prompt('How many plugs do you have? '));
                    if(isNan(socketNumber) == false){
                        for(let i = 0; i< socketNumber; i++){
                            let socket_Height = parseInt(prompt(`How tall is plug No.${i + 1}? `)) ; //array position starts at 0 so 1 is added on to the output display 
                            let socket_Width =  parseInt(prompt(`How wide is  plug No.${i + 1}? `)) ; 
                            socket_size = sqrMeter(socket_Width, socket_Height);
                            socketComplete = true;
                        }  
                    } 
                    else{
                        console.log('Please enter a number!');
                    }
                }
                
            }
            else{
                console.log('ok no sockets');
            
            }

            let door = prompt('does the wall have a door Y/N? ')
            door = door.toUpperCase();
            if(door == 'Y'){
                let door_Height = parseInt(prompt('How tall is your door in meters? ')) ; 
                let door_Width =  parseInt(prompt('How wide is your door in meters? ')) ; 
                door_size = sqrMeter(door_Width, door_Height);
            }
            else{
                console.log('ok no door');
            
            }
            let obstructions = socket_size + window_size + door_size;  //calculating the deductions from the wall size
            wallSize = wallSize - obstructions;
            if(wallSize < 0){
                console.log(`Your wallsize is apparently: ${wallSize} m sqrd, this is obviously incorrect start over!`);
                PaintCalculator();
            }
            else{
                if(obstructions > 0){
                    PaintTotal = (wallSize * coatNo)/10; //a liter covers 10 sqr meters of wall
                }
                else{
                    PaintTotal = (wallSize * coatNo)/10;

                }
                console.log(`The total paint needed for this wall is  ${PaintTotal} litres`)
                PaintOverall += PaintTotal;
                wallSizeArr.push(wallSize);
            }
        }
        let complete = prompt('Do you still need the paint calculator Y/N ? ');
        complete = complete.toUpperCase();
        if(complete == 'Y'){
            PaintCalculator(); // recursive call to the start of the PaintCalculator function 
        }
        else if(complete == 'N'){
            let paintCost = prompt('Would you like to find out how much this would cost Y/N? ');
            paintCost = paintCost.toUpperCase();
            if(paintCost == 'Y'){
                paintCostcalculator(wallcount, wallSizeArr); //calls paint cost function
            }
            else{ 
                console.log('Ok see you next time');
                return;
            }
            
        }
        else{
            console.log('invalid input');
            return
        }
    }
    catch{ 
        console.log('Please note you need to input an amount of walls?')
        PaintCalculator();
    }
    }
    else{
        console.log('Input must be a number try again!');
        PaintCalculator();
    }
}

function sqrMeter(width, height){  //function to calculate sqr meters
    let dimension = width * height;
    return(dimension);
}

function paintCostcalculator(wallcount, wallSizeArr){
    let total = 0;
    for(let j= 0; j < wallcount; j++){ //iterates through the amount of walls
        let colour_Overall = 100 ; 
        let colourAmount =  parseInt(prompt(`How many different colours would you like to use on wall number ${j +1} ? `));
        let wallMeasure = wallSizeArr[j];
        for(let i = 0; i < colourAmount; i++ ){ //iterates over the number of colours selected by the user
            let colourPercentage = parseInt(prompt(`what percantge of the wall number ${j + 1} would you like to paint the colour with? `));
            if(colourPercentage > colour_Overall){
                console.log('percentage too high!');
                i = i - 1; 
            }
            else{ 
                colour_Overall -= colourPercentage;
                let paintCost = parseInt(prompt('How much does this paint cost per liter? '));
                let amountCovered = wallMeasure*(colourPercentage/100); // calculate how much of the wall this colour will cover
                let tempTotalLiter = Math.ceil(amountCovered/10); //work out how much paint is needed to cover this area and rounds up as you cannot buy half tins of paint
                let tempCost = paintCost * tempTotalLiter;
                total += tempCost;
                console.log(total)



            }

                
        }
    }
    let complete = prompt('Do you want to return back to the paint calculator? ');
    complete = complete.toUpperCase();
    if(complete == 'Y'){
        PaintCalculator(); 
    }
    else if(complete == 'N'){
        let paintCost = prompt('Would you like to calculate the price with some different paints? ');
        paintCost = paintCost.toUpperCase();
        if(paintCost == 'Y'){
            paintCostcalculator(wallcount, wallSizeArr); // recursive call to the start of the paint costing function
        }
        else{ 
            console.log('Ok see you next time');
            return;
        }
        
    }
    else{
        console.log('invalid input');
        return
    }
}