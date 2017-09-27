window.onload = function(){
    /*
    var now = new Date();
    var h = now.getHours(), m = now.getMinutes(), s = now.getSeconds();
    var curr = h * 60 * 60 + m * 60 + s;
    svg.setCurrentTime(curr);
    */

    var a;

    ah = [ 0, 0 ];
    am = [ 0, 0 ];

    ah=iniFinHours(12, 30, 12, 40);
    am=iniFinMin(12, 5, 12, 45);
    
    $("#center").attr("d", describeArc(100, 100, 1, 0, 359));
    $("#hour").attr("d", describeArc(100, 100, 100, ah[0], ah[1]));
    $("#min").attr("d", describeArc(100, 100, 140, am[0], am[1]));

};



function iniFinMin( hi, mi, hf, mf ) {
	var angleIni, angleFin;

	var h=hf-hi;
	var m=mi-mf;

	

	if(hf-hi>1|| (hi<hf && mi<mf && hf-hi==1)){
		console.log(h+ " "+ m);
		return [0, 359];
	}

	angleIni=mi*6;
	angleFin=mf*6;

	return [angleIni, angleFin];
}

function iniFinHours(hi, mi, hf, mf){
	var angleIni, angleFin;

	angleIni=(hi%12)*30+(30*mi/60);	
	angleFin=(hf%12)*30+(30*mf/60);	

	return  [angleIni, angleFin] ;
}


function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

function describeArc(x, y, radius, startAngle, endAngle){

    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
        "M", start.x, start.y, 
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    return d;       
}