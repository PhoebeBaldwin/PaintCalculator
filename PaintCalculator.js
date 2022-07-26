const prompt = require('prompt-sync')();
PaintCalculator();
function PaintCalculator(){
    let wallSizeArr = [];
    let PaintOverall;

    const wallcount = parseInt(prompt('how many walls do you need to paint? '));
    for(let i = 0; i < wallcount; i++){
        let wallSize = parseInt(prompt('How big is your wall in meter sqrd?' ));
        let coatNo = parseInt(prompt('How many coats of paint do you want to apply? '));
        let Window = prompt('does the wall have windows Y/N? ');
        let socket_size = 0;
        let door_size = 0;
        let PaintTotal = 0;
        Window = Window.toUpperCase();
        if(Window == 'Y'){
            window_size = parseInt(prompt('How much of the wall do your windows cover in meter sqrd? ')) ;  
        }
        else{
            console.log('ok no windows');
            window_size = 0;
        }

        let socket = prompt('does the wall have any plug sockets? Y/N? ')
        socket= socket.toUpperCase()
        if(socket == 'Y'){
            socket_size = parseInt(prompt('How much of the wall do your sockets cover in meter sqrd? ')) ;  
        }
        else{
            console.log('ok no sockets');
        
        }

        let door = prompt('does the wall have a door Y/N? ')
        door = door.toUpperCase();
        if(door == 'Y'){
            door_size = parseInt(prompt('How much of the wall does your door cover in meter sqrd? ')) ;  
        }
        else{
             console.log('ok no door');
        
        }
        let obstructions = socket_size + window_size;
        wallSize = wallSize - obstructions;
        if(wallSize < 0){
            console.log(`Your wallsize is apparently: ${wallSize} m sqrd, this is obviously incorrect start over!`);
            PaintCalculator();
        }
        else{
            if(obstructions > 0){
                PaintTotal = (wallSize * coatNo)/10;
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
        PaintCalculator();
    }
    else if(complete == 'N'){
        let paintCost = prompt('Would you like to find out how much this would cost Y/N? ');
        paintCost = paintCost.toUpperCase();
        if(paintCost == 'Y'){
            paintCostcalculator(wallcount, wallSizeArr);
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
function paintCostcalculator(wallcount, wallSizeArr){
    let total = 0;
    for(let j= 0; j < wallcount; j++){
        let colour_Overall = 100 ;
        let colourAmount =  parseInt(prompt(`How many different colours would you like to use on wall number ${j} ? `));
        let wallMeasure = wallSizeArr[j];
        for(let i = 0; i < colourAmount; i++ ){
            let colourPercentage = parseInt(prompt(`what percantge of the wall number ${j + 1} would you like to paint the colour with? `));
            if(colourPercentage > colour_Overall){
                console.log('percentage too high!');
            }
            else{ 
                colour_Overall -= colourPercentage;
                let paintCost = parseInt(prompt('How much does this paint cost per liter? '));
                let amountCovered = wallMeasure*(colourPercentage/100);
                let tempTotalLiter = amountCovered/10;
                if(tempTotalLiter < 1){
                    tempTotalLiter = 1;
                }
                else{
                    tempTotalLiter = tempTotalLiter
                }
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
            paintCostcalculator(wallcount, wallSizeArr);
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