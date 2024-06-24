const express = require("express");
const sudoku = require("./sudoku.json")
const cors = require("cors");
const app = express();

const port = 8000;

app.use(cors());

app.get("/sudoku/:num", (req,res)=>{
    console.log(`ta funcionando numero ${req.params.num}`)

    return res
        .status(200)
        .json(
            {
                jsonSudoku : sudoku["Sudoku"][req.params.num]
            }
        );
})

app.get("/solvedsudoku/:num", (req,res)=>{
    console.log(`ta funcionando numero ${req.params.num}`)

    return res
        .status(200)
        .json(
            {
                jsonSudoku : sudoku["SolvedSudoku"][req.params.num]
            }
        );
})


app.listen(port, ()=>{
    console.log(`booted the server on ${port}`)
})