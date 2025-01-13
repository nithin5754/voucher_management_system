


const form = document.getElementById("settingsForm");

const defaultSettings=document.getElementById('default-settings')


form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const settings = Object.fromEntries(formData.entries())
   
     try {
      const response = await fetch("/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
    
      const result = await response.json();
    
      if (result.success) {
        window.location.href = "/"; 
      }else{
        window.location.href = "/settings"; 
      }
     } catch (error) {
      window.location.href = "/settings"; 
     }
})


defaultSettings.addEventListener('click',async()=>{
 try{
  const response = await fetch("/default-settings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  const result = await response.json();
    
  if (result.success) {
    window.location.href = "/settings"; 
  }else{
    window.location.href = "/settings"; 
  }
 
 } catch (error) {
  window.location.href = "/settings"; 
 }
})