import app from "./app"
import config from "./config";
import { prisma } from "./lib/prisma";

const PORT=config.port

const main = async()=>{
try {
   await prisma.$connect()
   console.log("Database connected success")
    app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
})
} catch (error) {
  console.log("error");
    await prisma.$disconnect()
    console.error("Error starting the server:",error)
    process.exit(1)
}
}
main()