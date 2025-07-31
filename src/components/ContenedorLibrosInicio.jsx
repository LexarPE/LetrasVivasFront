import Libro from "./ContenedorLibro";

export default function ContainerBookHome({ title, books, limite = true, verificacion }) {
  return (
    <div className="flex justify-center px-5 ">
      <div className="w-max lg:w-4xl ">
        <h3 className="font-semibold pb-2 md:text-[20px]">{title}</h3>
        <div className="grid grid-cols-2 justify-self-center sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-5 md:gap-1 bg-white py-5 px-3 rounded-xl">
          {books.length > 0 ? (
            limite ? (
              books
                .slice(0, 5)
                .map((l, i) => <Libro libro={l} key={i} auth={verificacion} />)
            ) : (
              books.map((l, i) => (
                <Libro libro={l} key={i} auth={verificacion} />
              ))
            )
          ) : (
            <p>No hay libros disponibles.</p>
          )}
        </div>
      </div>
    </div>
  );
}
