---
layout: project
title: Visual Programming Tool
---

<script src="d3.js" type="text/javascript"></script>
<script src="jquery-3.1.1.js" type="text/javascript"></script>
<script src="definitions.js" type="text/javascript"></script>
<script src="renderClasses.js" type="text/javascript"></script>
<script src="render.js" type="text/javascript"></script>
<script src="start.js" type="text/javascript"></script>

<link href="main.css" rel="stylesheet">
<div class="layout-vertical project-container">

    <div class="action-bar">
        <button id="placement-btn">Place Block</button>
        <button id="connection-btn">Connect</button>
        <button id="create-module-btn">Create Module</button>
    </div>
    <div class="flex-grow layout-horizontal">
        <svg class="flex-grow">

        </svg>
        <div class="side-panel layout-vertical">
            <div class="current-block-info-area"></div>
        </div>
    </div>
</div>