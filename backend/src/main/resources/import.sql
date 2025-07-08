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

