CREATE TABLE IF NOT EXISTS `field_tool_gifts` (
 `token_hash` varchar(64) NOT NULL PRIMARY KEY,
 `slug` varchar(64) NOT NULL,
 `audience` varchar(16) NOT NULL,
 `sender_name` varchar(100) NOT NULL,
 `recipient_name` varchar(100) NOT NULL,
 `recipient_email` varchar(320) NOT NULL,
 `message` text NOT NULL,
 `order_id` varchar(64) NULL,
 `buyer_email` varchar(320) NULL,
 `notified_at` timestamp NULL,
 `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 UNIQUE KEY `field_tool_gift_order` (`order_id`)
);
