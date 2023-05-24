# Links

[Demo](https://martingoulet.github.io/bga-dice-stock/demo/index.html)

# Concept

# Integration
## On standard BGA project
Copy bga-dice-stock.css and bga-dice-stock.js files to the `modules` directory.  
Then you can include the module on your game :

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
   g_gamethemeurl + "modules/bga-dice-stock.js",
],
function (dojo, declare, debounce, gamegui, /*...,*/ bgaDiceStock) {
```