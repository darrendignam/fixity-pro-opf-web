$(function () {

	console.log("load success");

	$('#btnRegister').click(function(event) {
		event.preventDefault();

		if (validateForm()) {

			showLoading();

			var data = {
				'email': $('#txtEmailRegister').val(),
				'operatingSystem': $('#txtOpetaringSystem').val(),
				'name': $('#txtFullName').val(),
				'org': $('#txtOrganization').val()
			};

			var json = JSON.stringify(data);
			$.ajax({
				type: "POST",
				url: "/api/subcription/save",
				data: json,
				contentType: "application/json; charset=utf-8",
				dataType: "json",

				success: function (r) {
					closeLoading();
					if(r.id != null){
						cleanForm();

						Swal.fire({
							icon: 'success',
							title: 'Successful Registration',
							text: 'We have sent an activation link to your account to continue with the registration process.'
						});
					}else{
						Swal.fire({
							icon: 'error',
							title: 'Register Error',
							text: 'Error to proccess register.'
						});
					}
					
				},
				error: function (r) {
					closeLoading();
					console.log(r);

					Swal.fire({
							icon: 'error',
							title: 'Register Error',
							text: 'Error to proccess register.'
						});					
				},
				failure: function (r) {
					closeLoading();
					console.log(r);

					Swal.fire({
							icon: 'error',
							title: 'Register Error',
							text: 'Error to proccess register.'
						});					
				}
			});
		}
	});
});

function validateForm() {
	var isValid = true;

	$("div#formRegister :input").each(function () {
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
	$('#txtEmailRegister').val('');
	$('#txtOpetaringSystem').val('2');//windows default
	$('#txtFullName').val('');
	$('#txtOrganization').val('');
	$("div#formRegister :input").each(function () {
		var input = $(this)[0];
		input.classList.remove('is-invalid');
		input.classList.remove('is-valid');
	});
}