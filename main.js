document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const numeroSenha = document.querySelector('.parametro-senha__texto');
    const campoSenha = document.querySelector('#campo-senha');
    const btnDiminuir = document.getElementById('diminuir');
    const btnAumentar = document.getElementById('aumentar');
    const btnGerar = document.getElementById('gerar-senha');
    const btnCopiar = document.getElementById('copiar-senha');
    const checkboxes = document.querySelectorAll('.checkbox');
    const indicadorForca = document.getElementById('indicador-forca');
    const textoEntropia = document.querySelector('.entropia');
    const toast = document.getElementById('toast');
    const idadeInput = document.getElementById('idade-input');
    const indicadorIdade = document.getElementById('indicador-idade');

    // Conjuntos de caracteres
    const caracteres = {
        maiusculo: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        minusculo: 'abcdefghijklmnopqrstuvwxyz',
        numero: '0123456789',
        simbolo: '!@#$%^&*'
    };

    // Configurações iniciais
    let tamanhoSenha = 12;
    numeroSenha.textContent = tamanhoSenha;
    atualizarBotaoGerar();

    // Event listeners
    btnDiminuir.addEventListener('click', diminuiTamanho);
    btnAumentar.addEventListener('click', aumentaTamanho);
    btnGerar.addEventListener('click', geraSenha);
    btnCopiar.addEventListener('click', copiarSenha);
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            geraSenha();
            verificaCheckboxes();
        });
    });
    
    idadeInput.addEventListener('input', classificaIdade);

    // Funções
    function diminuiTamanho() {
        if (tamanhoSenha > 1) {
            tamanhoSenha--;
            numeroSenha.textContent = tamanhoSenha;
            atualizarBotaoGerar();
            geraSenha();
        }
    }

    function aumentaTamanho() {
        if (tamanhoSenha < 32) {
            tamanhoSenha++;
            numeroSenha.textContent = tamanhoSenha;
            atualizarBotaoGerar();
            geraSenha();
        }
    }

    function atualizarBotaoGerar() {
        if (tamanhoSenha < 6) {
            btnGerar.disabled = true;
        } else {
            btnGerar.disabled = false;
        }
    }

    function verificaCheckboxes() {
        const peloMenosUmChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);
        if (!peloMenosUmChecked) {
            document.getElementById('maiusculo').checked = true;
            document.getElementById('minusculo').checked = true;
        }
    }

    function geraSenha() {
        let alfabeto = '';
        
        if (document.getElementById('maiusculo').checked) {
            alfabeto += caracteres.maiusculo;
        }
        if (document.getElementById('minusculo').checked) {
            alfabeto += caracteres.minusculo;
        }
        if (document.getElementById('numero').checked) {
            alfabeto += caracteres.numero;
        }
        if (document.getElementById('simbolo').checked) {
            alfabeto += caracteres.simbolo;
        }

        let senha = '';
        for (let i = 0; i < tamanhoSenha; i++) {
            const randomIndex = Math.floor(Math.random() * alfabeto.length);
            senha += alfabeto[randomIndex];
        }

        campoSenha.value = senha;
        classificaSenha(alfabeto.length);
    }

    function classificaSenha(tamanhoAlfabeto) {
        const entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);
        
        // Remove todas as classes primeiro
        indicadorForca.classList.remove('fraca', 'media', 'forte');
        
        if (entropia > 57) {
            indicadorForca.classList.add('forte');
        } else if (entropia > 35) {
            indicadorForca.classList.add('media');
        } else {
            indicadorForca.classList.add('fraca');
        }
        
        // Atualiza o texto de entropia
        textoEntropia.textContent = `Um computador pode levar até ${Math.floor(2 ** entropia / (100e6 * 60 * 60 * 24))} dias para descobrir essa senha.`;
    }

    function classificaIdade() {
        const idade = parseInt(idadeInput.value) || 0;
        
        // Remove todas as classes primeiro
        indicadorIdade.classList.remove('crianca', 'adolescente', 'adulto');
        
        if (idade < 12) {
            indicadorIdade.classList.add('crianca');
        } else if (idade < 18) {
            indicadorIdade.classList.add('adolescente');
        } else if (idade >= 18) {
            indicadorIdade.classList.add('adulto');
        }
    }

    function copiarSenha() {
        if (campoSenha.value) {
            navigator.clipboard.writeText(campoSenha.value);
            mostrarToast();
        }
    }

    function mostrarToast() {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2000);
    }

    // Gera senha inicial
    geraSenha();
});