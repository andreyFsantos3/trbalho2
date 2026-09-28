
let ferramentas = [
    
];


document.addEventListener("DOMContentLoaded", () => {
    atualizarTabela(ferramentas);
    atualizarCards();
    const form = document.getElementById("formlarioFerramneta");
    if (form) {
        form.addEventListener("submit", function(event) {
            event.preventDefault();
            cadastrarFerramenta();
        });
    }
});

function abriCadastro() {
    const cadastroDiv = document.getElementById("cadastro");
    if (cadastroDiv) {
        cadastroDiv.style.display = "block";
    }
}

function fecharCadastro() {
    const cadastroDiv = document.getElementById("cadastro");
    if (cadastroDiv) {
        cadastroDiv.style.display = "none";
    }
   
    document.getElementById("formlarioFerramneta").reset();
}


function cadastrarFerramenta() {
    const idInput = document.getElementById("id").value;
    const nomeInput = document.getElementById("nome").value;
    const categoriaInput = document.getElementById("categoria").value;
    const statusInput = document.getElementById("status").value;

   
    const idExiste = ferramentas.some(f => f.id == idInput);
    if (idExiste) {
        alert("Já existe uma ferramenta cadastrada com este ID!");
        return;
    }

    
    const novaFerramenta = {
        id: Number(idInput),
        nome: nomeInput,
        categoria: categoriaInput,
        status: statusInput
    };

    ferramentas.push(novaFerramenta);
    atualizarTabela(ferramentas);
    atualizarCards();

    fecharCadastro();
}
function atualizarTabela(lista) {
    const tbody = document.getElementById("lista de Ferramentas");
    if (!tbody) return;

    tbody.innerHTML = "";

    if (lista.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" style="text-align: center;">Nenhuma ferramenta encontrada.</td></tr>`;
        return;
    }

    lista.forEach(ferramenta => {
        const tr = document.createElement("tr");
        
        tr.innerHTML = `
            <td>${ferramenta.id}</td>
            <td>${ferramenta.nome}</td>
            <td>${ferramenta.categoria}</td>
            <td><span class="status-badge ${ferramenta.status === 'disponível' ? 'disp' : 'uso'}">${ferramenta.status}</span></td>
        `;
        
        tbody.appendChild(tr);
    });
}

function atualizarCards() {
    const totalFerramentas = ferramentas.length;
    const totalDisponiveis = ferramentas.filter(f => f.status === "disponível").length;
    const totalEmUso = ferramentas.filter(f => f.status === "em uso").length;

    document.getElementById("totalFerramentas").textContent = totalFerramentas;
    document.getElementById("totalDisponiveis").textContent = totalDisponiveis;
    document.getElementById("totalEmUso").textContent = totalEmUso;
}
function pesquisarFerrementas() {
    const termo = document.querySelector("input[name='areaDepesquisa']").value.toLowerCase();
    
    const ferramentasFiltradas = ferramentas.filter(f => 
        f.nome.toLowerCase().includes(termo) || 
        f.categoria.toLowerCase().includes(termo) || 
        f.id.toString().includes(termo)
    );

    atualizarTabela(ferramentasFiltradas);
}