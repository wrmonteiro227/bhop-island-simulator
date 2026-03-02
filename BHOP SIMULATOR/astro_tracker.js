// astro_tracker.js
import { Economia } from './economia.js';

// Configurações de ganho
const RECOMPENSA_PULO = 0.50;
const RECOMPENSA_TEMPO = 0.10; // Moedas por segundo jogado

let loopMoedaTempo = null;

export const AstroTracker = {
    init() {
        // Monitora o teclado globalmente sem interferir nos controles do jogo
        document.addEventListener('keydown', (e) => {
            // Verifica se o jogo está ativo (Pointer Lock ativado)
            if (document.pointerLockElement && e.code === 'Space') {
                this.registrarPulo();
            }
        });

        console.log("Astro Tracker: Sistema de monitoramento ativo.");
    },

    registrarPulo() {
        // Adiciona a moeda
        Economia.adicionarMoedas(RECOMPENSA_PULO);
    },

    iniciarGanhoPassivo() {
        if (loopMoedaTempo) return;
        loopMoedaTempo = setInterval(() => {
            if (document.pointerLockElement) {
                Economia.adicionarMoedas(RECOMPENSA_TEMPO);
            }
        }, 1000);
    },

    pararGanhoPassivo() {
        clearInterval(loopMoedaTempo);
        loopMoedaTempo = null;
    }
};