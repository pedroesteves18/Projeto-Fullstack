

document.addEventListener("DOMContentLoaded", function(){

    var caixaEntrada = document.getElementById("entrada")
    var botaoEntrada = document.getElementById("botaoBusca")

    botaoEntrada.addEventListener('click', function(){
        getCidade(caixaEntrada.value)
    })
})



function getCidade(local){
    const cidades = []
    const xhr = new XMLHttpRequest()
    xhr.open('GET', `https://wft-geo-db.p.rapidapi.com/v1/geo/places?namePrefix=${local}`, true)
    xhr.setRequestHeader("x-rapidapi-host", 'wft-geo-db.p.rapidapi.com')
    xhr.setRequestHeader("x-rapidapi-key",'41fd8fb333mshf25dc5b0353d429p1146c1jsn49b5f408504e')
    if (local === '') {
        let erro = document.getElementById('erro')
        erro.textContent = "caixa vazia!"
        return
    }
    xhr.onload = function(){
        if(xhr.status === 200){
            let cidade = JSON.parse(xhr.responseText)
            if(cidade.data.length === 0){
                let erro = document.getElementById('erro')
                erro.textContent = "local nao encontrado!"
                return
            }
            let erro = document.getElementById('erro')
            erro.textContent = ''
            const resultado = document.getElementById('resultado')
            resultado.textContent = ''
            for (let item in cidade.data){
                cidades.push(`Local: ${cidade.data[item].name}, População: ${cidade.data[item].population}, Região/Estado: ${cidade.data[item].region}, Latitude/Longitude: ${cidade.data[item].latitude}/${cidade.data[item].longitude}`)
            }
            for(i in cidades){
                console.log(cidades[i])
                const paragrafoCidade = document.createElement('p')
                paragrafoCidade.textContent = cidades[i]

                resultado.appendChild(paragrafoCidade)
            }
        } else{
            console.log(xhr.statusText)
        }
    }

    xhr.onerror = function(){
        console.log("erro 1")
    }
    xhr.send()
}