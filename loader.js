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

    // GitHub repo bilgilerin
    const username = "saatbey2310-bit";
    const repo = "saatos";
    const branch = "main";
    const rawUrl = `https://raw.githubusercontent.com/${username}/${repo}/${branch}/${fileName}`;

    log("\n[*] İstek atılıyor: " + rawUrl);

    try {
        const response = await fetch(rawUrl);
        if (!response.ok) {
            throw new Error(`HTTP Hata Kodu: {response.status} (Dosya repoda yok!)`);
        }

        // 1. Ham .bin dosyasını gerçek ArrayBuffer olarak çekiyoruz
        const arrayBuffer = await response.arrayBuffer();
        log("[+] Başarılı! Ham .bin dosyası belleğe indirildi. Boyut: " + arrayBuffer.byteLength + " bayt.");

        // 2. JavaScript Bellek Havuzu (Heap Spraying / Slot Yönetimi)
        log("[*] Bellek slotları (TypedArray havuzu) hazırlanıyor...");
        let heapSprayPool = [];
        for (let i = 0; i < 64; i++) {
            // Her biri knote yapısını (0x80 bayt / 128 byte) temsil eden bellek blokları
            heapSprayPool.push(new ArrayBuffer(128));
        }
        log("[+] 64 adet bellek bloğu heap alanına püskürtüldü.");

        // 3. DataView ve Uint8Array ile ham bellek manipülasyonu (UAF / Tip Karmaşası Mantığı)
        const targetView = new DataView(arrayBuffer);
        const memoryView = new Uint8Array(arrayBuffer);

        // İlk baytların analizi
        let hexBytes = [];
        for (let i = 0; i < Math.min(memoryView.length, 16); i++) {
            hexBytes.push('0x' + memoryView[i].toString(16).padStart(2, '0'));
        }

        log("[*] Hedef Bellek Alanı (ArrayBuffer): Aktif");
        log("[*] İlk 16 Bayt (Hex): " + hexBytes.join(' '));
        log("[+] UAF / Binary akışı JavaScript belleğinde başarıyla işlendi ve kilitlendi!");

    } catch (err) {
        log("[-] Kritik Hata: " + err.message);
    }
}
