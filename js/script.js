$(document).ready(function(){
	var i = 0;
	var j = 1;
	var k= 0;

	function writeData(j){
		$('.box-step h4').html('Step '+j);
		$('.activities').html('');
		for(var i=0;i < boxes['box'+j]['activities'].length;i++){
			$('.activities').append('<div class="form-group form-check">'+
							    '<input type="checkbox" name="activitiesbox" value="'+i+'" class="form-check-input" id="checkbox'+i+'">'+
							    '<label class="form-check-label" for="checkbox">'+boxes['box'+j]['activities'][i]+'</label>'+
							  '</div>');
		}
		$('.qualities').html('');
		for(var i=0;i < boxes['box'+j]['qualities'].length;i++){
			$('.qualities').append('<div class="form-group form-check">'+
							    '<input type="checkbox" name="qualitiesbox" value="'+i+'" class="form-check-input" id="checkbox'+i+'">'+
							    '<label class="form-check-label" for="checkbox">'+boxes['box'+j]['qualities'][i]+'</label>'+
							  '</div>');
		}
		$('.subjects').html('');
		for(var i=0;i < boxes['box'+j]['subjects'].length;i++){
			$('.subjects').append('<div class="form-group form-check">'+
							    '<input type="checkbox" name="subjectsbox" value="'+i+'" class="form-check-input" id="checkbox'+i+'">'+
							    '<label class="form-check-label" for="checkbox">'+boxes['box'+j]['subjects'][i]+'</label>'+
							  '</div>');
		}
	}

	function activitiesbox(){
		var data = [];
		$("input[name='activitiesbox']:checked").each(function(){
			data.push($(this).val());
		});
		return data;
	}

	function qualitiesbox(){
		var data = [];
		$("input[name='qualitiesbox']:checked").each(function(){
			data.push($(this).val());
		});
		return data;
	}

	function subjectsbox(){
		var data = [];
		$("input[name='subjectsbox']:checked").each(function(){
			data.push($(this).val());
		});
		return data;
	}


	var point = [];
	var first = 0;
	var second = 0;
	var third = 0;
	var firstid = 0;
	var secondid = 0;
	var thirdid = 0;

	function saveData(l){
		if(l != firstid){
			if(l != secondid){
				if(!fullData['subjectsbox'+l]){
					fullData['subjectsbox'+l] = [];
				}
				if(!fullData['qualitiesbox'+l]){
					fullData['qualitiesbox'+l] = [];
				}
				if (!fullData['activitiesbox'+l]) {
					fullData['activitiesbox'+l] = [];
				}
				var pointCount = 0;
				
				for (var m = 0; m < fullData['activitiesbox'+l].length; m++) {
					var avar = boxes['box'+l]['activities'][fullData['activitiesbox'+l][m]];
					if(m == 0){
						console.log('BOX'+l);
						console.log('Activities that describe what I like to do:');
					}
					console.log(avar);
					pointCount++;
				}
				if(pointCount != 0){
					console.log('-------------------------------------------');
				}
				for (var m = 0; m < fullData['qualitiesbox'+l].length; m++) {
					var avar = boxes['box'+l]['qualities'][fullData['qualitiesbox'+l][m]];
					if(m == 0){
						console.log('BOX'+l);
						console.log('Subjects that I like:');
					}
					console.log(avar);
					pointCount++;
				}
				if(pointCount != 0){
					console.log('-------------------------------------------');
				}
				for (var m = 0; m < fullData['subjectsbox'+l].length; m++) {
					var avar = boxes['box'+l]['subjects'][fullData['subjectsbox'+l][m]];
					
					if(m == 0){
						console.log('BOX'+l);
						console.log('Subjects that I like:');
					}
					console.log(avar);
					pointCount++;			
				}
				if(pointCount != 0){
					console.log('-------------------------------------------');
				}
				point[l] = pointCount;
				if(pointCount > first){
					first = pointCount;
					firstid = l;
				}
				else if(pointCount > second){
					second = pointCount;
					secondid = l;
				}
				else if(pointCount > third){
					third = pointCount;
					thirdid = l;
				}
				if(l >= 15){
					$('.order'+firstid).addClass('first');
					$('.order'+secondid).addClass('second');
					$('.order'+thirdid).addClass('third');
				}
			}
		}
		$('.order'+l+' .count').html(pointCount);
	}

	var fullData = [];
	$('.next').on('click',function(e){
		if(k <= 16){
			$('#box').removeClass('deactivebox');
			$('#box0').addClass('deactivebox');
			
			if(k >= 1){
				fullData['activitiesbox'+k] = activitiesbox();
				fullData['qualitiesbox'+k] = qualitiesbox();
				fullData['subjectsbox'+k] = subjectsbox();
			}
			
			
			k++;
			if(k <= 16){
				writeData(j);
				j++;
			}
			
			$('.previous').prop('disabled',null);
		}
		if(k == 17){
			$('#bodydata').addClass('deactivebox');
			$('#closedata').removeClass('deactivebox');
			for (var l = 1; l < 17; l++) {				
				saveData(l);
			}
			for (var l = 1; l < 17; l++) {				
				saveData(l);
			}
			for (var l = 1; l < 17; l++) {				
				saveData(l);
			}
		}
		if(k==16){
			$('.next').html('Finish');
			$('.previous').html('Back');
		}
	});

	$('.previous').on('click',function(e){
		$('.next').prop('disabled',null);
		if(k == 16){
			$('.next').html('Next');
			$('.previous').html('Previous');
		}
		if(k > 0){
			j--; writeData(j); k--;
		}
		if(k==0){
			$('#box').addClass('deactivebox');
			$('#box0').removeClass('deactivebox');
			$('.previous').prop('disabled',1);
		}
	});
});