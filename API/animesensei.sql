-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 16, 2023 at 12:23 AM
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
-- Database: `animesensei`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookmarks`
--

CREATE TABLE `bookmarks` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `email` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bookmarks`
--

INSERT INTO `bookmarks` (`id`, `name`, `email`, `createdAt`) VALUES
(3, 'goblin-slayer-ii', 'renrendulog@gmail.com', '2023-12-01 15:15:41'),
(4, 'boku-no-hero-academia-yuuei-heroes-battle', 'renrendulog@gmail.com', '2023-12-01 15:21:14'),
(11, 'nanatsu-no-taizai-mokushiroku-no-yonkishi', 'renrendulog@gmail.com', '2023-12-02 11:02:10'),
(12, 'bokura-no-ameiro-protocol', 'renrendulog@gmail.com', '2023-12-02 11:02:27'),
(14, 'under-ninja', 'renrendulog@gmail.com', '2023-12-02 11:09:48'),
(15, 'undead-unluck', 'renrendulog@gmail.com', '2023-12-02 11:49:45'),
(19, 'bakugan-battle-brawlers-new-vestroia', 'renrendulog@gmail.com', '2023-12-08 05:58:57'),
(21, 'one-piece', 'admin@test.com', '2023-12-15 23:15:40'),
(23, 'goblin-slayer-ii', 'marlon@gmail.com', '2023-12-15 23:17:38');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(127) NOT NULL,
  `password` varchar(63) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `firstname` varchar(63) NOT NULL,
  `lastname` varchar(63) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `createdAt`, `firstname`, `lastname`) VALUES
(1, 'renrendulog@gmail.com', 'renskiedulog', '2023-12-09 12:26:10', 'Renato', 'Dulog'),
(2, 'marlon@gmail.com', 'marlon', '2023-11-28 14:35:11', 'marlon', 'untal'),
(3, 'admin@test.com', 'tester', '2023-12-15 23:16:24', 'Admin', 'Tester');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookmarks`
--
ALTER TABLE `bookmarks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookmarks`
--
ALTER TABLE `bookmarks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
