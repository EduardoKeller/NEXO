-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "AssessmentStatus" AS ENUM ('Draft', 'Active', 'Deprecated', 'Archived');

-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('Easy', 'Medium', 'Hard');

-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('Critical', 'High', 'Medium', 'Low');

-- CreateEnum
CREATE TYPE "ResourceType" AS ENUM ('Article', 'Video', 'Podcast', 'Book', 'Checklist', 'Template', 'Exercise', 'Reflection');

-- CreateTable
CREATE TABLE "assessment" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "status" "AssessmentStatus" NOT NULL,
    "estimated_time" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "assessment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "question" (
    "id" TEXT NOT NULL,
    "assessment_id" TEXT NOT NULL,
    "dimension_id" TEXT NOT NULL,
    "primary_indicator_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "weight" DOUBLE PRECISION NOT NULL,
    "order" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alternative" (
    "id" TEXT NOT NULL,
    "question_id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "alternative_pkey" PRIMARY KEY ("question_id","id")
);

-- CreateTable
CREATE TABLE "dimension" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "dimension_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "indicator" (
    "id" TEXT NOT NULL,
    "dimension_id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "indicator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "insight" (
    "id" TEXT NOT NULL,
    "indicator_id" TEXT NOT NULL,
    "priority" "Priority" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "recommendation" TEXT NOT NULL,

    CONSTRAINT "insight_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "archetype" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "archetype_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mission" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "goal" TEXT NOT NULL,
    "difficulty" "Difficulty" NOT NULL,
    "estimated_time" INTEGER NOT NULL,

    CONSTRAINT "mission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resource" (
    "id" TEXT NOT NULL,
    "type" "ResourceType" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "url" TEXT,

    CONSTRAINT "resource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "evolution_plan" (
    "id" TEXT NOT NULL,
    "archetype_id" TEXT NOT NULL,
    "first_step" TEXT NOT NULL,
    "estimated_duration" INTEGER NOT NULL,
    "difficulty" "Difficulty" NOT NULL,

    CONSTRAINT "evolution_plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "report_template" (
    "id" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "version" TEXT NOT NULL,

    CONSTRAINT "report_template_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assessment_session" (
    "id" TEXT NOT NULL,
    "assessment_id" TEXT NOT NULL,
    "anonymous_id" TEXT NOT NULL,
    "started_at" TIMESTAMPTZ(3) NOT NULL,
    "finished_at" TIMESTAMPTZ(3),
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "assessment_session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assessment_answer" (
    "id" TEXT NOT NULL,
    "session_id" TEXT NOT NULL,
    "question_id" TEXT NOT NULL,
    "alternative_id" TEXT NOT NULL,
    "answered_at" TIMESTAMPTZ(3) NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "assessment_answer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assessment_result" (
    "id" TEXT NOT NULL,
    "session_id" TEXT NOT NULL,
    "archetype_id" TEXT NOT NULL,
    "archetype_confidence" DOUBLE PRECISION NOT NULL,
    "matched_indicators" JSONB NOT NULL,
    "strengths" JSONB NOT NULL,
    "attention_points" JSONB NOT NULL,
    "evolution_plan_habits" JSONB NOT NULL,
    "insights" JSONB NOT NULL,
    "missions" JSONB NOT NULL,
    "resources" JSONB NOT NULL,
    "report_template" TEXT NOT NULL,
    "report_language" TEXT NOT NULL,
    "report_download_url" TEXT,
    "generated_at" TIMESTAMPTZ(3) NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "assessment_result_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "behavior_index" (
    "id" TEXT NOT NULL,
    "result_id" TEXT NOT NULL,
    "dimension_id" TEXT NOT NULL,
    "raw_score" DOUBLE PRECISION NOT NULL,
    "normalized_score" DOUBLE PRECISION NOT NULL,
    "confidence" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "behavior_index_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "assessment_slug_key" ON "assessment"("slug");

-- CreateIndex
CREATE INDEX "question_assessment_id_idx" ON "question"("assessment_id");

-- CreateIndex
CREATE UNIQUE INDEX "dimension_slug_key" ON "dimension"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "indicator_slug_key" ON "indicator"("slug");

-- CreateIndex
CREATE INDEX "indicator_dimension_id_idx" ON "indicator"("dimension_id");

-- CreateIndex
CREATE INDEX "insight_indicator_id_idx" ON "insight"("indicator_id");

-- CreateIndex
CREATE UNIQUE INDEX "archetype_slug_key" ON "archetype"("slug");

-- CreateIndex
CREATE INDEX "assessment_session_anonymous_id_idx" ON "assessment_session"("anonymous_id");

-- CreateIndex
CREATE INDEX "assessment_answer_session_id_idx" ON "assessment_answer"("session_id");

-- CreateIndex
CREATE UNIQUE INDEX "assessment_result_session_id_key" ON "assessment_result"("session_id");

-- CreateIndex
CREATE INDEX "behavior_index_result_id_idx" ON "behavior_index"("result_id");

-- AddForeignKey
ALTER TABLE "question" ADD CONSTRAINT "question_assessment_id_fkey" FOREIGN KEY ("assessment_id") REFERENCES "assessment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question" ADD CONSTRAINT "question_dimension_id_fkey" FOREIGN KEY ("dimension_id") REFERENCES "dimension"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question" ADD CONSTRAINT "question_primary_indicator_id_fkey" FOREIGN KEY ("primary_indicator_id") REFERENCES "indicator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alternative" ADD CONSTRAINT "alternative_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "indicator" ADD CONSTRAINT "indicator_dimension_id_fkey" FOREIGN KEY ("dimension_id") REFERENCES "dimension"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "insight" ADD CONSTRAINT "insight_indicator_id_fkey" FOREIGN KEY ("indicator_id") REFERENCES "indicator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evolution_plan" ADD CONSTRAINT "evolution_plan_archetype_id_fkey" FOREIGN KEY ("archetype_id") REFERENCES "archetype"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assessment_session" ADD CONSTRAINT "assessment_session_assessment_id_fkey" FOREIGN KEY ("assessment_id") REFERENCES "assessment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assessment_answer" ADD CONSTRAINT "assessment_answer_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "assessment_session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assessment_answer" ADD CONSTRAINT "assessment_answer_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assessment_answer" ADD CONSTRAINT "assessment_answer_question_id_alternative_id_fkey" FOREIGN KEY ("question_id", "alternative_id") REFERENCES "alternative"("question_id", "id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assessment_result" ADD CONSTRAINT "assessment_result_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "assessment_session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assessment_result" ADD CONSTRAINT "assessment_result_archetype_id_fkey" FOREIGN KEY ("archetype_id") REFERENCES "archetype"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "behavior_index" ADD CONSTRAINT "behavior_index_result_id_fkey" FOREIGN KEY ("result_id") REFERENCES "assessment_result"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "behavior_index" ADD CONSTRAINT "behavior_index_dimension_id_fkey" FOREIGN KEY ("dimension_id") REFERENCES "dimension"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
