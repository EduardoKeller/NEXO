-- CreateTable
CREATE TABLE "question_secondary_indicator" (
    "question_id" TEXT NOT NULL,
    "indicator_id" TEXT NOT NULL,

    CONSTRAINT "question_secondary_indicator_pkey" PRIMARY KEY ("question_id","indicator_id")
);

-- AddForeignKey
ALTER TABLE "question_secondary_indicator" ADD CONSTRAINT "question_secondary_indicator_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_secondary_indicator" ADD CONSTRAINT "question_secondary_indicator_indicator_id_fkey" FOREIGN KEY ("indicator_id") REFERENCES "indicator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
