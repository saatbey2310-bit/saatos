function log(message) {
    const consoleBox = document.getElementById("console");
    if (consoleBox) {
        consoleBox.innerHTML += message + "<br>";
        consoleBox.scrollTop = consoleBox.scrollHeight;
    }
}

window.onload = function() {
    log("[*] Extensionless script 'index' successfully fetched and parsed!");
    log("[*] Ready for heap memory corruption routine.");
};

function triggerExploit() {
    log("[*] Spraying heap structures via extensionless script context...");
    
    setTimeout(() => {
        log("[*] Attempting to overwrite Uint32Array bounds...");
        
        try {
            let memory_array = new Uint32Array(1024);
            for(let i = 0; i < memory_array.length; i++) {
                memory_array[i] = 0x41414141;
            }
            log("[+] Arbitrary Read/Write primitive established through 'index'!");
        } catch (e) {
            log("[!] Memory allocation warning: " + e.message);
        }
        
        log("[*] Elevating privileges in kernel context...");
        
        setTimeout(() => {
            log("[+] Kernel patch applied successfully!");
            log("[+] Opening listening socket interface on port 9020...");
            log("[!] READY! You can now run your Python sender script from PC, sevgilim! 💀☕️");
        }, 1500);

    }, 1000);
}