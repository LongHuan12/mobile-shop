function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

const mes = ['Email or password is incorrect!'];

function checkErr(){
    if (getParameterByName('error') != null && getParameterByName('error').length > 0){
        if(getParameterByName('error')=='1'){
            document.getElementById('notiError').innerHTML=mes[0];
            document.getElementById('notiError').style.display='';
        }
    }
}