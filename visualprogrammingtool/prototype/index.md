---
layout: project
title: Visual Programming Tool
---

<script src="d3.js" type="text/javascript"></script>
<script src="jquery-3.1.1.js" type="text/javascript"></script>
<script src="knockout-3.3.0.debug.js" type="text/javascript"></script>
<script src="underscore.js" type="text/javascript"></script>
<script src="definitions.js" type="text/javascript"></script>
<script src="renderClasses.js" type="text/javascript"></script>
<script src="render.js" type="text/javascript"></script>
<script src="run.js" type="text/javascript"></script>
<script src="start.js" type="text/javascript"></script>
<script src="viewModels.js" type="text/javascript"></script>

<link href="main.css" rel="stylesheet">
	
	
<div class="layout-vertical project-container">
    <div class="action-bar">
        <button id="placement-btn">Place Block</button>
        <button id="connection-btn">Connect</button>
        <button id="run-btn">Run!</button>
    </div>
    <div class="flex-grow layout-horizontal">
        <svg class="flex-grow">

        </svg>
        <div class="side-panel layout-vertical">
            <!-- ko if: showBlockInfo -->
            <div class="current-block-info-area">
                <input data-bind="value: blockName" class="block-name">
                <div class="blueprint">
                    <div class="inputs-container">
                        <h3 class="subsection-title">Inputs</h3 >
                        <!-- ko foreach: inputs -->
                        <div class="input-container">
                            <input class="input-name" data-bind="value: name">
                            <span>:</span>
                            <span data-bind="text: type().name" class="input-type"></span>
                        </div>
                        <!-- /ko -->
                        <button data-bind="click: addInput">Add Input</button>
                    </div>
                    <div class="output">
                        <h3 class="subsection-title">Output Type</h3 >
                        <span class="output-type" data-bind="text: output().name"></span>
                    </div>
                    <div class="blueprint-contents">
                        <h3 class="subsection-title">Contents</h3>
                        <textarea data-bind="value: contents"></textarea>
                    </div>
                </div>
            </div>
            <!-- /ko -->
            <div>
                <h3 class="subsection-title">Program Output</h3>
                <div class="messages" data-bind="foreach: messages">
                    <span class="message" data-bind="css: messageType, text: message"></span><br>
                </div>
            </div>
        </div>
    </div>
</div>