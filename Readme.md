# Links

# Concept

# Integration

CSS file:

```css
@import url(modules/bga-cards.css);
```

JS file:

```js
define([
   "dojo","dojo/_base/declare",
   "dojo/debounce",
   "ebg/core/gamegui",
   /*...,*/
   g_gamethemeurl + "modules/bga-dice.js",
],
function (dojo, declare, debounce, gamegui, /*...,*/ bgaCards) {
```