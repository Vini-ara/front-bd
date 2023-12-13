import { useEffect, useState } from "react";

type Item = {
  id_item: number;
  descricao: string;
  categoria: string;
  dataAquisicao: Date;
  estadoConservacao: string;
  localizacao: string;
  url_foto_item: string;
  titulo?: string;
  nome_autor?: string;
  isbn?: string;
  numSerie?: number;
};

export function GerenciarItems() {
  const [allItems, setAllItems] = useState<Item[]>([]);
  const [searchResults, setSearchResults] = useState<Item[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/livro")
      .then((data) => data.json())
      .then((data) => {
        setAllItems(data);
        setSearchResults(data);
        console.log(data);
      });
    fetch("http://localhost:3000/material-didatico")
      .then((data) => data.json())
      .then((data) => {
        setAllItems((prev) => [...prev, ...data]);
        setSearchResults((prev) => [...prev, ...data]);
        console.log(data);
      });
  }, []);

  return (
    <div className="mt-8 max-w-3xl m-auto">
      <h2 className="text-xl mb-2">Materiais:</h2>
      <ul>
        {searchResults.map((item) => (
          <li
            key={item.id}
            className="p-4 bg-secondary mb-4 rounded-xl cursor-pointer hover:brightness-90"
          >
            <p>{`Título: ${item.titulo} - Categoria: ${item.categoria} - Autor: ${item.nome_autor}`}</p>
          </li>
        ))}
      </ul>
      
    </div>
  );
}
