class Produto {
    constructor(id, valor, quantidade, itemEspecial, nome, dataEmissao) {
        this.id = id
        this.valor = valor
        this.quantidade = quantidade
        this.itemEspecial = itemEspecial
        this.nome = nome
        this.dataEmissao = dataEmissao
        this.igredientes = []
    }

    obterDadosPedidoIndividual(){
        let informacoes = [this.id, this.valor, this.quantidade, this.itemEspecial, this.nome, this.dataEmissao, this.igredientes]

        return informacoes
    }

    criarProduto(produto) {
        $.ajax({
            url: 'http://localhost:5017/api/Produtos',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(produto),
            success: function(response) {
                console.log('Produto criado com sucesso:', response);
            },
            error: function(error) {
                console.error('Erro ao criar o produto:', error);
            }
        });
    }

    obterTodosProdutos() {
        $.ajax({
            url: 'http://localhost:5017/api/Produtos/todos-produtos',
            type: 'GET',
            contentType: 'application/json',
            success: function(response) {
                console.log('Produtos obtidos com sucesso:');
                return response
            },
            error: function(error) {
                console.error('Erro ao obter produtos:', error);
            }
        });
    }

    obterPorId(id) {
        $.ajax({
            url: `http://localhost:5017/api/Produtos/${id}`,
            type: 'GET',
            contentType: 'application/json',
            success: function(response) {
                console.log('Produto obtido com sucesso:', response);
                return response
            },
            error: function(error) {
                console.error('Erro ao obter produtos:', error);
            }
        });
    }

    deletar(id) {
        $.ajax({
            url: `http://localhost:5017/api/Produtos/delete/${id}`,
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
            url: `http://localhost:5017/api/Produtos/${id}`,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({
                nome: produto.nome,
                valor: produto.valor,
                quantidade: produto.quantidade,
                itemEspecial: produto.itemEspecial,
                ingredientes: produto.ingredientes,
                nomeDeQuemAlterou: nomeDeQuemAlterou
            }),
            success: function(response) {
                console.log('Produto atualizado com sucesso:', response);
                // Atualizar a interface ou exibir uma mensagem de sucesso
            },
            error: function(xhr, status, error) {
                console.error('Erro ao atualizar o produto:', error);
            }
        });
    }
}

export default Produto