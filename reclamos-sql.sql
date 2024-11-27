-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-11-2024 a las 23:40:29
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `reclamos`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `datosPDF` ()   BEGIN    
    DECLARE reclamosTotales INT;
    DECLARE reclamosNoFinalizados INT;
    DECLARE reclamosFinalizados INT;
    DECLARE descripcionTipoRreclamoFrecuente VARCHAR(255);
    DECLARE cantidadTipoRreclamoFrecuente INT;
    
    SELECT COUNT(*) INTO reclamostotales FROM reclamos;
    SELECT COUNT(*) INTO reclamosFinalizados FROM reclamos WHERE reclamos.idReclamoEstado = 4;
    SELECT COUNT(*) INTO reclamosNoFinalizados FROM reclamos WHERE reclamos.idReclamoEstado <> 4;

    SELECT rt.descripcion, COUNT(*) INTO descripcionTipoRreclamoFrecuente, cantidadTipoRreclamoFrecuente
    FROM reclamos AS r
    INNER JOIN reclamos_tipo AS rt ON rt.idReclamoTipo = r.idReclamoTipo
    GROUP BY r.idReclamoTipo
    ORDER BY cantidadTipoRreclamoFrecuente DESC 
    LIMIT 1;
    
    SELECT 
        reclamosTotales,
        reclamosNoFinalizados,
        reclamosFinalizados,
        descripcionTipoRreclamoFrecuente,
        cantidadTipoRreclamoFrecuente;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `estadistica` (OUT `reclamosTotales` INT, OUT `reclamosNoFinalizados` INT, OUT `reclamosFinalizados` INT, OUT `cantidadTipoRreclamoFrecuente` INT, OUT `descripcionTipoRreclamoFrecuente` VARCHAR(255))   BEGIN

SELECT count(*) AS reclamosTotales FROM reclamos;
SELECT count(*) AS reclamosNoFinalizados FROM reclamos WHERE reclamos.idReclamoEstado = 4;
SELECT count(*) AS reclamosFinalizados FROM reclamos WHERE reclamos.idReclamoEstado <> 4;
SELECT rt.descripcion as descripcionTipoRreclamoFrecuente, COUNT(*) as cantidadTipoRreclamoFrecuente
    FROM reclamos AS r
    INNER JOIN reclamos_tipo AS rt ON rt.idReclamoTipo = r.idReclamoTipo
    GROUP by r.idReclamoTipo
    ORDER by cantidadTipoRreclamoFrecuente desc 
    LIMIT 1;
    
 SELECT 
        reclamosTotales,
        reclamosNoFinalizados,
        reclamosFinalizados,
        descripcionTipoRreclamoFrecuente,
        cantidadTipoRreclamoFrecuente;    
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `oficinas`
--

