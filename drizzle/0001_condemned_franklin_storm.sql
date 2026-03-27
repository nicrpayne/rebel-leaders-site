CREATE TABLE `gravitas_results` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`scanMode` enum('SCAN','DEEP_SCAN') NOT NULL,
	`identity` decimal(3,1) NOT NULL,
	`relationship` decimal(3,1) NOT NULL,
	`vision` decimal(3,1) NOT NULL,
	`culture` decimal(3,1) NOT NULL,
	`total` decimal(3,1) NOT NULL,
	`archetype` varchar(64) NOT NULL,
	`leak` varchar(32) NOT NULL,
	`force` varchar(32) NOT NULL,
	`fullPayload` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `gravitas_results_id` PRIMARY KEY(`id`)
);
