import $ from 'jquery'
class Produto {
    constructor(id, valor, quantidade, itemEspecial, nome, dataEmissao) {
        this.id = id
        this.valor = valor
        this.quantidade = quantidade
        this.itemEspecial = itemEspecial
        this.nome = nome
        this.dataEmissao = dataEmissao
        this.ingredientes = []
    }

    criarProduto(produto) {
        $.ajax({
            url: 'http://localhost:5021/api/Produtos',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                nome: produto.nome,
                valor: produto.valor,
                quantidade: produto.quantidade,
                itemEspecial: produto.itemEspecial,
                ingredientes: produto.ingredientes,
                dataEmissao: produto.dataEmissao
            }),
            success: function(response) {
                console.log('Produto criado com sucesso:', response);
            },
            error: function(error) {
                console.error('Erro ao criar o produto:', error);
            }
        });
    }

    deletar(id) {
        $.ajax({
            url: `http://localhost:5021/api/Produtos/delete/${id}`,
            type: 'DELETE',
            success: function() {
                console.log('Produto deletado com sucesso');
            },
            error: function(error) {
                console.error('Erro ao deletar produto:', error);
            }
        });
    }

    atualizar(id, produto, nomeDeQuemAlterou) {
        $.ajax({
            url: `http://localhost:5021/api/Produtos/${id}?nomeDeQuemAlterou=${encodeURIComponent(nomeDeQuemAlterou)}`,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({
                nome: produto.nome,
                valor: produto.valor,
                quantidade: produto.quantidade,
                itemEspecial: produto.itemEspecial,
                ingredientes: produto.ingredientes,
                dataEmissao: produto.dataEmissao
            }),
            success: function(response) {
                console.log('Produto atualizado com sucesso:', response);
                alert('Produto atualizado com sucesso')
            },
            error: function(xhr, status, error) {
                console.error('Erro ao atualizar o produto:', xhr, status, error);
            }
        });
    }
}

export default Produto