//Creating functions for selecting DOM elements
function qsl(param) {
    return document.querySelector(`${param}`)
}
function qsla(param) {
    return document.querySelectorAll(`${param}`)
}
//Assigning DOM ELEMENTS
const section = qsl(".container");
let announceWinner=qsl("h2");
let announcePlayer=qsl(".announcePlayer")
const tile = qsla("div")
const restart =qsl(".restart")
const tarea= qsl("textarea")

// Game Code
let board =[]
let changeplayer = 1
let gameOver=false
let click=0
// Game event Listener
section.addEventListener("click", function(e){
    // console.log(e.target.textContent)
    click++
    if((e.target.textContent=="")&&(!gameOver)){ // checking if theres already a value
        const id=e.target.id
        if(changeplayer%2==0){  //Alternating between X and O
            e.target.textContent="X"
            announcePlayer.textContent="Player O turn"
            board[id]=e.target.textContent// mapping the empty board array with id of the divs
        }else{
            e.target.textContent="O"
            announcePlayer.textContent="Player X turn"
            board[id]=e.target.textContent
        }
        changeplayer++
        // console.log(changeplayer);
        checkWin()
    }
    if((click==9)&&(!gameOver)){
        console.log("draw")
        announcePlayer.textContent=""
        announceWinner.textContent="DRAW"
        // gameOver=true
    }  
})
// To restart the game
restart.addEventListener("click",function(e){
    console.log("clicked");
    changeplayer=1
    click=0
    board=[]
    gameOver=false
    announceWinner.textContent=""
    announcePlayer.textContent=""
    tile.forEach(function(e){
        e.textContent=""
    })
})

const winningCombos =[// winning combinations
    [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[2,4,6],[0,4,8]
]
checkWin=function (){// To check for a win
    for (const win of winningCombos) {
        let [a,b,c]=win
        if(board[a]&&(board[a]==board[b]&&board[b]==board[c])){
            if(changeplayer%2==0){
            announceWinner.textContent="Player O has won"
            console.log("player o has won");
            announcePlayer.textContent=""
            gameOver=true
            }else{
            announceWinner.textContent="Player X has won"
            console.log("player x has won");
            announcePlayer.textContent=""
            gameOver=true
            }
        }
    }
}