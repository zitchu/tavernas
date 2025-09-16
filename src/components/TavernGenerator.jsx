import { useState } from "react";
import tavernasCategorizadas from "../assets/tavernas-categorizadas.json";
import categoriasPreco from "../assets/categorias-preco.json";

export default function TavernGenerator({ onTavernaSorteada }) {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("todos");
  const [tavernaResultado, setTavernaResultado] = useState(null);

  // Mapeamento das categorias para as chaves corretas
  const categoryKeys = {
    "Suja/Decadente/Estrada": "suja_decadente_estrada",
    "Rústica/Modesta/Rural": "rustica_modesta_rural",
    "Popular/Animada/Tradicional": "popular_animada_tradicional",
    "Luxuosa/Nobre/Majestosa": "luxuosa_nobre_majestosa",
  };

  const sortearTaverna = () => {
    let tavernasDisponiveis = [];

    if (categoriaSelecionada === "todos") {
      // Junta todas as tavernas de todas as categorias
      Object.values(tavernasCategorizadas).forEach((categoria) => {
        tavernasDisponiveis = [...tavernasDisponiveis, ...categoria];
      });
    } else {
      // Usa a chave direta do JSON
      tavernasDisponiveis = tavernasCategorizadas[categoriaSelecionada] || [];
    }

    if (tavernasDisponiveis.length === 0) {
      console.error("Nenhuma taverna disponível para a categoria selecionada");
      return;
    }

    const randomIndex = Math.floor(Math.random() * tavernasDisponiveis.length);
    const resultado = tavernasDisponiveis[randomIndex];
    setTavernaResultado(resultado);

    if (onTavernaSorteada) {
      onTavernaSorteada(resultado);
    }
  };

  return (
    <div className="p-6 bg-amber-100 bg-opacity-90 shadow-xl rounded-2xl border-2 border-amber-200 h-full">
      <h2 className="text-2xl font-bold text-amber-900 mb-4 text-center font-serif">
        🏰 Gerador de Tavernas
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-amber-800 mb-2">
          Categoria da Taverna:
        </label>
        <select
          value={categoriaSelecionada}
          onChange={(e) => setCategoriaSelecionada(e.target.value)}
          className="w-full p-3 bg-amber-50 border-2 border-amber-300 rounded-lg text-amber-900 focus:outline-none focus:border-amber-500"
        >
          <option value="todos">Todas as Categorias</option>
          {categoriasPreco.map((categoria, index) => {
            const categoryKey = categoryKeys[categoria.categoria];
            return (
              <option key={index} value={categoryKey}>
                {categoria.categoria} ({categoria.preco_min}-
                {categoria.preco_max} {categoria.moeda})
              </option>
            );
          })}
        </select>
      </div>

      <button
        onClick={sortearTaverna}
        className="w-full px-6 py-3 bg-amber-700 text-amber-100 rounded-xl hover:bg-amber-800 transition-colors shadow-lg border-2 border-amber-600 font-bold mb-4"
      >
        🎲 Sortear Taverna
      </button>

      {tavernaResultado && (
        <div className="p-4 bg-amber-200 bg-opacity-60 rounded-xl border-2 border-amber-300">
          <h3 className="font-bold text-amber-900 text-lg mb-3">
            🏰 Taverna Sorteada
          </h3>
          <p className="font-semibold text-amber-800 text-xl mb-2">
            {tavernaResultado.nome}
          </p>
          <p className="text-amber-700 mb-1">
            <strong className="text-amber-800">Atmosfera:</strong>{" "}
            {tavernaResultado.atmosfera}
          </p>
          <p className="text-amber-700 mb-1">
            <strong className="text-amber-800">Especialidade:</strong>{" "}
            {tavernaResultado.especialidade}
          </p>
          <p className="text-amber-700">
            <strong className="text-amber-800">Preço por noite:</strong>{" "}
            {tavernaResultado.preco}
          </p>
        </div>
      )}

      <div className="mt-4 p-3 bg-amber-200 bg-opacity-50 rounded-lg border border-amber-300">
        <p className="text-sm text-amber-700 text-center">
          Escolha uma categoria ou sorteie entre todas as tavernas disponíveis
        </p>
      </div>
    </div>
  );
}
