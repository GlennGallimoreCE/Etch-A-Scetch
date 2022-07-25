const buttons = document.querySelectorAll('button');
const screen = document.querySelector('.screen');  //calls the CSS ID


let pixel = '';
let gridsize = 32; 

const drawGrid = (screenSize) => {
  for( i = 0; i < screenSize ** 2; i++) {    //This adjust the screen size by column and row, hence the **
    pixel = document.createElement('div')
    pixel.classList.add("pixel");
    pixel.style.backgroundColor = '#d3d3d3';
    pixel.style.border = "thin dotted #f5f5f5"; //Adds lines to form a more obvious grid
    screen.appendChild(pixel);   // draws pixel to screen

  } 


  //-------------- The Grid, aka the space the user draws in ---------------------------------------------------
  screen.style.gridTemplateColumns = `repeat(${screenSize}, auto)`; // We're setting the amount of columns
  screen.style.gridTemplateRows = `repeat(${screenSize}, auto)`; // We're setting the amount of rows
}

drawGrid(gridsize);

const clear = (request) => {
  if(request === 'resize') {
    gridsize = prompt('Please enter grid size (no bigger than 100)', 32);
    if (gridsize > 100 || gridsize === null){    //Ensures even input for grid size, no greater than 100.
      gridsize = 32;
    }
  }
  screen.innerHTML = '';
  drawGrid(gridsize);   //This will draw the new grid size after input
  active();
}

let currentMode = 'black';   //Default draw color pen, always starts as the color black until otherwise
buttons.forEach(button => {
  button.addEventListener('click', () => {
    if(button.id === 'resize' || button.id === 'clear'){
      clear(button.id);
    }
    else {
      currentMode = button.id;
      //clear(button.id);  //I commented this out so it doesn't clear every time I change colors.
    }


  });
});

//--------------------------- the pen tools -----------------------------------------------------

const randomColor = () => {   //The Random Color pen
  let color = 'rgba(';
  for(i = 0; i < 3; i++) {
    color += Math.floor(Math.random() * 255) + ',';
    
  }
  return color + '1)';
}

const shading = (clr) => {   //The shader pen, would like to see about making this more of an opacity and not a solid.
  let color = 'rgba(';
  clr = parseInt(clr.substr(4, clr.indexOf(',') - 4));
  if(clr === 255) {
    clr = 100;
  } else if (clr > 0) {
    clr -= 5;
  }
  for(i = 0; i < 3; i++) {
    color += clr + ',';
  }
  return color + '1)';

}

//---------------------------------------------------

//Downloading the artwork on the grid as an image

document.getElementById("download").onclick = function() {
  const screenshotTarget = document.getElementById('canvas');

  html2canvas(screenshotTarget).then((canvas) => {
    const base64image = canvas.toDataURL("image/png");
    let anchor = document.createElement('a');
    anchor.setAttribute("href", base64image);
    anchor.setAttribute("download", "image.png");
    anchor.click();
    anchor().remove;
  });
};


//---------------------------------------------------
//Adding mouse movements to "draw pixels, over clicking one at a time"  ---Work in Progress -----


//End drawing function
//---------------------------------------------------

// The color tools, they need to always be active, and we create pixels for the "pixels" drawn on the canvas grid.

