CREATE TABLE assignments (
  id          SERIAL PRIMARY KEY,
  lesson_id   INTEGER NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  hints       JSONB NOT NULL DEFAULT '[]',
  "order"     INTEGER NOT NULL,
  UNIQUE (lesson_id, "order")
);

CREATE INDEX assignments_lesson_id_idx ON assignments(lesson_id);
