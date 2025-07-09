$(function() {
	console.log("load success");
	showLoading();
	$('#divSuccess').hide();
	$('#divError').hide();
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const tokenActivation = urlParams.get('key')
	if (tokenActivation != null) {
		$.ajax({
			type: "GET",
			url: "/api/validation/validateEmail/" + tokenActivation,
			data: null,
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function(r) {
				console.log(r);
				if (r.status == 'OK') {
					if (r.os == "1") {
						$('#btnIos').show();
						$('#btnWindows').hide();
					} else {
						$('#btnWindows').show();
						$('#btnIos').hide();
					}					
					$('#divSuccess').show();
		        	$('#divError').hide();	
					closeLoading();				
				}else{
				  $('#txtError').html(r.message);
				  $('#divError').show();
					closeLoading();
				}
			},
			error: function(r) {
				console.log(r);
				$('#txtError').html(r);
				$('#divError').show();
				closeLoading();
			},
			failure: function(r) {
				console.log(r);
				$('#txtError').html(r);
				$('#divError').show();
				closeLoading();
			}
		});


	} else {
		$('#divError').show();
		closeLoading();
	}




});