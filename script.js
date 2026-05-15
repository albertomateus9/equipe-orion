const ITENS_POR_PAGINA = 5; // Mostra 5 turmas por vez na TV
let paginaAtual = 0;
let alternadorMidia = 0;

function inicializarPainel() {
    atualizarRelogio();
    setInterval(atualizarRelogio, 1000);

    document.getElementById("texto-corrido").textContent = textoRodapeUrgente;

    renderizarGradeAulas();
    alternarMidiaLateral();

    // Controle do Carrossel Automático da TV
    if (aulasDeHoje.length > ITENS_POR_PAGINA) {
        setInterval(proximaPaginaAulas, 8000); // Muda a página a cada 8 segundos
    }
    setInterval(alternarMidiaLateral, 6000); // Alterna mapas e avisos a cada 6 segundos
}

function renderizarGradeAulas() {
    const corpoTabela = document.getElementById("tabela-corpo");
    const indicadorPagina = document.getElementById("indicador-pagina");
    
    if (!corpoTabela) return;
    corpoTabela.innerHTML = "";

    const totalPaginas = Math.ceil(aulasDeHoje.length / ITENS_POR_PAGINA);
    if (indicadorPagina) {
        indicadorPagina.textContent = `PÁGINA ${paginaAtual + 1} DE ${totalPaginas}`;
    }

    const inicio = paginaAtual * ITENS_POR_PAGINA;
    const fim = inicio + ITENS_POR_PAGINA;
    const aulasVisiveis = aulasDeHoje.slice(inicio, fim);

    aulasVisiveis.forEach(aula => {
        const linha = document.createElement("tr");

        let classeLocal = "ambiente-padrao";
        if (aula.tipoAmbiente === "laboratorio") classeLocal = "ambiente-lab";
        if (aula.tipoAmbiente === "multimidia") classeLocal = "ambiente-multimidia";
        if (aula.tipoAmbiente === "cancelado") classeLocal = "ambiente-cancelado";

        linha.innerHTML = `
            <td class="txt-turma">${aula.turma}</td>
            <td class="txt-branco">${aula.materia}</td>
            <td>${aula.professor}</td>
            <td><span class="tag-local ${classeLocal}">${aula.localHoje}</span></td>
        `;
        corpoTabela.appendChild(linha);
    });
}

function proximaPaginaAulas() {
    const totalPaginas = Math.ceil(aulasDeHoje.length / ITENS_POR_PAGINA);
    paginaAtual = (paginaAtual + 1) % totalPaginas;
    renderizarGradeAulas();
}

function alternarMidiaLateral() {
    const container = document.getElementById("container-midia");
    if (!container) return;
    container.innerHTML = "";

    if (alternadorMidia === 0) {
        container.innerHTML = `
            <h3>AVISOS DA SECRETARIA</h3>
            <ul class="lista-avisos">
                ${avisosSecretaria.map(aviso => `<li>${aviso}</li>`).join("")}
            </ul>
        `;
        alternadorMidia = 1;
    } else {
        const indexMapa = (alternadorMidia - 1) % imagensMapas.length;
        container.innerHTML = `
            <h3>MAPA DE ORIENTAÇÃO</h3>
            <div class="wrapper-mapa">
                <img src="${imagensMapas[indexMapa]}" onerror="this.src='https://placehold.co/400x300/101622/66fcf1?text=EETEPA+Mapa'" class="img-mapa-tela">
            </div>
        `;
        
        if (indexMapa === imagensMapas.length - 1) {
            alternadorMidia = 0;
        } else {
            alternadorMidia++;
        }
    }
}

function atualizarRelogio() {
    const relogio = document.getElementById("relogio");
    const dataAtual = document.getElementById("data-atual");
    
    const agora = new Date();
    if (relogio) relogio.textContent = agora.toLocaleTimeString("pt-BR");
    
    if (dataAtual) {
        const opcoes = { weekday: 'long', day: 'numeric', month: 'long' };
        dataAtual.textContent = agora.toLocaleDateString("pt-BR", opcoes);
    }
}

window.onload = inicializarPainel;