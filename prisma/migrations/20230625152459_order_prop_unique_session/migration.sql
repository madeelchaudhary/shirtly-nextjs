/*
  Warnings:

  - A unique constraint covering the columns `[session_id]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Order_session_id_key" ON "Order"("session_id");
