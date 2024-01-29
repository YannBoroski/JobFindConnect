-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 21, 2023 at 05:20 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `JFC`
--
CREATE DATABASE IF NOT EXISTS `JFC` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `JFC`;

-- --------------------------------------------------------

--
-- Table structure for table `Advertisements`
--

CREATE TABLE `Advertisements` (
  `id` int(11) NOT NULL,
  `description` text NOT NULL,
  `titre` varchar(255) NOT NULL,
  `job_type` varchar(255) NOT NULL,
  `Salary_range` varchar(255) DEFAULT NULL,
  `posted_date` date NOT NULL,
  `expiration_date` date NOT NULL,
  `required_experiences` varchar(255) DEFAULT NULL,
  `required_education` varchar(255) DEFAULT NULL,
  `Title_of_job` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `view_count` int(11) DEFAULT 0,
  `status` varchar(255) DEFAULT NULL,
  `isRemote` tinyint(1) DEFAULT 0,
  `Langues` varchar(255) DEFAULT NULL,
  `Apports` text DEFAULT NULL,
  `id_Company` int(11) NOT NULL,
  `id_Domaine` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Companies`
--

CREATE TABLE `Companies` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `URL` varchar(255) DEFAULT NULL,
  `Logo` varchar(255) DEFAULT NULL,
  `Secteur_activitee` varchar(255) NOT NULL,
  `taille` varchar(255) NOT NULL,
  `date_de_fondation` date NOT NULL,
  `siegeSocial` varchar(255) NOT NULL,
  `mail` varchar(255) DEFAULT NULL,
  `phone` varchar(255) NOT NULL,
  `estVerifiee` tinyint(1) NOT NULL DEFAULT 0,
  `Pdg_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `CompanyDomaine`
--

CREATE TABLE `CompanyDomaine` (
  `id` int(11) NOT NULL,
  `id_Company` int(11) NOT NULL,
  `id_Domaine` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Domaine`
--

CREATE TABLE `Domaine` (
  `id` int(11) NOT NULL,
  `Nom` varchar(255) NOT NULL,
  `Description` text NOT NULL,
  `SalaireMoyen` varchar(255) NOT NULL,
  `NiveauEduc` varchar(255) DEFAULT NULL,
  `tendanceMarche` varchar(255) DEFAULT NULL,
  `estValide` tinyint(1) NOT NULL DEFAULT 0,
  `img` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Messages`
--

CREATE TABLE `Messages` (
  `id` int(11) NOT NULL,
  `idAd` int(11) NOT NULL,
  `Message` text NOT NULL,
  `idUser` int(11) NOT NULL,
  `Status` varchar(255) DEFAULT 'Pending',
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `UserDomaine`
--

CREATE TABLE `UserDomaine` (
  `id` int(11) NOT NULL,
  `id_User` int(11) NOT NULL,
  `id_Domaine` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `date_de_naissance` date NOT NULL,
  `pfp` varchar(255) DEFAULT NULL,
  `Role` varchar(255) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `date_de_creation` date NOT NULL,
  `last_login` date NOT NULL,
  `isVerified` tinyint(1) NOT NULL DEFAULT 0,
  `urlCV` varchar(255) DEFAULT NULL,
  `profileLinkedin` varchar(255) DEFAULT NULL,
  `mail` varchar(255) NOT NULL,
  `statutVisibilitee` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Advertisements`
--
ALTER TABLE `Advertisements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_Company` (`id_Company`),
  ADD KEY `id_Domaine` (`id_Domaine`);

--
-- Indexes for table `Companies`
--
ALTER TABLE `Companies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Pdg_id` (`Pdg_id`);

--
-- Indexes for table `CompanyDomaine`
--
ALTER TABLE `CompanyDomaine`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_Company` (`id_Company`),
  ADD KEY `id_Domaine` (`id_Domaine`);

--
-- Indexes for table `Domaine`
--
ALTER TABLE `Domaine`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `Messages`
--
ALTER TABLE `Messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idAd` (`idAd`),
  ADD KEY `idUser` (`idUser`);

--
-- Indexes for table `UserDomaine`
--
ALTER TABLE `UserDomaine`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_User` (`id_User`),
  ADD KEY `id_Domaine` (`id_Domaine`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `constraint_name` (`username`),
  ADD UNIQUE KEY `constraint_mail` (`mail`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Advertisements`
--
ALTER TABLE `Advertisements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Companies`
--
ALTER TABLE `Companies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `CompanyDomaine`
--
ALTER TABLE `CompanyDomaine`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Domaine`
--
ALTER TABLE `Domaine`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Messages`
--
ALTER TABLE `Messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `UserDomaine`
--
ALTER TABLE `UserDomaine`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Advertisements`
--
ALTER TABLE `Advertisements`
  ADD CONSTRAINT `Advertisements_ibfk_1` FOREIGN KEY (`id_Company`) REFERENCES `Companies` (`id`),
  ADD CONSTRAINT `Advertisements_ibfk_2` FOREIGN KEY (`id_Domaine`) REFERENCES `Domaine` (`id`);

--
-- Constraints for table `Companies`
--
ALTER TABLE `Companies`
  ADD CONSTRAINT `Companies_ibfk_1` FOREIGN KEY (`Pdg_id`) REFERENCES `Users` (`id`);

--
-- Constraints for table `CompanyDomaine`
--
ALTER TABLE `CompanyDomaine`
  ADD CONSTRAINT `CompanyDomaine_ibfk_1` FOREIGN KEY (`id_Company`) REFERENCES `Companies` (`id`),
  ADD CONSTRAINT `CompanyDomaine_ibfk_2` FOREIGN KEY (`id_Domaine`) REFERENCES `Domaine` (`id`);

--
-- Constraints for table `Messages`
--
ALTER TABLE `Messages`
  ADD CONSTRAINT `Messages_ibfk_1` FOREIGN KEY (`idAd`) REFERENCES `Advertisements` (`id`),
  ADD CONSTRAINT `Messages_ibfk_2` FOREIGN KEY (`idUser`) REFERENCES `Users` (`id`);

--
-- Constraints for table `UserDomaine`
--
ALTER TABLE `UserDomaine`
  ADD CONSTRAINT `UserDomaine_ibfk_1` FOREIGN KEY (`id_User`) REFERENCES `Users` (`id`),
  ADD CONSTRAINT `UserDomaine_ibfk_2` FOREIGN KEY (`id_Domaine`) REFERENCES `Domaine` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
