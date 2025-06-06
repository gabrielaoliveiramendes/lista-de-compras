const form = document.getElementById("form-itens"); //<form>
const itensInput = document.getElementById("receber-item"); //<input>
const ulItens = document.getElementById("lista-de-itens"); //<ul>

let listaDeItens = []

form.addEventListener("submit", function (event) { //Ao clilcar em "salvar item"
    event.preventDefault(); // evitar que o formulário recarregue a página ao ser enviado

    salvarItem(); //O item é salvo na lista
    mostrarItem(); //O item é renderizado na tela
})

function salvarItem() {
    const comprasItem = itensInput.value; // comprasItem recebe o valor do input (nome do item)
    const checarDuplicado = listaDeItens.some((elemento) => elemento.valor.toUpperCase() === comprasItem.toUpperCase()); //Verifica se o item já existe na lista (true ou false)

    if (checarDuplicado) { //Se o item já existir na lista (true)
        alert("Item já adicionado!"); //Exibe um alerta    
    } else { //(false)
        listaDeItens.push({ //adiciona o novo item na lista
            valor: comprasItem // valor recebe o nome do item
        });
    }s

    console.log(listaDeItens);
}

function mostrarItem(){
    ulItens.innerHTML = ""; //Limpa o conteúdo da lista e só adiciona o novo item,e não a lista inteira

    listaDeItens.forEach((elemento,index) => { //para cada item da lista, criar um HTML <li>
        ulItens.innerHTML += `<li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
        <div>
            <input type="checkbox" class="is-clickable" />
            <input type="text" class="is-size-5" value="${elemento.valor}"></input> 
        </div>
        <div>
            <i class="fa-solid fa-trash is-clickable deletar"></i>
        </div>
    </li>`
    })
}