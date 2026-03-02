// inventario.js
import { equiparItem } from './loja.js';

export const Inventario = {
    // Carrega itens ou inicia com o padrão (bracos_cs1)
    itens: JSON.parse(localStorage.getItem('astro_inventario')) || [
        { id: 0, nome: "Braços Padrão", preco: 0, raridade: "comum", path: "./assets/models/bracos_cs1/scene.gltf" }
    ],

    adicionar(item) {
        this.itens.push(item);
        localStorage.setItem('astro_inventario', JSON.stringify(this.itens));
        this.atualizarHUD();
    },

    atualizarHUD() {
        const invLabel = document.getElementById('inv-count-label');
        if (invLabel) invLabel.innerText = `Itens no Inventário: ${this.itens.length}`;
    },

    renderizar(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const skinAtiva = localStorage.getItem('astro_skin_equipada') || "./assets/models/bracos_cs1/scene.gltf";

        container.innerHTML = this.itens.map(item => {
            const estaEquipado = skinAtiva === item.path;
            return `
                <div class="item-card rarity-${item.raridade}">
                    <div style="font-weight:bold">${item.nome}</div>
                    <button class="buy-btn" style="background:${estaEquipado ? '#555' : '#de9b35'}" 
                        onclick="window.equiparAstro(${item.id})">
                        ${estaEquipado ? 'EQUIPADO' : 'EQUIPAR'}
                    </button>
                </div>
            `;
        }).join('');
    }
};

// Expondo a função para o clique no HTML
window.equiparAstro = (id) => equiparItem(id);