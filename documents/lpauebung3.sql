-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 26. Jun 2018 um 00:53
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
  `sicherungs_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_change` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `devices`
--

INSERT INTO `devices` (`id`, `rooms_id`, `sicherungs_id`, `name`, `created`, `last_change`) VALUES
(1, 1, 3, 'Licht', '2018-04-17 14:21:04', NULL),
(2, 1, 4, 'Rollo', '2018-04-17 14:21:04', NULL),
(3, 16, 5, 'Steckdose Aufputz', '2018-06-25 20:55:52', NULL);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `fi`
--

CREATE TABLE `fi` (
  `id` int(11) UNSIGNED NOT NULL,
  `FI_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `fi`
--

INSERT INTO `fi` (`id`, `FI_name`) VALUES
(1, 'Steckdosen'),
(2, 'Hauptstromkreis');

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
(3, 1, 2, 'erster Stock', '2018-04-17 14:11:07', NULL),
(4, 2, 0, 'Tiefgarage', '2018-04-17 14:11:07', NULL),
(5, 2, 1, 'Erdgeschoß', '2018-04-17 14:11:23', NULL),
(6, 2, 2, 'Mezanin', '2018-04-17 14:11:23', NULL),
(7, 2, 3, 'Erster Stock', '2018-04-17 14:11:50', NULL),
(8, 2, 4, 'Zweiter Stock', '2018-04-17 14:11:50', NULL),
(9, 1, 1, 'Cassandra', '2018-06-13 20:26:04', NULL),
(10, 1, 1, 'Penelope', '2018-06-13 20:26:24', NULL);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `projects`
--

CREATE TABLE `projects` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_change` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `projects`
--

INSERT INTO `projects` (`id`, `name`, `created`, `last_change`) VALUES
(1, 'Haus Großeltern', '2018-04-17 14:10:04', NULL),
(2, 'Gebäude 1200 Wien', '2018-04-17 14:10:04', NULL);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `rooms`
--

CREATE TABLE `rooms` (
  `id` int(10) UNSIGNED NOT NULL,
  `floors_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_change` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `rooms`
--

INSERT INTO `rooms` (`id`, `floors_id`, `name`, `created`, `last_change`) VALUES
(1, 1, 'gesamter Keller', '2018-04-17 14:14:24', NULL),
(2, 2, 'Stiegenhaus', '2018-04-17 14:14:24', NULL),
(3, 2, 'Vorzimmer', '2018-04-17 14:14:24', NULL),
(4, 2, 'WC', '2018-04-17 14:14:24', NULL),
(5, 2, 'Küche', '2018-04-17 14:14:24', NULL),
(6, 2, 'Wohnzimmer', '2018-04-17 14:14:24', NULL),
(7, 2, 'Gästezimmer', '2018-04-17 14:14:24', NULL),
(8, 2, 'Gäste Bad und WC', '2018-04-17 14:14:24', NULL),
(9, 3, 'Schlafzimmer 1', '2018-04-17 14:14:24', NULL),
(10, 3, 'Schlafzimmer 2', '2018-04-17 14:14:24', NULL),
(11, 3, 'Badezimmer', '2018-04-17 14:14:24', NULL),
(12, 3, 'WC', '2018-04-17 14:14:24', NULL),
(13, 4, 'Technik Raum', '2018-04-17 14:14:24', NULL),
(14, 4, 'alle Stellplätze', '2018-04-17 14:14:24', NULL),
(15, 5, 'Aula', '2018-04-17 14:14:24', NULL),
(16, 5, 'WC Herren', '2018-04-17 14:17:19', NULL),
(17, 5, 'WC Damen', '2018-04-17 14:17:19', NULL),
(18, 5, 'Küche', '2018-04-17 14:17:19', NULL),
(19, 5, 'Putzkammer', '2018-04-17 14:17:19', NULL),
(20, 6, 'Konferenzzimmer', '2018-04-17 14:17:19', NULL),
(21, 6, 'Schulwartzimmer', '2018-04-17 14:17:19', NULL),
(22, 6, 'Krankenstation', '2018-04-17 14:17:19', NULL),
(23, 6, 'Lehrer WC', '2018-04-17 14:17:19', NULL),
(24, 7, 'WC Damen', '2018-04-17 14:17:19', NULL),
(25, 7, 'WC Herren', '2018-04-17 14:17:19', NULL),
(26, 7, 'Klassenzimmer 1A', '2018-04-17 14:17:19', NULL),
(27, 7, 'Klassenzimmer 1B', '2018-04-17 14:17:19', NULL),
(28, 7, 'Klassenzimmer 2A', '2018-04-17 14:17:19', NULL),
(29, 7, 'Klassenzimmer 2B', '2018-04-17 14:17:19', NULL),
(30, 7, 'Klassenzimmer 3A', '2018-04-17 14:17:19', NULL),
(31, 7, 'Klassenzimmer 3B', '2018-04-17 14:18:51', NULL),
(32, 8, 'WC Damen', '2018-04-17 14:18:51', NULL),
(33, 8, 'WC Herren', '2018-04-17 14:18:51', NULL),
(34, 8, 'Klassenzimmer 4A', '2018-04-17 14:18:51', NULL),
(35, 8, 'Klassenzimmer 4B', '2018-04-17 14:18:51', NULL),
(36, 8, 'Biologiesaal', '2018-04-17 14:18:51', NULL),
(37, 8, 'Phyisksaal', '2018-04-17 14:18:51', NULL),
(38, 8, 'Zeichensaal', '2018-04-17 14:18:51', NULL),
(39, 8, 'Aufenthaltsraum', '2018-04-17 14:18:51', NULL);

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

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `sicherung`
--

CREATE TABLE `sicherung` (
  `id` int(10) UNSIGNED NOT NULL,
  `sicherungs_name` varchar(255) NOT NULL,
  `fi_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `sicherung`
--

INSERT INTO `sicherung` (`id`, `sicherungs_name`, `fi_id`) VALUES
(1, 'Herd', 2),
(2, 'Steckdosen Küche', 1),
(3, 'Sicherung Licht Obergeschoss', 2),
(4, 'Sicherung Licht Erdgeschoss', 2),
(5, 'Steckdosen Erdgeschoss', 1),
(6, 'Steckdosen Obergeschoss', 1);

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `devices`
--
ALTER TABLE `devices`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `fi`
--
ALTER TABLE `fi`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `floors`
--
ALTER TABLE `floors`
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
-- Indizes für die Tabelle `sicherung`
--
ALTER TABLE `sicherung`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `devices`
--
ALTER TABLE `devices`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT für Tabelle `fi`
--
ALTER TABLE `fi`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT für Tabelle `floors`
--
ALTER TABLE `floors`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

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

--
-- AUTO_INCREMENT für Tabelle `sicherung`
--
ALTER TABLE `sicherung`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
