$(function () {

	console.log("load success");

	$('#btnReinstall').click(function(event) {
		event.preventDefault();

		if (validateForm()) {

			showLoading();

			$.ajax({
				type: "POST",
				url: "/api/validation/requestReinstall",
				data: $('#accessKey').val(),
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (r) {
					closeLoading();
					if(r.status == 'OK'){
						cleanForm();
						Swal.fire({
							icon: 'success',
							title: 'Update Successful',
							text: 'We have updated your access key and sent it to your email.'
						});
					}else{
						Swal.fire({
									icon: 'error',
									title: 'Error',
									text: r.message
								});
					}

				},
				error: function (r) {
					closeLoading();
					console.log(r);
					Swal.fire({
						icon: 'error',
						title: 'Register Error',
						text: 'Error to proccess Request Reseating.'
					});	
				},
				failure: function (r) {
					closeLoading();
					console.log(r);
					Swal.fire({
						icon: 'error',
						title: 'Register Error',
						text: 'Error to proccess Request Reseating.'
					});	
				}
			});
		}
	});
});

function validateForm() {
	var isValid = true;
	$("div#formReinstall :input").each(function () {
		var input = $(this)[0];
		input.classList.remove('is-invalid');
		input.classList.remove('is-valid');
		if (input.checkValidity() === false) {
			input.classList.add('is-invalid');
			isValid = false;
		} else {
			input.classList.add('is-valid');
		}
	});
	return isValid;
}

function cleanForm(){
	$('#accessKey').val('');
	$("div#formReinstall :input").each(function () {
		var input = $(this)[0];
		input.classList.remove('is-invalid');
		input.classList.remove('is-valid');
	});
}