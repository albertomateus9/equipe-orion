const ITENS_POR_PAGINA = 5; // Mostra 5 turmas por vez na TV
let paginaAtual = 0;
let alternadorMidia = 0;

// Configurações de Frequência
const recentSwipes = [];
const MAX_SWIPES = 5;

function inicializarPainel() {
    atualizarRelogio();
    setInterval(atualizarRelogio, 1000);

    const textoCorridoEl = document.getElementById("texto-corrido");
    if (textoCorridoEl) {
        textoCorridoEl.textContent = textoRodapeUrgente;
    }

    renderizarGradeAulas();
    alternarMidiaLateral();

    // Setup Frequência
    popularDropdownAlunos();
    seedInitialSwipes();
    setupSwipeListeners();
    setupThemeToggle();
    startAutoSwipeSimulation();

    // Controle do Carrossel Automático da TV
    if (aulasDeHoje.length > ITENS_POR_PAGINA) {
        setInterval(proximaPaginaAulas, 8000); // Muda a página a cada 8 segundos
    }
    setInterval(alternarMidiaLateral, 6000); // Alterna mapas e avisos a cada 6 segundos
}

/* ==========================================================================
   ALOCAÇÃO DE SALAS
   ========================================================================== */
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

/* ==========================================================================
   CARROSSEL DE MÍDIA LATERAL
   ========================================================================== */
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

/* ==========================================================================
   RELÓGIO & DATA
   ========================================================================== */
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

/* ==========================================================================
   MÓDULO DE FREQUÊNCIA & SIMULAÇÃO RFID
   ========================================================================== */
function popularDropdownAlunos() {
    const studentSelect = document.getElementById("student-select");
    if (!studentSelect || typeof alunosMatriculados === "undefined") return;

    studentSelect.innerHTML = alunosMatriculados.map(aluno => 
        `<option value="${aluno.id}">${aluno.nome} (${aluno.turma})</option>`
    ).join("");
}

function playSwipeBeep() {
    try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;
        const ctx = new AudioContextClass();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = "sine";
        osc.frequency.setValueAtTime(920, ctx.currentTime); // High-pitched clean beep
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start();
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
        osc.stop(ctx.currentTime + 0.13);
    } catch (e) {
        console.warn("Web Audio API blocked or unsupported:", e);
    }
}

function registerSwipe(studentId, direction) {
    if (typeof alunosMatriculados === "undefined") return;
    const student = alunosMatriculados.find(aluno => aluno.id === studentId);
    if (!student) return;

    const now = new Date();
    const timeStr = now.toLocaleTimeString("pt-BR");

    const newSwipe = {
        nome: student.nome,
        turma: student.turma,
        avatarBg: student.avatarBg,
        iniciais: student.iniciais,
        time: timeStr,
        direction: direction
    };

    // Prepend and limit size
    recentSwipes.unshift(newSwipe);
    if (recentSwipes.length > MAX_SWIPES) {
        recentSwipes.pop();
    }

    playSwipeBeep();
    renderSwipeFeed();
}

function renderSwipeFeed() {
    const feedFrequencia = document.getElementById("feed-frequencia");
    if (!feedFrequencia) return;

    if (recentSwipes.length === 0) {
        feedFrequencia.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 3rem 0;">Aguardando leitura de cartões...</div>`;
        return;
    }

    feedFrequencia.innerHTML = recentSwipes.map(s => {
        const statusClass = s.direction === "Entrada" ? "status-entrada" : "status-saida";
        return `
            <div class="feed-item">
                <div class="student-info-row">
                    <div class="student-avatar" style="background-color: ${s.avatarBg};">
                        ${s.iniciais}
                    </div>
                    <div class="student-name-box">
                        <h4>${s.nome}</h4>
                        <p>${s.turma}</p>
                    </div>
                </div>
                <div class="swipe-details">
                    <span class="swipe-time">${s.time}</span>
                    <span class="swipe-status-tag ${statusClass}">${s.direction}</span>
                </div>
            </div>
        `;
    }).join("");
}

function seedInitialSwipes() {
    if (typeof alunosMatriculados === "undefined") return;
    const copy = [...alunosMatriculados];
    
    // Seed 3 recent entries
    for (let i = 0; i < 3; i++) {
        if (copy.length === 0) break;
        const idx = Math.floor(Math.random() * copy.length);
        const student = copy.splice(idx, 1)[0];
        
        const now = new Date();
        now.setMinutes(now.getMinutes() - (i + 1) * 4); // Offset times (4m, 8m, 12m ago)
        const timeStr = now.toLocaleTimeString("pt-BR");

        recentSwipes.push({
            nome: student.nome,
            turma: student.turma,
            avatarBg: student.avatarBg,
            iniciais: student.iniciais,
            time: timeStr,
            direction: Math.random() > 0.4 ? "Entrada" : "Saída"
        });
    }
    renderSwipeFeed();
}

function setupSwipeListeners() {
    const btnSwipe = document.getElementById("btn-swipe");
    const studentSelect = document.getElementById("student-select");
    const swipeDirection = document.getElementById("swipe-direction");

    if (btnSwipe && studentSelect && swipeDirection) {
        btnSwipe.addEventListener("click", () => {
            const studentId = studentSelect.value;
            const direction = swipeDirection.value;
            registerSwipe(studentId, direction);
        });
    }
}

function startAutoSwipeSimulation() {
    setInterval(() => {
        const autoSimToggle = document.getElementById("auto-sim-toggle");
        if (autoSimToggle && autoSimToggle.checked && typeof alunosMatriculados !== "undefined") {
            const randomStudent = alunosMatriculados[Math.floor(Math.random() * alunosMatriculados.length)];
            const randomDirection = Math.random() > 0.35 ? "Entrada" : "Saída";
            registerSwipe(randomStudent.id, randomDirection);
        }
    }, 12000); // Swipe every 12 seconds
}

/* ==========================================================================
   TEMA CLARO E ESCURO
   ========================================================================== */
function setupThemeToggle() {
    const themeToggleBtn = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");
    if (!themeToggleBtn || !themeIcon) return;

    const savedTheme = localStorage.getItem("orion-theme") || "dark";
    document.documentElement.setAttribute("data-theme", savedTheme);
    updateThemeIcon(themeIcon, savedTheme);

    themeToggleBtn.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("orion-theme", newTheme);
        updateThemeIcon(themeIcon, newTheme);
    });
}

function updateThemeIcon(iconElement, theme) {
    if (theme === "light") {
        iconElement.className = "fa-solid fa-moon";
    } else {
        iconElement.className = "fa-solid fa-sun";
    }
}

window.onload = inicializarPainel;