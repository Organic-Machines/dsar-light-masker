// New storage for multiple files
let allFilesData = []; 
let globalHeaders = new Set(); // Using a Set to collect unique headers from ALL files

const transform = {
    mask: (str) => {
        if (str.length <= 2) return "***";
        return str[0] + "*".repeat(str.length - 2) + str[str.length - 1];
    },
    hash: (str) => {
        return CryptoJS.SHA256(str).toString();
    },
    redact: () => "[REDACTED]"
};

document.getElementById('csvFile').addEventListener('change', function(e) {
    const files = Array.from(e.target.files);
    allFilesData = []; // Clear previous batch
    globalHeaders.clear();

    const parsePromises = files.map(file => {
        return new Promise((resolve) => {
            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: function(results) {
                    // Store the data AND the original filename
                    allFilesData.push({
                        name: file.name,
                        data: results.data
                    });
                    // Add headers to our global list
                    results.meta.fields.forEach(h => globalHeaders.add(h));
                    resolve();
                }
            });
        });
    });

    Promise.all(parsePromises).then(() => {
        renderMappingUI();
    });
});

function renderMappingUI() {
    const container = document.getElementById('headerList');
    const section = document.getElementById('mappingSection');
    container.innerHTML = '';
    section.classList.remove('hidden');

    // Convert Set back to Array to loop
    Array.from(globalHeaders).forEach(header => {
        const div = document.createElement('div');
        div.className = "flex items-center justify-between p-2 border-b";
        div.innerHTML = `
            <span class="font-medium">${header}</span>
            <select class="header-rule border p-1 rounded" data-header="${header}">
                <option value="none">Keep Original</option>
                <option value="mask">Mask (Partial)</option>
                <option value="hash">Hash (SHA-256)</option>
                <option value="redact">Redact (Full)</option>
            </select>
        `;
        container.appendChild(div);
    });
}

document.getElementById('processBtn').addEventListener('click', function() {
    const rules = {};
    document.querySelectorAll('.header-rule').forEach(select => {
        rules[select.dataset.header] = select.value;
    });

    // Loop through every file in the batch
    allFilesData.forEach(fileObj => {
        const processedRows = fileObj.data.map(row => {
            let newRow = { ...row };
            for (let header in rules) {
                const rule = rules[header];
                if (row[header]) { // Only mask if the column exists in this specific file
                    if (rule === 'mask') newRow[header] = transform.mask(row[header]);
                    if (rule === 'hash') newRow[header] = transform.hash(row[header]);
                    if (rule === 'redact') newRow[header] = transform.redact();
                }
            }
            return newRow;
        });

        // Trigger download immediately for this file
        downloadFile(processedRows, `masked_${fileObj.name}`);
    });

    alert("Batch processing complete! Check your downloads folder.");
    showPreview(processedData);
});

function downloadFile(data, filename) {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", filename);
    link.click();
}

function showPreview(data) {
    const table = document.getElementById('previewTable');
    const section = document.getElementById('previewSection');
    section.classList.remove('hidden');
    
    // Show only first 5 rows
    const previewRows = data.slice(0, 5);
    let html = `<thead><tr>${headers.map(h => `<th class="border-b p-2">${h}</th>`).join('')}</tr></thead><tbody>`;
    
    previewRows.forEach(row => {
        html += `<tr>${headers.map(h => `<td class="border-b p-2 text-gray-600">${row[h]}</td>`).join('')}</tr>`;
    });
    html += `</tbody>`;
    table.innerHTML = html;

    // Set up download button
    document.getElementById('downloadBtn').onclick = () => {
        const csv = Papa.unparse(data);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", "masked_data.csv");
        link.click();
    };
}