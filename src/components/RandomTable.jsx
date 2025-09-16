import { useState } from "react";

export default function RandomTable({ title, data }) {
  const [result, setResult] = useState({ nome: null, sobrenome: null });

  const rollNome = () => {
    const randomIndex = Math.floor(Math.random() * data.nomes.length);
    setResult(prev => ({
      ...prev,
      nome: data.nomes[randomIndex]
    }));
  };

  const rollSobrenome = () => {
    if (data.sobrenomes && data.sobrenomes.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.sobrenomes.length);
      setResult(prev => ({
        ...prev,
        sobrenome: data.sobrenomes[randomIndex]
      }));
    }
  };

  const rollTudo = () => {
    const randomNomeIndex = Math.floor(Math.random() * data.nomes.length);
    let randomSobrenomeIndex = null;
    
    if (data.sobrenomes && data.sobrenomes.length > 0) {
      randomSobrenomeIndex = Math.floor(Math.random() * data.sobrenomes.length);
    }
    
    setResult({
      nome: data.nomes[randomNomeIndex],
      sobrenome: randomSobrenomeIndex !== null ? data.sobrenomes[randomSobrenomeIndex] : null
    });
  };

  return (
    <div className="p-4 bg-white rounded-2xl shadow mb-4">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      
      <div className="mb-2">
        {result.nome || result.sobrenome ? (
          <div>
            <p className="text-gray-700 font-semibold">
              {result.nome || <span className="text-gray-400 italic">Nenhum nome sorteado</span>}
            </p>
            {data.sobrenomes && data.sobrenomes.length > 0 && (
              <p className="text-gray-600">
                {result.sobrenome || <span className="text-gray-400 italic">Nenhum sobrenome sorteado</span>}
              </p>
            )}
          </div>
        ) : (
          <p className="text-gray-400 italic">Nada sorteado ainda...</p>
        )}
      </div>

      <div className="flex gap-2 flex-wrap">
        <button
          onClick={rollNome}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
        >
          Sortear {data.sobrenomes && data.sobrenomes.length > 0 ? "Nome" : "Item"}
        </button>
        
        {data.sobrenomes && data.sobrenomes.length > 0 && (
          <button
            onClick={rollSobrenome}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm"
          >
            Sortear Sobrenome
          </button>
        )}
        
        <button
          onClick={rollTudo}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
        >
          Sortear Tudo
        </button>
      </div>
    </div>
  );
}