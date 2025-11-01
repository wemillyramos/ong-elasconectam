/* === FUNÇÕES DE MÁSCARA === */

function aplicarMascara(input, mascara) {
    let valor = input.value.replace(/\D/g, ''); 
    let novoValor = '';

    for (let i = 0, j = 0; i < mascara.length && j < valor.length; i++) {
        const charMascara = mascara.charAt(i);
        if (charMascara === '9') {
            novoValor += valor.charAt(j);
            j++;
        } else if (charMascara !== ' ' && charMascara !== valor.charAt(j)) {
            novoValor += charMascara;
        } else if (charMascara === valor.charAt(j)) {
            novoValor += valor.charAt(j);
            j++;
        }
    }
    input.value = novoValor;
}

function mascaraCPF(input) {
    aplicarMascara(input, '999.999.999-99');
}

function mascaraTelefone(input) {
    aplicarMascara(input, input.value.length > 14 ? '(99) 99999-9999' : '(99) 9999-9999');
}

function mascaraCEP(input) {
    aplicarMascara(input, '99999-999');
}


/* === NAVEGAÇÃO E EVENTOS === */

function initNavigation() {
    const toggle = document.querySelector('.menu-toggle');
    const navElement = document.querySelector('nav'); 
    const dropdownToggle = document.getElementById('dropdown-toggle-desktop');
    const dropdownMenu = document.getElementById('dropdown-menu-desktop');
    const navLinks = document.querySelectorAll('nav a');

    // Abre/Fecha menu mobile (Hambúrguer)
    if (toggle && navElement) {
        toggle.addEventListener('click', () => {
            navElement.classList.toggle('active');
        });
    }

    // Lógica do Dropdown (JS CLICK para Mobile)
    if (dropdownToggle && dropdownMenu) {
        dropdownToggle.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) { 
                e.preventDefault();
                dropdownMenu.classList.toggle('active-dropdown'); 
            }
        });
        
        // Garante que o dropdown feche quando um item é clicado
        dropdownMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    dropdownMenu.classList.remove('active-dropdown');
                }
            });
        });
    }


    // Intercepta cliques de navegação para simular SPA
    navLinks.forEach(link => {
        if (!link.getAttribute('onclick') && link.href) {
            link.addEventListener('click', function(e) {
                const targetPath = this.getAttribute('href');
                if (targetPath.endsWith('.html')) {
                    e.preventDefault();
                    const page = targetPath.split('/').pop().replace('.html', '');
                    loadPage(page);
                }
            });
        }
    });
    
    // Carrega a página inicial ao iniciar
    const initialPage = window.location.pathname.split('/').pop().replace('.html', '');
    if (initialPage === 'projetos' || initialPage === 'cadastro') {
        loadPage(initialPage);
    } else {
        loadPage('index');
    }
}


/* ====================================
   3. SPA BÁSICO E SISTEMA DE TEMPLATES
   ==================================== */

