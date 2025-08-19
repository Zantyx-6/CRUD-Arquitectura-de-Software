// Importa el modelo 'Product' desde la carpeta 'models', archivo 'Product.js'
// Este modelo se utiliza para interactuar con la base de datos (por ejemplo, MongoDB usando Mongoose)
import Product from "../models/Product.js";

// Define y exporta una función asíncrona llamada 'createProduct' que recibe la solicitud (req) y la respuesta (res)
export const createProduct = async (req, res) => {
  try {
    // Intenta crear un nuevo producto utilizando los datos enviados en el cuerpo de la solicitud (req.body)
    const product = await Product.create(req.body);

    // Si se crea correctamente, responde con un estado 201 (creado) y devuelve el producto creado en formato JSON
    res.status(201).json(product);
  } catch (error) {
    // Si ocurre un error (por ejemplo, validación de campos), responde con estado 400 (bad request)
    // Devuelve un mensaje de error general y los detalles específicos del error
    res.status(400).json({ 
      error: "Error al crear producto",   // Mensaje de error general
      details: error.message              // Mensaje específico del error lanzado
    });
  }
};

// Define y exporta una función asíncrona llamada 'getProducts' que también recibe req y res
export const getProducts = async (req, res) => {
  try {
    // Intenta obtener todos los productos almacenados en la base de datos usando el método 'find()' del modelo
    const products = await Product.find();

    // Si se obtienen correctamente, responde con un JSON que contiene el array de productos
    res.json(products);
  } catch (error) {
    // Si ocurre un error (por ejemplo, falla de conexión a la base de datos), responde con estado 500 (internal server error)
    // Devuelve un mensaje de error general y los detalles del error
    res.status(500).json({ 
      error: "Error al obtener productos", // Mensaje de error general
      details: error.message               // Mensaje específico del error lanzado
    });
  }
};
