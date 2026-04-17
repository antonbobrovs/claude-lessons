export type Lesson = {
  id: number
  chapter_id: number
  title: string
  slug: string
  content: string
  order: number
}

export type Chapter = {
  id: number
  title: string
  slug: string
  order: number
  lessons: Lesson[] | null
}

export type LessonNav = {
  chapterSlug: string
  lessonSlug: string
  title: string
}

export type LessonWithNav = Lesson & {
  chapter_title: string
  chapter_slug: string
  prev: LessonNav | null
  next: LessonNav | null
}

export type Assignment = {
  id: number
  lesson_id: number
  title: string
  description: string
  hints: string[]
  order: number
}
