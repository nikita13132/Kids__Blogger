$(document).ready(function(){
    $('.header__burg').click(function(event){
        $('.header__burg, .header__nav').toggleClass('active');
        $('body').toggleClass('lock');
        $('.header__main').toggleClass('hidden');
    });
});

document.addEventListener('DOMContentLoaded', function (){
    const form = document.getElementById('form');
    form.addEventListener('submit', fromSend);

    async function fromSend(e){
        e.preventDefault();

        let error = formValidate(form);
        let formData = new FormData(form);

        if (error === 0){
            let response = await fetch('sendmail.php', {
                method:'POST',
                body:formData
            });
            if(response.ok){
                let result = await response.json();
                alert(result.message);
                form.reset();
            }else{
                alert("Ошибка");
            }
        }else{
            alert('Заполните пустые поля');
        }
    }

    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('.__req')

        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            formRemoveError(input);

            if(input.classList.contains('_email')){
                if(emailTest(input)){
                    formAddError(input);
                    error++;
                }
            }else {
                if(input.value === ''){
                    formAddError(input);
                    error++;
                }
            }
        }
        return error;
    }
    function formAddError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }

    function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }
    function emailTest(input){
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }
});