const active = () => {                
  let pixels = document.querySelectorAll('.pixel');
  
  pixels.forEach(pxl => {
    pxl.addEventListener('mousedown', (e) => {  //Why mouseover when you can click/mousedown!  
      
      let crntClr = getComputedStyle(pxl, null).getPropertyValue('background-color');  //Calling the "background-color" of the CSS
      switch(currentMode){                                  //The switch argument calls all the IDs of the colors for the swathes.  I couldn't get a color picker working for this so I've settled with swatches.
// The color, shading, and erase large buttons go here, since they're technically colors but have different functions than the swatches.       
        case 'colors':
          e.target.style.backgroundColor = randomColor();
          e.target.style.border = '';
          break;
        case 'shading':
          e.target.style.backgroundColor = shading(crntClr);
          e.target.style.border = '';
          break;
        case 'erase':
          e.target.style.backgroundColor = 'rgba(211,211,211)';   //Note only color codes are quoted, not functions
          e.target.style.border = 'thin dotted #f5f5f5';      //restores grid lines when erasing pixels
          break;       
       


// all greyscale swatches go here !  
        case 'black':                                    
          e.target.style.backgroundColor = 'rgba(0,0,0)';   //Note only color codes are quoted, not functions
          e.target.style.border = '';                       //erases the grid line for a full pixel color
          break;
        case 'darkergrey':                                    
          e.target.style.backgroundColor = 'rgba(75,75,75)';   
          e.target.style.border = '';                       
          break;
        case 'drkgrey':                                    
          e.target.style.backgroundColor = 'rgba(117,117,117)';   
          e.target.style.border = '';                       
          break;
        case 'grey':                                    
          e.target.style.backgroundColor = 'rgba(128,128,128)';   
          e.target.style.border = '';                       
          break;
        case 'lightgrey':                                    
          e.target.style.backgroundColor = 'rgba(211,211,211)';   
          e.target.style.border = '';                       
          break;
        case 'white':                                    
          e.target.style.backgroundColor = 'rgba(255,255,255)';   
          e.target.style.border = '';                       
          break;

// all skintones/browns go here !

        case 'charcoal':                                    
          e.target.style.backgroundColor = 'rgba(87,47,30)';   
          e.target.style.border = '';                       
          break;
        case 'drkbrown':                                    
          e.target.style.backgroundColor = 'rgba(87,31,31)';   
          e.target.style.border = '';                       
          break;
        case 'darkred':                                    
          e.target.style.backgroundColor = 'rgba(139,0,0)';   
          e.target.style.border = '';                       
          break;
        case 'brown':                                    
          e.target.style.backgroundColor = 'rgba(165,42,42)';   
          e.target.style.border = '';                       
          break;
        case 'sienna':                                    
          e.target.style.backgroundColor = 'rgba(160,80,45)';   
          e.target.style.border = '';                       
          break;
        case 'canyon':                                    
          e.target.style.backgroundColor = 'rgba(255,255,255)';   
          e.target.style.border = '';                       
          break;
        case 'lightcoral':                                    
          e.target.style.backgroundColor = 'rgba(205,92,92)';   
          e.target.style.border = '';                       
          break;
        case 'albino':                                    
          e.target.style.backgroundColor = 'rgba(240,128,128)';   
          e.target.style.border = '';                       
          break;
        case 'wheat':                                    
          e.target.style.backgroundColor = 'rgba(255,255,255)';   
          e.target.style.border = '';                       
          break;
        case 'peach':                                    
          e.target.style.backgroundColor = 'rgba(253,245,230)';   
          e.target.style.border = '';                       
          break;
        case 'tan':                                    
          e.target.style.backgroundColor = 'rgba(210,180,140)';   
          e.target.style.border = '';                       
          break;



// all normal colors go here !
        case 'magenta':     
          e.target.style.backgroundColor = 'rgba(255, 0, 255)';
          e.target.style.border = '';      
          break; 
        case 'violet':     
          e.target.style.backgroundColor = 'rgba(238, 120, 238)';
          e.target.style.border = '';      
          break; 
        case 'red':     
          e.target.style.backgroundColor = 'rgba(255, 0, 0)';
          e.target.style.border = '';      
          break; 
        case 'redorange':     
          e.target.style.backgroundColor = 'rgba(255, 64, 0)';
          e.target.style.border = '';      
          break; 
        case 'tomato':     
          e.target.style.backgroundColor = 'rgba(255, 99, 71)';
          e.target.style.border = '';      
          break; 
        case 'pink':     
          e.target.style.backgroundColor = 'rgba(255, 192, 203)';
          e.target.style.border = '';      
          break; 
//-----------------------------------------------------------------
        case 'orange':     
          e.target.style.backgroundColor = 'rgba(255, 128, 0)';
          e.target.style.border = '';      
          break; 
        case 'litorange':     
          e.target.style.backgroundColor = 'rgba(255, 191, 0)';
          e.target.style.border = '';      
          break; 
        case 'yellow':     
          e.target.style.backgroundColor = 'rgba(255, 255, 0)';
          e.target.style.border = '';      
          break; 
        case 'lime':     
          e.target.style.backgroundColor = 'rgba(191, 255, 0)';
          e.target.style.border = '';      
          break; 
        case 'litgreen':     
          e.target.style.backgroundColor = 'rgba(128, 255, 0)';
          e.target.style.border = '';      
          break; 
        case 'yelgreen':     
          e.target.style.backgroundColor = 'rgba(115, 153, 0)';
          e.target.style.border = '';      
          break; 
//-----------------------------------------------------------------

        case 'green':     
          e.target.style.backgroundColor = 'rgba(0, 153, 0)';
          e.target.style.border = '';      
          break; 
        case 'darkcyan':     
          e.target.style.backgroundColor = 'rgba(0, 139, 139)';
          e.target.style.border = '';      
          break; 
        case 'neongreen':     
          e.target.style.backgroundColor = 'rgba(0, 255, 64)';
          e.target.style.border = '';      
          break; 
        case 'britgreen':     
          e.target.style.backgroundColor = 'rgba(0,255,128)';
          e.target.style.border = '';      
          break; 
        case 'teal':     
          e.target.style.backgroundColor = 'rgba(0,255,191)';
          e.target.style.border = '';      
          break; 
        case 'cyan':     
          e.target.style.backgroundColor = 'rgba(0,255,255)';
          e.target.style.border = '';      
          break; 
//-----------------------------------------------------------------

        case 'skyblue':     
          e.target.style.backgroundColor = 'rgba(0, 191, 255)';
          e.target.style.border = '';      
          break; 
        case 'oceanblue':     
          e.target.style.backgroundColor = 'rgba(0,128,255)';
          e.target.style.border = '';      
          break; 
        case 'slateblue':     
          e.target.style.backgroundColor = 'rgba(0,64,255)';
          e.target.style.border = '';      
          break; 
        case 'blue':     
          e.target.style.backgroundColor = 'rgba(0,0,255)';
          e.target.style.border = '';      
          break; 
        case 'blurple':     
          e.target.style.backgroundColor = 'rgba(64,0,255)';
          e.target.style.border = '';      
          break; 
        case 'purple':     
          e.target.style.backgroundColor = 'rgba(128,0,255)';
          e.target.style.border = '';      
          break; 

//-----------------------------------------------------------------

        case 'litpurple':     
          e.target.style.backgroundColor = 'rgba(191,0,255)';
          e.target.style.border = '';      
          break; 
        case 'purpink':     
          e.target.style.backgroundColor = 'rgba(255, 0, 191)';
          e.target.style.border = '';      
          break; 
        case 'neonpink':     
          e.target.style.backgroundColor = 'rgba(255, 0, 128)';
          e.target.style.border = '';      
          break; 
        case 'softred':     
          e.target.style.backgroundColor = 'rgba(255, 0, 64)';
          e.target.style.border = '';      
          break; 



















        case 'red':     
          e.target.style.backgroundColor = 'rgba(255, 0, 0)';
          e.target.style.border = '';      
        break; 
      }
    });
  });
}


active();











