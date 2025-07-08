INSERT INTO usuario (nombre_usuario, apellido_usuario, email_usuario, contrasena_usuario, direccion_usuario, telefono_usuario, fecha_nacimiento_usuario, fecha_registro_usuario, es_admin_usuario) VALUES ('Juan', 'Pérez', 'juan@gmail.com', '123456789', 'Av. 123', '999 111 111', '1990-05-15', '2025-01-15', false);
INSERT INTO usuario (nombre_usuario, apellido_usuario, email_usuario, contrasena_usuario, direccion_usuario, telefono_usuario, fecha_nacimiento_usuario, fecha_registro_usuario, es_admin_usuario) VALUES ('María', 'García', 'maria@gmail.com', '123456789', 'Av. 456', '999 222 222', '1985-08-20', '2025-02-20', false);
INSERT INTO usuario (nombre_usuario, apellido_usuario, email_usuario, contrasena_usuario, direccion_usuario, telefono_usuario, fecha_nacimiento_usuario, fecha_registro_usuario, es_admin_usuario) VALUES ('Carlos', 'López', 'carlos@gmail.com', '123456789', 'Av. 789', '999 333 333', '1988-12-10', '2025-03-10', true);
INSERT INTO usuario (nombre_usuario, apellido_usuario, email_usuario, contrasena_usuario, direccion_usuario, telefono_usuario, fecha_nacimiento_usuario, fecha_registro_usuario, es_admin_usuario) VALUES ('Ana', 'Martínez', 'ana@gmail.com', '123456789', 'Av.  321', '999 444 444', '1992-03-25', '2025-04-05', false);
INSERT INTO usuario (nombre_usuario, apellido_usuario, email_usuario, contrasena_usuario, direccion_usuario, telefono_usuario, fecha_nacimiento_usuario, fecha_registro_usuario, es_admin_usuario) VALUES ('Luis', 'Rodríguez', 'luis@gmail.com', '123456789', 'Av. 654', '999 555 555', '1987-07-12', '2025-05-12', false);

INSERT INTO direccion_entrega (id_direccion_entrega, id_usuario, direccion_entrega, ciudad_entrega, distrito_entrega, referencia_entrega) VALUES ('DIR001', 1, 'Av. Arequipa', 'Lima', 'Miraflores', 'Frente al Parque Kennedy');
INSERT INTO direccion_entrega (id_direccion_entrega, id_usuario, direccion_entrega, ciudad_entrega, distrito_entrega, referencia_entrega) VALUES ('DIR002', 1, 'Jr. Lima 45', 'Lima', 'San Isidro', 'Cerca del Club Regatas');
INSERT INTO direccion_entrega (id_direccion_entrega, id_usuario, direccion_entrega, ciudad_entrega, distrito_entrega, referencia_entrega) VALUES ('DIR003', 2, 'Av. Tacna 789', 'Lima', 'Centro de Lima', 'Edificio Torre Azul');
INSERT INTO direccion_entrega (id_direccion_entrega, id_usuario, direccion_entrega, ciudad_entrega, distrito_entrega, referencia_entrega) VALUES ('DIR004', 2, 'Jr. Callao 321', 'Lima', 'Barranco', 'Cerca del Puente de los Suspiros');
INSERT INTO direccion_entrega (id_direccion_entrega, id_usuario, direccion_entrega, ciudad_entrega, distrito_entrega, referencia_entrega) VALUES ('DIR005', 3, 'Av. La Marina 654', 'Lima', 'San Miguel', 'Frente a la Universidad');

INSERT INTO categoria (nombre_categoria, descripcion_categoria) VALUES ('Camisetas', 'Camisetas deportivas y casuales para todas las actividades');
INSERT INTO categoria (nombre_categoria, descripcion_categoria) VALUES ('Chalecos', 'Chalecos deportivos y de seguridad para diferentes usos');
INSERT INTO categoria (nombre_categoria, descripcion_categoria) VALUES ('Pantalones', 'Pantalones deportivos, casuales y de trabajo');
INSERT INTO categoria (nombre_categoria, descripcion_categoria) VALUES ('Shorts', 'Shorts deportivos, casuales y de baño');
INSERT INTO categoria (nombre_categoria, descripcion_categoria) VALUES ('Accesorios', 'Accesorios deportivos y complementos esenciales');

INSERT INTO marca (nombre_marca, descripcion_marca) VALUES ('Nike', 'Just Do It - Innovación y rendimiento deportivo');
INSERT INTO marca (nombre_marca, descripcion_marca) VALUES ('Adidas', 'Impossible is Nothing - Calidad y estilo deportivo');
INSERT INTO marca (nombre_marca, descripcion_marca) VALUES ('Puma', 'Forever Faster - Diseño y tecnología deportiva');
INSERT INTO marca (nombre_marca, descripcion_marca) VALUES ('The North Face', 'Never Stop Exploring - Equipamiento para aventuras');
INSERT INTO marca (nombre_marca, descripcion_marca) VALUES ('Columbia Sportswear', 'Tested Tough - Ropa para actividades al aire libre');

