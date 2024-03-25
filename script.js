var tokenAcesso = ''
var artista = ''


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
                const divExemplos = document.getElementById("Exemplos IDs")
                let megadeth = document.createElement('p')
                megadeth.textContent = 'Megadeth - 1Yox196W7bzVNZI7RBaPnf?si=S1o6LKbDQk2n2CRWgWBqxg'
                divExemplos.appendChild(megadeth)
                let metallica = document.createElement('p')
                metallica.textContent = 'Metallica - 2ye2Wgw4gimLv2eAKyk1NB?si=A29gfm4NTpq1knEX2ltDyA'
                divExemplos.appendChild(metallica)
                let sepultura = document.createElement('p')
                sepultura.textContent = 'Sepultura - 6JW8wliOEwaDZ231ZY7cf4?si=tMew0JLBSQOo-dNx_C3plw'
                divExemplos.appendChild(sepultura)
            }
            const containerToken = document.getElementById("token");
            containerToken.style.display = 'none';
        } else {
            console.log("erro: " ,xhr.statusText);
            let erro = document.getElementById('erro')
            if (clientId === '' && clientSecret === ''){
                erro.textContent = "Caixas vazias"
            } else if(clientId === '' && clientSecret != ''){
                erro.textContent = "Caixa clientID vazia"
            } else if(clientId != '' && clientSecret === ''){
                erro.textContent = "Caixa clientSecret vazia"
            } else {
                erro.textContent = "Erro na validação para token"
            }
        }
    };

    xhr.onerror = function() {
        console.log(xhr.statusText);
        let erro = document.getElementById('erro')
        erro.textContent = "Erro inesperado"
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
                "numeroSeguidores": artista.followers.total
            }

            artista = impArtista
            console.log(impArtista)
            let paragrafoArtista = document.getElementById('dadosArtista')
            paragrafoArtista.textContent = ''
            let nome = document.createElement('p')
            nome.textContent = impArtista.nome
            let generos = document.createElement('p')
            generos.textContent = impArtista.generos
            let numeroSeguidores = document.createElement('p')
            numeroSeguidores.textContent = impArtista.numeroSeguidores
            paragrafoArtista.appendChild(nome)
            paragrafoArtista.appendChild(generos)
            paragrafoArtista.appendChild(numeroSeguidores)
            let quebra = document.createElement('br')
            paragrafoArtista.appendChild(quebra)
            paragrafoArtista.appendChild(quebra)
            let caixaArtistaId = document.getElementById('artistaId')
            caixaArtistaId.value = ''
        } else {
            console.log("erro: ", xhr.statusText)
            let caixaArtistaId = document.getElementById('artistaId')
            if(caixaArtistaId.value === ''){
                let erro = document.getElementById('dadosArtista')
                erro.textContent = "caixa vazia!"
            } else {
                let erro = document.getElementById('dadosArtista')
                erro.textContent = "erro ao procurar Artista, tente um ID válido"
            }
            caixaArtistaId.value = ''
        }
    }

    xhr.onerror = function() {
        console.log(xhr.statusText)
        let erro = document.getElementById('dadosArtista')
        erro.textContent = "erro na validação do Token"
    }

    xhr.send()
}

document.addEventListener("DOMContentLoaded", function(){
    var caixaClientId = document.getElementById("clientId")
    var caixaClientSecret = document.getElementById("clientSecret")
    var caixaArtistaId = document.getElementById("artistaId")
    var botaoToken = document.getElementById("botaoToken")
    var botaoArtista = document.getElementById("botaoArtista")
    var botaoTokenGenerico = document.getElementById("botaoTokenGenerico")

    botaoTokenGenerico.addEventListener('click', function(){
        getToken("f2d3074ab739445e90c59c9ad847026f","eee918daaef54a188eeee3a31101df3f")
    })
    botaoToken.addEventListener('click', function(){
        getToken(caixaClientId.value,caixaClientSecret.value)
    })

    botaoArtista.addEventListener('click', function(){
        getArtista(caixaArtistaId.value)
    })

})