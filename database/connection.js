

const mssql=require('mssql');



const config = {
  user:process.env.USER, 
  password:process.env.PASSWORD, 
  server:process.env.SERVER,
  port:Number(process.env.MSSQL_PORT), 
  database:process.env.DATABASE, 
  options: {
    encrypt: true, 
    trustServerCertificate: true, 
  },
};



 const getConnection=async() =>{

 try {
  const pool=await mssql.connect(config)
  const result = await pool.request().query('SELECT GETDATE()');
  console.log("db connected",result)
  return pool
 } catch (error) {
  console.log("mssql Error:",error);
  
 }
  
}




module.exports={getConnection,mssql}

