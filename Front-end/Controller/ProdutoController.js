import Produto from "../Model/Produto"
import $ from 'jquery'

export function getInformacoesProduto(){
    const produto = new Produto()

    const hoje = new Date()

    produto.nome = document.getElementById('nome').value
    produto.valor = document.getElementById('valor').value
    produto.itemEspecial = $('#item-especial').is(':checked')
    produto.quantidade = document.getElementById('quantidade').value
    produto.dataEmissao = hoje
    produto.igredientes = document.getElementById('igredientes').value

    return produto
}

export function criarProduto(){
    const produto = new Produto()
    produto = getInformacoesProduto()

    produto.criarProduto(produto)
}

export function obterTodosProdutos() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'http://localhost:5021/api/Produtos/todos-produtos',
            type: 'GET',
            contentType: 'application/json',
            success: function(response) {
                console.log('Produtos obtidos com sucesso:', response);
                resolve(response);  
            },
            error: function(error) {+
                console.error('Erro ao obter produtos:', error);
                reject(error); 
            }
        });
    });
}


function obterIdProduto(){
    const container = document.getElementsByClassName('produtos-container')

    container.addEventListener('click', function(event){
        if (event.target.tagName === 'BUTTON') {
            const idDoBotao = event.target.id;

            return idDoBotao
        }
    })
}

export function deletar(){
    const id = obterIdProduto()

    Produto.deletar(id)
}

export function obterProdutoPorId(){
    const id = obterIdProduto()

    Produto.obterPorId(id)
}

