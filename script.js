function triggerLightningEffect() {
    const canvas = document.getElementById("lightningCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let flashes = 3;

    function drawLightningChain(x1, y1, x2, y2, displace) {
        if (displace < 1.8) {
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        } else {
            let mid_x = (x1 + x2) / 2;
            let mid_y = (y1 + y2) / 2;
            mid_x += (Math.random() - 0.5) * displace;
            mid_y += (Math.random() - 0.5) * displace;
            drawLightningChain(x1, y1, mid_x, mid_y, displace / 2);
            drawLightningChain(mid_x, mid_y, x2, y2, displace / 2);
        }
    }

    function launchFlash() {
        if (flashes <= 0) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            return;
        }
        flashes--;
        ctx.fillStyle = `rgba(180, 245, 255, ${Math.random() * 0.25 + 0.15})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "rgba(225, 250, 255, 1)";
        ctx.lineWidth = Math.random() * 3 + 2;
        ctx.shadowBlur = 30;
        ctx.shadowColor = "#00e5ff";
        let startX = Math.random() * canvas.width;
        drawLightningChain(startX, 0, startX + (Math.random() - 0.5) * 300, canvas.height, 120);
        if (Math.random() > 0.3) {
            ctx.lineWidth = 1.5;
            drawLightningChain(startX, 0, Math.random() * canvas.width, canvas.height * 0.6, 90);
        }
        setTimeout(() => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            setTimeout(launchFlash, Math.random() * 120 + 60);
        }, 70);
    }
    launchFlash();
}

function createEffects() {
    const container = document.getElementById('particles-container');
    if (!container) return;
    container.innerHTML = ""; 
    
    for (let i = 0; i < 50; i++) {
        let particle = document.createElement('div');
        particle.className = 'particle';
        let size = Math.random() * 5 + 2; 
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
        particle.style.animationDelay = (Math.random() * -20) + 's';
        container.appendChild(particle);
    }
    for (let i = 0; i < 4; i++) {
        let meteor = document.createElement('div');
        meteor.className = 'meteor';
        meteor.style.left = (Math.random() * 60 + 20) + 'vw';
        meteor.style.top = (Math.random() * 40) + 'vh'; 
        meteor.style.animationDuration = (Math.random() * 2 + 2) + 's'; 
        meteor.style.animationDelay = (Math.random() * 12) + 's';
        container.appendChild(meteor);
    }
    for (let i = 0; i < 60; i++) {
        let drop = document.createElement('div');
        drop.className = 'raindrop';
        drop.style.left = Math.random() * 100 + 'vw';
        drop.style.animationDuration = (Math.random() * 0.8 + 0.6) + 's'; 
        drop.style.animationDelay = (Math.random() * -2) + 's';
        container.appendChild(drop);
    }
}

function changeText(title, text) {
    const h1 = document.getElementById("mainTitle");
    const p = document.getElementById("mainText");
    if (h1) h1.classList.add("fade-out");
    if (p) p.classList.add("fade-out");
    setTimeout(function() {
        if (h1) h1.innerText = title;
        if (p) p.innerText = text;
        if (h1) h1.classList.remove("fade-out");
        if (p) p.classList.remove("fade-out");
    }, 600);
}

function playVoice() {
    document.getElementById("startBtn").style.display = "none";
    triggerLightningEffect();

    const voice = document.getElementById("voice");
    const music = document.getElementById("kamin");
    const finalVoice = document.getElementById("finalVoice");
    const saga = document.getElementById("sagaMusic");
    const video = document.getElementById("chatVideo");

    try { finalVoice.volume = 0; finalVoice.play().then(() => finalVoice.pause()); } catch(e){}
    try { saga.volume = 0; saga.play().then(() => saga.pause()); } catch(e){}
    try { video.volume = 1; video.play().then(() => video.pause()); } catch(e){}

    createEffects();
    
    if (voice) {
        voice.play().catch(function(err) {
            console.log("start.mp3 не найден:", err);
            setTimeout(() => { startKaminSequence(); }, 1000);
        });
        voice.onended = function() { startKaminSequence(); };
    } else {
        startKaminSequence();
    }
}

function startKaminSequence() {
    const music = document.getElementById("kamin");
    const video = document.getElementById("chatVideo");
    
    if (music) {
        music.volume = 0.15;
        music.play().catch(e => console.log(e));
    }

    changeText("Иногда самые важные люди появляются случайно", "А потом становятся частью самых тёплых воспоминаний.");

    setTimeout(function() { changeText("Полгода", "Кажется, совсем немного времени."); }, 5000);
    setTimeout(function() { changeText("Но", "Иногда нескольких месяцев достаточно, чтобы человек стал особенным."); }, 10000);
    setTimeout(function() { changeText("Спасибо", "За разговоры. За улыбки. За моменты, которые были только нашими."); }, 15000);

    setTimeout(function() {
        const h1 = document.getElementById("mainTitle");
        const p = document.getElementById("mainText");
        if (h1) h1.style.opacity = "0";
        if (p) p.style.opacity = "0";
    }, 19000);

    setTimeout(function() {
        if (video) {
            video.style.display = "block";
            if (music) music.volume = 0.25; 
            video.play().catch(function(error) {
                console.log("chat.mp4 не найден:", error);
                startFinalSequence(); 
            });
        } else {
            startFinalSequence();
        }
    }, 20000);
}

function startFinalSequence() {
    const music = document.getElementById("kamin");
    const finalVoice = document.getElementById("finalVoice");
    const contentBlock = document.querySelector(".content");
    const h1 = document.getElementById("mainTitle");
    const p = document.getElementById("mainText");
    const pSub = document.getElementById("finalSubText");

    if (music) {
        let fadeKamin = setInterval(function() {
            if (music.volume > 0.02) { music.volume -= 0.02; } 
            else { music.pause(); clearInterval(fadeKamin); }
        }, 100);
    }

    document.getElementById("bgImage").style.display = "none";
    document.getElementById("bgOverlay").style.display = "none";
    document.getElementById("particles-container").style.display = "none";

    if (contentBlock) {
        contentBlock.style.justifyContent = "center";
        contentBlock.style.paddingTop = "20px";
    }
    if (h1) { h1.style.transition = "none"; h1.style.opacity = "1"; h1.innerText = ""; }
    if (p) { p.style.transition = "none"; p.style.opacity = "1"; p.innerText = "Спасибо за эти моменты."; }
    if (pSub) pSub.style.transition = "none";

    setTimeout(function() {
        if (p) p.innerText = "Ирина...";

        setTimeout(function() {
            if (h1) {
                h1.className = "huge-text";
                h1.innerText = "Я ЛЮБЛЮ ТЕБЯ";
            }
            if (p) p.innerText = "";

            setTimeout(function() {
                if (h1) { h1.innerText = ""; h1.className = ""; }
                if (finalVoice) {
                    finalVoice.volume = 1;
                    finalVoice.play().catch(() => runFinalScreenFive());
                    finalVoice.onended = function() { runFinalScreenFive(); };
                } else {
                    runFinalScreenFive();
                }
            }, 6000);
        }, 2000);
    }, 3000);
}

function runFinalScreenFive() {
    const h1 = document.getElementById("mainTitle");
    const pSub = document.getElementById("finalSubText");
    const saga = document.getElementById("sagaMusic");

    if (saga) {
        saga.volume = 0.3;
        saga.play().catch(e => console.log("Ошибка саги:", e));
    }
    if (h1) { h1.style.opacity = "1"; h1.innerText = "Ирина ❤️ Эльмар"; }
    if (pSub) { pSub.innerText = "Спасибо за эти полгода."; pSub.style.opacity = "1"; }

    setTimeout(function() {
        if (h1) h1.style.transition = "opacity 2.5s ease";
        if (pSub) pSub.style.transition = "opacity 2.5s ease";
        if (h1) h1.classList.add("fade-out");
        if (pSub) pSub.classList.add("fade-out");

        setTimeout(function() {
            if (pSub) pSub.innerText = ""; 
            if (h1) {
                h1.classList.remove("fade-out");
                h1.style.transition = "opacity 1.5s ease";
                h1.innerText = "Конец?";
            }

            setTimeout(function() {
                if (h1) h1.classList.add("fade-out");
                setTimeout(function() {
                    if (h1) {
                        h1.classList.remove("fade-out");
                        h1.style.transition = "opacity 1.5s ease";
                        h1.innerText = "Может быть, только начало.";
                    }
                    setTimeout(function() {
                        const finalBtns = document.getElementById("finalButtons");
                        if (finalBtns) {
                            finalBtns.style.opacity = "1";
                            finalBtns.style.pointerEvents = "auto"; 
                        }
                    }, 5000);
                }, 2000);
            }, 3500);
        }, 2500);
    }, 7000);
}

function actionDelete() { window.location.href = "delete.html"; }
function actionSave() { window.location.href = "save.html"; }

const cv = document.getElementById("chatVideo");
if (cv) {
    cv.addEventListener("ended", function() {
this.style.display = "none";
  startFinalSequence();
});
}