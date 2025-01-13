

const logoutBtn=document.querySelector('.logout_btn')


logoutBtn.addEventListener('click',async()=>{
  await fetch('/logout')
})

