const express = require("express")

const app = express();

const conntectDb =  require("./DataBase/DBConnection")

const cors = require("cors")
//Routes of User
const UserRoute =  require("./Router/userRoute.js")

//Routes of User
const ProdcutsRoute = require("./Router/ProdcutsRoute")

//Routes 0f Category and SubCatgory 
const SubCategoryRoute = require("./Router/SubcatogryRoutes.js")
const CategoryRoute =  require("./Router/CategoryRoute.js")
const MoneyRoute = require("./Router/MoneyRoute.js")




const paymentRoute = require("./Router/paymentRoutes.js")
const completedorderRoutes = require("./Router/CompletedOrderRoutes.js")
const orderRoutes = require("./Router/orderRoutes.js")
const analytics = require("./Router/analytics")

require('dotenv').config();


const port = process.env.PORT || 3000;





app.use(express.json({ limit: '2mb' }));
app.use(cors());


conntectDb()


// => { sku: 'MStRnHs-Wh-S', description: 'Male Standard Crew T-Shirt | US21 White S' }





app.get('/' , (req,res)=>{
 
     res.send("hello")
})
app.use('/user',UserRoute)
app.use('/products',ProdcutsRoute)
app.use("/subcategory",SubCategoryRoute)
app.use("/category",CategoryRoute)
app.use("/money",MoneyRoute)

app.use("/api/payment",paymentRoute)
app.use("/api",completedorderRoutes)
app.use("/api",orderRoutes)
app.use("/api",analytics)
app.post('/api/admin/check', (req, res) => {
  const { userid, password } = req.body || {};
  if (!userid || !password) {
    return res.status(400).json({ ok: false, message: 'userid and password are required' });
  }

  const ok = userid === process.env.ADMIN_USER ||"admin" && password === process.env.ADMIN_PASS ||"12345";
  return res.status(ok ? 200 : 401).json({ ok });
});

app.get("/api/ip", async (req, res) => {
  const response = await fetch("http://ip-api.com/json");
  const data = await response.json();
  res.json(data);
});




app.listen(port,()=>{
    console.log("Connected Express")
})