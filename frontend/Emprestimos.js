const API = "http://localhost:8080";

let emprestimos = [];

document.addEventListener("DOMContentLoaded", function () {

    console.log("Emprestimos.js carregado com sucesso.");

    carregarEmprestimos();

    const formulario = document.getElementById("formularioEmprestimos");

    if (formulario) {
        formulario.addEventListener("submit", cadastrarEmprestimo);
    }

    const campoPesquisa = document.getElementById("campoPesquisaEmprestimo");

    if (campoPesquisa) {
        campoPesquisa.addEventListener("input", pesquisaEmprestimo);
    }
});
async function carregarEmprestimos() {

    try {

        console.log("Buscando empréstimos...");

        const resposta = await fetch(`${API}/emprestimos`);

        if (!resposta.ok) {
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }

        emprestimos = await resposta.json();

        console.log("Empréstimos carregados:", emprestimos);

        atualizarCards();

        mostrarEmprestimos(emprestimos);

    } catch (erro) {

        console.error("Erro ao carregar empréstimos:", erro);

        emprestimos = [];

        atualizarCards();

        const tabela = document.getElementById("ListaEmprestimos");

        if (tabela) {

            tabela.innerHTML = `
                <tr>
                    <td colspan="6">
                        Erro ao carregar empréstimos.
                    </td>
                </tr>
            `;
        }
    }
}
function mostrarEmprestimos(lista) {

    const tabela = document.getElementById("ListaEmprestimos");

    if (!tabela) {
        console.error("Elemento ListaEmprestimos não encontrado.");
        return;
    }

    tabela.innerHTML = "";

    if (!lista || lista.length === 0) {

        tabela.innerHTML = `
            <tr>
                <td colspan="6">
                    Nenhum empréstimo cadastrado.
                </td>
            </tr>
        `;

        return;
    }

    lista.forEach(function (emprestimo) {

        const status = emprestimo.data_devolucao
            ? "Devolvido"
            : "Ativo";

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${emprestimo.id ?? "-"}</td>

            <td>${emprestimo.usuario_id ?? "-"}</td>

            <td>${emprestimo.ferramentas_id ?? "-"}</td>

            <td>${formatarData(emprestimo.data_emprestimo)}</td>

            <td>${formatarData(emprestimo.data_devolucao)}</td>

            <td>
                <span class="status ${status.toLowerCase()}">
                    ${status}
                </span>
            </td>
        `;

        tabela.appendChild(linha);
    });
}
function atualizarCards() {

    const total = emprestimos.length;

    const ativos = emprestimos.filter(function (emprestimo) {

        return !emprestimo.data_devolucao;

    }).length;

    const devolvidos = emprestimos.filter(function (emprestimo) {

        return !!emprestimo.data_devolucao;

    }).length;


    const totalElement = document.getElementById("totalEmprestimos");

    const ativosElement = document.getElementById("totalAtivos");

    const devolucaoElement = document.getElementById("totalDevolução");


    if (totalElement) {
        totalElement.textContent = total;
    }

    if (ativosElement) {
        ativosElement.textContent = ativos;
    }

    if (devolucaoElement) {
        devolucaoElement.textContent = devolvidos;
    }
}
function pesquisaEmprestimo() {

    const campo = document.getElementById("campoPesquisaEmprestimo");

    if (!campo) {
        return;
    }

    const pesquisa = campo.value.toLowerCase().trim();

    if (pesquisa === "") {

        mostrarEmprestimos(emprestimos);

        return;
    }


    const resultado = emprestimos.filter(function (emprestimo) {

        const usuario = String(
            emprestimo.usuario_id ?? ""
        ).toLowerCase();

        const ferramenta = String(
            emprestimo.ferramentas_id ?? ""
        ).toLowerCase();


        return (
            usuario.includes(pesquisa) ||
            ferramenta.includes(pesquisa)
        );

    });


    mostrarEmprestimos(resultado);
}
function abriNovoEmprestimo() {

    console.log("Abrindo formulário de novo empréstimo...");

    const modal = document.getElementById("modelDeEmprestimo");

    if (!modal) {

        console.error("Modal não encontrado.");

        return;
    }

    modal.classList.add("mostrar");

    const dataEmprestimo = document.getElementById("dataEmprestimo");

    if (dataEmprestimo && dataEmprestimo.value === "") {

        const hoje = new Date();

        const ano = hoje.getFullYear();

        const mes = String(
            hoje.getMonth() + 1
        ).padStart(2, "0");

        const dia = String(
            hoje.getDate()
        ).padStart(2, "0");


        dataEmprestimo.value = `${ano}-${mes}-${dia}`;
    }


    const campoID = document.getElementById("idEmprestimo");

    if (campoID) {
        campoID.focus();
    }
}
function fecharCadastro() {

    const modal = document.getElementById("modelDeEmprestimo");

    if (!modal) {
        return;
    }

    modal.classList.remove("mostrar");
}
function fecharCadastroEmprestimo() {

    const formulario = document.getElementById("formularioEmprestimos");

    if (formulario) {
        formulario.reset();
    }

    fecharCadastro();
}
async function cadastrarEmprestimo(event) {

    event.preventDefault();

    console.log("Iniciando cadastro de empréstimo...");


    const id = document.getElementById("idEmprestimo").value;

    const usuario = document.getElementById("usuarioEmprestimo").value;

    const ferramenta = document.getElementById("ferramentasEmprestimo").value;

    const dataEmprestimo = document.getElementById("dataEmprestimo").value;

    const dataDevolucao = document.getElementById("datadevolução").value;
    const novoEmprestimo = {

        id: Number(id),

        usuario_id: usuario,

        ferramentas_id: ferramenta,

        data_emprestimo: dataEmprestimo,

        data_devolucao: dataDevolucao || null
    };


    console.log(
        "Objeto enviado para o Spring Boot:",
        novoEmprestimo
    );


    try {

        const resposta = await fetch(
            `${API}/emprestimos`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(novoEmprestimo)
            }
        );


        console.log(
            "Status do servidor:",
            resposta.status
        );


        if (!resposta.ok) {

            const mensagemErro = await resposta.text();

            console.error(
                "Erro retornado pelo Spring Boot:",
                mensagemErro
            );

            throw new Error(
                `Erro HTTP ${resposta.status}`
            );
        }


        alert("Empréstimo cadastrado com sucesso!");


        fecharCadastroEmprestimo();
        await carregarEmprestimos();


    } catch (erro) {

        console.error(
            "Erro ao cadastrar empréstimo:",
            erro
        );

        alert(
            "Erro ao cadastrar empréstimo.\n\n" +
            "Abra o F12 do navegador para verificar o erro."
        );
    }
}
function formatarData(data) {

    if (!data) {
        return "-";
    }

    const partes = String(data).split("-");

    if (partes.length !== 3) {
        return data;
    }

    return (
        partes[2] +
        "/" +
        partes[1] +
        "/" +
        partes[0]
    );
}
document.addEventListener("click", function (event) {

    const modal = document.getElementById("modelDeEmprestimo");

    if (!modal) {
        return;
    }

    if (
        event.target === modal &&
        modal.classList.contains("mostrar")
    ) {

        fecharCadastro();
    }
});