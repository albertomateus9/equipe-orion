// Configuração Oficial de Turmas - EETEPA Vilhena Alves

const aulasDeHoje = [
    // --- REDES DE COMPUTADORES ---
    { turma: "Redes P1 Noite", materia: "Arquitetura de Redes", professor: "Carlos Silva", localHoje: "Sala 102 (Padrão)", tipoAmbiente: "padrao" },
    { turma: "Redes P2 Noite", materia: "Cabeamento Estruturado", professor: "Roberto Dias", localHoje: "Laboratório de Redes", tipoAmbiente: "laboratorio" },
    { turma: "Redes P3 Noite", materia: "Segurança de Redes", professor: "Fernando Costa", localHoje: "Laboratório 2", tipoAmbiente: "laboratorio" },

    // --- TÉCNICO EM INFORMÁTICA ---
    { turma: "Informatica P1 Noite", materia: "Lógica de Programação", professor: "Alberto Gama", localHoje: "Laboratório 1", tipoAmbiente: "laboratorio" },
    { turma: "Informatica P2 Noite", materia: "Banco de Dados", professor: "Mariana Souza", localHoje: "Sala de Multimídia", tipoAmbiente: "multimidia" },
    { turma: "Informatica P3 Noite", materia: "Desenvolvimento Web", professor: "Ricardo Melo", localHoje: "Laboratório 3", tipoAmbiente: "laboratorio" },

    // --- ADMINISTRAÇÃO ---
    { turma: "Administração Noite", materia: "Gestão de Pessoas", professor: "Patricia Lima", localHoje: "Sala 204 (Padrão)", tipoAmbiente: "padrao" },

    // --- EVENTOS ---
    { turma: "Eventos Noite", materia: "Organização de Cerimonial", professor: "Aline Moraes", localHoje: "Auditório Principal", tipoAmbiente: "multimidia" }
];

// Avisos rotativos do lado direito
const avisosSecretaria = [
    "Alunos de Redes e Info: Obrigatório uso de sapato fechado nos laboratórios.",
    "Avisos de mudanças urgentes de sala devem ser reportados à coordenação.",
    "Biblioteca aberta hoje até às 21h45."
];

// Imagens dos mapas (Deixe imagens padrão na pasta ou comente se não tiver)
const imagensMapas = [
    "mapa_bloco_a.png",
    "mapa_laboratorios.png"
];

const textoRodapeUrgente = "EETEPA VILHENA ALVES | Atenção alunos: fiquem atentos ao painel de salas, o uso de laboratórios rotativos muda diariamente! | Tenham uma excelente aula.";