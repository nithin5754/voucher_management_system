

document.getElementById('generateVoucher').addEventListener('click', async () => {
  try {
      const response = await fetch('/generate-voucher', {
          method: 'POST'
      });
      const data = await response.json();
      if (data.success) {
          location.reload();
      }
  } catch (err) {
      console.error('Failed to generate voucher:', err);
      alert('Failed to generate voucher');
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById('voucherModal');
  const closeBtn = document.querySelector('.closeBtn');

  const openModal = (voucher) => {
      const voucherImg = document.getElementById('voucher_img');
      voucherImg.src = `${voucher.qr_code}`;
      modal.style.display = 'block';
  }


  const closeModal = () => {
      modal.style.display = 'none';
  }


  const viewButtons = document.querySelectorAll('.view-btn');
  viewButtons.forEach(button => {
      button.addEventListener('click', () => {
          const voucher = JSON.parse(button.getAttribute('data-voucher'));
          openModal(voucher);
      });
  });

  closeBtn.addEventListener('click', closeModal);
});