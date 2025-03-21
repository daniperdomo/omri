CREATE DATABASE webomri2

CREATE TABLE Categorias(
    cod_categoria varchar(10) not NULL,
    descripcion varchar(100) not NULL,
    modelo varchar(100) not NULL,
    PRIMARY KEY(cod_categoria, modelo)
);

CREATE TABLE Marcas(
    cod_marca varchar(10) not NULL,
    descripcion varchar(100) not NULL,
    PRIMARY KEY(cod_marca)
);

CREATE TABLE Productos(
    cod_producto varchar(100) not NULL,
    cod_categoria varchar(10) not NULL,
    modelo varchar(100) not NULL,
    cod_marca varchar(10) not NULL,
    descripcion varchar(100) not NULL,
    caracteristicas varchar(500) not NULL,
    precio decimal(18,2) not NULL,
    cantidad int not NULL,
    estatus int not NULL,
    color varchar(10) NOT NULL, 
    FOREIGN KEY (cod_categoria, modelo) REFERENCES Categorias(cod_categoria, modelo)
        ON UPDATE CASCADE, 
    FOREIGN KEY (cod_marca) REFERENCES Marcas(cod_marca)
        ON UPDATE CASCADE, 
    PRIMARY KEY(cod_producto),
    constraint CHK_Precio_Positivo check (precio >= 0),
    constraint CHK_Cantidad_Positiva check (cantidad >= 0),
    constraint CHK_Estatus_Valido check (estatus IN (0, 1))
);

CREATE TABLE Imagenes(
    cod_producto varchar(100) not NULL,
    url varchar(255) not NULL,
    PRIMARY KEY(cod_producto, url),
    FOREIGN KEY (cod_producto) REFERENCES Productos(cod_producto)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

insert into Categorias (cod_categoria, descripcion, modelo) values 
    ('SMWT', 'smartwatch', 'aura-Pro'),
    ('SMWT', 'smartwatch', 'aura'),
    ('SMWT', 'smartwatch', 'viva-pro'),
    ('SMWT', 'smartwatch', 'viva'),
    ('SMWT', 'smartwatch', 'cu-x-re'),
    ('SMWT', 'smartwatch', 'teens'),
    ('SMWT', 'smartwatch', 'jr'),
    ('ADFN', 'audifonos', 'earbuds-gen-2'),
    ('ADFN', 'audifonos', 'headset'),
    ('ADFN', 'audifonos', 'cu-x-re'),
    ('ADFN', 'audifonos', 'jr'),
    ('TERM', 'termo', 'travel-mug'),
    ('TERM', 'termo', 'hydro-bottle'),
    ('TERM', 'termo', 'tumbler'),
    ('TERM', 'termo', 'jr'),
    ('BOCN', 'bocina', 'go'),
    ('BOCN', 'bocina', 'plus'),
    ('BOCN', 'bocina', 'pro'),
    ('BSCL', 'bascula', 'cocina'),
    ('BSCL', 'bascula', 'corporal'),
    ('ACSR', 'accesorio', 'gorra'),
    ('ACSR', 'accesorio', 'protector')

insert into Marcas (cod_marca, descripcion) values
    ('CT', 'cubitt')
