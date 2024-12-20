import jsPDF from "jspdf";
import "jspdf-autotable";

const exportPdfPayment = (filteredPayment, formatDateToIndonesian, formatRupiah) => {
  const exportPDF = () => {
    const doc = new jsPDF();
    const date = new Date().toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // Watermark logo di tengah
    const logoPath = "/logoo.png";
    const img = new Image();
    img.src = logoPath;
    img.onload = () => {
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const logoWidth = 150;
      const logoHeight = 100;
      const centerX = (pageWidth - logoWidth) / 2;
      const centerY = (pageHeight - logoHeight) / 2;

      // watermark
      doc.setGState(new doc.GState({ opacity: 0.1 }));
      doc.addImage(img, "PNG", centerX, centerY, logoWidth, logoHeight);
      doc.setGState(new doc.GState({ opacity: 1 }));

      // judul
      doc.setFontSize(20);
      doc.text("Data Pembayaran Paket Mengemudi", pageWidth / 2, 20, {
        align: "center",
      });

      // Data tabel
      const tableData = filteredPayment.map((item, index) => [
        index + 1,
        item.username,
        item.packetName,
        formatRupiah(item.price),
        item.typePayment,
        item.payment_status,
        formatDateToIndonesian(item.createdAt),
      ]);

      doc.autoTable({
        head: [["No", "Siswa", "Paket", "Harga", "Tipe", "Status", "Tanggal"]],
        body: tableData,
        startY: 30,
      });
      doc.setFontSize(10);
      doc.text(
        `Data ini di export pada: ${date}`,
        pageWidth / 2,
        pageHeight - 10,
        { align: "center" }
      );
      doc.save(`Data_pembayaran di download pada ${date}.pdf`);
    };
  };
  return exportPDF;
};

export default exportPdfPayment;
