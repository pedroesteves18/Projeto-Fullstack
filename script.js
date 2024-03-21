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
            if (tokenAcesso !== '') {
                const containerAPI = document.getElementById("API");
                containerAPI.style.display = 'block';
            }
            const containerToken = document.getElementById("token");
            containerToken.style.display = 'none';
        } else {
            console.log("erro: " ,xhr.statusText);
        }
    };

    xhr.onerror = function() {
        console.log(xhr.statusText);
    };

    xhr.send(data);
}

function getArtista(id){

    var xhr = new XMLHttpRequest()
    xhr.open("GET", `https://api.spotify.com/v1/artists/${id}`,true)
    xhr.setRequestHeader("Authorization", `Bearer ${tokenAcesso}`)

    xhr.onload = function() {
        if(xhr.status === 200){
            let artista = JSON.parse(xhr.responseText)
            let impArtista = {
                "nome": artista.name,
                "generos": artista.genres,
                "numeroSeguidores": artista.followers
            }
            console.log(impArtista)
        } else {
            console.log("erro: ", xhr.statusText)
        }
    }

    xhr.onerror = function() {
        console.log(xhr.statusText)
    }

    xhr.send()
}

document.addEventListener("DOMContentLoaded", function(){
    var caixaClientId = document.getElementById("clientId")
    var caixaClientSecret = document.getElementById("clientSecret")
    var caixaArtistaId = document.getElementById("artistaId")
    var botaoToken = document.getElementById("botaoToken")
    var botaoArtista = document.getElementById("botaoArtista")

    botaoToken.addEventListener('click', function(){
        getToken(caixaClientId.value,caixaClientSecret.value)
    })

    botaoArtista.addEventListener('click', function(){
        getArtista(caixaArtistaId.value)
    })


})