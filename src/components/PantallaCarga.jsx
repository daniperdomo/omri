import React from "react"

const PantallaCarga = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {/* Contenedor de la imagen giratoria */}
      <div className="animate-spin-slow">
        <img
          src="/images/isotipofondoblanco.webp" // Ruta de la imagen
          alt="Cargando..."
          className="w-32 h-32" // Tamaño de la imagen aumentado
        />
      </div>
    </div>
  );
};

export default PantallaCarga;