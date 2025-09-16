// components/PromptGenerator.jsx
import { useState } from "react";
import Modal from "./Modal";

export default function PromptGenerator({ results }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const generatePrompt = () => {
    const elements = [
      results.taverneiro.nome && `TAVERNEIRO: ${results.taverneiro.nome} ${results.taverneiro.sobrenome || ''}`,
      results.personalidade && `PERSONALIDADE: ${results.personalidade}`,
      results.aparicao && `APARÊNCIA: ${results.aparicao}`,
      results.segredo && `SEGREDO: ${results.segredo}`,
      results.taverna && `TAVERNA: ${results.taverna.nome} (${results.taverna.atmosfera}) - ESPECIALIDADE: ${results.taverna.especialidade}`
    ].filter(Boolean);

    if (elements.length === 0) {
      return "Gere alguns resultados primeiro para criar um prompt!";
    }

    return `CRIE UM BACKGROUND CONCISO PARA TAVERNEIRO DE RPG MEDIEVAL FANTÁSTICO.

ELEMENTOS CHAVE:
${elements.join('\n')}

INSTRUÇÕES:
- Gênero: Fantasia medieval sombria (D&D, The Witcher)
- Extensão: 150-200 palavras (conciso mas narrativo)
- Tom: Maduro, visceral, com nuances psicológicas
- Foco: Coerência narrativa com os elementos fornecidos

ESTRUTURA:
1. ORIGEM (background familiar e social)
2. JORNADA (como se tornou taverneiro)
3. MANIFESTAÇÕES (como os traços influenciam seu cotidiano)
4. TENSÃO (conflito interno/externo do segredo)
5. ASPIRAÇÃO (objetivo ou medo oculto)

DIRETRIZES CRÍTICAS:
- Priorize profundidade psicológica sobre extensão
- Use detalhes sensoriais (sons, cheiros, textures)
- Mantenha verossimilhança no mundo fantástico
- Explore como o ambiente da taverna reflete seu caráter
- Finalize com uma ironia ou paradoxo característico`;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatePrompt());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Falha ao copiar: ', err);
    }
  };

  const hasResults = () => {
    return results.taverneiro.nome || results.personalidade || results.aparicao || results.segredo || results.taverna;
  };

  return (
    <>
      {/* Botão para abrir o modal */}
      <button
        onClick={() => setIsModalOpen(true)}
        disabled={!hasResults()}
        className="w-full px-8 py-4 bg-amber-700 text-amber-100 rounded-xl hover:bg-amber-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors shadow-lg border-2 border-amber-600 font-bold text-lg flex items-center justify-center gap-3"
      >
        📜 Gerar Prompt para IA
      </button>

      {/* Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="📜 Pergaminho do Sábio"
      >
        {!hasResults() ? (
          <p className="text-amber-700 italic text-center py-4">Gere alguns resultados primeiro para criar um prompt!</p>
        ) : (
          <>
            <div className="mb-6 p-4 bg-amber-200 rounded-lg border-2 border-amber-300">
              <div className="text-sm text-amber-900 whitespace-pre-wrap font-mono leading-relaxed">
                {generatePrompt()}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <button
                onClick={copyToClipboard}
                className="flex-1 px-6 py-3 bg-green-700 text-green-100 rounded-lg hover:bg-green-800 transition-colors shadow-md border-2 border-green-600 font-medium flex items-center justify-center gap-2"
              >
                {copied ? '✅ Copiado!' : '📋 Copiar Pergaminho'}
              </button>
            </div>

            <div className="p-4 bg-amber-300 rounded-lg border-2 border-amber-400">
              <h3 className="font-bold text-amber-900 mb-3 text-lg">💡 Sabedoria do Mestre:</h3>
              <ol className="text-amber-800 list-decimal list-inside space-y-2 text-sm">
                <li>Copie o pergaminho acima</li>
                <li>Cole em seu oráculo favorito (ChatGPT, Claude, etc.)</li>
                <li>Aguarde a magia da criação</li>
                <li>Use este NPC em suas aventuras!</li>
              </ol>
            </div>
          </>
        )}
      </Modal>
    </>
  );
}