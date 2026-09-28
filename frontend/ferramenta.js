const API = "http://localhost:8080";


document.addEventListener("DOMContentLoaded", () => {

    carregarDashboard();

});


async function carregarDashboard() {

    try {

        const respostaUsuarios =
            await fetch(`${API}/usuarios`);

        const respostaFerramentas =
            await fetch(`${API}/ferramentas`);

        const respostaEmprestimos =
            await fetch(`${API}/emprestimos`);


        const usuarios =
            await respostaUsuarios.json();

        const ferramentas =
            await respostaFerramentas.json();

        const emprestimos =
            await respostaEmprestimos.json();

        document.getElementById("totalUsuarios").textContent =
            usuarios.length;

        document.getElementById("resumoUsuarios").textContent =
            usuarios.length;



        document.getElementById("totalFerramentas").textContent =
            ferramentas.length;

        document.getElementById("resumoFerramentas").textContent =
            ferramentas.length;


        const disponiveis = ferramentas.filter(ferramenta => {

            return ferramenta.status &&
                ferramenta.status.toLowerCase() === "disponível";

        });


        document.getElementById("totalDisponiveis").textContent =
            disponiveis.length;

        document.getElementById("resumoDisponiveis").textContent =
            disponiveis.length;

        const ativos = emprestimos.filter(emprestimo => {

            return !emprestimo.data_devolucao;

        });


        document.getElementById("totalEmprestimosAtivos").textContent =
            ativos.length;

        document.getElementById("resumoEmprestimos").textContent =
            ativos.length;

        mostrarEmprestimos(emprestimos);


    } catch (erro) {

        console.error("Erro:", erro);

        alert(
            "Não foi possível conectar ao servidor."
        );

    }

}


function mostrarEmprestimos(emprestimos) {

    const tabela =
        document.getElementById("listaEmprestimos");


    tabela.innerHTML = "";


    if (emprestimos.length === 0) {

        tabela.innerHTML = `
            <tr>
                <td colspan="5">
                    Nenhum empréstimo cadastrado.
                </td>
            </tr>
        `;

        return;
    }


    const ultimos =
        emprestimos.slice(-5).reverse();


    ultimos.forEach(emprestimo => {

        const ativo =
            !emprestimo.data_devolucao;


        const status =
            ativo ? "Ativo" : "Devolvido";


        const classe =
            ativo ? "ativo" : "devolvido";


        const linha = document.createElement("tr");


        linha.innerHTML = `

            <td>
                ${emprestimo.id}
            </td>

            <td>
                Usuário ${emprestimo.usuario_id}
            </td>

            <td>
                Ferramenta ${emprestimo.ferramentas_id}
            </td>

            <td>
                ${formatarData(emprestimo.data_emprestimo)}
            </td>

            <td>

                <span class="status ${classe}">
                    ${status}
                </span>

            </td>

        `;


        tabela.appendChild(linha);

    });

}



function formatarData(data) {

    if (!data) {
        return "-";
    }


    const partes =
        data.split("-");


    if (partes.length !== 3) {
        return data;
    }


    return `${partes[2]}/${partes[1]}/${partes[0]}`;

}