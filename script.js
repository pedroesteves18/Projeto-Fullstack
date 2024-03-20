var tokenAcesso = ''

function getToken(clientId, clientSecret) {

    const credenciais = btoa(clientId + ':' + clientSecret)
    var data = "grant_type=client_credentials";

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://accounts.spotify.com/api/token", true);
    xhr.setRequestHeader("Authorization", "Basic " + credenciais);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onload = function() {
        if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            var token = response.access_token;
            tokenAcesso = token;
            console.log(xhr.statusText);
        } else {
            console.log("erro: " ,xhr.statusText);
        }
    };

    xhr.onerror = function() {
        console.log(xhr.statusText);
    };

    xhr.send(data);
}

document.addEventListener("DOMContentLoaded", function(){
    var caixaClientId = document.getElementById("clientId")
    var caixaClientSecret = document.getElementById("clientSecret")
    var botaoToken = document.getElementById("botaoToken")


    botaoToken.addEventListener('click', function(){
        getToken(caixaClientId.value,caixaClientSecret.value)
        if(tokenAcesso != ''){
            const containerAPI = document.getElementById("API")
            const containerToken = document.getElementById("token")
        }
    })
})