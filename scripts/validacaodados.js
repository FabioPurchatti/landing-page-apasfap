document.addEventListener('DOMContentLoaded', () => {
    // Seleciona os elementos do formulário
    const form = document.getElementById('contact-form');
    const submitButton = document.getElementById('enviar');
    
    // Campos para validar
    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const telefoneInput = document.getElementById('telefone');
    const mensagemInput = document.getElementById('mensagem');
    const assuntoInput = document.getElementById('assunto'); // Você também tem esse campo

    function isValidEmail(email) {
        // Expressão regular para validar e-mail
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(String(email).toLowerCase());
    }

    function isValidPhone(phone) {
        // Remove todos os caracteres não numéricos
        const digits = phone.replace(/\D/g, '');
        // Verifica se tem pelo menos 9 dígitos (mínimo para celular sem DDD)
        return digits.length >= 9;
    }

    // Toast

    function showToast(message, type = 'success') {
        const container = document.getElementById('toast-container');
        // Se o container não existir no HTML, não faz nada
        if (!container) {
            console.error("Elemento #toast-container não encontrado.");
            return; 
        }
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`; 
        toast.textContent = message;

        container.appendChild(toast);

        // Adiciona a classe 'show' para iniciar a animação
        setTimeout(() => {
            toast.classList.add('show');
        }, 100); // Pequeno atraso para a transição funcionar

        // Remove o toast após 3.5 segundos
        setTimeout(() => {
            toast.classList.remove('show');
            
            // Espera a animação de saída (0.4s) terminar antes de remover
            setTimeout(() => {
                if (container.contains(toast)) {
                    container.removeChild(toast);
                }
            }, 400); // Corresponde à duração da transição no CSS
        }, 3500);
    }

    // Listener do Formulário

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Impede o envio padrão da página

            // Bloco de Validação
            const nome = nomeInput.value.trim();
            const email = emailInput.value.trim();
            const telefone = telefoneInput.value.trim();
            const mensagem = mensagemInput.value.trim();

            // Validação dos campos
            if (nome === '') {
                showToast('Por favor, preencha seu nome.', 'error');
                nomeInput.focus(); // Foca no campo com erro
                return; // Para a execução
            }
            
            if (email === '' || !isValidEmail(email)) {
                showToast('Por favor, insira um e-mail válido.', 'error');
                emailInput.focus();
                return;
            }

            if (telefone === '' || !isValidPhone(telefone)) {
                showToast('Insira um telefone válido (mínimo 9 dígitos).', 'error');
                telefoneInput.focus();
                return;
            }
            
            if (mensagem === '') {
                showToast('Por favor, escreva sua mensagem.', 'error');
                mensagemInput.focus();
                return;
            }
            
            // Fim da Validação
            // Se passou em tudo, continua com o envio

            const formData = new FormData(this);
            
            // Desabilita o botão para evitar envios duplos
            submitButton.disabled = true;
            submitButton.textContent = 'ENVIANDO...';

            fetch(this.action, { 
                method: 'POST',
                body: formData
            })
            .then(response => response.json()) 
            .then(data => {
                if (data.success) {
                    showToast(data.message, 'success');
                    form.reset(); // Limpa os campos
                } else {
                    // Mostra a mensagem de erro vinda do PHP
                    showToast(data.message || 'Ocorreu um erro no servidor.', 'error');
                }
            })
            .catch(error => {
                // Erro de conexão ou JSON inválido
                console.error('Erro na requisição:', error);
                showToast('Erro de conexão. Tente novamente.', 'error');
            })
            .finally(() => {
                 // Reabilita o botão
                submitButton.disabled = false;
                submitButton.textContent = 'ENVIAR MENSAGEM';
            });
        });
    }
});