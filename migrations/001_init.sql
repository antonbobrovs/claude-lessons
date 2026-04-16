CREATE TABLE chapters (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  "order" INTEGER NOT NULL
);

CREATE TABLE lessons (
  id SERIAL PRIMARY KEY,
  chapter_id INTEGER NOT NULL REFERENCES chapters(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL DEFAULT '',
  "order" INTEGER NOT NULL
);

CREATE INDEX lessons_chapter_id_idx ON lessons(chapter_id);
CREATE INDEX chapters_order_idx ON chapters("order");
CREATE INDEX lessons_order_idx ON lessons("order");
