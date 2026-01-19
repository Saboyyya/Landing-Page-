const navLinks = document.querySelectorAll('.Meio a, .fim a');

  navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      link.classList.add('nav-animar');
    });

    link.addEventListener('mouseleave', () => {
      link.classList.remove('nav-animar');
    });
  });

  /*faz as imagens irem e voltarem do centro da tela*/
  const imagens = document.querySelectorAll(
    '.img1, .img2, .imagemDireita, .imagemEsquerda, .imageminferior'
  );

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    const scrolledDown = currentScroll > lastScroll;

    if (scrolledDown && currentScroll > 5) {
      imagens.forEach(img => img.classList.add('moveToCenter'));
    } else if (!scrolledDown) {
      imagens.forEach(img => img.classList.remove('moveToCenter'));
    }

    lastScroll = currentScroll;
  });

  /*celular*/
  window.addEventListener('scroll', function() {
    const celularImg = document.querySelector('.celular-img');
    const scrollPosition = window.scrollY;

    if (scrollPosition >= 20) {
      celularImg.classList.add('subindo');
    } else {
      celularImg.classList.remove('subindo');
    }
  });

  document.addEventListener("DOMContentLoaded", () => {
    const celular = document.querySelector(".celular");
    const segundo = document.querySelector(".segundo");
    const trigger = document.querySelector(".trigger-celular");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Inicia animação do celular
            celular.classList.add("subindo");

            // Espera a animação terminar
            setTimeout(() => {
              celular.classList.add("finalizado");
              segundo.classList.add("ativo");
            }, 3000); // Duração da animação
          }
        });
      },
      {
        threshold: 0.8,
      }
    );

    if (trigger) {
      observer.observe(trigger);
    }
  });
  document.addEventListener("scroll", () => {
    const celular = document.querySelector(".celular-img");
    const titulo = document.querySelector(".titulo");

    const scrollY = window.scrollY;
    const maxScroll = 100; 

    const progress = Math.min(scrollY / maxScroll, 1); 

    
    const translateY = -progress * 600;
    celular.style.transform = `translateX(-50%) translateY(${translateY}px)`;

    const scale = 1 - progress * 1;
    const blur = progress * 5;
    const opacity = 1 - progress;

    titulo.style.transform = `translateX(-50%) scale(${scale})`;
    titulo.style.filter = `blur(${blur}px)`;
    titulo.style.opacity = opacity;
  });
  window.addEventListener('scroll', () => {
    const titulo = document.querySelector('.titulo');
    const celular = document.querySelector('.celular-img');
  
    const scrollY = window.scrollY;
    const fadeOutPoint = 200; 
    
    if (scrollY < fadeOutPoint) {
      const opacity = 1 - scrollY / fadeOutPoint;
      const scale = 1 - (scrollY / fadeOutPoint) * 0.5;
      titulo.style.opacity = opacity;
      titulo.style.transform = `translate(-50%, -50%) scale(${scale})`;
    } else {
      titulo.style.opacity = 0;
      titulo.style.transform = `translate(-50%, -50%) scale(0.5)`;
  
      celular.classList.add('fixo');
    }
  });
  window.addEventListener('scroll', () => {
    const titulo = document.querySelector('.titulo');
    const celular = document.querySelector('.celular-img');
    const wrapper = document.querySelector('.celular');
    const wrapperTop = wrapper.getBoundingClientRect().top;

    // Faz a transição do título
    if (titulo.getBoundingClientRect().top < 100) {
      titulo.classList.add('desaparecendo');
      celular.classList.add('ativo');
    } else {
      titulo.classList.remove('desaparecendo');
      celular.classList.remove('ativo');
    }

    // Troca para absolute quando chegar ao topo
    if (wrapperTop <= 0) {
      celular.classList.add('parado');
    } else {
      celular.classList.remove('parado');
    }
  });

/* Contador da pagina 3 */
const contador = document.getElementById('contador');
let iniciado = false;

const observerContador = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !iniciado) {
      iniciado = true;
      iniciarContador(0, 300, 2000);
    } else if (!entry.isIntersecting) {
      iniciado = false;
      contador.textContent = "0";
    }
  });
}, {
  threshold: 0.6
});

const numeroContainer = document.querySelector('.numeroContainer');
if (numeroContainer) {
  observerContador.observe(numeroContainer);
}

function iniciarContador(de, ate, duracao) {
  let start = null;
  const passo = (timestamp) => {
    if (!start) start = timestamp;
    const progresso = timestamp - start;
    const atual = Math.min(
      de + Math.floor((progresso / duracao) * (ate - de)),
      ate
    );
    contador.textContent = atual;

    if (atual < ate) {
      requestAnimationFrame(passo);
    }
  };
  requestAnimationFrame(passo);
}
const carrosselContainer = document.querySelector(".carrossel-container");
const carrosselItems = document.querySelectorAll(".carrossel-item");
const btnEsquerda = document.querySelector(".navegar-esquerda");
const btnDireita = document.querySelector(".navegar-direita");

let indiceAtual = 1; // Começa com o segundo item como destaque.

function atualizarCarrossel() {
  carrosselItems.forEach((item, index) => {
    item.classList.remove("destaque");
    if (index === indiceAtual) {
      item.classList.add("destaque");
    }
  });
}

