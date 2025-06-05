const form = document.getElementById("form-itens"); //<form>
const itensInput = document.getElementById("receber-item"); //<input>

let listaDeItens = []

form.addEventListener("submit", function (event) { //Ao clilcar no botão submit do form
    event.preventDefault(); //Impede que algo aconteça
    //Ao escrever o item no input e clicar no botão, ele permanece na barra do input. Não some mais

    salvarItem(); //O item é salvo na lista
})

function salvarItem() {
    const comprasItem = itensInput.value; // comprasItem recebe o valor do input
    const checarDuplicado = listaDeItens.some((elemento) => elemento.valor.toUpperCase() === comprasItem.toUpperCase()); //Verifica se o item já existe na lista (true ou false)

    if (checarDuplicado) { //Se o item já existir na lista (true)
        alert("Item já adicionado!"); //Exibe um alerta    
    } else { //(false)
        listaDeItens.push({ //adiciona o novo item a lista
            valor: comprasItem // valor recebe o valor do input
        })
    }

    console.log(listaDeItens);
}
