import Produto from "../Model/Produto"
import $ from 'jquery'

export function criar(nome, valor, quantidade, itemEspecial, ingredientes){
    const dataEmissao = new Date()
    const produto = new Produto(null, valor, quantidade, itemEspecial, nome, dataEmissao)
    produto.ingredientes = ingredientes
    alert(JSON.stringify(
        produto
    ))

    produto.criarProduto(produto)
}

export function obterTodosProdutos() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'http://localhost:5021/api/Produtos/todos-produtos',
            type: 'GET',
            contentType: 'application/json',
            success: function(response) {
                console.log('Produtos obtidos com sucesso:', response)
                resolve(response)  
            },
            error: function(error) {
                console.error('Erro ao obter produtos:', error)
                reject(error) 
            }
        })
    })
}


export function deletar(produto){
    return new Promise((resolve, reject) => {
        try {
            const produtoDeletar = new Produto()
            produtoDeletar.id = produto.id
           
            produtoDeletar.deletar(produtoDeletar.id)

            resolve()
        } catch (error) {

            reject(error)
        }
    })
}

export function obterPorId(id) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `http://localhost:5021/api/Produtos/${id}`,
            type: 'GET',
            contentType: 'application/json',
            success: function(response) {
                console.log('Produto obtido com sucesso:', response)
                resolve(response)
            },
            error: function(error) {
                console.error('Erro ao obter produtos:', error)
                reject(error)
            }
        })
    })
}

export async function atualizar(id, nome, valor, quantidade, itemEspecial, ingredientes, alterador){
    const produtoAntigo = await obterPorId(id)
    const dataEmissao = produtoAntigo.dataEmissao
    const produto = new Produto(id, valor, quantidade, itemEspecial, nome, dataEmissao)
    produto.ingredientes = ingredientes

    produto.atualizar(id, produto, alterador)
}

