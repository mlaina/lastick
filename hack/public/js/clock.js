var CENTER=100;
var R_MIN=;
var R_HOUR=;

window.addEventListener("load", function() {
  var clock = new Clock(CENTER, R_MIN, R_HOUR);
  clock.ticktack();
});



var Clock = new function(center, r_min, r_hour){
	this.center=center;
	this.r_min=r_min;
	this.r_hour=r_hour;

	this.tasks=[];

	this.svg = document.getElementsByTagName('svg')[0];
	this.inn=false;
	this.currentTask=null;
	this.now=new Date();

	this.tick=ini();
	this.tack=ini();

	this.svg.appendChild(this.tick);
    this.svg.appendChild(this.tack);

    this.ini=new function(){
    	var t=document.createElementNS("http://www.w3.org/2000/svg", 'path');
    	t.style.fill = "none";
		t.style.stroke = "#fff";
		t.style.strokeWidth="85px";

		return t;
    }

    this.ticktack=new function(){
    	this.now=new Date();

    }

    this.addTask=new function(){
    	this.tasks.add(new Task(this.center, this.r_min, this.r_hour));
    }


}

var Task = new function(center, r_min, r_hour){
	this.center=center;
	this.r_min=r_min;
	this.id=this.getInputs('id');
	this.color=this.getInputs('color');
	
	this.t_ini=this.timeFormat(this.getInputs('t_ini'));
	this.t_fin=this.timeFormat(this.getInputs('t_fin'));

	this.min=ini();
	this.hour=ini();

	this.min.setAttribute("d", this.makePath("min")); //svg function
	this.hour.setAttribute("d", this.makePath("hour"));

	this.getInputs=function(s){
		return $("input[name="+s+"]").val();
	}
	this.timeFormat=function(t){
		return [Number(t[0]+t[1]), Number(t[3]+t[4])];
	}

	
	this.ini=function(){
		var t= document.createElementNS("http://www.w3.org/2000/svg", 'path');
		t.style.fill = "none";
		t.style.stroke = this.color;
		t.style.strokeWidth = "25px";

		return t;
	}

	this.makePath=function(type)){
	    var radius;
	    var a = [ 0, 0 ];
	    
	    if(type=="min"){
	        radius=this.r_min;
	        a=this.angles_min(this.t_ini[0], this.t_ini[1], this.t_fin[0], this.t_fin[1]);
	    }
	    
	    if(type=="hour"){
	        radius=this.r_hour;
	        a=this.angles_hour(this.t_ini[0], this.t_ini[1], this.t_fin[0], this.t_fin[1]);
	    }
	    return especificArc(this.center, this.center, radius, a[0], a[1]);
	}

	this.angles_min()=new function(hi, mi, hf, mf ) {
		var angleIni, angleFin;

		var h=hf-hi;
		var m=mi-mf;

		if(hf-hi>1|| (hi<hf && mi<mf && hf-hi==1))
		   return [0, 359];
		
		angleIni=mi*6;
		angleFin=mf*6;

		return [angleIni, angleFin];
	}

	this.angles_hour()=new function(hi, mi, hf, mf){
		var angleIni, angleFin;

		angleIni=(hi%12)*30+(30*mi/60);	
		angleFin=(hf%12)*30+(30*mf/60);	

		return  [angleIni, angleFin] ;
	}

	

}
