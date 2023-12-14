export type Item = {
  id: number;
  descricao: string;
  categoria: string;
  dataAquisicao: Date;
  estadoConservacao: string;
  localizacao: string;
  url_foto_de_item: string;
  titulo?: string;
  nome_autor?: string;
  isbn?: string;
  numSerie?: number;
};

export type ItemReturn = {
  id: number;
  descricao: string;
  categoria: string;
  dataaquisicao: string;
  estadoconservacao: string;
  localizacao: string;
  url_foto_de_item: string;
  titulo?: string;
  nome_autor?: string;
  isbn?: string;
  numserie?: number;
};

export type emprestimoCreate = {
  id_item: number;
  id_usuario: number;
  data_emprestimo: string;
  data_devolucao: string;
};

export type emprestimoReturn = {
  id_emprestimo: string;
  id_item: string;
  id_usuario: string;
  data_emprestimo: string;
  data_devolucao: string;
  status: string;
};