CREATE TABLE `oficinas` (
  `idOficina` int(11) NOT NULL,
  `nombre` varchar(256) NOT NULL,
  `idReclamoTipo` int(11) NOT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `oficinas`
--

INSERT INTO `oficinas` (`idOficina`, `nombre`, `idReclamoTipo`, `activo`) VALUES
(1, 'Dpto. de Taller y Servicio Técnico', 1, 1),
(2, 'Dpto. de Garantías', 4, 1),
(3, 'Dpto. de Repuestos y Partes', 6, 0),
(4, 'Dpto. de Facturación', 9, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reclamos`
--

CREATE TABLE `reclamos` (
  `idReclamo` int(11) NOT NULL,
  `asunto` varchar(256) NOT NULL,
  `descripcion` varchar(256) DEFAULT NULL,
  `fechaCreado` datetime NOT NULL,
  `fechaFinalizado` datetime DEFAULT NULL,
  `fechaCancelado` datetime DEFAULT NULL,
  `idReclamoEstado` int(11) NOT NULL,
  `idReclamoTipo` int(11) NOT NULL,
  `idUsuarioCreador` int(11) NOT NULL,
  `idUsuarioFinalizador` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `reclamos`
--

INSERT INTO `reclamos` (`idReclamo`, `asunto`, `descripcion`, `fechaCreado`, `fechaFinalizado`, `fechaCancelado`, `idReclamoEstado`, `idReclamoTipo`, `idUsuarioCreador`, `idUsuarioFinalizador`) VALUES
(5, 'ruido en motor', 'ccc', '2024-08-19 06:00:00', '2024-10-13 18:43:29', '2024-10-23 23:02:17', 3, 1, 9, NULL),
(6, 'rotura de  motor ', NULL, '2024-08-19 07:00:00', NULL, '2024-10-07 01:10:23', 3, 1, 9, NULL),
(7, 'no frena', NULL, '2024-08-15 07:15:00', NULL, NULL, 1, 2, 8, NULL),
(8, 'ruidos extraños', NULL, '2024-08-15 08:00:00', NULL, NULL, 1, 3, 7, NULL),
(9, 'cristales rayados', NULL, '2024-08-15 09:30:00', NULL, NULL, 1, 4, 7, NULL),
(10, 'matafuego vencido', NULL, '2024-08-15 09:00:00', NULL, NULL, 2, 4, 7, NULL),
(11, 'suspensión lado izq fallada', NULL, '2024-08-15 15:00:00', NULL, NULL, 2, 3, 8, NULL),
(12, 'test mysql', 'consultas de prueba clase 4', '2024-08-25 11:00:00', NULL, NULL, 2, 1, 7, NULL),
(13, 'test mysql', 'consultas de prueba clase 4', '2024-08-25 17:17:25', NULL, NULL, 3, 1, 7, NULL),
(15, 'falla tren delantero', 'empece a notar ruidos molesto', '2024-08-28 19:26:12', NULL, NULL, 1, 1, 12, NULL),
(17, 'primero', NULL, '2024-10-02 15:53:52', NULL, NULL, 1, 1, 7, NULL),
(18, 'atender tomas', NULL, '2024-10-02 16:47:56', NULL, NULL, 1, 1, 7, NULL),
(19, 'atender tomas', NULL, '2024-10-02 17:03:57', NULL, NULL, 1, 1, 7, NULL),
(20, 'atender tomas 321', NULL, '2024-10-09 16:42:04', NULL, NULL, 1, 1, 7, NULL),
(21, 'atender tomas 321', NULL, '2024-10-09 16:42:24', NULL, NULL, 1, 1, 7, NULL),
(22, 'atender tomas321312', NULL, '2024-10-09 17:14:33', NULL, NULL, 1, 1, 7, NULL),
(23, 'atender tomas321312', NULL, '2024-10-09 17:15:33', NULL, NULL, 1, 1, 7, NULL),
(24, 'atender tomas321312', NULL, '2024-10-09 17:17:23', NULL, NULL, 1, 1, 7, NULL),
(25, 'atender tomas321312', NULL, '2024-10-09 17:17:40', NULL, NULL, 1, 1, 7, NULL),
(26, 'atender tomas321312', NULL, '2024-10-09 17:18:45', NULL, NULL, 1, 1, 7, NULL),
(27, 'atender tomasss', 'ccc', '2024-10-10 12:13:46', NULL, NULL, 4, 1, 9, NULL),
(28, 'reclamos 23.09', NULL, '2024-11-26 23:09:39', NULL, NULL, 1, 1, 9, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reclamos_estado`
--

CREATE TABLE `reclamos_estado` (
  `idReclamoEstado` int(11) NOT NULL,
  `descripcion` varchar(256) NOT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `reclamos_estado`
--

INSERT INTO `reclamos_estado` (`idReclamoEstado`, `descripcion`, `activo`) VALUES
(1, 'Creado', 1),
(2, 'Procesado', 1),
(3, 'Cancelado', 1),
(4, 'Finalizado', 0),
(29, 'nuevo estado base', 1),
(30, 'nuevo estado base', 1),
(31, 'nuevo estado base', 1),
(32, 'nuevo estado base', 1),
(33, 'nuevo estado base', 1),
(34, 'nuevo estado base', 1),
(35, 'nuevo estado base', 1),
(36, 'nuevo estado base', 1),
(37, 'nuevo estado 02', 1),
(38, 'nuevo estado base', 1),
(39, 'SUSPENDIDO', 1),
(40, 'SUSPENDIDO', 1),
(41, 'SUSPENDIDO', 1),
(42, 'SUSPENDIDO', 1),
(43, 'SUSPENDIDO 333', 1),
(44, 'estado base', 1),
(45, 'estado base 22', 1),
(46, 'nuevo estado base', 1),
(47, 'estado tomas', 1),
(48, 'algo', 1),
(49, 'algo', 1),
(50, 'algo', 1),
(51, 'grupo 6', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reclamos_tipo`
--

CREATE TABLE `reclamos_tipo` (
  `idReclamoTipo` int(11) NOT NULL,
  `descripcion` varchar(256) NOT NULL,
  `activo` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `reclamos_tipo`
--

INSERT INTO `reclamos_tipo` (`idReclamoTipo`, `descripcion`, `activo`) VALUES
(1, 'Falla de motor', 1),
(2, 'Falla de frenos', 1),
(3, 'Falla de suspensión', 1),
(4, 'Aprobación de cobertura', 1),
(5, 'Verificación de términos', 1),
(6, 'Reemplazo de piezas', 1),
(7, 'Reinstalación correcta', 0),
(9, 'Reembolso', 1),
(14, 'tipo reclamos creado en clase', 0),
(15, 'nuevo reclamo tipo crud3', 0),
(16, 'grupo 7', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `idUsuario` int(11) NOT NULL,
  `nombre` varchar(256) NOT NULL,
  `apellido` varchar(256) NOT NULL,
  `correoElectronico` varchar(256) NOT NULL,
  `contrasenia` varchar(256) NOT NULL,
  `idUsuarioTipo` int(11) NOT NULL,
  `imagen` varchar(256) DEFAULT NULL,
  `activo` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idUsuario`, `nombre`, `apellido`, `correoElectronico`, `contrasenia`, `idUsuarioTipo`, `imagen`, `activo`) VALUES
(1, 'dae', 'Targaryen', 'daetar@correo.com', 'b2803ace294160fd87aa85f826fa8df0c39e77282e0217af680198cef8d9edc3', 1, NULL, 1),
(2, 'Jon', 'Snow', 'jonsno@gmail.com', 'd98e05719dd7fa45547fbc3409eb36881bb8afe963268f7e8f6c2e24e80e58f5', 1, NULL, 1),
(3, 'Test', 'Lannister', 'tyrlan@correo.com', '9f9e51def43bc759ac35cd56ce8514a2c4dd0fbc9bfbb5bc97ce691f65bf5bb9', 2, NULL, 1),
(4, 'Margaery', 'Tyrell', 'martyr@correo.com', 'ad872b4820b164b7a25695ff77d0f6e5df812c6f9944d1d21461f57f099bce57', 2, NULL, 1),
(5, 'Samwell', 'Tarly', 'samtar@correo.com', 'a8487f98ab106b0ed2129a5446610b5ccba6b4bf7a937ef5194ce2f2a4c11bde', 2, NULL, 1),
(6, 'jeor', 'Mormont', 'jeomor@correo.com', 'ef0b04a6eba2d3cde7b32f53b2c13b509d198189cb9da2080c7259948cbc63ca', 2, 'tyrion-clase.png', 1),
(7, 'Kahl', 'Drogo', 'khadro@gmail.com', '84507cc9012d1c900abb65663e3b62633cb14073aa6569b60efa2b75cf431b37', 3, NULL, 1),
(8, 'Catelyn', 'Stark', 'catsta@correo.com', '229e7f7177d0e221f889eb8d3e2b422eae42adc403412fb25718b84fe5fff4d7', 3, NULL, 1),
(9, 'Yara', 'Greyjoy', 'licagua@gmail.com', '634a440c06922cd2b33b2c0320af5678883f98e42a77b7ed8e394d5489c2b8f4', 3, NULL, 1),
(12, 'Jose', 'Battaglia', 'josbat@gmail.com', 'c30d798692466db470eafebfb04c272b359c80f2ebbac6f51f6e9ff9b6e3177b', 3, NULL, 1),
(13, 'test', 'test', 'correoElectronico', 'contrasenia', 2, NULL, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios_oficinas`
--

CREATE TABLE `usuarios_oficinas` (
  `idUsuarioOficina` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `idOficina` int(11) NOT NULL,
  `activo` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `usuarios_oficinas`
--

INSERT INTO `usuarios_oficinas` (`idUsuarioOficina`, `idUsuario`, `idOficina`, `activo`) VALUES
(1, 3, 1, 1),
(2, 4, 2, 1),
(3, 5, 3, 1),
(4, 6, 4, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios_tipo`
--

CREATE TABLE `usuarios_tipo` (
  `idUsuarioTipo` int(11) NOT NULL,
  `descripcion` varchar(256) NOT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `usuarios_tipo`
--

INSERT INTO `usuarios_tipo` (`idUsuarioTipo`, `descripcion`, `activo`) VALUES
(1, 'Administrador', 1),
(2, 'Empleado', 1),
(3, 'Cliente', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `oficinas`
--
ALTER TABLE `oficinas`
  ADD PRIMARY KEY (`idOficina`),
  ADD UNIQUE KEY `idOficina` (`idOficina`),
  ADD KEY `oficinas_fk2` (`idReclamoTipo`);

--
-- Indices de la tabla `reclamos`
--
ALTER TABLE `reclamos`
  ADD PRIMARY KEY (`idReclamo`),
  ADD UNIQUE KEY `idReclamo` (`idReclamo`),
  ADD KEY `reclamos_fk6` (`idReclamoEstado`),
  ADD KEY `reclamos_fk7` (`idReclamoTipo`),
  ADD KEY `reclamos_fk8` (`idUsuarioCreador`),
  ADD KEY `reclamos_fk9` (`idUsuarioFinalizador`);

--
-- Indices de la tabla `reclamos_estado`
--
ALTER TABLE `reclamos_estado`
  ADD PRIMARY KEY (`idReclamoEstado`),
  ADD UNIQUE KEY `idReclamosEstado` (`idReclamoEstado`);

--
-- Indices de la tabla `reclamos_tipo`
--
ALTER TABLE `reclamos_tipo`
  ADD PRIMARY KEY (`idReclamoTipo`),
  ADD UNIQUE KEY `idReclamosTipo` (`idReclamoTipo`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idUsuario`),
  ADD UNIQUE KEY `idUsuario` (`idUsuario`),
  ADD UNIQUE KEY `correoElectronico` (`correoElectronico`),
  ADD KEY `usuarios_fk5` (`idUsuarioTipo`);

--
-- Indices de la tabla `usuarios_oficinas`
--
ALTER TABLE `usuarios_oficinas`
  ADD PRIMARY KEY (`idUsuarioOficina`),
  ADD UNIQUE KEY `idUsuarioOficina` (`idUsuarioOficina`),
  ADD KEY `usuariosOficinas_fk1` (`idUsuario`),
  ADD KEY `usuariosOficinas_fk2` (`idOficina`);

--
-- Indices de la tabla `usuarios_tipo`
--
ALTER TABLE `usuarios_tipo`
  ADD PRIMARY KEY (`idUsuarioTipo`),
  ADD UNIQUE KEY `idUsuarioTipo` (`idUsuarioTipo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `oficinas`
--
ALTER TABLE `oficinas`
  MODIFY `idOficina` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `reclamos`
--
ALTER TABLE `reclamos`
  MODIFY `idReclamo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `reclamos_estado`
--
ALTER TABLE `reclamos_estado`
  MODIFY `idReclamoEstado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT de la tabla `reclamos_tipo`
--
ALTER TABLE `reclamos_tipo`
  MODIFY `idReclamoTipo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `usuarios_oficinas`
--
ALTER TABLE `usuarios_oficinas`
  MODIFY `idUsuarioOficina` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT de la tabla `usuarios_tipo`
--
ALTER TABLE `usuarios_tipo`
  MODIFY `idUsuarioTipo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `oficinas`
--
ALTER TABLE `oficinas`
  ADD CONSTRAINT `oficinas_fk2` FOREIGN KEY (`idReclamoTipo`) REFERENCES `reclamos_tipo` (`idReclamoTipo`);

--
-- Filtros para la tabla `reclamos`
--
ALTER TABLE `reclamos`
  ADD CONSTRAINT `reclamos_fk6` FOREIGN KEY (`idReclamoEstado`) REFERENCES `reclamos_estado` (`idReclamoEstado`),
  ADD CONSTRAINT `reclamos_fk7` FOREIGN KEY (`idReclamoTipo`) REFERENCES `reclamos_tipo` (`idReclamoTipo`),
  ADD CONSTRAINT `reclamos_fk8` FOREIGN KEY (`idUsuarioCreador`) REFERENCES `usuarios` (`idUsuario`),
  ADD CONSTRAINT `reclamos_fk9` FOREIGN KEY (`idUsuarioFinalizador`) REFERENCES `usuarios` (`idUsuario`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_fk5` FOREIGN KEY (`idUsuarioTipo`) REFERENCES `usuarios_tipo` (`idUsuarioTipo`);

--
-- Filtros para la tabla `usuarios_oficinas`
--
ALTER TABLE `usuarios_oficinas`
  ADD CONSTRAINT `usuariosOficinas_fk1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`),
  ADD CONSTRAINT `usuariosOficinas_fk2` FOREIGN KEY (`idOficina`) REFERENCES `oficinas` (`idOficina`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
