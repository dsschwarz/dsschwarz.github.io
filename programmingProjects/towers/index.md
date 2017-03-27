---
layout: project
title: Towers
---
<script src="https://code.jquery.com/jquery-1.11.0.min.js" type="text/javascript"></script>
<script src="towers.js" type="text/javascript"> </script>

<link rel="stylesheet" href="style.css">

<div class="top-level-div">
    <div>
        <table id="gameTable">
        </table>
    </div>
    <div>
        Time: <span id="clock">0</span><br>
        <button onclick="validate()">Validate</button><br>
        <button id="restart">New Game</button>
    </div>
    <div id="textOutput">
        <p>Towers is a puzzle game where a grid must be filled with towers. For a 4x4 grid, here are <span class="boardSize">4</span>
            tower heights, and every row and column has exactly one tower of each height. The numbers shown on the side
            of the grid are the number of towers visible along that line. Taller towers hide shorter towers. Try to complete
            the grid.
        </p>
        <p>
            You can use the arrow keys to navigate the grid, and press enter to validate your solution.
        </p>
    </div>
</div>