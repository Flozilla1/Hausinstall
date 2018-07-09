-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 08. Jul 2018 um 21:39
-- Server-Version: 10.1.31-MariaDB
-- PHP-Version: 7.2.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `lpauebung3`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `devices`
--

CREATE TABLE `devices` (
  `id` int(10) UNSIGNED NOT NULL,
  `rooms_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `fuseid` int(10) UNSIGNED NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_change` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `devices`
--

INSERT INTO `devices` (`id`, `rooms_id`, `name`, `fuseid`, `created`, `last_change`) VALUES
(1, 1, 'Licht', 3, '2018-04-17 14:21:04', NULL),
(2, 5, 'Rollo', 2, '2018-04-17 14:21:04', NULL),
(3, 6, 'Steckdose Aufputz', 1, '2018-06-25 20:55:52', NULL),
(4, 9, 'Schalter Licht Decke', 2, '2018-06-25 20:55:52', NULL),
(5, 10, 'Schalter Licht Wand', 3, '2018-06-25 20:55:52', NULL),
(6, 11, 'Schalter Licht Balkon', 3, '2018-06-25 20:55:52', NULL);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `fis`
--

CREATE TABLE `fis` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `projects_id` int(10) UNSIGNED NOT NULL,
  `current` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `fis`
--

INSERT INTO `fis` (`id`, `name`, `projects_id`, `current`) VALUES
(1, 'FI Steckdosen', 1, 30),
(2, 'FI Licht', 1, 100),
(3, 'FI Steckdosen', 2, 30),
(4, 'FI allgemein', 2, 100);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `floors`
--

CREATE TABLE `floors` (
  `id` int(11) UNSIGNED NOT NULL,
  `projects_id` int(11) UNSIGNED NOT NULL,
  `floor_count_from_basement` int(11) DEFAULT NULL COMMENT '0 is basement',
  `name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_change` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `floors`
--

INSERT INTO `floors` (`id`, `projects_id`, `floor_count_from_basement`, `name`, `created`, `last_change`) VALUES
(1, 1, 0, 'Keller', '2018-04-17 14:10:35', NULL),
(2, 1, 1, 'Erdgeschoß', '2018-04-17 14:10:35', NULL),
(3, 1, 2, 'erster Stock', '2018-04-17 14:11:07', NULL);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `fuses`
--

CREATE TABLE `fuses` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `fis_id` int(10) UNSIGNED NOT NULL,
  `current` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `fuses`
--

INSERT INTO `fuses` (`id`, `name`, `fis_id`, `current`) VALUES
(1, 'Steckdosen Erdgeschoss', 1, 12),
(2, 'Licht Erdgeschoss', 2, 12),
(3, 'Licht erster Stock', 2, 12);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `projects`
--

CREATE TABLE `projects` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `baumeister` varchar(255) NOT NULL,
  `kapital` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_change` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `projects`
--

INSERT INTO `projects` (`id`, `name`, `baumeister`, `kapital`, `created`, `last_change`) VALUES
(1, 'Haus UrGroßeltern', 'Lugner', 0, '2018-04-17 14:10:04', NULL),
(2, 'Gebäude 1200 Wien', 'Coop Himmelbau', 0, '2018-04-17 14:10:04', NULL);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `rooms`
--

CREATE TABLE `rooms` (
  `id` int(10) UNSIGNED NOT NULL,
  `floors_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `flaeche` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_change` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `rooms`
--

INSERT INTO `rooms` (`id`, `floors_id`, `name`, `flaeche`, `created`, `last_change`) VALUES
(1, 1, 'gesamter Keller - alles', 0, '2018-04-17 14:14:24', NULL),
(5, 2, 'Küche', 0, '2018-04-17 14:14:24', NULL),
(6, 2, 'Wohnzimmer', 0, '2018-04-17 14:14:24', NULL),
(9, 3, 'Schlafzimmer 1', 0, '2018-04-17 14:14:24', NULL),
(10, 3, 'Schlafzimmer 2', 0, '2018-04-17 14:14:24', NULL),
(11, 3, 'Badezimmer', 0, '2018-04-17 14:14:24', NULL);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `sensors`
--

CREATE TABLE `sensors` (
  `id` int(10) UNSIGNED NOT NULL,
  `devices_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `unit` varchar(16) CHARACTER SET utf8 NOT NULL,
  `value` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_change` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `sensors`
--

INSERT INTO `sensors` (`id`, `devices_id`, `name`, `unit`, `value`, `created`, `last_change`) VALUES
(1, 1, 'Lichtschalter', 'EIN / AUS', 'EIN', '2018-04-17 14:21:47', NULL),
(2, 1, 'Helligkeitssensor', 'Lumen', NULL, '2018-04-17 14:21:47', NULL),
(5, 2, 'Helligkeitssensor', 'Lumen', NULL, '2018-04-17 14:23:08', NULL),
(6, 3, 'Lichtsensor', 'Candela', '450 cd', '2018-06-25 20:56:20', NULL);

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `devices`
--
ALTER TABLE `devices`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `fis`
--
ALTER TABLE `fis`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `floors`
--
ALTER TABLE `floors`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `fuses`
--
ALTER TABLE `fuses`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `sensors`
--
ALTER TABLE `sensors`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `devices`
--
ALTER TABLE `devices`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT für Tabelle `fis`
--
ALTER TABLE `fis`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT für Tabelle `floors`
--
ALTER TABLE `floors`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT für Tabelle `fuses`
--
ALTER TABLE `fuses`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT für Tabelle `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT für Tabelle `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT für Tabelle `sensors`
--
ALTER TABLE `sensors`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
