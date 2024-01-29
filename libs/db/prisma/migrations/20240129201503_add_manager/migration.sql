-- CreateTable
CREATE TABLE "Manager" (
    "uid" TEXT NOT NULL,

    CONSTRAINT "Manager_pkey" PRIMARY KEY ("uid")
);

-- AddForeignKey
ALTER TABLE "Manager" ADD CONSTRAINT "Manager_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