const pageTemplates = {
    'index': `
        <main>
          <section class="card"> <h2>Missão</h2>
            <p>Promover a inclusão digital e o empoderamento feminino por meio da capacitação profissional em tecnologia, conectando mulheres a oportunidades reais de crescimento e autonomia.</p>
          </section>
          <section class="card"> <h2>Visão</h2>
            <p>Ser referência nacional na formação de mulheres em áreas tecnológicas, contribuindo para um mercado mais diverso, justo e inovador.</p>
          </section>
          <section class="card"> <h2>Valores</h2>
            <ul>
              <li>Igualdade de gênero</li>
              <li>Inclusão social</li>
              <li>Inovação tecnológica</li>
              <li>Empatia</li>
              <li>Respeito</li>
            </ul>
          </section>
          <section class="card"> <h2>Histórico e Conquistas</h2>
            <p>Desde 2022, a Elas Conectam já capacitou mais de 500 mulheres em cursos de programação, design e marketing digital. Nossos projetos impactam diretamente comunidades periféricas e promovem autonomia financeira por meio da tecnologia.</p>
          </section>
          
          <section class="contact-card grid-span-2"> <h2>Informações de Contato</h2>
            <ul class="contact-list"> <li><i class="icon-map-pin"></i> Endereço: Rua da Luz, 123 – Recife, PE</li>
              <li><i class="icon-mail"></i> E-mail: contato@elasconectam.org.br</li>
              <li><i class="icon-phone"></i> Telefone: (81) 99999-1234</li>
              <li><i class="icon-instagram"></i> Instagram: @elasconectam</li>
            </ul>
          </section>
        </main>
    `,
    'projetos': `
        <main>
          <section id="mulheres-codigo" class="card">
            <h2>Projeto Mulheres no Código</h2>
            <img src="atividade1-html/assets/img/mulheresaprendendoprogramacao.png" alt="Mulheres aprendendo programação" width="600">
            <p>Curso gratuito de introdução à programação para mulheres da comunidade. Aulas presenciais e online com mentoras da área de tecnologia.</p>
          </section>
          <section id="conectadas" class="card">
            <h2>Projeto Conectadas</h2>
            <img src="atividade1-html/assets/img/mulheresconversandosobretecnologia.jpg" alt="Mulheres em roda de conversa sobre tecnologia" width="600">
            <p>Encontros mensais para troca de experiências, palestras e oficinas sobre inclusão digital, segurança online e empreendedorismo feminino.</p>
          </section>
          <section id="voluntariado">
            <h2>Voluntariado</h2>
            <p>Você pode fazer parte da transformação! Buscamos voluntárias para atuar como mentoras, instrutoras, comunicadoras e organizadoras de eventos.</p>
            <ul>
              <li>Mentoria técnica (programação, design, marketing)</li>
              <li>Oficinas presenciais em comunidades</li>
              <li>Produção de conteúdo para redes sociais</li>
            </ul>
            <p><strong>Quer ser voluntária?</strong> <a href="#" onclick="loadPage('cadastro')">Cadastre-se aqui</a></p>
          </section>
          <section id="doar">
            <h2>Como Doar</h2>
            <p>Suas doações ajudam a manter nossos cursos gratuitos e ampliar o alcance dos projetos. Aceitamos contribuições via Pix, boleto ou cartão.</p>
            <ul>
              <li>Pix: doacoes@elasconectam.org.br</li>
              <li>Banco: 000 - Agência 1234 - Conta 56789-0</li>
            </ul>
            <p><em>Todo apoio é bem-vindo!</em></p>
          </section>
        </main>
    `,
    'cadastro': `
        <main class="container">
          <section class="form-container">
            <h2 style="text-align: center; margin-bottom: var(--spacing-3);">Formulário de Inscrição</h2>
            <img src="atividade1-html/assets/img/cadastro.jpg" alt="Voluntárias se cadastrando" class="cadastro-img">
            <form id="cadastro-form">
              <fieldset>
                <legend>Informações Pessoais</legend>
                <label for="nome">Nome Completo:</label>
                <input type="text" id="nome" name="nome" required>
                <label for="email">E-mail:</label>
                <input type="email" id="email" name="email" required>
                <label for="cpf">CPF:</label>
                <input type="text" id="cpf" name="cpf" maxlength="14" required>
                <label for="telefone">Telefone:</label>
                <input type="tel" id="telefone" name="telefone" maxlength="15" required>
                <label for="nascimento">Data de Nascimento:</label>
                <input type="date" id="nascimento" name="nascimento" required>
              </fieldset>
              <fieldset>
                <legend>Endereço</legend>
                <label for="endereco">Endereço:</label>
                <input type="text" id="endereco" name="endereco" required>
                <label for="cep">CEP:</label>
                <input type="text" id="cep" name="cep" maxlength="9" required>
                <label for="cidade">Cidade:</label>
                <input type="text" id="cidade" name="cidade" required>
                <label for="estado">Estado:</label>
                <input type="text" id="estado" name="estado" required>
              </fieldset>
              <div id="form-feedback"></div> <input type="submit" value="Cadastrar" class="button">
            </form>
          </section>
        </main>
    `
};

