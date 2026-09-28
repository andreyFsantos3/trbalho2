let usuarios = [];

document.addEventListener("DOMContentLoaded", () => {

    atualizarTabela(usuarios);
    atualizarCards();

    const formulario = document.getElementById("fomularioUsuario");

    if (formulario) {
        formulario.addEventListener("submit", function(event) {
            event.preventDefault();
            cadastrarUsuario();
        });
    }

});

function abriUmNovoCadastro() {

    const modal = document.getElementById("modelDeUsuario");

    if (modal) {
        modal.style.display = "block";
    }

}


function fecharCadastroUsuário() {

    const modal = document.getElementById("modelDeUsuario");

    if (modal) {
        modal.style.display = "none";
    }

    const formulario = document.getElementById("fomularioUsuario");

    if (formulario) {
        formulario.reset();
    }

}

function facharCadastroUsuario() {

    fecharCadastroUsuário();

}


function cadastrarUsuario() {

    const idInput = document.getElementById("idUsuario").value;
    const nomeInput = document.getElementById("nomeUsuario").value;
    const emailInput = document.getElementById("emailUsuario").value;
    const departamentoInput = document.getElementById("departamentoUsuario").value;

    const idExiste = usuarios.some(
        usuario => usuario.id == idInput
    );


    if (idExiste) {

        alert("Já existe um usuário cadastrado com este ID!");

        return;
    }


    const novoUsuario = {

        id: Number(idInput),

        nome: nomeInput,

        email: emailInput,

        departamento: departamentoInput

    };
    usuarios.push(novoUsuario);
    atualizarTabela(usuarios);
    atualizarCards();
    fecharCadastroUsuário();

}



function atualizarTabela(lista) {

    const tbody = document.getElementById("listaUsuario");



    if (!tbody) {
        return;
    }

    tbody.innerHTML = "";


    if (lista.length === 0) {

        tbody.innerHTML = `
            <tr>
                <td colspan="4" style="text-align: center;">
                    Nenhum usuário encontrado.
                </td>
            </tr>
        `;

        return;
    }


    lista.forEach(usuario => {

        const tr = document.createElement("tr");


        tr.innerHTML = `
            <td>${usuario.id}</td>

            <td>${usuario.nome}</td>

            <td>${usuario.email}</td>

            <td>${usuario.departamento}</td>
        `;


        tbody.appendChild(tr);

    });

}



function atualizarCards() {

    const totalUsuarios = usuarios.length;


    const elementoTotal =
        document.getElementById("totalUsuarios");


    if (elementoTotal) {

        elementoTotal.textContent = totalUsuarios;

    }

}


function pesquisarUsuario() {

    const campoPesquisa =
        document.getElementById("campoPesquisaUsuario");


    if (!campoPesquisa) {
        return;
    }

    const termo =
        campoPesquisa.value.toLowerCase();

    const usuariosFiltrados = usuarios.filter(usuario =>

        usuario.nome.toLowerCase().includes(termo) ||

        usuario.email.toLowerCase().includes(termo) ||

        usuario.departamento.toLowerCase().includes(termo) ||

        usuario.id.toString().includes(termo)

    );

    atualizarTabela(usuariosFiltrados);

}
