const form = document.getElementById("form-itens"); //form>input+button
const itensInput = document.getElementById("receber-item"); //input
const ulItens = document.getElementById("lista-de-itens"); //"lista de compras"
const ulItensComprados = document.getElementById("itens-comprados");//"comprados" (checked)

let listaDeItens = []

let itemAEditar

// AO CLICAR NO BOTÃO "SALVAR ITEM" DO FORMULÁRIO
form.addEventListener("submit", function (event) {
    event.preventDefault(); // evitar que o formulário recarregue a página ao ser enviado

    salvarItem(); //1°: O item é salvo na lista listaDeItens
    mostrarItem(); //2°: O item é renderizado na tela
    itensInput.focus(); //3°: O cursor volta para o input
})

// SALVAR ITEM EM listaDeItens
function salvarItem() {
    const comprasItem = itensInput.value; // comprasItem = valor do input (item inserido pelo usuário)
    const checarDuplicado = listaDeItens.some((elemento) => elemento.valor.toUpperCase() === comprasItem.toUpperCase()); //Verifica se o item já existe na lista listaDeItens (true ou false)

    if (checarDuplicado) { //Se o item já existir na lista (true)
        alert("Item já adicionado!"); //Exibe um alerta    
    } else { //(false)
        listaDeItens.push({ //adiciona o novo item na lista
            valor: comprasItem, // valor recebe o nome do item
            checar: false //item ainda não foi checked (recebe o valor false)
        });
    }

    itensInput.value = ""; //Limpa o input após a verificação e adição do item
}

// EXIBIR ITENS EM "LISTA DE COMPRAS" OU "COMPRADOS"
function mostrarItem() {

// LIMPA LISTAS PARA EVITAR DUPLICAÇÃO DE ITENS
    ulItens.innerHTML = "";
    ulItensComprados.innerHTML = "";

// RENDERIZAÇÃO DOS ITENS
    listaDeItens.forEach((elemento, index) => { //para cada item adicionado em listaDeItens
        if (elemento.checar) { //Se o item já foi comprado (checar = true), criar HTML em  "Comprados"
            ulItensComprados.innerHTML += 
            `<li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
                <div>
                    <input type="checkbox" checked class="is-clickable" />  
                    <span class="itens-comprados is-size-5">${elemento.valor}</span>
                </div>
                <div>
                    <i class="fa-solid fa-trash is-clickable deletar"></i>
                </div>
            </li>`
        } else { // Se não (checar = false), criar HTML em "Lista de compras"
            ulItens.innerHTML += 
            `<li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
                <div>
                    <input type="checkbox" class="is-clickable" />
                    <input type="text" class="is-size-5" value="${elemento.valor}" ${index !== Number(itemAEditar) ? 'disabled' : ''}></input> 
                </div>

                <div>
                    ${ index === Number(itemAEditar) ? '<button onclick="salvarEdicao()"><i class="fa-regular fa-floppy-disk is-clickable"></i></button>' : '<i class="fa-regular is-clickable fa-pen-to-square editar"></i>'}
                    <i class="fa-solid fa-trash is-clickable deletar"></i>
                </div>
            </li>`
        }
    });

// CHECKBOXES ("Comprados")
    const inputsCheck = document.querySelectorAll('input[type="checkbox"]'); //checkbox

    inputsCheck.forEach(i => { //Para cada checkbox (i)
        i.addEventListener("click", (evento) => { //Ao clicar no checkbox
            const valorDoElemento = evento.target.parentElement.parentElement.getAttribute('data-value'); //valorDoElemento = índice do item que foi checked, na listaDeItens

            listaDeItens[valorDoElemento].checar = evento.target.checked; //atualiza a propriedade "checar" do item do indice, na listaDeItens para o valor do checkbox (checked ou não)

            mostrarItem(); //Renderiza novamente a lista com o item atualizado que foi checado
        })
    });

// DELETAR ITENS
    const deletarObjetos = document.querySelectorAll(".deletar"); //botão deletar

    deletarObjetos.forEach(i => { //Para cada lixeira (i)
        i.addEventListener("click", (evento) => { //Ao clicar na lixeira
            valorDoElemento = evento.target.parentElement.parentElement.getAttribute('data-value'); //valorDoElemento = índice do item que foi deletado, na listaDeItens
            listaDeItens.splice(valorDoElemento, 1); //remove (splice) o item da listaDeItens

            mostrarItem(); //Renderiza novamente a lista sem o item que foi deletado
        })
    });

// EDITAR ITENS
    const editarItens = document.querySelectorAll(".editar"); //botão editar

    editarItens.forEach(i => { //Para cada botão editar (i)
        i.addEventListener("click", (evento) => { //Ao clicar em editar
            itemAEditar = evento.target.parentElement.parentElement.getAttribute('data-value'); //itemAEditar = índice do item que foi clicado/editar, na listaDeItens

            mostrarItem(); //Renderiza novamente a lista com o item atualizado que foi editado
        })
    });
}

// SALVAR ITEM EDITADO
function salvarEdicao() {
    //Ao clicar no icone de edição (onClick="salvarEdicao()")
    const itemEditado = document.querySelector(`[data-value="${itemAEditar}"] input[type="text"]`); //item editado recebe o valor do input do item que foi editado (com data-value igual ao indice do item)
    listaDeItens[itemAEditar].valor = itemEditado.value; //atualiza o valor do item na listaDeItens com o valor do input editado
    itemAEditar = -1; //o indice do item editado (itemAEditar) = -1 (indices começam em 0, então -1 significa que nenhum item está sendo editado no momento)
    mostrarItem(); //Renderiza novamente a lista com o item atualizado que foi editado
}