// Navegação
btnEsquerda.addEventListener("click", () => {
  indiceAtual = (indiceAtual - 1 + carrosselItems.length) % carrosselItems.length;
  atualizarCarrossel();
});

btnDireita.addEventListener("click", () => {
  indiceAtual = (indiceAtual + 1) % carrosselItems.length;
  atualizarCarrossel();
});

// Clique para abrir imagem em tela cheia
function abrirImagemEmTelaCheia(imagem) {
  const modalExistente = document.querySelector(".modal");
  if (modalExistente) {
    modalExistente.remove();
  } else {
    const modal = document.createElement("div");
    modal.classList.add("modal");

    const img = document.createElement("img");
    img.src = imagem.src;
    img.alt = imagem.alt;
    modal.appendChild(img);

    document.body.appendChild(modal);
    modal.style.display = 'flex';

    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.remove();
      }
    });
  }
}

// Adiciona evento de clique às imagens
carrosselItems.forEach(item => {
  const imagem = item.querySelector("img");
  if (imagem) {
    imagem.addEventListener("click", () => abrirImagemEmTelaCheia(imagem));
  }
});

// Inicia com destaque no segundo item
atualizarCarrossel();

const produtos = [
  {
    titulo: "BoxLocker com expansão",
    imagem: "imagens/BoxlockerFoto.png",
    especificacoes: [
      { nome: "ALTURA TOTAL", valor: "1980cm" },
      { nome: "BOX MAIOR", valor: "37cm" },
      { nome: "BOX MEDIO", valor: "22,5cm" },
      { nome: "BOX MENOR", valor: "12cm" },
      { nome: "LARGURA DO BOX", valor: "38,5cm" },
      { nome: "LARGURA TOTAL", valor: "900cm" },
      { nome: "PROFUNDIDADE", valor: "50cm" },
      { nome: "PAINEL", valor: "15.6 inches" },
      { nome: "ACESSÓRIO OPCIONAL", valor: "Camera para reconhecimento facial" },
    
    ]
  },
  {
    titulo: "BoxLocker PEAD",
    imagem: "imagens/produto2.png",
    especificacoes: [
      { nome: "ALTURA TOTAL", valor: "1980cm" },
      { nome: "BOX MAIOR", valor: "38,4cm" },
      { nome: "BOX MEDIO", valor: "25,4cm" },
      { nome: "BOX MENOR", valor: "12,2cm" },
      { nome: "LARGURA DO BOX", valor: "38,4cm" },
      { nome: "LARGURA TOTAL", valor: "990cm" },
      { nome: "PROFUNDIDADE", valor: "50cm" },
      { nome: "PAINEL", valor: "15.6 inches" },
      { nome: "ACESSÓRIO OPCIONAL", valor: "Camera para reconhecimento facial" },
    ]
  },
];

let indiceA= 0;

const tituloEl = document.getElementById("titulo-modelo");
const imagemEl = document.getElementById("imagem-produto");
const listaEl = document.getElementById("lista-especificacoes");

function atualizarCard() {
  const produto = produtos[indiceA];
  tituloEl.textContent = produto.titulo;
  imagemEl.src = produto.imagem;

  listaEl.innerHTML = ""; // limpa a lista
  produto.especificacoes.forEach(esp => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${esp.nome}</strong>: ${esp.valor}`;
    listaEl.appendChild(li);
  });
}

document.querySelector(".seta.direita").addEventListener("click", () => {
  indiceA = (indiceA + 1) % produtos.length;
  atualizarCard();
});

document.querySelector(".seta.esquerda").addEventListener("click", () => {
  indiceA = (indiceA - 1 + produtos.length) % produtos.length;
  atualizarCard();
});

// inicializa
atualizarCard();

  /*faq*/
  document.querySelectorAll('.faq').forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('active');
    });
  });

  //Adaptar mobile
  function toggleMenu() {
    const menu = document.getElementById('menuMobile');
    menu.classList.toggle('ativo');
  }
  
  //formulario
  const form = document.getElementById("contact-form");
    const msg = document.getElementById("msg");

    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      const data = new FormData(form);
      const res = await fetch(form.action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        msg.style.display = "block";
        form.reset();
      } else {
        alert("Erro ao enviar sua mensagem.");
      }
    });

    /*numeros beneficios*/
    const numbers = document.querySelectorAll('.number');
  let observer;

  function animateNumbers() {
    numbers.forEach(num => {
      num.innerText = '0%'; // Resetar para 0%
      const target = +num.getAttribute('data-target');
      const increment = target / 100;
      let current = 0;

      const updateNumber = () => {
        current += increment;
        if (current < target) {
          num.innerText = `${Math.floor(current)}%`;
          requestAnimationFrame(updateNumber);
        } else {
          num.innerText = `${target}%`;
        }
      };
      updateNumber();
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    const beneficiosSection = document.getElementById('beneficios');

    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateNumbers(); // Anima toda vez que a seção aparecer na tela
        }
      });
    }, { threshold: 0.5 }); // Ativa quando 50% da seção estiver visível

    observer.observe(beneficiosSection);
  });

  