import { product } from "./products.js";

//alert('Desenvolvido por: Fernando Mendes Neto')

const menuCategory = document.querySelectorAll('.menu-categorias')
let valorTotal = 0


function montarProduto(id, nome, ingredientes, preco, imagem) {
  return `
  <div data-idproduct = "${id} "title="${ingredientes}" class="menu-categoria-opcoes">
    <p class="nome-aa">${nome}</p>
    <img class="imgcardapio"src="${imagem}" alt="">
    <div class="adicionar-ao-pedido">Adicionar</div>
    <p>R$${preco.toFixed(2)}</p>
  </div>`
}

function carregarCardapio(categoriaSelecionada) {
  const menuEscolha = document.querySelector('.flex-display-menu1')

  const listaProdutosMenu = product.reduce(function (produtctList, { id, nome, categoria, ingredientes, preco, imagem }) {

    if (categoriaSelecionada === 'all') {
      produtctList += montarProduto(id, nome, ingredientes, preco, imagem)
    }
    if (categoriaSelecionada === categoria) {
      produtctList += montarProduto(id, nome, ingredientes, preco, imagem)
    }
    return produtctList
  }, '')

  menuEscolha.innerHTML = listaProdutosMenu
  adicionarEventoProdutosCardapio()
}
localStorage.setItem('pedido', '')
adicionarEventoMenu()
activedMenu()
carregarCardapio('all')

function adicionarEventoMenu() {
  menuCategory.forEach(category => {
    category.addEventListener('click', (event) => {
      carregarCardapio(event.currentTarget.dataset.category)
    })
  })
}

function activedMenu() {
  menuCategory.forEach(categorySelected => {
    categorySelected.addEventListener('click', function () {
      menuCategory.forEach(btn => btn.classList.remove('active'))
      this.classList.add('active')
    })
  });
}

function montarDivPedido(id, preco, imagem) {
  valorTotal = valorTotal + preco
  document.getElementById('valor-total-final').innerHTML = valorTotal.toFixed(2)
  console.log(valorTotal.toFixed(2))
  return `
    <div class="pedido-adicionado">
      <img class="img-pedido" src="${imagem}">
      <p>R$${preco.toFixed(2)}</p>
      <p>x</p>
      <input class = "${id}"type="number" value="1" min="1" max="99">
      <p></p>
    </div>
    `
}


const localDosPedidos = document.querySelector('.scroll-pedido')
let listaDePedidos = ''

function montarPedido(idSelectedProduct) {

  const selectedProduct = product.find(function (product) {
    return Number(idSelectedProduct) === product.id
  })

  listaDePedidos = listaDePedidos + montarDivPedido(selectedProduct.id, selectedProduct.preco, selectedProduct.imagem)


  localDosPedidos.innerHTML = listaDePedidos
}


const productLocalStorage = JSON.stringify(localStorage.getItem('pedido')) || []

function adicionarPedidoAoLocalStorage(idSelectedProduct) {

  const selectedProduct = product.find(function (product) {
    return Number(idSelectedProduct) === product.id 
  })

  productLocalStorage.push(selectedProduct)
  localStorage.setItem('pedido', JSON.stringify(productLocalStorage))
}
function adicionarEventoProdutosCardapio() {
  const menuCategoryOptions = document.querySelectorAll('.menu-categoria-opcoes')
  menuCategoryOptions.forEach(products => {
    products.addEventListener('click', function (event) {

      const idSelectedProduct = event.currentTarget.dataset.idproduct

      adicionarPedidoAoLocalStorage(idSelectedProduct)
      montarPedido(idSelectedProduct)
    })
  })
}