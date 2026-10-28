CREATE TABLE IF NOT EXISTS `field_tool_orders` (
 `order_id` varchar(64) NOT NULL PRIMARY KEY,
 `email` varchar(320) NOT NULL,
 `slug` varchar(64) NOT NULL,
 `status` varchar(16) NOT NULL,
 `provider_updated_at` timestamp(3) NOT NULL,
 INDEX `field_tool_buyer` (`email`, `status`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `field_tool_access_tokens` (
 `token_hash` varchar(64) NOT NULL PRIMARY KEY,
 `email` varchar(320) NOT NULL,
 `slug` varchar(64) NOT NULL,
 `kind` varchar(16) NOT NULL,
 `expires_at` timestamp NOT NULL,
 `used_at` timestamp NULL
);
