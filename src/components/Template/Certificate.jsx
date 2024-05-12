import jsPDF from 'jspdf';
import headerImage from '../../assets/cert/header.png'

export const Certificate = () => {
  const save = () => {
    const doc = new jsPDF();
    doc.addImage(headerImage, "PNG", 0, 0, 220, 58.79);
    doc.setFontSize(9);
    doc.text("REPUBLIC OF THE PHLIPPINES", 78, 32);
    doc.text("CITY OF MANILA", 90, 36);
    doc.setFontSize(12);
    doc.text("OFFICE OF THE PUNONG BARANGAY", 64, 42);
    doc.setFontSize(9);
    doc.text("BARANGAY 413 ZONE 42 DISTRICT IV", 74, 47);
    doc.text("1278 Lardizabal Street Sampaloc, Manila", 73, 51.5);
    doc.text("Email: barangay413zone42@gmail.com FB: Barangay413Zone42", 57, 55.5);


    doc.save("certificate.docx");
  };

  return <button onClick={save}>Save</button>;
};