function loadPage(pageName) {
    const dynamicContent = document.getElementById('dynamic-content');
    const template = pageTemplates[pageName];

    if (template && dynamicContent) {
        dynamicContent.innerHTML = template;
        
        // Re-executa scripts específicos da página (máscaras e validação)
        if (pageName === 'cadastro') {
            initFormMasks();
            initFormValidation();
        }
        
        // Simulação de mudança de URL (para SPA)
        const newTitle = `Elas Conectam - ${pageName.charAt(0).toUpperCase() + pageName.slice(1)}`;
        document.title = newTitle;
        history.pushState({ page: pageName }, newTitle, pageName === 'index' ? 'index.html' : `${pageName}.html`);

        // Fecha o dropdown após navegar
        const dropdownMenu = document.getElementById('dropdown-menu-desktop');
        if (dropdownMenu) {
            dropdownMenu.classList.remove('active-dropdown'); 
        }
        
        // Fecha o painel lateral completo (nav) após a navegação
        const navElement = document.querySelector('nav');
        if (navElement) {
             navElement.classList.remove('active');
        }
    }
}


/* === VALIDAÇÃO DE FORMULÁRIO === */

function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]/g, '');
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    let soma = 0, resto;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;
    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    return resto === parseInt(cpf.substring(10, 11));
}

function validarFormulario(e) {
    e.preventDefault(); 
    
    const form = document.getElementById('cadastro-form');
    const cpfInput = document.getElementById('cpf');
    const emailInput = document.getElementById('email');
    const feedbackDiv = document.getElementById('form-feedback');
    let erros = [];

    feedbackDiv.innerHTML = '';

    // 1. Verificação de CPF (Consistência de Dados)
    if (cpfInput && !validarCPF(cpfInput.value)) {
        erros.push("CPF inválido. Por favor, verifique o número.");
        cpfInput.classList.add('alert-error-border'); 
    } else {
        cpfInput.classList.remove('alert-error-border');
    }

    // 2. Verificação de Email
    if (emailInput && (!emailInput.value.includes('@') || !emailInput.value.includes('.'))) {
        erros.push("O formato do e-mail é inválido.");
        emailInput.classList.add('alert-error-border');
    } else {
        emailInput.classList.remove('alert-error-border');
    }
    
    // 3. Verifica se os campos required (nativo do HTML) estão vazios
    form.querySelectorAll('input:required, select:required').forEach(input => {
        if (input.id !== 'cpf' && input.id !== 'telefone' && !input.value && !erros.includes("Por favor, preencha todos os campos obrigatórios.")) {
            erros.push("Por favor, preencha todos os campos obrigatórios.");
        }
    });


    if (erros.length > 0) {
        feedbackDiv.innerHTML = `
            <div class="alert alert-error">
                <strong>Erro de preenchimento:</strong>
                <ul>${erros.map(erro => `<li>${erro}</li>`).join('')}</ul>
            </div>
        `;
        document.querySelectorAll('.alert-error-border').forEach(el => {
            el.style.borderColor = 'var(--color-error)';
        });
        
    } else {
        feedbackDiv.innerHTML = `
            <div class="alert alert-success">
                Cadastro realizado com sucesso! Em breve entraremos em contato.
            </div>
        `;
        form.reset(); 
    }
}


/* === ACESSIBILIDADE (Modo Escuro / Alto Contraste) === */

function initThemeToggle() {
    const toggleButton = document.getElementById('theme-toggle');
    const body = document.body;
    
    function loadTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            body.setAttribute('data-theme', 'dark');
            toggleButton.innerHTML = '☀️';
        } else {
            body.removeAttribute('data-theme');
            toggleButton.innerHTML = '🌙';
        }
    }
    
    function toggleTheme() {
        if (body.getAttribute('data-theme') === 'dark') {
            body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            toggleButton.innerHTML = '🌙';
        } else {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            toggleButton.innerHTML = '☀️';
        }
    }

    if (toggleButton) {
        loadTheme();
        toggleButton.addEventListener('click', toggleTheme);
    }
}


function initFormMasks() {
    const cpf = document.getElementById('cpf');
    const tel = document.getElementById('telefone');
    const cep = document.getElementById('cep');

    if (cpf) cpf.addEventListener('input', () => mascaraCPF(cpf));
    if (tel) tel.addEventListener('input', () => mascaraTelefone(tel));
    if (cep) cep.addEventListener('input', () => mascaraCEP(cep));
}

function initFormValidation() {
    const form = document.getElementById('cadastro-form');
    if (form) {
        form.addEventListener('submit', validarFormulario);
    }
}

/* === INICIALIZAÇÃO === */
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initThemeToggle(); 
});