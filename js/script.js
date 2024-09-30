const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const imagem = document.getElementById('imagem');
const tirarFotoBtn = document.getElementById('enviar_foto');

let isCameraActive = false; // Estado para controlar o fluxo de cliques

// Função para iniciar a câmera traseira
function startCamera() {
    navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: { exact: "environment" } } // Especifica a câmera traseira
    })
    .then((stream) => {
        video.style.display = 'block'; // Exibir o vídeo quando a câmera estiver ativa
        imagem.style.display = 'none'; // Ocultar a imagem quando a câmera for ativada
        video.srcObject = stream;
    })
    .catch((error) => {
        console.error('Erro ao acessar a câmera: ', error);
        alert('Não foi possível acessar a câmera. Verifique as permissões.');
    });
}

// Função para tirar foto
function tirarFoto() {
    // Verificar se o vídeo está pronto
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
        // Definir o tamanho do canvas como o mesmo do vídeo
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Desenhar o frame atual do vídeo no canvas
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Converter a imagem do canvas em dados de URL e colocar na tag <img>
        const dataUrl = canvas.toDataURL('image/png');
        imagem.src = dataUrl;

        // Ocultar o vídeo após tirar a foto (opcional)
        video.style.display = 'none';
        imagem.style.display = 'block'; // Mostrar a imagem após a foto ser tirada
        tirarFotoBtn.textContent = 'Abrir câmera'; // Resetar o botão para abrir a câmera novamente
        isCameraActive = false; // Resetar o estado

        // Parar o stream da câmera após tirar a foto (opcional)
        video.srcObject.getTracks().forEach(track => track.stop());
    } else {
        alert('A câmera ainda não está pronta. Tente novamente em instantes.');
    }
}

// Evento de clique no botão
tirarFotoBtn.addEventListener('click', () => {
    if (!isCameraActive) {
        // Primeiro clique: abrir a câmera
        startCamera();
        tirarFotoBtn.textContent = 'Tirar foto'; // Mudar o texto do botão
        isCameraActive = true; // Atualizar o estado
    } else {
        // Segundo clique: tirar a foto
        tirarFoto();
    }
});


const text = "REVOLUCIONANDO A MANUTENÇÃO AUTOMOTIVA";
let index = 0;
const speed = 100; // Velocidade da digitação (em milissegundos)

function typeWriter() {
  const typingElement = document.getElementById("typing");

  if (index < text.length) {
    typingElement.innerHTML += text.charAt(index);
    index++;
    setTimeout(typeWriter, speed); // Chama a função novamente até terminar
  } else {
    // Remove o cursor piscante depois que a digitação termina
    typingElement.classList.remove("blink");
    typingElement.style.borderRight = "none";
  }
}

// Adiciona a classe 'blink' para o cursor piscante durante a digitação
document.getElementById("typing").classList.add("blink");

// Inicia o efeito de digitação ao carregar a página
window.onload = typeWriter;





let chatInstance = null;

window.watsonAssistantChatOptions = {
    integrationID: "0762ce57-398d-4c2e-b1a9-edfaf15b13c5",
    region: "au-syd",
    serviceInstanceID: "664e0483-55e7-43ef-b5c5-5a0f4b64c4e3",
    onLoad: async (instance) => { 
        await instance.render(); 
        chatInstance = instance; // Guarda a referência para a instância do chat
    }
};

setTimeout(function(){
    const t=document.createElement('script');
    t.src="https://web-chat.global.assistant.watson.appdomain.cloud/versions/" + (window.watsonAssistantChatOptions.clientVersion || 'latest') + "/WatsonAssistantChatEntry.js";
    document.head.appendChild(t);
});

// Supondo que o ID do seu botão seja 'chat'
document.getElementById('chat').addEventListener('click', function() {
    if (chatInstance) {
        chatInstance.openWindow(); // Abre a janela do chat quando o botão é clicado
    }
});



