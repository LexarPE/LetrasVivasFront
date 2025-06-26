

export default function ToggleLink({ mode, onToggle }) {
  return (
    <p className="mt-4 text-center">
      <button
        type="button"
        onClick={onToggle}
        className="text-blue-600 hover:underline"
      >
        {mode === "register" ? "Iniciar sesión" : "Crear cuenta"}
      </button>
    </p>
  );
}
