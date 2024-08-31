import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { criar, obterTodosProdutos, deletar, obterPorId, atualizar } from './Controller/ProdutoController'
import $ from 'jquery'

// Função para adicionar uma linha à tabela
function adicionarLinhaTabela(produto) {
    // Obtém o corpo da tabela onde as linhas serão adicionadas
    const tabelaBody = document.querySelector('.produtos-container tbody')

    if (!tabelaBody) {
        console.error('Elemento tbody não encontrado.')
        return
    }

    const novaLinha = document.createElement('tr')

    // Cria e adiciona as células à nova linha
    novaLinha.innerHTML = `
        <th scope="row">${produto.id}</th>
        <td>${produto.nome}</td>
        <td>${produto.quantidade}</td>
        <td>${produto.itemEspecial ? 'Sim' : 'Não'}</td>
        <td>${new Date(produto.dataEmissao).toLocaleDateString()}</td>
        <td>
          <!-- Botão para abrir o modal de ingredientes -->
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal-ingredientes-${produto.id}">
            Ingredientes
          </button>
          
          <!-- Modal de ingredientes -->
          <div class="modal fade" id="modal-ingredientes-${produto.id}" tabindex="-1" aria-labelledby="modalLabel-${produto.id}" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="modalLabel-${produto.id}">Lista de Ingredientes</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  ${produto.ingredientes.join(', ')}
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                </div>
              </div>
            </div>
          </div>
        </td>
        <td>
          <a href="editar.html?id=${produto.id}" style="margin-right: 1em; cursor: pointer;"><i class="bi bi-pencil-square" style="color: #008000"></i></a>
          <a href="#" class="delete-button" data-produto-id="${produto.id}"><i class="bi bi-x-circle" style="color: #ff0000"; cursor: pointer;></i></a>
        </td>
    `


    tabelaBody.appendChild(novaLinha)

    // Adiciona evento ao ícone de exclusão
    novaLinha.querySelector('.delete-button').addEventListener('click', function(event) {        
        if (confirm(`Tem certeza que deseja deletar o produto "${produto.nome}"?`)) {
            deletar(produto)
                .then(() => {
                    novaLinha.remove()
                    console.log(`Produto com ID ${produto.id} deletado com sucesso.`)
                })
                .catch(error => console.error(`Erro ao deletar o produto com ID ${produto.id}:`, error))
        }
    })
}

// Função para carregar e exibir todos os produtos
async function carregarProdutos() {
    try {
        const produtos = await obterTodosProdutos()

        if (!produtos) {
            console.error('Nenhum produto encontrado.')
            return
        }

        // Adiciona cada produto à tabela
        produtos.forEach(produto => adicionarLinhaTabela(produto))
    } catch (error) {
        console.error('Erro ao carregar produtos:', error)
    }
}

function pegarIdNaUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id');
}



async function preencherForm(){
  const id = pegarIdNaUrl()

  const produto = await obterPorId(id)

  document.getElementById('nome').value = produto.nome
  document.getElementById('valor').value = produto.valor
  if(produto.itemEspecial) document.getElementById('item-especial').checked = true
  document.getElementById('quantidade').value = produto.quantidade
  const ingredientes = produto.ingredientes.join(', ')
  document.getElementById('ingredientes').value = ingredientes
}

function obterParametroDaUrl(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}


function atualizarProduto(event) {
  // Previne o comportamento padrão do formulário (envio de dados e recarregamento da página)
  event.preventDefault();
  
  const id = pegarIdNaUrl()
  const nome = document.getElementById('nome').value;
  const valor = document.getElementById('valor').value
  const quantidade = document.getElementById('quantidade').value;
  const itemEspecial = $('#item-especial').is(':checked')
  const ingredientes = document.getElementById('ingredientes').value.split(',').map(ing => ing.trim()).filter(ing => ing !== "")
  const alterador = document.getElementById('nome-alterador').value


  atualizar(id, nome, valor, quantidade, itemEspecial, ingredientes, alterador)
}

function criarProduto(event) {
  // Previne o comportamento padrão do formulário (envio de dados e recarregamento da página)
  event.preventDefault();
  
  const nome = document.getElementById('nome').value;
  const valor = document.getElementById('valor').value
  const quantidade = document.getElementById('quantidade').value;
  const itemEspecial = $('#item-especial').is(':checked')
  const ingredientes = document.getElementById('ingredientes').value.split(',').map(ing => ing.trim()).filter(ing => ing !== "")


  criar(nome, valor, quantidade, itemEspecial, ingredientes)
}





// Chama a função apenas se a página for a index.html
if (window.location.pathname.endsWith('index.html')) {
  // Chama a função para carregar e exibir produtos quando o DOM estiver pronto
  // Sem isso a página carrega antes de obter os dados
  document.addEventListener('DOMContentLoaded', carregarProdutos);
}

// cadastrar.html
if (window.location.pathname.endsWith('cadastrar.html')) {
  document.getElementById('modificar-produto-form').addEventListener('submit', criarProduto);
}


// editar.html
// Verifica se a URL contém o parâmetro 'id'
if (obterParametroDaUrl('id')) {
  document.addEventListener('DOMContentLoaded', preencherForm);
  // Adiciona o evento submit ao formulário
  document.getElementById('modificar-produto-form').addEventListener('submit', atualizarProduto);
}



