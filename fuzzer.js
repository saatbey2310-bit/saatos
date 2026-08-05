async function startFuzzer() {
    const targetBaseUrl = document.getElementById('binName').value.trim() || "payload.bin";
    const logBox = document.getElementById('log');

    function log(msg) {
        logBox.innerText += msg + "\n";
        logBox.scrollTop = logBox.scrollHeight;
    }

    log("\n[!] Fuzzer motoru ateşlendi...");
    log("[*] Hedef: " + targetBaseUrl);

    // Fuzzing için denenecek mutant girdiler / parametreler veya varyasyonlar
    const fuzzPayloads = [
        "payload.bin",
        "../payload.bin",
        "%2e%2e/payload.bin",
        "A".repeat(256), // Uzun girdi testi
        "\x00payload.bin",
        "payload.bin\x00.txt",
        "../../../../etc/passwd",
        "payload_fuzz_" + Math.random()
    ];

    log("[*] Toplam " + fuzzPayloads.length + " farklı mutasyon test ediliyor...\n");

    for (let i = 0; i < fuzzPayloads.length; i++) {
        const currentTest = fuzzPayloads[i];
        const testUrl = `https://raw.githubusercontent.com/saatbey2310-bit/saatos/main/${currentTest}`;

        try {
            const startTimestamp = performance.now();
            const response = await fetch(testUrl, { method: 'GET' });
            const duration = (performance.now() - startTimestamp).toFixed(2);

            if (response.ok) {
                log(`[+] [HIT] Durum: ${response.status} | Süre: ${duration}ms | Girdi: ${currentTest}`);
            } else {
                log(`[-] [MISS] Durum: ${response.status} | Girdi: ${currentTest}`);
            }
        } catch (err) {
            log(`[!] [ERROR] İstek başarısız: ${currentTest} (${err.message})`);
        }
    }

    log("\n[+] Fuzzing taraması tamamlandı!");
}
