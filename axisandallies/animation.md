---
layout: project
title: Animation
---

<div class="container">
<h2>
Axis and Allies Board Game Adaptation: Animation
</h2>

<p>
I have been working on a video game adaptation of the board game, Axis and Allies, in conjunction with Wes Chai. Now that the game mechanics are implemented, and multiplayer support is functional, we’ve begun considering adding animations to the game.
</p>
<p>
    When adding animations, we want to be sure that it doesn’t negatively affect player experience in any way. This means avoiding:
    <ul>
    <li>Slow animations</li>
    <li>Animations that prevent user actions</li>
    <li>Cluttered or chaotic screen</li>
    <li>Too many simultaneous animations</li>
    <li>‘Loud’ animations</li>
    <li>Animations are too fast to parse</li>
    </ul>
</p>
<p>

For timing, this will need to be determined for each animation. When moving elements around the screen, I aim to have them move just slow enough for the eye to track. This means dynamically changing total times based on distance and zoom level so that the pixels/second speed is relatively constant. For smaller distances, err on the side of slower times so that the user has time to detect the movement. I plan to experiment with a few different timings, then test it on our helpful test users.
</p>
<p>
For buttons, the button will go through different states without animation (instant transition). This will make the game feel snappy and responsive.
</p>
<p>
Opening and closing panels and windows should be quick. This is one aspect where animations will slow the user down, so I want to minimize the impact. Use of easing can make the sudden motion less jarring.
</p>
<p>
I plan to avoid animations that might repeat multiple times (i.e. every time a user navigates to a screen, the screen reanimates). The main place this could happen is in some of the animated reports (battle outcomes). To prevent the user from having to watch the report animate multiple times, the report should only animate the first time the user ever opens it.
</p>
<h3>
What to Animate
</h3>
<p>
Battle reports will be animated. I was initially considering animating all the units on a battlefield, and then animating each unit that is destroyed. However, this will be slow, and contain a lot of unnecessary information. Instead of an animated battlefield, the report will be simple rows of unit images, with quick, simultaneous animations for each destroyed unit.
	When <b>moving</b> units, animate the movement as a stream of units on all players screens. However, regardless of animation time, the units should instantly appear at the destination. If a user inspects the destination territory, they should see all the units there, even if some are still mid-movement animation.
</p>
<p>
<b>Placing</b> units will be just like moving units, except that the units will animate in from the placement panel. If changing where a unit is placed, animate unit as if it was moving between the territories.
</p>
<p>
<b>Menus</b> and <b>panels</b> will be animated when opening or closing. Animation times will be short, and eased in and out to make them less jarring.
</p>
<p>
<b>Chat</b> and <b>event log</b> messages will be briefly animated when the user first receives them. A brief flash should be sufficient to catch the user’s attention and make them aware of the new message.
</p>
</div>