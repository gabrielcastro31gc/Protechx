
-- Insert how_it_works and differentials with correct sort_order
-- First shift existing sections after services (sort_order >= 4) by +2
UPDATE site_content SET sort_order = sort_order + 2 WHERE sort_order >= 4 AND section_key != 'global_settings';

-- Insert the missing sections
INSERT INTO site_content (section_key, section_label, sort_order, content)
VALUES 
  ('how_it_works', 'Como Funciona', 4, '{}'),
  ('differentials', 'Diferenciais', 5, '{}');
