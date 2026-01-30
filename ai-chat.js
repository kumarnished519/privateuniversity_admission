// AI Chatbot for College Portal
const aiResponses = {
    'admission': 'To start 2026 admission, click on any college card to view details, then fill the inquiry form below to send your details to nishedk076@gmail.com.',
    'fee': 'Fees vary by college and course. B.Tech ranges from ₹2-4.5 LPA, Law from ₹2-4 LPA, and Management from ₹2-3.5 LPA. Click on a college to see exact fees.',
    'hostel': 'Hostel fees range from ₹48,000 to ₹99,000 per year depending on room type (single/double/triple). View college details for specific rates.',
    'placement': 'Most of our colleges have 85%+ placement rates. Top colleges like VIT have 95%+, LPU 90%+, and Symbiosis 90%+.',
    'course': 'Popular courses: B.Tech CSE, BA LLB, MBA, BCA, MCA, BBA. Each college offers different combinations. View details for full list.',
    'noida': 'We have 6 engineering colleges in Noida: DIT, Galgotias, Manav Rachna, Lloyd, GL Bajaj, and Ajay Kumar Garg.',
    'meerut': 'Meerut colleges: Shobhit University (Engineering & Law), Vivekananda Institute (Engineering), and IIMT University.',
    'best college': 'Best colleges: VIT (96% placement), LPU (93% placement), Symbiosis (90% placement), and IIMT University.',
    'contact': 'Contact us at nishedk076@gmail.com or fill the inquiry form. We reply within 24 hours.',
    'law': 'Top Law colleges: Symbiosis Law School (Pune), Shobhit University (Meerut), IIMT University (Meerut/Noida).',
    'package': 'Average package: B.Tech CSE ₹18-25 LPA, BA LLB variable (case-based), MBA ₹12-20 LPA.',
    'hi': 'Hello! 👋 I\'m AI Assistant. Ask me about colleges, fees, admission, courses, or placement! Type your question.',
    'hello': 'Hi there! 👋 Welcome to College Portal 2026. How can I help you? Ask about colleges, fees, courses, or admission!',
    'thank you': 'You\'re welcome! 😊 Need more help? Feel free to ask!',
    'thanks': 'You\'re welcome! 😊 Anything else you\'d like to know?',
};

function toggleChatbot() {
    const chatbox = document.getElementById('chatbox');
    chatbox.classList.toggle('hidden');
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.toLowerCase().trim();
    
    if (!message) return;
    
    // Add user message
    const chatMessages = document.getElementById('chatMessages');
    const userMsg = document.createElement('div');
    userMsg.className = 'chat-message user-message';
    userMsg.textContent = input.value;
    chatMessages.appendChild(userMsg);
    
    // Clear input
    input.value = '';
    
    // Generate AI response
    setTimeout(() => {
        let response = 'I didn\'t quite understand. Try asking about: colleges, fees, hostel, placement, courses, admission, contact info, or specific colleges like Noida, Meerut, VIT, LPU, Symbiosis.';
        
        // Check for keywords
        for (const keyword in aiResponses) {
            if (message.includes(keyword)) {
                response = aiResponses[keyword];
                break;
            }
        }
        
        const aiMsg = document.createElement('div');
        aiMsg.className = 'chat-message ai-message';
        aiMsg.innerHTML = '🤖 <strong>AI:</strong> ' + response;
        chatMessages.appendChild(aiMsg);
        
        // Auto scroll
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 500);
}

document.addEventListener('DOMContentLoaded', function() {
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
});
