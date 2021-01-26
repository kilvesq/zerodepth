var express = require("express");
const bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
 console.log("Server running on port", PORT);
});

app.post("/zerodepth", (req, res, next) => {
    console.log('req:', req.body);
    res.json(zerodepth(req.body));
   });

 // @param arr: a tree of numbers as array of numbers and arrays of that same kind recursively
 // eg: [[1,1],0,1, [[[1,1]],0]] ]
 function zerodepth(arr) {
    let minZeroLevel = 0;
    let maxZeroLevel = 0;
    traverse(arr, 1);
    function traverse(arr, level) {  
      const levelHasZeroes = arr.filter((e) =>  e === 0).length > 0; 
      minZeroLevel = minZeroLevel === 0 && levelHasZeroes ? level : minZeroLevel; 
      maxZeroLevel = maxZeroLevel < level && levelHasZeroes ? level : maxZeroLevel;
      arr.filter((e) => Array.isArray(e)).forEach((e) => {
        traverse(e, level + 1);
      })
    }
    return minZeroLevel ? [minZeroLevel, maxZeroLevel] : [null, null];
  }  

