import React from "react";
import { Disclosure } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion"; // Importa Framer Motion

const SeccionExpandible = ({ titulo, contenido }) => {
  const lineas = contenido
    ? contenido.split("\n").filter((line) => line.trim() !== "")
    : [];

  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className="flex justify-between w-full py-6 text-sm font-light tracking-wide uppercase text-gray-900 hover:text-gray-600 focus:outline-none transition-colors duration-200 border-b border-gray-200">
            <span>{titulo}</span>
            <svg
              className={`${open ? "transform rotate-180" : ""
                } w-5 h-5 text-gray-400 transition-transform duration-200`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
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
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="text-gray-700 text-base leading-relaxed overflow-hidden py-6 border-b border-gray-200"
              >
                {lineas.length > 0 ? (
                  <ul className="space-y-3 pl-0">
                    {lineas.map((linea, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-3 text-gray-400">•</span>
                        <span>{linea}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No hay información disponible.</p>
                )}
              </Disclosure.Panel>
            )}
          </AnimatePresence>
        </>
      )}
    </Disclosure>
  );
};

export default SeccionExpandible;