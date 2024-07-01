document.addEventListener('DOMContentLoaded', function(){
         const gridSize = 9;
         const solveButton = document.getElementById("solve-btn");
         solveButton.addEventListener('click', solveSudoku);

         const sudokuGrid = document.getElementById("sudoku-grid");

         for(let row=0; row<gridSize; row++){
                  const newrow = document.createElement("tr");

                  for(let col=0;col < gridSize; col++){
                           const cell = document.createElement("td");
                           const input = document.createElement("input");

                           input.type = "number";
                           input.className = "cell";
                           input.id = `cell-${row}-${col}`;
                           cell.appendChild(input);
                           newrow.appendChild(cell);
                  }
                  sudokuGrid.appendChild(newrow);
         }
});

async function solveSudoku(){
         const gridSize = 9;
         const sudokuArray = [];

         // fILL THE sudokuarray with input value from the grid

         for(let row=0;row<gridSize;row++){
                  sudokuArray[row] = [];

                  for(let col=0;col<gridSize;col++){
                           const cellId = `cell-${row}-${col}`;
                           const cellValue = document.getElementById(cellId).value;
                           sudokuArray[row][col] = cellValue !=="" ?  parseInt(cellValue): 0;
                  }
         }
         // identify user-input cells and mark them
         for(let row=0;row<gridSize; row++){
                  for(let col=0;col<gridSize;col++){
                           const cellId = `cell-${row}-${col}`;
                           const cell = document.getElementById(cellId);

                           if(sudokuArray[row][col]!=0){
                                    cell.classList.add("user-input");
                           }
                  }
         }

         // solve the sudoku and display the solution

         if(solveSudokuHelper(sudokuArray)){
                  for(let row=0;row<gridSize;row++){
                           for(let col =0;col<gridSize;col++){
                                    const cellId = `cell-${row}-${col}`;
                                    const cell = document.getElementById(cellId);

                                    // fill in solved values and apply animations

                                    if(!cell.classList.contains("user-input")){
                                             cell.value = sudokuArray[row][col];
                                             cell.classList.add("solved");

                                            await sleep(20);
                                             // delay for visualization
                                    }
                           }
                  }
         }
         else{
                  alert("No solution exists for the given Sudoku puzzel");
         }
}

function solveSudokuHelper(board){
         const gridSize = 9;

         for(let row = 0;row < gridSize; row++){
                  for(let col = 0; col< gridSize ; col++){
                          if(board[row][col] === 0){
                           for(let num = 1; num<=9; num++){
                                    if(isValidMove(board,row,col,num)){
                                         board[row][col] = num; 
                                         
                                    //      use of recursion to solve it

                                             if(solveSudokuHelper(board)){
                                                      return true;
                                             }

                                             // backtrack condition
                                             board[row][col] = 0;
                                    }
                           }
                           // no valid solution found
                           return false;
                          } 

                  }
         }
         // All cells filled
         return true;
}

function isValidMove(board,row,col,num){
         const gridSize = 9;

         for(let i=0 ; i<gridSize; i++){
                  if(board[row][i] === num || board[i][col]=== num){
                           return false; 
                           // conflict found
                  }
         }
         //  check the 3*3 subgrid for conflicts
         const startRow = Math.floor(row/3)*3;
         const startCol = Math.floor(col/3)*3;

         for(let i = startRow; i<startRow + 3; i++){
                  for(let j = startCol; j< startCol + 3; j++){
                           if(board[i][j]===num){
                                    return false;
                                    // conflict found
                           }
                  }
         }

         return true;
         // no conflict found
}

function sleep(ms){
         return new Promise(resolve =>setTimeout(resolve,ms));
}