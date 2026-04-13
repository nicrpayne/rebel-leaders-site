-- Phase 1: Foundation Build — Auth + Analytics tables
-- Makes openId nullable so magic-link users don't need a Manus OAuth id.
ALTER TABLE `users` MODIFY COLUMN `openId` varchar(64) NULL;
--> statement-breakpoint
CREATE TABLE `auth_tokens` (
  `id` int AUTO_INCREMENT NOT NULL,
  `email` varchar(320) NOT NULL,
  `token` varchar(64) NOT NULL,
  `expires_at` timestamp NOT NULL,
  `used` boolean NOT NULL DEFAULT false,
  `created_at` timestamp NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_tokens_token_unique` (`token`)
);
--> statement-breakpoint
CREATE TABLE `user_events` (
  `id` int AUTO_INCREMENT NOT NULL,
  `user_id` int,
  `session_id` varchar(64) NOT NULL,
  `event_type` varchar(64) NOT NULL,
  `payload` json,
  `created_at` timestamp NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`)
);
--> statement-breakpoint
CREATE TABLE `gravitas_assessments` (
  `id` int AUTO_INCREMENT NOT NULL,
  `user_id` int,
  `session_id` varchar(64) NOT NULL,
  `scan_type` varchar(10) NOT NULL,
  `dimension_scores` json NOT NULL,
  `archetype` varchar(64) NOT NULL,
  `leak` varchar(64) NOT NULL,
  `force` varchar(64) NOT NULL,
  `first_move` varchar(64) NOT NULL,
  `raw_answers` json NOT NULL,
  `session_number` int NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`)
);
--> statement-breakpoint
CREATE TABLE `gravitas_deltas` (
  `id` int AUTO_INCREMENT NOT NULL,
  `user_id` int NOT NULL,
  `assessment_a_id` int NOT NULL,
  `assessment_b_id` int NOT NULL,
  `identity_delta` decimal(4,2) NOT NULL,
  `relationship_delta` decimal(4,2) NOT NULL,
  `vision_delta` decimal(4,2) NOT NULL,
  `culture_delta` decimal(4,2) NOT NULL,
  `archetype_shift` boolean NOT NULL DEFAULT false,
  `leak_shift` boolean NOT NULL DEFAULT false,
  `created_at` timestamp NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`)
);
--> statement-breakpoint
CREATE TABLE `codex_interactions` (
  `id` int AUTO_INCREMENT NOT NULL,
  `user_id` int,
  `session_id` varchar(64) NOT NULL,
  `cartridge_id` varchar(64) NOT NULL,
  `action` varchar(32) NOT NULL,
  `checkbox_progress` json,
  `time_spent_seconds` int,
  `arrived_from_gravitas` boolean NOT NULL DEFAULT false,
  `created_at` timestamp NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`)
);
--> statement-breakpoint
CREATE TABLE `mirror_readings` (
  `id` int AUTO_INCREMENT NOT NULL,
  `user_id` int,
  `session_id` varchar(64) NOT NULL,
  `responses` json NOT NULL,
  `result` json NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`)
);
