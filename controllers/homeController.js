const fs = require("fs")

const {  getInvoice } = require("../utils/pdf-convertor");

const homeView = (req,res,next) => {
    res.render("home");
}

const generatePdf = async (req, res) => {
    const id = req.params.id;
    // if (!username) throw new BadRequestError("Some Error Occured. Log-in again and then try.")
    try {
      const pdfBytes = await getInvoice(id);
      res.setHeader('Content-Disposition', 'attachment; filename="invoice.pdf"');
      res.setHeader('Content-Type', 'application/pdf');
      res.send(Buffer.from(pdfBytes));
    } catch (error) {
      console.log(error)
    //   throw new InternalServerError(
    //     "Something went wrong, please try again later."
    //   );
    }
  }
module.exports = {homeView,generatePdf}