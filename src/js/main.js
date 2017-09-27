$(function(){
  var perc = 0;
  /*$('#mapWrapper').click(function(){
    update();
  })*/
  update();
  //setInterval(update, 20);

  function update(){
    requestAnimationFrame(update)
    console.log(perc)
    $('#arcs').empty();
    for (var i = 0; i < 2; i++) {
            //var n = Math.random()*Math.PI*1.99999;
      $('<path />').attr('d', createSvgArc(0, 0, 300, 0, perc)).attr('fill', '#ff0').attr('opacity', .5).appendTo($('#arcs'))
      }
      perc += Math.PI/50;
      if(perc >= Math.PI*2) perc = 0;
    
      $('#mapWrapper').html($('#mapWrapper').html());
      //$('#arcs').children().attr('fill', '#000');
    }


    function createSvgArc (x, y, r, startAngle, endAngle) {
      if(startAngle>endAngle){
        var s = startAngle;
        startAngle = endAngle;
        endAngle = s;
      }
      if (endAngle - startAngle > Math.PI*2 ) {
        endAngle = Math.PI*1.99999;
      }
      
      var largeArc = endAngle - startAngle <= Math.PI ? 0 : 1;

      return ['M', x, y,
              'L', x+Math.cos(startAngle)*r, y-(Math.sin(startAngle)*r), 
              'A', r, r, 0, largeArc, 0, x+Math.cos(endAngle)*r, y-(Math.sin(endAngle)*r),
              'L', x, y
             ].join(' ');
    }

    function randomColorAsString() {
      return '#'+'0123456789abcdef'.split('').map(function(v,i,a){
        return i>5 ? null : a[Math.floor(Math.random()*16)] }).join('');
    }

  })