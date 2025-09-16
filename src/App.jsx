import { useState } from "react";
import taverneirosNomes from "./assets/taverneiros-nomes.json";
import taverneirosSobrenomes from "./assets/taverneiros-sobrenomes.json";
import personalidades from "./assets/personalidades.json";
import aparicoes from "./assets/aparicoes.json";
import segredos from "./assets/segredos.json";
import TavernGenerator from "./components/TavernGenerator";
import PromptGenerator from "./components/PromptGenerator";

export default function App() {
  const [results, setResults] = useState({
    taverneiro: { nome: null, sobrenome: null },
    personalidade: null,
    aparicao: null,
    segredo: null,
    taverna: null,
  });

  const rollTaverneiro = () => {
    setResults((prev) => ({
      ...prev,
      taverneiro: {
        nome: taverneirosNomes[
          Math.floor(Math.random() * taverneirosNomes.length)
        ],
        sobrenome:
          taverneirosSobrenomes[
            Math.floor(Math.random() * taverneirosSobrenomes.length)
          ],
      },
    }));
  };

  const rollPersonalidade = () => {
    setResults((prev) => ({
      ...prev,
      personalidade:
        personalidades[Math.floor(Math.random() * personalidades.length)],
    }));
  };

  const rollAparicao = () => {
    setResults((prev) => ({
      ...prev,
      aparicao: aparicoes[Math.floor(Math.random() * aparicoes.length)],
    }));
  };

  const rollSegredo = () => {
    setResults((prev) => ({
      ...prev,
      segredo: segredos[Math.floor(Math.random() * segredos.length)],
    }));
  };

  const rollAll = () => {
    rollTaverneiro();
    rollPersonalidade();
    rollAparicao();
    rollSegredo();
  };

  const hasAnyResult = () => {
    return (
      results.taverneiro.nome ||
      results.taverneiro.sobrenome ||
      results.personalidade ||
      results.aparicao ||
      results.segredo ||
      results.taverna
    );
  };

  const handleTavernaSorteada = (taverna) => {
    setResults((prev) => ({
      ...prev,
      taverna,
    }));
  };

  return (
    <div className="min-h-screen bg-amber-50 bg-opacity-50 flex flex-col items-center py-10 px-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-amber-900 mb-2 font-serif">
          🎲 Gerador de Tavernas e Taverneiros
        </h1>
        <p className="text-amber-700 italic">
          Forjando destinos em tabernas esquecidas
        </p>
      </div>

      {/* Container principal */}
      <div className="w-full max-w-6xl space-y-6">
        {/* Seção superior: Botões de sorteio e Sortear Tudo */}
        <div className="bg-amber-100 bg-opacity-90 shadow-xl rounded-2xl border-2 border-amber-200 p-6">
          <h2 className="text-2xl font-bold text-amber-900 mb-6 text-center font-serif">
            ⚔️ Ferramentas do Mestre
          </h2>

          {/* Botões de sorteio individuais */}
          <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={rollTaverneiro}
              className="px-6 py-4 bg-blue-200 text-blue-900 rounded-xl hover:bg-blue-300 transition-colors shadow-lg border-2 border-blue-400 font-medium"
            >
              <span className="text-2xl">🧔</span>
              <span className="block mt-1">Taverneiro</span>
            </button>
            <button
              onClick={rollPersonalidade}
              className="px-6 py-4 bg-purple-200 text-purple-900 rounded-xl hover:bg-purple-300 transition-colors shadow-lg border-2 border-purple-400 font-medium"
            >
              <span className="text-2xl">🎭</span>
              <span className="block mt-1">Personalidade</span>
            </button>
            <button
              onClick={rollAparicao}
              className="px-6 py-4 bg-emerald-200 text-emerald-900 rounded-xl hover:bg-emerald-300 transition-colors shadow-lg border-2 border-emerald-400 font-medium"
            >
              <span className="text-2xl">👀</span>
              <span className="block mt-1">Aparência</span>
            </button>
            <button
              onClick={rollSegredo}
              className="px-6 py-4 bg-red-200 text-red-900 rounded-xl hover:bg-red-300 transition-colors shadow-lg border-2 border-red-400 font-medium"
            >
              <span className="text-2xl">🤫</span>
              <span className="block mt-1">Segredo</span>
            </button>
          </div>

          {/* Botão Sortear Tudo */}
          <div className="text-center">
            <button
              onClick={rollAll}
              className="px-8 py-4 bg-green-800 text-green-100 rounded-xl hover:bg-green-900 transition-colors shadow-xl border-2 border-green-700 font-bold text-lg"
            >
              ⚔️ Sortear Tudo
            </button>
          </div>
        </div>

        {/* Resultados e Gerador de Tavernas */}
        <div className="flex flex-col md:flex-row gap-6 items-stretch">
          {/* Box de resultados principais */}
          <div className="flex-1">
            {hasAnyResult() && (
              <div className="p-6 bg-amber-100 bg-opacity-90 shadow-xl rounded-2xl border-2 border-amber-200 h-full">
                <h2 className="text-2xl font-bold text-amber-900 mb-6 text-center font-serif">
                  📜 Resultados Obtidos
                </h2>

                {(results.taverneiro.nome || results.taverneiro.sobrenome) && (
                  <div className="mb-4 p-4 bg-blue-200 bg-opacity-60 rounded-xl border-2 border-blue-300">
                    <h3 className="font-bold text-blue-900 text-lg mb-2">
                      🧔 Taverneiro
                    </h3>
                    {results.taverneiro.nome && (
                      <p className="font-semibold text-blue-800">
                        {results.taverneiro.nome}
                      </p>
                    )}
                    {results.taverneiro.sobrenome && (
                      <p className="text-blue-700">
                        {results.taverneiro.sobrenome}
                      </p>
                    )}
                  </div>
                )}

                {results.personalidade && (
                  <div className="mb-4 p-4 bg-purple-200 bg-opacity-60 rounded-xl border-2 border-purple-300">
                    <h3 className="font-bold text-purple-800 text-lg mb-2">
                      🎭 Personalidade
                    </h3>
                    <p className="text-purple-700">{results.personalidade}</p>
                  </div>
                )}

                {results.aparicao && (
                  <div className="mb-4 p-4 bg-emerald-200 bg-opacity-60 rounded-xl border-2 border-emerald-300">
                    <h3 className="font-bold text-emerald-800 text-lg mb-2">
                      👀 Aparência
                    </h3>
                    <p className="text-emerald-700">{results.aparicao}</p>
                  </div>
                )}

                {results.segredo && (
                  <div className="mb-4 p-4 bg-red-200 bg-opacity-60 rounded-xl border-2 border-red-300">
                    <h3 className="font-bold text-red-800 text-lg mb-2">
                      🤫 Segredo
                    </h3>
                    <p className="text-red-700">{results.segredo}</p>
                  </div>
                )}

                {results.taverna && (
                  <div className="mb-4 p-4 bg-indigo-200 bg-opacity-60 rounded-xl border-2 border-indigo-300">
                    <h3 className="font-bold text-indigo-800 text-lg mb-2">
                      🏰 Taverna
                    </h3>
                    <p className="font-semibold text-indigo-700">
                      {results.taverna.nome}
                    </p>
                    <p className="text-indigo-600">
                      <strong>Atmosfera:</strong> {results.taverna.atmosfera}
                    </p>
                    <p className="text-indigo-600">
                      <strong>Especialidade:</strong>{" "}
                      {results.taverna.especialidade}
                    </p>
                    <p className="text-indigo-600">
                      <strong>Preço:</strong> {results.taverna.preco}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Gerador de Tavernas */}
          <div className="flex-1">
            <TavernGenerator onTavernaSorteada={handleTavernaSorteada} />
          </div>
        </div>

        {/* Botão para abrir o modal de prompt */}
        <div className="mt-6">
          <PromptGenerator results={results} />
        </div>
      </div>
    </div>
  );
}
