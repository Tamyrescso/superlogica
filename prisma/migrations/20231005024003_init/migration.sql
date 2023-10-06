-- CreateTable
CREATE TABLE "Visitors" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "rg" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Visitors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Condos" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Condos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Units" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "condos_id" INTEGER NOT NULL,

    CONSTRAINT "Units_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VisitorsLog" (
    "id" SERIAL NOT NULL,
    "visitors_id" INTEGER NOT NULL,
    "condos_id" INTEGER NOT NULL,
    "units_id" INTEGER NOT NULL,
    "entry" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "exit" TIMESTAMP(3),

    CONSTRAINT "VisitorsLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Visitors_rg_key" ON "Visitors"("rg");

-- AddForeignKey
ALTER TABLE "Units" ADD CONSTRAINT "Units_condos_id_fkey" FOREIGN KEY ("condos_id") REFERENCES "Condos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VisitorsLog" ADD CONSTRAINT "VisitorsLog_visitors_id_fkey" FOREIGN KEY ("visitors_id") REFERENCES "Visitors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VisitorsLog" ADD CONSTRAINT "VisitorsLog_condos_id_fkey" FOREIGN KEY ("condos_id") REFERENCES "Condos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VisitorsLog" ADD CONSTRAINT "VisitorsLog_units_id_fkey" FOREIGN KEY ("units_id") REFERENCES "Units"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
