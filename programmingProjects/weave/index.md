---
layout: project
title: Weave
---

<script src="jquery-2.1.1.min.js"></script>
<link rel="stylesheet" href="style.css">

<div class="description">
<p>This is a tool to that allows the user to easily create celtic knots. It is based on this
<a href="
http://www.entrelacs.net/-Celtic-Knotwork-The-ultimate-"> fascinating guide</a>. Every line between
points indicates a crossing. The one requirement for the pattern is that every strand must alternate
going over and under. Not all patterns will be a knot.
 </p>
 <p> To use the tool, create some new points and connect them to an existing pattern, or to each other. You can also use 
 the edit tool to drag points around. The erase tool will remove points.
 </p>
 </div>

<div class="interface">
<div class="controls">
<button class="btnMode active" data-mode="create"> CREATE</button><br>
<button class="btnMode" data-mode="edit"> EDIT</button><br>
<button class="btnMode" data-mode="erase"> ERASE</button><br>
<button class="zoomBtn" onclick="zoomIn()">Zoom In</button>
<button class="zoomBtn" onclick="zoomOut()">Zoom Out</button>

</div>

<canvas id="node-canvas" width="1100px" height="800px"></canvas>
</div>
<script type="text/javascript" src="line.js"></script>
<script type="text/javascript" src="main.js"></script>