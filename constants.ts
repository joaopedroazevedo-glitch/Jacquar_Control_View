import { Tear, StatusTear } from './types';

const generateFutureDate = (hoursToAdd: number) => {
  const date = new Date();
  date.setHours(date.getHours() + hoursToAdd);
  return date.toISOString();
};

export const INITIAL_TEARES: Tear[] = [
  {
    id: 1,
    nome: "Tear #01",
    status: StatusTear.OPERACIONAL,
    cliente: "Confecções Silva",
    tipoArtigo: "Damasco Floral",
    numeroInterno: "INT-2024-001",
    fimPrevisto: generateFutureDate(4),
    eficiencia: 92,
    descricao: "",
    prioritario: false
  },
  {
    id: 2,
    nome: "Tear #02",
    status: StatusTear.OPERACIONAL,
    cliente: "Têxteis do Norte",
    tipoArtigo: "Brocatel Ouro",
    numeroInterno: "INT-2024-045",
    fimPrevisto: generateFutureDate(12),
    eficiencia: 88,
    descricao: "",
    prioritario: true
  },
  {
    id: 3,
    nome: "Tear #03",
    status: StatusTear.PARADO,
    cliente: "Moda Lisboa",
    tipoArtigo: "Gobelin Vintage",
    numeroInterno: "INT-2024-012",
    fimPrevisto: generateFutureDate(1),
    eficiencia: 0,
    descricao: "A aguardar fio trama azul 30/2",
    prioritario: true
  },
  {
    id: 4,
    nome: "Tear #04",
    status: StatusTear.MANUTENCAO,
    cliente: "N/A",
    tipoArtigo: "N/A",
    numeroInterno: "MAN-99",
    fimPrevisto: generateFutureDate(48),
    eficiencia: 0,
    descricao: "Substituição de rolamentos do motor principal",
    prioritario: false
  },
  {
    id: 5,
    nome: "Tear #05",
    status: StatusTear.OPERACIONAL,
    cliente: "Zara Home",
    tipoArtigo: "Linho Jacquard",
    numeroInterno: "INT-2024-102",
    fimPrevisto: generateFutureDate(6),
    eficiencia: 95,
    descricao: "",
    prioritario: false
  },
  {
    id: 6,
    nome: "Tear #06",
    status: StatusTear.SETUP,
    cliente: "Hotelaria Premium",
    tipoArtigo: "Toalha Mesa 300f",
    numeroInterno: "INT-2024-150",
    fimPrevisto: generateFutureDate(2),
    eficiencia: 40,
    descricao: "Afinação de teia em curso",
    prioritario: false
  },
  {
    id: 7,
    nome: "Tear #07",
    status: StatusTear.OPERACIONAL,
    cliente: "Confecções Silva",
    tipoArtigo: "Damasco Floral",
    numeroInterno: "INT-2024-002",
    fimPrevisto: generateFutureDate(5),
    eficiencia: 91,
    descricao: "",
    prioritario: false
  },
  {
    id: 8,
    nome: "Tear #08",
    status: StatusTear.OPERACIONAL,
    cliente: "Têxtil Ave",
    tipoArtigo: "Seda Sintética",
    numeroInterno: "INT-2024-088",
    fimPrevisto: generateFutureDate(24),
    eficiencia: 85,
    descricao: "Atenção: verificação de tensão periódica necessária",
    prioritario: true
  },
  {
    id: 9,
    nome: "Tear #09",
    status: StatusTear.PARADO,
    cliente: "Decora Interiores",
    tipoArtigo: "Veludo Lavrado",
    numeroInterno: "INT-2024-200",
    fimPrevisto: generateFutureDate(0),
    eficiencia: 0,
    descricao: "Fim de peça. Aguarda ordem de produção.",
    prioritario: false
  },
  {
    id: 10,
    nome: "Tear #10",
    status: StatusTear.OPERACIONAL,
    cliente: "Export France",
    tipoArtigo: "Tapete Parede",
    numeroInterno: "INT-2024-330",
    fimPrevisto: generateFutureDate(72),
    eficiencia: 98,
    descricao: "",
    prioritario: false
  }
];