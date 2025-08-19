import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// -------------------
// Componente: Formulario de producto
// -------------------
const ProductForm = ({ onSave, initialProduct, onCancel }) => {
  // Estado del producto que se está creando o editando
  const [product, setProduct] = useState({
    id: initialProduct?.id || null,         // si hay producto inicial, lo usamos
    name: initialProduct?.name || "",       // nombre del producto
    description: initialProduct?.description || "", // descripción
    photo: initialProduct?.photo || "",     // foto (base64)
  });

  // Estado para la previsualización de la foto
  const [photoPreview, setPhotoPreview] = useState(initialProduct?.photo || "");

  // Cada vez que cambie el producto inicial, se actualiza el formulario
  useEffect(() => {
    setProduct(initialProduct || { id: null, name: "", description: "", photo: "" });
    setPhotoPreview(initialProduct?.photo || "");
  }, [initialProduct]);

  // Maneja cambios en inputs de texto (name, description)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // Maneja la subida de imagenes
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Guardamos la imagen en base64
        setProduct({ ...product, photo: reader.result });
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validación: todos los campos deben estar llenos
    if (product.name && product.description && product.photo) {
      onSave(product); // se guarda el producto
      // reseteamos el formulario
      setProduct({ id: null, name: "", description: "", photo: "" });
      setPhotoPreview("");
    } else {
      alert("Por favor, completa todos los campos y añade una foto.");
    }
  };

  return (
    <div className="card">
      {/* Título dinámico según si se edita o se crea */}
      <h3 className="produc">{product.id ? "Editar Producto" : "Añadir Producto"}</h3>
      <form onSubmit={handleSubmit} className="form">

        {/* Nombre del producto */}
        <div className="form-group">
          <label htmlFor="name" className="produc">Nombre del Producto</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Introduce el nombre del producto"
            required
            className="in"
          />
        </div>

        {/* Descripción del producto */}
        <div className="form-group">
          <label htmlFor="description" className="produc">Descripción</label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            rows="3"
            placeholder="Describe el producto"
            required
            className="in"
          />
        </div>

        {/* Foto del producto */}
        <div className="form-group">
          <label htmlFor="photo" className="produc">Foto del Producto</label>
          <input
            type="file"
            id="photo"
            name="photo"
            accept="image/*"
            onChange={handlePhotoChange}
            required={!product.id} // solo es obligatorio si es un producto nuevo
            className="in"
          />
          {/* Previsualización de la foto */}
          {photoPreview && (
            <div className="preview">
              <img src={photoPreview} alt="Vista previa" />
            </div>
          )}
        </div>

        {/* Botones de acción */}
        <div className="form-actions">
          {/* Si estamos editando, aparece botón de cancelar */}
          {product.id && (
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancelar
            </button>
          )}
          {/* Botón principal (añadir o guardar cambios) */}
          <button type="submit" className="btn btn-primary">
            {product.id ? "Guardar Cambios" : "Añadir Producto"}
          </button>
        </div>
      </form>
    </div>
  );
};

// -------------------
// Componente: Producto individual
// -------------------
const ProductItem = ({ product, onEdit, onDelete, onToggleFavorite }) => {
  return (
    <div className="product-item">
      <img src={product.photo} alt={product.name} className="product-photo" />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <span>ID: {product.id}</span>
      </div>
      <div className="product-actions">
        {/* Botón para marcar como favorito */}
        <button onClick={() => onToggleFavorite(product.id)} className="favorite-btn">
          {product.isFavorite ? "⭐" : "☆"}
        </button>
        {/* Botón para editar */}
        <button onClick={() => onEdit(product)} className="edit-btn">✏</button>
        {/* Botón para eliminar */}
        <button onClick={() => onDelete(product.id)} className="delete-btn">🗑</button>
      </div>
    </div>
  );
};

// -------------------
// Componente principal: Pagina
// -------------------
const Pagina = () => {
  const navigate = useNavigate(); // hook para navegar entre páginas

  // Función para volver a la página anterior (cerrar sesión)
  const pagePrincipal = () => {
    navigate(-1);
  };

  // Estado de los productos
  const [products, setProducts] = useState([]);
  // Estado para saber si se está editando un producto
  const [editingProduct, setEditingProduct] = useState(null);
  // Estado para mostrar alertas personalizadas
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // Muestra un mensaje temporal
  const showCustomAlert = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      setAlertMessage("");
    }, 3000);
  };

  // Guardar producto (nuevo o editado)
  const handleSaveProduct = (productData) => {
    if (productData.id) {
      // Si ya existe, actualizamos
      setProducts(products.map(p => (p.id === productData.id ? productData : p)));
      showCustomAlert("¡Producto actualizado con éxito!");
    } else {
      // Si no existe, lo creamos con un ID único
      const newProduct = { ...productData, id: Date.now(), isFavorite: false };
      setProducts([...products, newProduct]);
      showCustomAlert("¡Producto añadido con éxito!");
    }
    setEditingProduct(null);
  };

  // Eliminar producto
  const handleDeleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
    showCustomAlert("¡Producto eliminado!");
  };

  // Editar producto
  const handleEditProduct = (product) => setEditingProduct(product);
  // Cancelar edición
  const handleCancelEdit = () => setEditingProduct(null);

  // Cambiar estado de favorito
  const handleToggleFavorite = (id) => {
    setProducts(products.map(p => (p.id === id ? { ...p, isFavorite: !p.isFavorite } : p)));
  };

  // Filtramos productos favoritos y normales
  const favoriteProducts = products.filter(p => p.isFavorite);
  const regularProducts = products.filter(p => !p.isFavorite);

  return (
    <div className="app">
      <div className="grid">
        {/* Columna del formulario */}
        <div>
          <ProductForm
            onSave={handleSaveProduct}
            initialProduct={editingProduct}
            onCancel={handleCancelEdit}
          />
        </div>

        {/* Columna de productos */}
        <div>
          {/* Sección de favoritos */}
          {favoriteProducts.length > 0 && (
            <div>
              <h3>⭐ Favoritos</h3>
              {favoriteProducts.map(product => (
                <ProductItem
                  key={product.id}
                  product={product}
                  onEdit={handleEditProduct}
                  onDelete={handleDeleteProduct}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </div>
          )}

          {/* Lista de todos los productos */}
          <h3>Todos los Productos</h3>
          {regularProducts.length > 0 ? (
            regularProducts.map(product => (
              <ProductItem
                key={product.id}
                product={product}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
                onToggleFavorite={handleToggleFavorite}
              />
            ))
          ) : (
            <p className="nada">No hay productos guardados. ¡Añade uno para empezar!</p>
          )}
        </div>
      </div>

      {/* Alerta flotante */}
      {showAlert && <div className="alert">{alertMessage}</div>}

      {/* Botón de cerrar sesión */}
      <button onClick={pagePrincipal} className="btn btn-primary boton">Cerrar Sesion</button>
    </div>
  );
};

export default Pagina;