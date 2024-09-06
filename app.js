// Função para escapar HTML
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

// Seleciona o campo de pesquisa e o botão de pesquisa
let campoPesquisa = document.getElementById('campo-pesquisa');
let botaoPesquisa = document.querySelector('button[type="submit"]');

// Exibe os dados na página
const contentDiv = document.getElementById('content');
dados.forEach(dado => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('item');
    itemDiv.innerHTML = `<strong>${dado.titulo}</strong><p>${dado.descricao}</p> <a href="${dado.link}" target="_blank">Leia mais sobre ${dado.titulo}</a>
    `;
    contentDiv.appendChild(itemDiv);
});

// Adiciona um ouvinte de evento para o botão de pesquisa
botaoPesquisa.addEventListener('click', function(event) {
    event.preventDefault(); // Impede o envio do formulário padrão
    
    let consulta = campoPesquisa.value.trim().toLowerCase(); // Obtém o valor do campo de pesquisa e remove espaços em branco
    
    if (consulta) {
        // Remove o destaque existente
        document.querySelectorAll('.item').forEach(element => {
            element.innerHTML = element.innerHTML.replace(/<mark class="highlight">|<\/mark>/g, '');
        });

        // Destaca o texto encontrado
        document.querySelectorAll('.item').forEach(element => {
            const textoOriginal = element.innerHTML;
            const textoDestacado = textoOriginal.replace(new RegExp(`(${consulta})`, 'gi'), '<mark class="highlight">$1</mark>');
            element.innerHTML = textoDestacado;
        });
    } else {
        alert('Por favor, digite uma busca.');
    }
});
