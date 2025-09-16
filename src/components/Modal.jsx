export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-amber-100 border-4 border-amber-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b-4 border-amber-700 bg-amber-600">
          <h2 className="text-xl font-bold text-amber-100 font-serif">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-amber-200 hover:text-amber-50 text-3xl font-bold transition-colors"
            aria-label="Fechar"
          >
            ╳
          </button>
        </div>

        <div className="p-6 bg-amber-50">{children}</div>

        <div className="h-2 bg-amber-800 rounded-b-lg"></div>
      </div>
    </div>
  );
}
