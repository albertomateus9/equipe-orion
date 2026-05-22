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

// Imagens dos mapas
const imagensMapas = [
    "mapa_bloco_a.png",
    "mapa_laboratorios.png"
];

const textoRodapeUrgente = "EETEPA VILHENA ALVES | Atenção alunos: fiquem atentos ao painel de salas, o uso de laboratórios rotativos muda diariamente! | Tenham uma excelente aula.";

// Banco de Dados de Alunos para Simulação de Frequência (Carteirinha RFID/NFC)
const alunosMatriculados = [
    { id: "1001", nome: "Ana Beatriz Souza", turma: "Redes P1 Noite", avatarBg: "#ff007f", iniciais: "AB" },
    { id: "1002", nome: "Carlos Henrique Lima", turma: "Redes P2 Noite", avatarBg: "#00f2ff", iniciais: "CH" },
    { id: "1003", nome: "Daniela Santos Cruz", turma: "Redes P3 Noite", avatarBg: "#39ff14", iniciais: "DS" },
    { id: "1004", nome: "Eduardo Rocha Costa", turma: "Informatica P1 Noite", avatarBg: "#ffc107", iniciais: "ER" },
    { id: "1005", nome: "Fernanda Ribeiro", turma: "Informatica P2 Noite", avatarBg: "#9c27b0", iniciais: "FR" },
    { id: "1006", nome: "Gustavo Nogueira", turma: "Informatica P3 Noite", avatarBg: "#4caf50", iniciais: "GN" },
    { id: "1007", nome: "Isabela Oliveira", turma: "Administração Noite", avatarBg: "#e91e63", iniciais: "IO" },
    { id: "1008", nome: "João Victor Silva", turma: "Eventos Noite", avatarBg: "#00bcd4", iniciais: "JV" },
    { id: "1009", nome: "Lucas Ferreira", turma: "Redes P1 Noite", avatarBg: "#ff5722", iniciais: "LF" },
    { id: "1010", nome: "Mariana Alencar", turma: "Informatica P2 Noite", avatarBg: "#03a9f4", iniciais: "MA" },
    { id: "1011", nome: "Rodrigo Carvalho", turma: "Informatica P3 Noite", avatarBg: "#8bc34a", iniciais: "RC" },
    { id: "1012", nome: "Beatriz M. Santos", turma: "Redes P3 Noite", avatarBg: "#e040fb", iniciais: "BS" }
];