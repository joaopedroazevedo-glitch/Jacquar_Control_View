export enum StatusTear {
  OPERACIONAL = 'Operacional',
  PARADO = 'Parado',
  MANUTENCAO = 'Manutenção',
  SETUP = 'Troca de Artigo'
}

export interface Tear {
  id: number;
  nome: string;
  status: StatusTear;
  cliente: string;
  tipoArtigo: string;
  numeroInterno: string;
  fimPrevisto: string; // ISO String date
  eficiencia: number; // 0-100
  descricao: string; // Campo para observações/situações
  prioritario: boolean; // Indica se é uma produção prioritária
}