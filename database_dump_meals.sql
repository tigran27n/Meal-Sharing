CREATE DATABASE IF NOT EXISTS `meal-sharing`;
USE `meal-sharing`;

-- Table structure for table `meals`
DROP TABLE IF EXISTS `meals`;
CREATE TABLE `meals` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT DEFAULT NULL,
  `location` VARCHAR(255) NOT NULL,
  `meal_date` DATETIME NOT NULL,
  `max_reservations` INT(10) NOT NULL,
  `price` DECIMAL(19, 2) NOT NULL,
  `created_date` DATE NOT NULL
);

-- Table structure for table `reservations`
DROP TABLE IF EXISTS `reservations`;
CREATE TABLE `reservations` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `meal_id` INT(10) UNSIGNED NOT NULL,
  `user_id` INT(10) UNSIGNED NOT NULL,
  `created_date` DATE NOT NULL,
  FOREIGN KEY (`meal_id`) REFERENCES `meals` (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
);

-- Insert values into the meals table
INSERT INTO meals (
  `id`, `title`, `description`, `location`,
  `meal_date`, `max_reservations`, `price`,
  `created_date`
)
VALUES
(1, 'Armenian Khorovats', 'Traditional Armenian grilled meat dish', 'Yerevan', '2023-04-08 11:30:00', 3, 150, '2023-01-01'),
(2, 'Italian Pasta Carbonara', 'Classic Italian pasta dish with eggs, cheese, pancetta, and black pepper', 'Rome', '2023-04-01 11:30:00', 3, 100, '2023-01-01'),
(3, 'Armenian Dolma', 'Stuffed grape leaves with a mixture of rice, ground meat, and spices', 'Yerevan', '2023-04-07 09:30:00', 10, 250, '2023-02-01'),
(4, 'Italian Margherita Pizza', 'Traditional Italian pizza with tomato sauce, mozzarella cheese, and basil', 'Naples', '2023-04-17 09:30:00', 10, 150, '2023-02-01'),
(6, 'Italian Tiramisu', 'Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream', 'Florence', '2023-04-17 09:30:00', 10, 500, '2023-03-21'),
(7, 'Armenian Lavash', 'Traditional Armenian flatbread', 'Yerevan', '2023-05-07 09:30:00', 100, 50, '2023-02-03'),
(8, 'Italian Risotto', 'Creamy Italian rice dish cooked with broth, wine, and various ingredients', 'Milan', '2023-04-17 09:30:00', 100, 50, '2023-02-01'),
(9, 'Armenian Gata', 'Traditional Armenian sweet pastry', 'Gyumri', '2023-03-17 09:30:00', 50, 35, '2023-03-03'),
(10, 'Armenian Basturma', 'Cured and air-dried beef seasoned with various spices', 'Yerevan', '2023-07-01 11:30:00', 3, 150, '2023-05-15'),
(11, 'Italian Lasagna', 'Layers of pasta, meat sauce, and cheese baked to perfection', 'Rome', '2023-06-17 09:30:00', 10, 150, '2023-07-01'),

SELECT * FROM meals;
SELECT * FROM reservations;
