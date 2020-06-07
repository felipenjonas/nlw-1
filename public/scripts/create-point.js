/*  Usaremos a api do ibge para deixar nossa aplicação inteligente 
    quando usarmos o formulario de estado e cidade (busca automático)
    referente ao estado selecionado
*/

function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then ( states => {
        for (const state of states) {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>` //Pega você mais você mesmo
        
        }
    } )
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    // limpar os campos (tratamento de lógica)
    citySelect.innerHTML = " <option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json() )
    .then( cities => {

        for( const city of cities ) {
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
    })
        citySelect.disabled = false
    } 


document    
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

//Itens de coleta
//pegar todos os li's
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

//let pois este array semrpe irá se sobre-escrever
let selectedItems = []

function handleSelectedItem(event) {
    //Implementa a estilização quando clicar, adicionando e removendo a classe selected
    const itemLi = event.target

    //adicionar ou remover uma classe com js
    itemLi.classList.toggle("selected")

    // dataset se refere ao data-id (no caso o "data").
    const itemId = event.target.dataset.id
   
    //verificar se existem itens selecionados
    // pegar os itens selecionados

    //Funções anônimas podem ser representas por arrowfunciton
    //Se a função anônima tiver somente 1 argumento, pode retirar dos () 
    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId //output is true or false
        return itemFound
    })
    // Se já selecioando (referente a posição do array de items)
    if( alreadySelected >= 0 ) {
        //tirar seleção
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId //false
            return itemIsDifferent
        })

        selectedItems = filteredItems
    } else {
        //Se não tiver, adicionar à seleção
        //Atualizar o campo escondido com os itens selecionados;
        selectedItems.push(itemId)
    }
    // console.log(selectedItems)
    
    //atualizar o campo escondido com os items selecionados
    collectedItems.value = selectedItems
}