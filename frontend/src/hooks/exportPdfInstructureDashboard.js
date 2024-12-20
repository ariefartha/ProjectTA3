import jsPDF from 'jspdf';
import 'jspdf-autotable';

const exportPdfInstructureDashboard = (filterDate, formatDateToIndonesian, calculateDuration) => {
    
  const exportPDF = () => {
    const doc = new jsPDF();
    const date = new Date().toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const logoPath = '/logoo.png';
    const img = new Image();
    img.src = logoPath;
    img.onload = () => {
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const logoWidth = 150;
      const logoHeight = 100;
      const centerX = (pageWidth - logoWidth) / 2;
      const centerY = (pageHeight - logoHeight) / 2;

      doc.setGState(new doc.GState({ opacity: 0.1 }));
      doc.addImage(img, 'PNG', centerX, centerY, logoWidth, logoHeight);
      doc.setGState(new doc.GState({ opacity: 1 }));

      doc.setFontSize(20);
      doc.text('Data Jadwal Belajar Siswa', pageWidth / 2, 20, { align: 'center' });

      const tableData = filterDate.map((item, index) => [
        index + 1,
        formatDateToIndonesian(item.startDate),
        formatDateToIndonesian(item.endDate),
        calculateDuration(item.startDate, item.endDate),
        item.student,
        item.status,
      ]);

      doc.autoTable({
        head: [['No', 'Jam Mulai', 'Jam Berakhir', 'Durasi', 'Siswa', 'Status']],
        body: tableData,
        startY: 30,
      });
      doc.setFontSize(10);
      doc.text(`Data ini di export pada: ${date}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
      doc.save(`Data_Jadwal_Belajar_Siswa_di_download_pada_${date}.pdf`);
    };
  };

  return exportPDF;
};

export default exportPdfInstructureDashboard;
