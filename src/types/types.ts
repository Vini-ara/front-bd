export type Item = {
  id: number;
  descricao: string;
  categoria: string;
  dataAquisicao: Date;
  estadoConservacao: string;
  localizacao: string;
  url_foto_item: string;
  titulo?: string;
  nome_autor?: string;
  isbn?: string;
  numserie?: number;
};
