CREATE DATABASE columbia;
USE columbia;
DROP DATABASE columbia;

SELECT *
FROM usuario;

INSERT INTO usuario (nombre_usuario, apellido_usuario, email_usuario, contrasena_usuario, direccion_usuario, telefono_usuario, fecha_nacimiento_usuario, fecha_registro_usuario, es_admin_usuario
) VALUES ('Admin', 'Principal', 'admin@columbia.com', 'admin123', 'Av. Principal 123', '999000000', '1980-01-01', '2024-06-01', true
);