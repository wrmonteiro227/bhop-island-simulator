// loja.js
import { Economia } from './economia.js';
import { Inventario } from './inventario.js';

export const Catalogo = [
    { 
        id: 1, 
        nome: "Braços Táticos | CS2", 
        preco: 500, 
        raridade: "gold", 
        path: "./assets/models/bracos_cs2.glb" 
    }
];

export function comprarItem(id) {
    const item = Catalogo.find(i => i.id === id);
    if (!item) return;

    // Impede comprar o mesmo braço duas vezes
    if (Inventario.itens.some(i => i.id === id)) {
        alert("Você já possui estes braços!");
        return;
    }

    if (Economia.removerMoedas(item.preco)) {
        Inventario.adicionar(item);
        renderizarLoja('lista-loja');
        alert(`Sucesso! Você comprou ${item.nome}`);
    } else {
        alert("Saldo insuficiente!");
    }
}

export function equiparItem(id) {
    const item = Inventario.itens.find(i => i.id === id);
    if (item) {
        localStorage.setItem('astro_skin_equipada', item.path);
        // Evento para o motor gráfico (index.html) atualizar o modelo sem refresh
        window.dispatchEvent(new Event('skinAlterada'));
        Inventario.renderizar('lista-inventario');
    }
}

export function renderizarLoja(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = Catalogo.map(item => {
        const jaPossui = Inventario.itens.some(i => i.id === item.id);
        return `
            <div class="item-card rarity-${item.raridade}">
                <div style="font-weight:bold">${item.nome}</div>
                <div style="color:#de9b35">${jaPossui ? 'ADQUIRIDO' : 'R$ ' + item.preco}</div>
                ${jaPossui ? '' : `<button class="buy-btn" data-id="${item.id}">COMPRAR</button>`}
            </div>
        `;
    }).join('');

    container.querySelectorAll('.buy-btn').forEach(btn => {
        btn.onclick = () => comprarItem(parseInt(btn.dataset.id));
    });
}