-- Productos para Camisetas
INSERT INTO producto (nombre_producto, descripcion_producto, precio_producto, stock_producto, imagen_producto, talla_producto, color_producto, id_marca, id_categoria) VALUES ('Camiseta Nike Dri-FIT', 'Camiseta deportiva de alto rendimiento con tecnología de secado rápido', 89.90, 50, NULL, 'M', 'Negro', 1, 1);
INSERT INTO producto (nombre_producto, descripcion_producto, precio_producto, stock_producto, imagen_producto, talla_producto, color_producto, id_marca, id_categoria) VALUES ('Camiseta Adidas Climalite', 'Camiseta ligera y transpirable para actividades deportivas', 75.50, 45, NULL, 'L', 'Blanco', 2, 1);
INSERT INTO producto (nombre_producto, descripcion_producto, precio_producto, stock_producto, imagen_producto, talla_producto, color_producto, id_marca, id_categoria) VALUES ('Camiseta Puma Training', 'Camiseta de entrenamiento con diseño moderno y cómodo', 65.00, 60, NULL, 'S', 'Azul', 3, 1);

-- Productos para Chalecos
INSERT INTO producto (nombre_producto, descripcion_producto, precio_producto, stock_producto, imagen_producto, talla_producto, color_producto, id_marca, id_categoria) VALUES ('Chaleco Columbia Fleece', 'Chaleco acolchado para actividades al aire libre', 120.00, 30, NULL, 'M', 'Gris', 5, 2);
INSERT INTO producto (nombre_producto, descripcion_producto, precio_producto, stock_producto, imagen_producto, talla_producto, color_producto, id_marca, id_categoria) VALUES ('Chaleco The North Face', 'Chaleco impermeable para condiciones climáticas adversas', 150.00, 25, NULL, 'L', 'Negro', 4, 2);
INSERT INTO producto (nombre_producto, descripcion_producto, precio_producto, stock_producto, imagen_producto, talla_producto, color_producto, id_marca, id_categoria) VALUES ('Chaleco Nike Running', 'Chaleco reflectivo para corredores nocturnos', 95.00, 40, NULL, 'S', 'Amarillo', 1, 2);

-- Productos para Pantalones
INSERT INTO producto (nombre_producto, descripcion_producto, precio_producto, stock_producto, imagen_producto, talla_producto, color_producto, id_marca, id_categoria) VALUES ('Pantalón Adidas Training', 'Pantalón deportivo con bolsillos laterales', 110.00, 35, NULL, '32', 'Negro', 2, 3);
INSERT INTO producto (nombre_producto, descripcion_producto, precio_producto, stock_producto, imagen_producto, talla_producto, color_producto, id_marca, id_categoria) VALUES ('Pantalón Nike Tech Fleece', 'Pantalón de entrenamiento con tecnología de aislamiento', 130.00, 28, NULL, '34', 'Gris', 1, 3);
INSERT INTO producto (nombre_producto, descripcion_producto, precio_producto, stock_producto, imagen_producto, talla_producto, color_producto, id_marca, id_categoria) VALUES ('Pantalón Columbia Hiking', 'Pantalón resistente para senderismo y actividades outdoor', 140.00, 22, NULL, '30', 'Verde', 5, 3);

-- Productos para Shorts
INSERT INTO producto (nombre_producto, descripcion_producto, precio_producto, stock_producto, imagen_producto, talla_producto, color_producto, id_marca, id_categoria) VALUES ('Short Nike Running', 'Short ligero para corredores con bolsillo interno', 55.00, 55, NULL, 'M', 'Azul', 1, 4);
INSERT INTO producto (nombre_producto, descripcion_producto, precio_producto, stock_producto, imagen_producto, talla_producto, color_producto, id_marca, id_categoria) VALUES ('Short Adidas Soccer', 'Short deportivo para fútbol y actividades de campo', 45.00, 65, NULL, 'L', 'Blanco', 2, 4);
INSERT INTO producto (nombre_producto, descripcion_producto, precio_producto, stock_producto, imagen_producto, talla_producto, color_producto, id_marca, id_categoria) VALUES ('Short Puma Training', 'Short de entrenamiento con diseño moderno', 50.00, 48, NULL, 'S', 'Negro', 3, 4);

-- Productos para Accesorios
INSERT INTO producto (nombre_producto, descripcion_producto, precio_producto, stock_producto, imagen_producto, talla_producto, color_producto, id_marca, id_categoria) VALUES ('Gorra Nike Dri-FIT', 'Gorra deportiva con tecnología de secado rápido', 35.00, 80, NULL, 'Única', 'Negro', 1, 5);
INSERT INTO producto (nombre_producto, descripcion_producto, precio_producto, stock_producto, imagen_producto, talla_producto, color_producto, id_marca, id_categoria) VALUES ('Mochila Adidas Training', 'Mochila deportiva con múltiples compartimentos', 85.00, 25, NULL, 'Única', 'Azul', 2, 5);
INSERT INTO producto (nombre_producto, descripcion_producto, precio_producto, stock_producto, imagen_producto, talla_producto, color_producto, id_marca, id_categoria) VALUES ('Botella Puma Hydration', 'Botella de agua deportiva de 750ml', 25.00, 100, NULL, 'Única', 'Transparente', 3, 5);

