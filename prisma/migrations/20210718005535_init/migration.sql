-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "eMail" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "pseudo" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "picture" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.eMail_unique" ON "User"("eMail");

-- CreateIndex
CREATE UNIQUE INDEX "User.pseudo_unique" ON "User"("pseudo");
