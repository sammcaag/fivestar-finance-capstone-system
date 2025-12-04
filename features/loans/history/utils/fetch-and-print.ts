import { getLoanDocumentByType } from "../api/loan-history-service";

export const fetchAndPrint = async (docType: string, loanHistoryId: number) => {
  if (!loanHistoryId) {
    alert("Loan ID is missing");
    return;
  }

  try {
    const blob: Blob = await getLoanDocumentByType(docType, loanHistoryId);
    const url = URL.createObjectURL(blob);

    // Create hidden iframe
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = url;
    document.body.appendChild(iframe);

    iframe.onload = () => {
      iframe.contentWindow?.print();
      // Optional cleanup
      // URL.revokeObjectURL(url);
      // iframe.remove();
    };
  } catch (error) {
    console.error("Failed to load document:", error);
    alert("Failed to load document. Please try again.");
  }
};
