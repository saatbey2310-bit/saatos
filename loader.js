async function loadRealBinary() {
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

    // Kendi GitHub repo adresin
    const username = "saatbey2310-bit";
    const repo = "saatos";
    const branch = "main";
    const rawUrl = `https://raw.githubusercontent.com/${username}/${repo}/${branch}/${fileName}`;

    log("\n[*] İstek atılıyor: " + rawUrl);

    try {
        const response = await fetch(rawUrl);
        if (!response.ok) {
            throw new Error(`HTTP Hata Kodu: ${response.status} (Dosya repoda yok veya erişilemiyor!)`);
        }

        // Ham binary verisini ArrayBuffer olarak alıyoruz (Simülasyon değil, gerçek veri)
        const arrayBuffer = await response.arrayBuffer();
        log("[+] Başarılı! Ham .bin dosyası belleğe indirildi.");
        log("[+] Toplam Boyut: " + arrayBuffer.byteLength + " bayt.");

        // Bellek üzerinde doğrudan bayt görünümü (Uint8Array) oluşturuyoruz
        const memoryView = new Uint8Array(arrayBuffer);

        // İlk 32 baytın gerçek Hexadecimal dökümünü alalım
        let hexBytes = [];
        for (let i = 0; i < Math.min(memoryView.length, 32); i++) {
            hexBytes.push('0x' + memoryView[i].toString(16).padStart(2, '0'));
        }

        log("[*] Bellek Adresi Blok Boyutu: " + memoryView.length);
        log("[*] Gerçek İlk Baytlar (Hex): " + hexBytes.join(' '));
        log("[+] İşlem tamamlandı. Veri JavaScript belleğinde ham olarak işleniyor.");

    } catch (err) {
        log("[-] Kritik Hata: " + err.message);
    }
}
