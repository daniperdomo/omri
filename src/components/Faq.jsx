import React from "react";
import { Disclosure } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";

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

          <AnimatePresence>
            {open && (
              <Disclosure.Panel
                static
                as={motion.div}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
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

const faqData = [
  {
    question: "¿Venden productos originales?",
    answer: "Sí, en Omri contamos con productos de la mayor calidad posible."
  },
  {
    question: "¿Los productos Cubitt incluyen garantía?",
    answer: "Al realizar la compra de un producto de la marca Cubitt, le hacemos entrega de una garantía por defecto de fábrica, la duración es de 1 año."
  },
  {
    question: "¿Puedo reservar productos que actualmente están agotados?",
    answer: `Sí, ofrecemos un servicio de reserva para productos temporalmente agotados. Para solicitarlo: 
    
    Contáctenos a través de WhatsApp, email o nuestro formulario web
    Indique el producto deseado y cantidad
    Le informaremos el tiempo estimado de reposición
    Podrá realizar un prepago para garantizar su reserva
    
    Una vez recibido el producto, le notificaremos inmediatamente para coordinar la entrega o envío.`
  }
];

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

      {/* Descargo de responsabilidad para Apple */}
      <div className="mt-8 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Apple, Mac, Macintosh, MacBook, iPhone, iPad, iPod, iTunes, Apple Watch, 
          AirPods y el logotipo de Apple son marcas comerciales de Apple Inc., 
          registradas en EE. UU. y otros países. Omri es un distribuidor independiente 
          y no está afiliado, patrocinado ni respaldado por Apple Inc. Los productos 
          Apple mencionados son compatibles con nuestros accesorios, pero no implican 
          aprobación o asociación con Apple Inc.
        </p>
        <p className="text-xs text-gray-500 mt-2">
          El uso de las marcas comerciales de Apple en este sitio web es únicamente 
          con fines descriptivos para indicar compatibilidad con productos Apple. 
          No afirmamos ser un distribuidor autorizado de Apple ni tener ninguna 
          afiliación con Apple Inc.
        </p>
      </div>
    </div>
  );
};

export default Faq;