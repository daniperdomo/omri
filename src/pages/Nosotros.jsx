import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Faq from '../components/Faq'; // Importa el componente Faq
import '../styles/styles.css'; // Importa el archivo CSS

const Nosotros = () => {
  const controls1 = useAnimation();
  const controls2 = useAnimation();
  const controls3 = useAnimation();

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls1.start({ opacity: 1, y: 0 });
        }
      },
      { threshold: 0.15 }
    );

    if (ref1.current) {
      observer.observe(ref1.current);
    }

    return () => {
      if (ref1.current) {
        observer.unobserve(ref1.current);
      }
    };
  }, [controls1]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls2.start({ opacity: 1, y: 0 });
        }
      },
      { threshold: 0.15 }
    );

    if (ref2.current) {
      observer.observe(ref2.current);
    }

    return () => {
      if (ref2.current) {
        observer.unobserve(ref2.current);
      }
    };
  }, [controls2]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls3.start({ opacity: 1, y: 0 });
        }
      },
      { threshold: 0.15 }
    );

    if (ref3.current) {
      observer.observe(ref3.current);
    }

    return () => {
      if (ref3.current) {
        observer.unobserve(ref3.current);
      }
    };
  }, [controls3]);

  return (
    <div className="bg-gray-100">
      {/* Sección: Sobre nosotros */}
      <motion.div
        ref={ref1}
        initial={{ opacity: 0, y: 50 }}
        animate={controls1}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="max-w-7xl mx-auto py-4 md:py-8 px-6"
      >
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-3/5 flex flex-col justify-center bg-white p-8 rounded-xl shadow-lg">
            <h1 style={{ fontFamily: 'Amblas, sans-serif' }} className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Sobre nosotros
            </h1>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-4">
              En Omri, les ofrecemos productos originales y de alta calidad a 
              nuestros clientes.
            </p>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              Nuestra misión es proporcionarte productos y servicios de primer nivel, asegurándonos
              de superar tus expectativas a través de dedicación, responsabilidad y compromiso.
            </p>
          </div>
          <div className="w-full md:w-2/5 h-[300px] bg-gray-200 rounded-xl overflow-hidden shadow-lg flex items-center justify-center">
            <img 
              src="/images/home/slider/prueba2.webp" 
              alt="Imagen de prueba" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </motion.div>

      {/* Sección: Ubicación */}
      <motion.div
        ref={ref2}
        initial={{ opacity: 0, y: 50 }}
        animate={controls2}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }}
        className="max-w-7xl mx-auto py-4 md:py-8 px-6"
      >
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-2/5 h-[350px] rounded-xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3948.0862411170915!2d-62.74109972520414!3d8.294216300058196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8dcbf9004d86854b%3A0x829d7dfed2ee8119!2sOmri!5e0!3m2!1ses!2sve!4v1742064143508!5m2!1ses!2sve"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de la empresa"
            ></iframe>
          </div>
          <div className="w-full md:w-3/5 flex flex-col justify-center bg-white p-8 rounded-xl shadow-lg">
            <h3 style={{ fontFamily: 'Amblas, sans-serif' }} className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ubicacion
            </h3>
            <p className="text-lg md:text-xl text-gray-700 mb-4">
              Santo Tomé IV, Piso I, local 01. <br /> 
              Ciudad Guayana, Venezuela
            </p>
            <p className="text-lg md:text-xl text-gray-700 mb-4">
              Horario de atención: <br />
              Lunes a Sábado de 9:00am a 7:00pm <br />
              Domingo: 10 :00am a 5:00pm
            </p>
            <p className="text-lg md:text-xl text-gray-700">
              ¡Visítanos!
            </p>
          </div>
        </div>
      </motion.div>

      {/* Sección: Preguntas Frecuentes */}
      <motion.div
        ref={ref3}
        initial={{ opacity: 0, y: 50 }}
        animate={controls3}
        transition={{ duration: 0.5, delay: 0.4, ease: "easeInOut" }}
        className="max-w-7xl mx-auto py-4 md:py-8 px-6 pb-8 md:pb-12"
      >
        <Faq /> {/* Invoca el componente Faq aquí */}
      </motion.div>
    </div>
  );
};

export default Nosotros;