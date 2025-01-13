

const mssql=require('mssql');



const config = {
  user: 'sa', 
  password: 'yourStrong#Password', 
  server: 'localhost',
  port: 4000, 
  database: 'DBstore', 
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

