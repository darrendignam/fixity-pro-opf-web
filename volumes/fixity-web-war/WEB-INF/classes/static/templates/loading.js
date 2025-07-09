function showLoading(){
	Swal.fire({
        title: 'Please wait...',
        allowOutsideClick: false,
        willOpen: () => {
            Swal.showLoading()
        },
    });
}

function closeLoading(){
	swal.close();
}
	

