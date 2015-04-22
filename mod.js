var trainer;
var pokedex = ["Pickachu"];
$("#b").click(function(){
   trainer = $("#name").val();
   $("#nameArea").text(trainer);
   $("#selector").fadeIn();
});

var mods = ["Bill the Lizard", "Michael Myers", "Robert Harvey", "BoltClock", "casperOne", "George Stocker", "Brad Larson", "ThiefMaster", "ChrisF", "Gordon", "Flexo", "minitech", "Bohemian", "0x7fffffff", "bluefeet", "meagar", "Martijn Pieters", "Jeremy Banks"];
var s = $("#s");
$("#i").click(function(){
  var self = this;
  self.disabled = true;
  var r = (Math.random()*mods.length)|0;
  $("#you").text(s.find("option:selected").text());
  $("#them").text(mods[r]);
  var yourRoll = (Math.random()*2400)|0;
  var theirRoll = (Math.random()*2400)|0;
  var first = true;
  var loser = function(){
   if(!first) return true;
   first = false;
   return false;
  };
  $("#fightArea .you").canvasTimer(yourRoll,loser);
  $("#fightArea .them").canvasTimer(theirRoll,loser);
  setTimeout(function(){
      var delay = 5000;
      if( yourRoll < theirRoll ){
       $("#result").text("You Win!! Adding "+mods[r]+" to your Pokédex");
       var modPoke = mods.splice(r,1);
       pokedex.push(modPoke);
       s.append("<option value="
                +(pokedex.length-1)
                +">"+modPoke+"</option>");
      }else{
       $("#result").text("Good luck next time, "+trainer);
       delay = 2000;
      }
      setTimeout(function(){
          $("canvas").remove();
          $("#you").text("");
          $("#them").text("");
          $("#result").text("");
          self.disabled = false;
          if(mods.length == 0 || true){
          $("body").html('<div>OMG YOU WON! YOU CAUGHT ALL THE MODS!!</div><div><img src="http://i.imgur.com/atz81.jpg" />'); 
          }
      },delay);
  },2500);
});


$.fn.canvasTimer = function( duration, callback ){
  var canvas = $("<canvas>");
  this.append(canvas);
    
  var ctx = canvas[0].getContext("2d");
  var x = y = parseInt(Math.sqrt(duration/10),10)+1;
  canvas.css({
      border: '3px outset #cecece',
      width: x+'px',
      height: y+'px',
      borderRadius: '100px'
  });
    
  canvas.attr('width', x+'px');
  canvas.attr('height', y+'px');
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, x, y);

  var rotateOpts = ['X','Y','Z'];
  var rotateStyle = 0;
  var pixelCount = -1;
  !function pixelDown(){
    if(pixelCount++ > x*y){
        if(callback())canvas.remove();
        return;
    }
    var dx = (pixelCount % x);
    var dy = parseInt(pixelCount/x,10);
    var cr, cg, cb;
    cr = (Math.random()*256|0).toString(16);
    cg = (Math.random()*256|0).toString(16);
    cb = (Math.random()*256|0).toString(16);
      setTimeout(function(){
       canvas.css('transform',
        'rotate'+rotateOpts[rotateStyle%3]+
        '('+pixelCount%360+'deg');
        ctx.fillStyle = "#"+cr+cg+cb;
        ctx.fillRect(dx, dy, 1, 1); 
        pixelDown();
      },10);
  }();
};
