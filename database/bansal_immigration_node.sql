-- Import in phpMyAdmin or: mysql -u root < database/bansal_immigration_node.sql
-- For blogs, success_stories, admin users, etc., export those tables from your
-- Laravel CMS and import them into this database (same structure as bansal_immigration_new).

CREATE DATABASE IF NOT EXISTS `bansal_immigration_node`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `bansal_immigration_node`;

CREATE TABLE IF NOT EXISTS `home_faqs` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `question` varchar(500) NOT NULL,
  `answer` text NOT NULL,
  `sort_order` int unsigned NOT NULL DEFAULT 0,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `home_faqs_status_sort_idx` (`status`, `sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `home_faqs` (`question`, `answer`, `sort_order`, `status`) VALUES
('Are your migration agents registered?',
 'Yes. Our agents are registered with the Office of the Migration Agents Registration Authority (OMARA). Each agent’s MARN is shown on their profile, so you can check it on the official register before you book.', 1, 1),
('How much does a consultation cost?',
 'A free 10-minute initial assessment is available for clients already in Australia. Longer 30-minute appointments are $150. The price for your appointment type is shown when you book. If you later ask us to act for you, we agree the work and fees in writing first.', 2, 1),
('What happens at the first consultation?',
 'We listen to your situation, explain the visa options that may fit, and tell you what evidence and steps are involved. You decide whether to go ahead. There is no obligation to sign anything on the day.', 3, 1),
('Can you guarantee my visa?',
 'No. Only the Department of Home Affairs decides visa applications, and no agent can guarantee a result. We tell you honestly whether a pathway is realistic before you spend money on a course, a skills assessment or an application.', 4, 1),
('Do I need a migration agent?',
 'You can apply yourself, but visa rules are detailed and small mistakes can cause delays or refusals. An agent helps you choose the right visa, prepare the right evidence and respond if the Department asks for more.', 5, 1),
('Can I meet you if I am overseas?',
 'Yes. We offer phone and video appointments, and clients apply from many countries. Please check the Australian time zone (AEST or ACST) before you confirm a booking.', 6, 1),
('How long does a visa take?',
 'It depends on the visa and the Department’s current workload. The Department of Home Affairs publishes its latest processing times on its website. We can explain what they mean for your case and what could slow it down.', 7, 1),
('I was refused a visa. What can I do?',
 'You may have review rights with strict deadlines. Find the date in your decision letter and call us as soon as you can, with the letter in hand. An enquiry does not extend a deadline, so do not wait.', 8, 1),
('Which visa is best for permanent residency?',
 'It depends on your occupation, age, English, experience and the state options open to you. Try our PR Points Calculator for a first estimate, then book a consultation so an agent can confirm what applies to you.', 9, 1),
('Which office should I choose, Melbourne or Adelaide?',
 'Choose the office that is easiest for you to reach. If you are elsewhere in Australia or overseas, book a phone or video appointment instead.', 10, 1),
('Do your agents speak Hindi or Punjabi?',
 'Yes. Our team speaks English, Hindi and Punjabi, and some of us speak Gujarati. Each agent’s profile lists their languages, so you can book with the right person.', 11, 1),
('What should I bring to my appointment?',
 'Bring your passport, your current visa details, any recent decision letters, and your qualifications and work history if you have them. If you cannot find something, book anyway and we will tell you what to gather.', 12, 1);