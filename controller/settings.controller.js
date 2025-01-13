const {mssql}=require('../database/connection')


module.exports ={
  update:async (req, res) => {


    if (!req.session.user) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }

    const { expiryDays, voucherWidth, voucherHeight, titleFontSize, textFontSize } = req.body;

    try {
      const result = await mssql.query`
            SELECT * FROM Settings WHERE user_id = ${req.session.user.id}
        `;

        if (result.recordset.length > 0) {
          
            await mssql.query`
                UPDATE Settings 
                SET 
                    expiry_days = ${expiryDays},
                    voucher_width = ${voucherWidth},
                    voucher_height = ${voucherHeight},
                    title_font_size = ${titleFontSize},
                    text_font_size = ${textFontSize}
                WHERE user_id = ${req.session.user.id}
            `;
            console.log("Settings updated");
        } else {
          
     await mssql.query`
                INSERT INTO Settings (user_id, expiry_days, voucher_width, voucher_height, title_font_size, text_font_size)
                VALUES (${req.session.user.id}, ${expiryDays}, ${voucherWidth}, ${voucherHeight}, ${titleFontSize}, ${textFontSize})
            `;
            console.log("New settings created");
        }
     
        
        res.status(200).json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update settings' });
    }
},


get:(req,res)=>{

  if (!req.session.user) {
    res.status(401).json({ error: 'Unauthorized' });
    return;


}



},


default:async(req,res)=>{

  if (!req.session.user) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
}
   try {


    await mssql.query`
               UPDATE Settings 
                SET 
                    expiry_days = ${5},
                    voucher_width = ${150},
                    voucher_height = ${150},
                    title_font_size = ${28},
                    text_font_size = ${16}
                WHERE user_id = ${req.session.user.id}
               
            `;

            res.status(200).json({ success: true });

    
   } catch (error) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update settings' });
   }

}

}