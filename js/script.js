

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

