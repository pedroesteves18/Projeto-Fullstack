

document.addEventListener("DOMContentLoaded", function(){

    var caixaEntrada = document.getElementById("entrada")
    var botaoEntrada = document.getElementById("botaoBusca")

    botaoEntrada.addEventListener('click', function(){
        getCidade(caixaEntrada.value)
    })
})


var cidades = []

function getCidade(cidade){

    const xhr = new XMLHttpRequest()
    xhr.open('GET', `https://wft-geo-db.p.rapidapi.com/v1/geo/places?namePrefix=${cidade}`, true)
    xhr.setRequestHeader("x-rapidapi-host", 'wft-geo-db.p.rapidapi.com')
    xhr.setRequestHeader("x-rapidapi-key",'41fd8fb333mshf25dc5b0353d429p1146c1jsn49b5f408504e')

    xhr.onload = function(){
        if(xhr.status === 200){
            let cidade = JSON.parse(xhr.responseText)
            cidades.push(cidade.data)
            console.log(cidades)
        } else {
            console.log(xhr.statusText)
        }
    }

    xhr.onerror = function(){
        console.log("erro 1")
    }

    xhr.send()
}