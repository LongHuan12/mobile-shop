-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3309
-- Generation Time: May 14, 2023 at 08:21 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_mobileshop`
--

-- --------------------------------------------------------

--
-- Table structure for table `tb_brand`
--

CREATE TABLE `tb_brand` (
  `ID` int(11) NOT NULL,
  `BrandName` varchar(255) NOT NULL,
  `IsShow` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tb_brand`
--

INSERT INTO `tb_brand` (`ID`, `BrandName`, `IsShow`) VALUES
(2, 'Apple', 0),
(3, 'Samsung', 1),
(4, 'Oppo', 0),
(5, 'Nokia', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tb_cart`
--

CREATE TABLE `tb_cart` (
  `ID` int(11) NOT NULL,
  `CustomerName` varchar(255) NOT NULL,
  `TotalPrice` double NOT NULL,
  `PaymentMethod` tinyint(4) NOT NULL,
  `Address` varchar(255) NOT NULL,
  `ShippingCost` double NOT NULL,
  `CartDetails` varchar(20000) NOT NULL,
  `Status` tinyint(4) NOT NULL DEFAULT 0,
  `OrderCode` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tb_cart`
--

INSERT INTO `tb_cart` (`ID`, `CustomerName`, `TotalPrice`, `PaymentMethod`, `Address`, `ShippingCost`, `CartDetails`, `Status`, `OrderCode`) VALUES
(2, 'Hung Nguyen', 4830, 3, 'Vietnam', 0, '[{\"ID\":\"37\",\"name\":\"Samsung Galaxy S23\",\"image\":\"http://localhost:3000/uploads/product-1681332803516.jpg\",\"num\":\"1\",\"price\":\"800\"},{\"ID\":\"38\",\"name\":\"Samsung Galaxy Z Fold4\",\"image\":\"http://localhost:3000/uploads/product-1681332864975.jpeg\",\"num\":\"3\",\"price\":\"850\"},{\"ID\":\"47\",\"name\":\"NOKIA X20 DUAL-SIM\",\"image\":\"http://localhost:3000/uploads/product-1681333729064.jpg\",\"num\":\"2\",\"price\":\"740\"}]', 4, ''),
(3, 'Vy', 1757, 2, 'Ha Noi', 0, '[{\"ID\":\"23\",\"name\":\"iPhone 14 Pro Max\",\"image\":\"http://localhost:3000/uploads/product-1681221981004.webp\",\"num\":\"1\",\"price\":\"1099\"},{\"ID\":\"48\",\"name\":\"NOKIA G20 DUAL-SIM\",\"image\":\"http://localhost:3000/uploads/product-1681333823096.jpg\",\"num\":\"2\",\"price\":\"329\"}]', 1, 'cd1dbb6e-f0c5-482e-9aaa-135f66fb6e9b'),
(4, 'Tran Hung Manh', 6661, 1, '99 Nguyen Hue, Q1', 0, '[{\"ID\":\"23\",\"name\":\"iPhone 14 Pro Max\",\"image\":\"http://127.0.0.1:3000/uploads/product-1681221981004.webp\",\"num\":\"4\",\"price\":\"1099\"},{\"ID\":\"43\",\"name\":\"Reno8 T\",\"image\":\"http://127.0.0.1:3000/uploads/product-1681333348533.webp\",\"num\":\"3\",\"price\":\"755\"}]', 4, '1377108c-a297-49ae-ac91-64be40265917'),
(5, 'Tran Van Chuong', 500, 2, '8 Le Duc Tho, Go Vap', 0, '[{\"ID\":\"30\",\"name\":\"iPhone 11\",\"image\":\"http://127.0.0.1:3000/uploads/product-1681331949672.webp\",\"num\":\"2\",\"price\":\"250\"}]', 1, '01622646-9358-4f59-9120-f6901b8508b4'),
(6, 'Nguyen Vap Nga', 350, 3, '8 CHau Van Liem, Q5', 0, '[{\"ID\":\"31\",\"name\":\" iPhone 11 Pro\",\"image\":\"http://127.0.0.1:3000/uploads/product-1681332060680.webp\",\"num\":\"1\",\"price\":\"350\"}]', 2, '90e7f130-62bc-45db-bbc8-ae7dd2c6b675'),
(7, 'Le Van Luyen', 550, 2, '100 Hoa Hung, Q10', 0, '[{\"ID\":\"36\",\"name\":\"iPhone 12\",\"image\":\"http://127.0.0.1:3000/uploads/product-1681332577716.webp\",\"num\":\"1\",\"price\":\"550\"}]', 3, '4bc0a3d0-cd64-4ac3-a057-17f40faa9506'),
(8, 'Nguyen Van Tran Thi Le Chi Mai', 799, 2, '1 Hai THuong Lan Ong, Q5', 0, '[{\"ID\":\"32\",\"name\":\"iPhone 13 Pro\",\"image\":\"http://127.0.0.1:3000/uploads/product-1681332201736.webp\",\"num\":\"1\",\"price\":\"799\"}]', 0, 'c4f256e1-1df8-4c44-bdbb-4912aa4ea6a8'),
(9, 'Nguyen Tran Loi Loc', 1198, 1, '1 Ba Hat, Q10', 0, '[{\"ID\":\"34\",\"name\":\"iPhone 13 Mini\",\"image\":\"http://127.0.0.1:3000/uploads/product-1681336015455.jpg\",\"num\":\"2\",\"price\":\"599\"}]', 1, 'fcd84004-c152-4012-80be-bcea18b1c2be'),
(10, 'Tran Vo Dich', 599, 2, '1 Le Loi, Q1', 0, '[{\"ID\":\"42\",\"name\":\"OPPO Find N2 Flip\",\"image\":\"http://127.0.0.1:3000/uploads/product-1681333271809.webp\",\"num\":\"1\",\"price\":\"599\"}]', 0, 'd6320c55-c8eb-4005-b10d-c487d5694ec4'),
(11, 'Yy', 987, 2, 'Yy', 0, '[{\"ID\":\"48\",\"name\":\"NOKIA G20 DUAL-SIM\",\"image\":\"https://77c7-171-240-132-62.ngrok-free.app/uploads/product-1681333823096.jpg\",\"num\":\"3\",\"price\":\"329\"}]', 0, 'edce82f1-7e97-4b63-82eb-02522de7db3a'),
(12, 'Huân Long', 2550, 3, '112 bui dinh tuy', 0, '[{\"ID\":\"38\",\"name\":\"Samsung Galaxy Z Fold4\",\"image\":\"https://77c7-171-240-132-62.ngrok-free.app/uploads/product-1681332864975.jpeg\",\"num\":\"3\",\"price\":\"850\"}]', 0, '537e47a5-27e9-4726-a692-50f3d340f55e'),
(13, 'Huan', 199, 3, 'No', 0, '[{\"ID\":\"22\",\"name\":\"Galaxy S23\",\"image\":\"https://e870-171-247-177-244.ngrok-free.app/uploads/product-1681212566746.webp\",\"num\":\"1\",\"price\":\"199\"}]', 0, 'cd93308c-9343-40dc-aa4e-9a91147992b7');

-- --------------------------------------------------------

--
-- Table structure for table `tb_cartdetails`
--

CREATE TABLE `tb_cartdetails` (
  `ID` int(11) NOT NULL,
  `CartID` int(11) NOT NULL,
  `ProductID` int(11) NOT NULL,
  `Quantity` int(11) NOT NULL,
  `Price` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tb_category`
--

CREATE TABLE `tb_category` (
  `ID` int(11) NOT NULL,
  `CategoryName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tb_category`
--

INSERT INTO `tb_category` (`ID`, `CategoryName`) VALUES
(1, 'Android'),
(2, 'IOS'),
(5, 'Tablet');

-- --------------------------------------------------------

--
-- Table structure for table `tb_product`
--

CREATE TABLE `tb_product` (
  `ID` int(11) NOT NULL,
  `ProductName` varchar(255) NOT NULL,
  `BrandID` int(11) NOT NULL,
  `CategoryID` int(11) NOT NULL,
  `Description` varchar(1000) NOT NULL,
  `Price` double NOT NULL,
  `ImageUrl` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tb_product`
--

INSERT INTO `tb_product` (`ID`, `ProductName`, `BrandID`, `CategoryID`, `Description`, `Price`, `ImageUrl`) VALUES
(22, 'Galaxy%20S23', 3, 1, 'Meet%20the%20Samsung%20Galaxy%20S23%2C%20the%20phone%20that%20takes%20you%20out%20of%20the%20everyday%20and%20into%20the%20epic.%20Record%20in%20stunning%20detail%20with%20cinematic%208K%20Video%20@%2030fps%20%u2013%20the%20highest%20recording%20resolution%20available%20on%20a%20smartphone.%20Enjoy%20your%20favorite%20content%20on%20a%20bright%2C%20beautiful%206.1%u201D%20FHD+%20Dynamic%20AMOLED%20display.%20Capture%20vivid%20detail%20with%20a%20triple%20lens%20camera%20and%20a%2050MP%20resolution%20main%20lens%20with%20up%20to%2030X%20digital%20zoom.%20Life%20doesn%u2019t%20wait%20for%20the%20perfect%20lighting%2C%20but%20with%20Nightography%2C%20you%20are%20always%20ready%20to%20seize%20the%20moment%20even%20in%20low%20light%20and%20snap%20memories%20like%20a%20pro.%20See%20your%20content%20no%20matter%20the%20time%20of%20day%20on%20a%20display%20with%20a%20refresh%20rate%20up%20to%20120Hz%20and%20Adaptive%20Vision%20Booster.', 199, '[{\"image\":\"product-1681212566745.webp\",\"isThumb\":\"0\"},{\"image\":\"product-1681212566746.webp\",\"isThumb\":\"1\"}]'),
(23, 'iPhone%2014%20Pro%20Max', 2, 2, 'iPhone%2014%20Pro%20Max.%20Capture%20incredible%20detail%20with%20a%2048MP%20Main%20camera.%20Experience%20iPhone%20in%20a%20whole%20new%20way%20with%20Dynamic%20Island%20and%20Always-On%20display.%20And%20get%20peace%20of%20mind%20with%20groundbreaking%20safety%20features.', 1099, '[{\"image\":\"product-1681221981002.webp\",\"isThumb\":\"0\"},{\"image\":\"product-1681221981004.webp\",\"isThumb\":\"1\"}]'),
(30, 'iPhone%2011', 2, 2, 'Free%20shipping', 250, '[{\"image\":\"product-1681331949672.webp\",\"isThumb\":\"0\"},{\"image\":\"product-1681331949672.webp\",\"isThumb\":\"0\"}]'),
(31, '%20iPhone%2011%20Pro', 2, 2, 'Free%2030-day%20returns', 350, '[{\"image\":\"product-1681332060680.webp\"},{\"image\":\"product-1681332060681.jpeg\"},{\"image\":\"product-1681332060682.webp\"}]'),
(32, 'iPhone%2013%20Pro', 2, 2, 'This%20phone%20must%20be%20purchased%20with%20a%20monthly%20carrier%20plan%20and%20will%20be%20locked%20to%20the%20selected%20carrier.', 799, '[{\"image\":\"product-1681332201734.webp\",\"isThumb\":\"0\"},{\"image\":\"product-1681332201736.webp\",\"isThumb\":\"1\"}]'),
(33, 'iPhone%2013%20Pro%20Max', 2, 2, 'We%20don%27t%20know%20when%20or%20if%20this%20item%20will%20be%20back%20in%20stock.', 999, '[{\"image\":\"product-1681332314319.webp\",\"isThumb\":\"0\"},{\"image\":\"product-1681332314321.webp\",\"isThumb\":\"1\"}]'),
(34, 'iPhone%2013%20Mini', 2, 2, 'This%20is%20an%20auto-renewed%20stored%20value%20card%20subscription', 599, '[{\"image\":\"product-1681336015455.jpg\",\"isThumb\":\"0\"}]'),
(35, 'iPhone%20SE', 2, 2, 'Each%20month%2C%20Amazon%20automatically%20charges%20your%20preferred%20payment%20method%20to%20a%20stored%20value%20card%2C%20which%20is%20then%20used%20by%20Cricket%20to%20pay%20for%20your%20wireless%20service%20plan', 499, '[{\"image\":\"product-1681332477595.webp\",\"isThumb\":\"1\"},{\"image\":\"product-1681332477596.webp\",\"isThumb\":\"0\"}]'),
(36, 'iPhone%2012', 2, 2, 'Get%20up%20to%20%2475.00%20over%2024%20months%20added%20to%20your%20Amazon.com%20Gift%20Card%20balance', 550, '[{\"image\":\"product-1681332577716.webp\"},{\"image\":\"product-1681332577717.webp\"}]'),
(37, 'Samsung%20Galaxy%20S23', 3, 1, 'Samsung%20Galaxy%20S23%20is%20a%20phone%20that%20transports%20you%20from%20the%20routine%20to%20the%20extraordinary.', 800, '[{\"image\":\"product-1681332803516.jpg\",\"isThumb\":\"0\"},{\"image\":\"product-1681332803517.jpg\",\"isThumb\":\"0\"}]'),
(38, 'Samsung%20Galaxy%20Z%20Fold4', 3, 1, 'Lighter%20and%20thinner.%20More%20durable.%20And%20now%20with%20our%20most%20powerful%20processor.', 850, '[{\"image\":\"product-1681332864973.png\",\"isThumb\":\"0\"},{\"image\":\"product-1681332864974.jpeg\",\"isThumb\":\"0\"},{\"image\":\"product-1681332864975.jpeg\",\"isThumb\":\"1\"}]'),
(39, 'Samsung%20Galaxy%20Z%20Flip4', 3, 1, 'Galaxy%20Z%20Flip4%20is%20pocket-sized%20for%20big%20moves.%20With%20its%20compact%20form%2C%20foldable%20display%20and%20statement-making%20color%20choices%2C%20you%20have%20countless%20new%20ways%20to%20capture%20your%20best%20life%20on%20a%20whole%20new%20level.', 700, '[{\"image\":\"product-1681332917629.jpeg\",\"isThumb\":\"0\"},{\"image\":\"product-1681332917630.jpeg\",\"isThumb\":\"1\"},{\"image\":\"product-1681332917630.jpeg\",\"isThumb\":\"0\"}]'),
(40, 'Samsung%20Galaxy%20A53%205G', 3, 1, 'The%20Galaxy%20A53%205G%20is%20the%20new%205G%20smartphone%20from%20Samsung%20that%20provides%20the%20awesome%20Galaxy%20experience%20at%20a%20phenomenal%20price%20point.', 499, '[{\"image\":\"product-1681332998667.jpg\"},{\"image\":\"product-1681332998667.jpg\"},{\"image\":\"product-1681332998667.jpg\"}]'),
(41, 'Samsung%20Galaxy%20S22+', 3, 1, 'When%20you%27ve%20got%20something%20today%2C%20Galaxy%20S22+%20makes%20it%20possible%20to%20say%20anything%20you%20want%20with%20video%2C%20at%20any%20time%20-%20even%20in%20the%20darkness%20of%20night.%20Capture%20every%20moment%20in%208K%2C%20the%20highest%20resolution%20available%20on%20a%20smartphone.', 788, '[{\"image\":\"product-1681333172980.jpeg\"},{\"image\":\"product-1681333172980.jpeg\"}]'),
(42, 'OPPO%20Find%20N2%20Flip', 4, 1, 'Discover%20the%20tech-savvy%2C%20style%20statement%20phone%20that%20lets%20you%20see%20more%20in%20a%20snap', 599, '[{\"image\":\"product-1681333271809.webp\"},{\"image\":\"product-1681333271809.webp\"}]'),
(43, 'Reno8%20T', 4, 1, '120Hz%203D%20Curved%20Screen108MP%20Portrait%20Camera67W%20SUPERVOOCTM', 755, '[{\"image\":\"product-1681333348533.webp\",\"isThumb\":\"0\"},{\"image\":\"product-1681333348533.webp\",\"isThumb\":\"0\"}]'),
(44, 'OPPO%20A78', 4, 1, '33W%20SUPERVOOC%u2122%0A5000mAh%20Long-Lasting%20Battery%0A50MP%20AI%20Camera%0ADual%20Stereo%20Speakers', 555, '[{\"image\":\"product-1681333401255.jpg\",\"isThumb\":\"0\"},{\"image\":\"product-1681333401255.jpg\",\"isThumb\":\"0\"},{\"image\":\"product-1681333401256.jpg\",\"isThumb\":\"0\"}]'),
(45, 'Oppo%20A17k', 4, 1, '5000mAh%20Long-Lasting%20Battery%0AUp%20to%204GB%20Extended%20RAM%0ASide%20Fingerprint%20Unlock%0AIPX4%20Water%20Resistance', 399, '[{\"image\":\"product-1681333556366.png\",\"isThumb\":\"0\"},{\"image\":\"product-1681333556368.png\",\"isThumb\":\"0\"}]'),
(46, 'NOKIA%20XR20%20DUAL%20SIM', 5, 1, '6GB/128GB%2C%20GRANITE%20GRAY%20TA-1362', 789, '[{\"image\":\"product-1681333661221.jpg\",\"isThumb\":\"0\"}]'),
(47, 'NOKIA%20X20%20DUAL-SIM', 5, 1, '8GB%20/128GB%2C%20MIDNIGHT%20SUN', 740, '[{\"image\":\"product-1681333729063.jpg\",\"isThumb\":\"0\"},{\"image\":\"product-1681333729064.jpg\",\"isThumb\":\"1\"}]'),
(48, 'NOKIA%20G20%20DUAL-SIM', 5, 1, '4GB%20128GB%2C%20GLACIER', 329, '[{\"image\":\"product-1681333823096.jpg\",\"isThumb\":\"0\"},{\"image\":\"product-1681333823097.jpg\",\"isThumb\":\"0\"}]'),
(49, 'iPad%20Air', 2, 2, 'Supercharged%20by%20the%20Apple%20M1%20chip.', 599, '[{\"image\":\"product-1681333958277.jpg\"},{\"image\":\"product-1681333958280.jpg\"}]'),
(50, 'Nokia%20X30%205G', 5, 1, 'Nokia%20X30%206/128%20+%20Nokia%20Clarity%20Earbuds', 300, '[{\"image\":\"product-1681400890021.jpg\"},{\"image\":\"product-1681400890021.webp\"}]');

-- --------------------------------------------------------

--
-- Table structure for table `tb_slider`
--

CREATE TABLE `tb_slider` (
  `ID` int(11) NOT NULL,
  `SliderTitle` varchar(255) NOT NULL,
  `SliderSubTitle` varchar(255) NOT NULL,
  `Description` varchar(1000) NOT NULL,
  `ImageUrl` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tb_slider`
--

INSERT INTO `tb_slider` (`ID`, `SliderTitle`, `SliderSubTitle`, `Description`, `ImageUrl`) VALUES
(7, 'iPhone%2014%20Pro', 'Pro.%20Beyond.', 'Meet%20Dynamic%20Island%2C%20A%20battery%20that%27s%20all%20in%2C%20all%20day.%0AFrom%20%24999%20or%20%2441.62/mo.%20for%2024%20mo.', 'product-1681325637434.png'),
(8, 'Samsung%20Launches%20Galaxy%20M53%205G', 'with%20Segment-Best%20108%20MP%20Quad%20Camera%2C%20Segment-Only%20Auto%20Data%20Switching%20%26%20Segment-Leading%20sAMOLED+%20Display%20in%20India', 'Galaxy%20M53%205G%20comes%20with%20segment-leading%20features%20like%20Intelligent%20Voice%20Focus%2C%20RAM%20Plus%2C%20Vapour%20Cooling%20Chamber%20and%20Knox%20Security', 'product-1681400296349.png'),
(11, 'OPPO%20A74%205G', 'No%20Cost%20EMI/Additional%20Exchange%20Offers', '16MP%20rear%20camera%20with%20AI%20beauty%2C%20HDR%2C%20background%20blur%2C%20sticker%2C%20filter%20%7C%2013MP+2MP%20dual%20front%20camera', 'product-1681409286105.png'),
(12, 'Iphone%2012', 'No%20Cost%20EMI/Additional%20Exchange%20Offers', '123456', 'product-1681400562506.png');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(200) NOT NULL,
  `last_login` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `last_login`) VALUES
(4, 'Long Huan', 'huan@gmail.com', '$2a$10$OeIkAMuugIfp24lH5Y2ZpOCz3Px8pC7EXoxA6qLWrpB8jXy1rURoi', '2023-04-17 07:19:52'),
(5, 'Hung', 'hungnguyen@gmail.com', '$2a$10$0t4/tMOxJiGlk841WJoCUOnZhToxJJxD0ATvwWYTdFga04z8kCVWy', '2023-04-15 03:38:46'),
(6, 'Vy Bui', 'longvi1510@gmail.com', '$2a$10$1uPy.11HVgaiSbO.1.vBK.JHI8nfJhRIV2cAUSJDOP6CyoKe41Pxa', '2023-04-15 14:39:53'),
(7, 'Huan Hu Hong', 'buituanlongvy@yahoo.com.vn', '$2a$10$TOWjMLb4gHV4kg20.itQ5euGLW5PhJBbz8CsBqef3k.RUDsxPgMPW', '2023-04-15 14:41:39');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_brand`
--
ALTER TABLE `tb_brand`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `tb_cart`
--
ALTER TABLE `tb_cart`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `tb_cartdetails`
--
ALTER TABLE `tb_cartdetails`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `tb_category`
--
ALTER TABLE `tb_category`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `tb_product`
--
ALTER TABLE `tb_product`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `tb_slider`
--
ALTER TABLE `tb_slider`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_brand`
--
ALTER TABLE `tb_brand`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `tb_cart`
--
ALTER TABLE `tb_cart`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `tb_cartdetails`
--
ALTER TABLE `tb_cartdetails`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_category`
--
ALTER TABLE `tb_category`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tb_product`
--
ALTER TABLE `tb_product`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `tb_slider`
--
ALTER TABLE `tb_slider`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
