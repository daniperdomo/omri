import React from "react";
import { Disclosure } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion"; // Importa Framer Motion

// Componente FAQItem (interno a Faq.jsx)
const FAQItem = ({ question, answer }) => {
  const lineas = answer
    ? answer.split("\n").filter((line) => line.trim() !== "")
    : [];

  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className="flex justify-between w-full py-4 text-lg font-semibold text-gray-900 hover:text-gray-700 focus:outline-none transition-colors duration-200">
            <span>{question}</span>
            <svg
              className={`${
                open ? "transform rotate-180" : ""
              } w-6 h-6 text-gray-500 hover:text-gray-700 transition-transform duration-200`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </Disclosure.Button>

          {/* Usamos AnimatePresence para animar la entrada y salida del panel */}
          <AnimatePresence>
            {open && (
              <Disclosure.Panel
                static
                as={motion.div}
                initial={{ opacity: 0, height: 0 }} // Estado inicial: invisible y sin altura
                animate={{ opacity: 1, height: "auto" }} // Estado final: visible y con altura automática
                exit={{ opacity: 0, height: 0 }} // Estado al cerrar: invisible y sin altura
                transition={{ duration: 0.3, ease: "easeInOut" }} // Duración y tipo de transición
                className="text-gray-700 text-lg overflow-hidden"
              >
                {lineas.length > 0 ? (
                  <ul className="list-disc pl-6 space-y-2">
                    {lineas.map((linea, index) => (
                      <li key={index}>{linea}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No hay información disponible.</p>
                )}
              </Disclosure.Panel>
            )}
          </AnimatePresence>
        </>
      )}
    </Disclosure>
  );
};

// Datos de las preguntas frecuentes
const faqData = [
  {
    question: "¿Venden productos originales?",
    answer: "Sí, en Omri contamos con productos de la mayor calidad posible."
  },
  {
    question: "¿Los productos Cubitt incluyen garantía?",
    answer: "Al realizar la compra de un producto de la marca Cubitt, le hacemos entrega de una garantía por defecto de fábrica, la duración es de 1 año."
  },
  // Añade más preguntas y respuestas según sea necesario
];

// Componente Faq
const Faq = () => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg">
      <h2 style={{ fontFamily: 'Amblas, sans-serif' }} className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">
        Preguntas Frecuentes
      </h2>
      <div className="space-y-4">
        {faqData.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
};

export default Faq;