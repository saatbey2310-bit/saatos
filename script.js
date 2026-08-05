async function loadPureBinaryPayload() {
    const fileName = document.getElementById('binName').value.trim();
    const logBox = document.getElementById('log');

    function log(msg) {
        logBox.innerText += msg + "\n";
        logBox.scrollTop = logBox.scrollHeight;
    }

    if (!fileName) {
        log("[-] Hata: Dosya adı girilmedi!");
        return;
    }

    const username = "saatbey2310-bit";
    const repo = "saatos";
    const branch = "main";
    const rawUrl = `https://raw.githubusercontent.com/${username}/${repo}/${branch}/${fileName}`;

    log("\n[*] Ham binary talep ediliyor: " + rawUrl);

    try {
        const response = await fetch(rawUrl);
        if (!response.ok) {
            throw new Error(`HTTP Hata: ${response.status} (Dosya ham olarak çekilemedi!)`);
        }

        // Doğrudan ham ikili veri (binary) olarak belleğe alıyoruz
        const rawBuffer = await response.arrayBuffer();
        
        if (rawBuffer.byteLength === 0) {
            throw new Error("Dosya boş (0 bayt) veya yanlış format!");
        }

        log("[+] Ham .bin dosyası başarıyla indirildi!");
        log("[+] Toplam Boyut: " + rawBuffer.byteLength + " bayt.");

        // Saf Uint8Array görünümü (HTML veya metin dönüşümü yok, saf binary)
        const pureBytes = new Uint8Array(rawBuffer);

        // İlk 16 baytın saf Hex dökümü
        let hexOutput = [];
        for (let i = 0; i < Math.min(pureBytes.length, 16); i++) {
            hexOutput.push('0x' + pureBytes[i].toString(16).padStart(2, '0'));
        }

        log("[*] Veri Tipi: Saf Binary (ArrayBuffer / Uint8Array)");
        log("[*] İlk 16 Ham Bayt: " + hexOutput.join(' '));
        log("[+] İşlem tamamlandı: Payload ham binary olarak belleğe oturtuldu!");

    } catch (err) {
        log("[-] Kritik Hata: " + err.message);
    }
}
