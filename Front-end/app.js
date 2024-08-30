import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { getInformacoesProduto, criarProduto, obterTodosProdutos, deletar, obterProdutoPorId } from './Controller/ProdutoController';

// Função para adicionar uma linha à tabela
function adicionarLinhaTabela(produto) {
    // Obtém o corpo da tabela onde as linhas serão adicionadas
    const tabelaBody = document.querySelector('.produtos-container tbody');

    // Cria uma nova linha
    const novaLinha = document.createElement('tr');

    // Cria e adiciona as células à nova linha
    novaLinha.innerHTML = `
        <th scope="row">${produto.id}</th>
        <td>${produto.nome}</td>
        <td>${produto.quantidade}</td>
        <td>${produto.itemEspecial ? 'Sim' : 'Não'}</td>
        <td>${new Date(produto.dataEmissao).toLocaleDateString()}</td>
        <td></td> <!-- Deixa a célula de ingredientes em branco -->
        <td>
          <a href="#"><i class="bi bi-search"></i></a>
          <a href="#"><i class="bi bi-pencil-square" style="color: #008000;"></i></a>
          <a href="#"><i class="bi bi-x-circle" style="color: #ff0000;"></i></a>
        </td>
    `;

    // Adiciona a nova linha ao corpo da tabela
    tabelaBody.appendChild(novaLinha);
}

// Função para carregar e exibir todos os produtos
async function carregarProdutos() {
    try {
        // Obtém os produtos
        const produtos = await obterTodosProdutos();

        if (!produtos) {
            console.error('Nenhum produto encontrado.');
            return;
        }

        // Adiciona cada produto à tabela
        produtos.forEach(produto => adicionarLinhaTabela(produto));
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
    }
}

// Chama a função para carregar e exibir produtos quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', carregarProdutos);
