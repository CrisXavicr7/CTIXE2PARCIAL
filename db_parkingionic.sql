-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-03-2024 a las 06:13:29
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_parkingionic`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `parking`
--

CREATE TABLE `parking` (
  `id_puesto` int(11) NOT NULL,
  `i_placa` varchar(50) DEFAULT NULL,
  `estado` enum('libre','ocupado') NOT NULL,
  `precio_por_hora` decimal(10,2) NOT NULL,
  `hora_entrada` time DEFAULT NULL,
  `hora_salida` time DEFAULT NULL,
  `monto_cobrado` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `parking`
--

INSERT INTO `parking` (`id_puesto`, `i_placa`, `estado`, `precio_por_hora`, `hora_entrada`, `hora_salida`, `monto_cobrado`) VALUES
(1, 'PCT2028', 'ocupado', 2.50, '00:07:24', '02:21:31', 5.75),
(2, 'PCT2024', 'ocupado', 2.50, '00:07:31', '01:09:32', 2.75),
(3, 'PCT2025', 'ocupado', 2.50, '00:02:59', NULL, NULL),
(4, NULL, 'libre', 2.50, NULL, NULL, NULL),
(5, NULL, 'libre', 2.50, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persona`
--

CREATE TABLE `persona` (
  `cod_persona` int(11) NOT NULL,
  `ci_persona` varchar(10) NOT NULL,
  `nom_persona` varchar(100) NOT NULL,
  `ape_persona` varchar(100) NOT NULL,
  `clave_persona` varchar(20) NOT NULL,
  `correo_persona` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `persona`
--

INSERT INTO `persona` (`cod_persona`, `ci_persona`, `nom_persona`, `ape_persona`, `clave_persona`, `correo_persona`) VALUES
(1, '0604143172', 'Cristian', 'Tixe', '2345', 'cris_19@hotmail.es'),
(2, '0613452172', 'William', 'Gustavo', '123', 'willgus@gmail.com');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `parking`
--
ALTER TABLE `parking`
  ADD PRIMARY KEY (`id_puesto`);

--
-- Indices de la tabla `persona`
--
ALTER TABLE `persona`
  ADD PRIMARY KEY (`cod_persona`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `parking`
--
ALTER TABLE `parking`
  MODIFY `id_puesto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT de la tabla `persona`
--
ALTER TABLE `persona`
  MODIFY `cod_persona` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
