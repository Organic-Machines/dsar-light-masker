# DSAR-Light CSV Masker 🛡️

**Version:** 1.0.0  
**License:** MIT  
**Privacy Status:** 100% Client-Side (No data leaves your browser)

## 📌 Overview
DSAR-Light is a lightweight, "RegTech" utility designed for Privacy Analysts, Data Engineers, and Compliance Officers. It allows users to quickly sanitize CSV files containing Personally Identifiable Information (PII) before sharing them for testing, analysis, or DSAR fulfillment.

## 🚀 Features
- **Zero Latency/Zero Risk:** Processing happens in your browser's RAM. No data is uploaded to a server.
- **Flexible Transformation:** Choose between partial masking, deterministic hashing, or full redaction on a per-column basis.
- **Instant Preview:** View the first 5 rows of your transformed data before committing to a download.
- **Windows 11 Ready:** Optimized for modern browsers and local-first workflows.

## 🛠️ Transformation Definitions
* **Keep Original:** Data remains untouched.
* **Mask (Partial):** Replaces middle characters with asterisks (e.g., `j***n@email.com`). Best for verifying data without exposing it.
* **Hash (SHA-256):** Converts values into a unique, irreversible string. Useful for maintaining referential integrity in database testing.
* **Redact (Full):** Replaces the entire cell with `[REDACTED]`. The gold standard for DSAR compliance.

## ⚖️ Legal Disclaimer & Liability
**IMPORTANT: PLEASE READ CAREFULLY.**

1. **"As-Is" Provision:** This tool is provided "as-is" without any warranties of any kind, express or implied, including but not limited to the warranties of merchantability or fitness for a particular purpose.
2. **User Responsibility:** The user is solely responsible for ensuring that the use of this tool complies with relevant data protection regulations (including but not limited to GDPR, CCPA/CPRA, and HIPAA). 
3. **No Legal Advice:** This tool is a technical utility and does not constitute legal advice. Redacting data via this tool does not automatically guarantee regulatory compliance.
4. **Data Handling:** While this tool is designed to process data locally, the developer is not responsible for any data leaks resulting from compromised local environments, browser extensions, or user error.

## 💻 Local Setup
1. Clone this repository or download the source files.
2. Open `index.html` in any modern web browser.
3. (Optional) For development, use the VS Code **Live Server** extension.

---
*Built with ❤️ for the Privacy Community.*