
//ITENS DE FORMULÁRIO

function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( (res) => {return res.json ()}) 
    .then( states => { 

        for(const state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>` 
        }

    } )
}


populateUFs()


function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const uf = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text 

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
 
    citySelect.innerHTML = true 
    citySelect.innerHTML = '<option>Selecione a cidade</option>' 

    fetch(url)
    .then( res => res.json ())
    .then( cities => {
        for(const city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>` 
        }

        citySelect.disabled = false

    } )
}

document
    .querySelector("select[name=uf]") 
    .addEventListener("change", getCities) 

//ITENS DE COLETA

const itemsToCollect = document.querySelectorAll(".items-grid li") 
for (const item of itemsToCollect){
    item.addEventListener("click",handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]") 

let selectedItems = []

function handleSelectedItem(event){
    const itemLi = event.target

    itemLi.classList.toggle("selected") 
    
    const itemId = itemLi.dataset.id
    //console.log(itemId)

    //verificar se existem itens selecionados, se sim, pega
    const alreadySelected = selectedItems.findIndex( item =>{
        const itemFound = item == itemId //se encontrar um item, verificar se é igual a um Id de item
        return itemFound
    })
    //se já está selecionado, tirar seleção
    if (alreadySelected >=0){
        const filteredItems = selectedItems.filter(item =>{
            const itemIsDifferent = item != itemId //se o item for igual, retorna false e manda remover do array
            return itemIsDifferent
        })
        selectedItems = filteredItems
    } else {
        //adicionar seleção
        selectedItems.push(itemId)
    }
    console.log(selectedItems)
    //atualizar o campo escondido com itens selecionados
    collectedItems.value = selectedItems
}