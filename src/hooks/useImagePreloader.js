import { useState, useEffect } from 'react';

/**
 * Hook personalizado para precargar imágenes
 * @param {Array} images - Array de objetos con { id, image } o array de URLs
 * @returns {Object} { imagesLoaded, loadedImages, allImagesLoaded }
 */
export const useImagePreloader = (images) => {
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [loadedImages, setLoadedImages] = useState({});

    useEffect(() => {
        if (!images || images.length === 0) {
            setImagesLoaded(true);
            return;
        }

        const loadImages = async () => {
            const imagePromises = images.map((item) => {
                return new Promise((resolve) => {
                    const img = new Image();
                    const imageUrl = typeof item === 'string' ? item : item.image;
                    const imageId = typeof item === 'string' ? imageUrl : item.id;

                    img.src = imageUrl;
                    img.onload = () => {
                        setLoadedImages((prev) => ({ ...prev, [imageId]: true }));
                        resolve();
                    };
                    img.onerror = () => {
                        console.warn(`Failed to load image: ${imageUrl}`);
                        resolve(); // Continuar aunque falle una imagen
                    };
                });
            });

            await Promise.all(imagePromises);
            setImagesLoaded(true);
        };

        loadImages();
    }, [images]);

    const allImagesLoaded = imagesLoaded && images.every((item) => {
        const imageId = typeof item === 'string' ? item : item.id;
        return loadedImages[imageId];
    });

    return { imagesLoaded, loadedImages, allImagesLoaded };
};
