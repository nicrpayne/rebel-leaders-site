CREATE TABLE `wall_entries` (
	`id` varchar(36) NOT NULL,
	`wall_id` varchar(36) NOT NULL,
	`image_url` text NOT NULL,
	`display_order` int DEFAULT 0,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `wall_entries_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `wall_submissions` (
	`id` varchar(36) NOT NULL,
	`wall_id` varchar(36) NOT NULL,
	`image_url` text NOT NULL,
	`status` enum('pending','approved','rejected') DEFAULT 'pending',
	`submitted_at` timestamp DEFAULT (now()),
	CONSTRAINT `wall_submissions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `walls` (
	`id` varchar(36) NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`wall_code` varchar(10) NOT NULL,
	`is_active` boolean DEFAULT true,
	`header_image_url` text,
	`prompt_text` text,
	`source_type` varchar(50),
	`source_ref` varchar(255),
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `walls_id` PRIMARY KEY(`id`),
	CONSTRAINT `walls_wall_code_unique` UNIQUE(`wall_code`)
);
