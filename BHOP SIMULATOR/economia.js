// economia.js
export const Economia = {
    saldo: parseFloat(localStorage.getItem('astro_saldo')) || 1000.00,

    adicionarMoedas(qtd) {
        this.saldo += qtd;
        this.salvar();
        this.atualizarHUD();
    },

    removerMoedas(qtd) {
        if (this.saldo >= qtd) {
            this.saldo -= qtd;
            this.salvar();
            this.atualizarHUD();
            return true;
        }
        return false;
    },

    salvar() {
        localStorage.setItem('astro_saldo', this.saldo.toFixed(2));
    },

    atualizarHUD() {
        const saldoLabel = document.getElementById('saldo-label');
        if (saldoLabel) saldoLabel.innerText = `Saldo: R$ ${this.saldo.toFixed(2)}`;
    }

};
