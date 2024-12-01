<template>
  <q-page class="chat-page">
    <q-card flat bordered class="chat-container shadow">
      <!-- Header Section -->
      <div class="header-section">
        <div class="left-header">Recent Chats</div>
        <div class="right-header">{{ topics[selectedTopic].name }}</div>
      </div>
      <q-separator />

      <!-- Main Content Container -->
      <div class="main-content">
        <!-- Left Section -->
        <div class="left-section">
          <div class="topics-container">
            <q-item v-for="(topic, index) in topics"
                   :key="index"
                   clickable
                   active-class="active-topic"
                   @click="selectTopic(index)"
                   :class="{ 'active-topic': selectedTopic === index, 'hover-topic': true }">
              <q-item-section>
                <q-item-label>{{ topic.name }}</q-item-label>
                <q-item-label caption>{{ topic.lastMessage }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>
        </div>

        <!-- Right Section -->
        <div class="right-section">
          <div class="messages-container">
            <div v-for="(message, index) in topics[selectedTopic].messages"
                 :key="index"
                 :class="['message-wrapper', message.sentByUser ? 'user-message' : 'ai-message']">
              <div class="message-content">
                <div class="message-header">
                  <img :src="message.sentByUser ? 'https://cdn.quasar.dev/img/avatar3.jpg' : 'https://cdn.quasar.dev/img/boy-avatar.png'"
                       class="avatar"
                       :alt="message.sentByUser ? 'User' : 'AI'">
                  <span class="sender-name">{{ message.sentByUser ? 'You' : 'Wokoverse AI' }}</span>
                </div>
                <div class="message-text">{{ message.text }}</div>
              </div>
            </div>
            <!-- AI typing indicator -->
            <div class="message-wrapper ai-message">
              <div class="message-content">
                <div class="message-header">
                  <img src="https://cdn.quasar.dev/img/boy-avatar.png" class="avatar" alt="AI">
                  <span class="sender-name">Wokoverse AI</span>
                </div>
                <div class="message-text">
                  <q-spinner-dots size="2rem" />
                </div>
              </div>
            </div>
          </div>
          <!-- Input field for sending messages -->
          <div class="message-input">
            <div class="input-wrapper">
              <q-icon name="attach_file" class="clip-icon" size="24"@click="selectFile" />
              <div class="textarea-container">
                <textarea v-model="newMessage" placeholder="Ask Wokoverse..." class="message-box" rows="1" @input="adjustTextareaHeight" ></textarea>
                <q-btn class="send-button" icon="arrow_upward" @click="sendMessage" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  name: 'Wokoverse',
  setup() {
    const topics = ref([
      {
        name: 'AI and Machine Learning',
        lastMessage: 'How can AI improve healthcare?',
        messages: [
          { text: 'Let’s discuss the applications of AI.', sentByUser: false, name: "Wokoverse AI" },
          { text: 'I think AI can revolutionize this field.', sentByUser: true},
          { text: "Artificial intelligence (AI) is rapidly transforming various aspects of our lives. From self-driving cars to medical diagnoses, AI is making significant strides. One of the key areas where AI is having a profound impact is natural language processing (NLP). NLP enables machines to understand, interpret, and generate human language. This technology has led to the development of sophisticated chatbots, language translation tools, and voice assistants. As AI continues to evolve, we can expect even more innovative applications that will reshape our world. Another exciting field within AI is computer vision. Computer vision algorithms allow machines to interpret and understand visual information from the real world. This technology has applications in various domains, such as facial recognition, object detection, and autonomous vehicles. By analyzing images and videos, computers can make informed decisions and take actions based on the visual input.", sentByUser: false, name: "Wokoverse AI"},
        ],
      },
      {
        name: 'Web Development Trends',
        lastMessage: 'What’s new in JavaScript?',
        messages: [
          { text: 'JavaScript has new features this year!', sentByUser: false, name: "Wokoverse AI" },
        ],
      },
      {
        name: 'Toy Making For Children Under The Age of Three',
        lastMessage: 'What’s new in the toy-making industry',
        messages: [
          { text: 'Train toys has new features this year!', sentByUser: false, name: "Wokoverse AI" },
        ],
      },
    ]);

    const selectedTopic = ref(0);

    const selectTopic = (index) => {
      selectedTopic.value = index;
    };

    const newMessage = ref('');

    const sendMessage = () => {
      if (newMessage.value.trim() !== '') {
        topics.value[selectedTopic.value].messages.push({
          text: newMessage.value,
          sentByUser: true,
        });
        newMessage.value = '';
        const textarea = document.querySelector('.message-box');
        if (textarea) {
          textarea.style.height = 'auto'; // Reset textarea height to default
        }
      }
    };

    const adjustTextareaHeight = (event) => {
      const textarea = event.target;
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    };

    const selectFile = () => {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.click();
    };

    return {
      topics,
      selectedTopic,
      newMessage,
      selectTopic,
      sendMessage,
      adjustTextareaHeight,
      selectFile,
    };
  },
};
</script>

<style scoped>
.chat-page {
  height: calc(100vh - 60px);
  display: flex;
  overflow: hidden;
  position: relative;
  padding-bottom: 64px;
}

@media (min-width: 768px) {
  .chat-sidebar {
    width: 30% !important;
  }

  .chat-content {
    width: 100% !important;
  }

  .message-input {
    left: 45% !important;
    width: 100% !important;
  }

  /* Hide toggle button on larger screens */
  .toggler-btn {
    display: none;
  }

  .clip-icon {
    font-size: 24px;
    margin-left: 10px;
  }
}

@media (max-width: 568px) {
  .chat-content.expanded {
    display: block;
  }
  .chat-sidebar {
    width: 80% !important;
    transition: width 0.3s ease;
  }
  .chat-container {
    flex-wrap: wrap;
  }
  .message-input {
    left: 0 !important;
    width: 100% !important;
  }
  .clip-icon {
    font-size: 24px;
    margin: 5px;
  }

  .message {
    max-width: 90% !important;
  }
}

.chat-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
}

.topics-container {
  padding: 8px 16px;
}

.chat-sidebar {
  width: 100% !important;
  height: auto;
  padding-top: 0;
  margin-left: 0;
}

.chat-sidebar .q-item.hover-topic:hover, .chat-sidebar .q-item.active-topic {
  border-radius: 12px;
}

.active-topic {
  background-color: #dce4ff;
  border-radius: 12px;
}

.chat-content {
  width: 100% !important;
}

.chat-content.full-width {
  width: calc(100% - 16px);
}

.chat-content.collapsed {
  width: 100%;
}

.chat-content.expanded {
  opacity: 1;
}

.chat-content:not(.expanded) {
  opacity: 0;
}

.chat-header {
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  padding: 4px;
  font-size: xx-small;
}

.q-separator {
  margin: 0;
  border-top: 1px solid #e0e0e0;
}

.q-btn {
  position: fixed;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  z-index: 1;
}

.contact-name {
  font-size: 1.4em;
  font-weight: bold;
  margin-left: 8px;
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  height: calc(100% - 80px);
  padding-left: 0 !important;
}

.message-wrapper {
  width: 100%;
  padding: 16px 0;
  margin: 0;
}

.ai-message {
  background-color: white;
}

.message-content {
  max-width: 768px;
  margin: -5px 40px;
}

.message-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
}

.sender-name {
  font-weight: 600;
  color: #374151;
}

.message-text {
  font-size: 1rem;
  line-height: 1.5;
  color: #111827;
  white-space: pre-wrap;
  padding-left: 20px;
}

.user-message {
  color: white;
  align-self: flex-end;
}

.ai-message {
  color: #4caf50;
  align-self: flex-start;
}

.message-input {
  position: sticky;
  bottom: 0;
  width: 100%;
  background: white;
  padding: 16px 32px;
  height: 70px;
}

.input-wrapper {
  display: flex;
  align-items: center;
  flex: 1;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative; /* Added for positioning children */
}

.textarea-container {
  display: flex;
  align-items: center;
  flex: 1; /* Ensures it takes full width of the wrapper */
}

.message-box {
  flex: 1;
  border: none;
  padding: 10px 12px;
  resize: none;
  outline: none;
  height: 40px;
}

.send-button {
  margin-left: 4px; /* Space between input and send button */
  background: linear-gradient(to right, #1B00FF, #030F65);
  color: white;
  border-radius: 50%; /* Round button */
  width: 40px; /* Reduced width of the button */
  height: 40px; /* Reduced height of the button */
  position: absolute;
  right: 0px;
  bottom: 10px;
  padding: 8px;
}

.send-button:hover {
  background-color: #45a049;
}

.textarea-container {
  position: relative;
}

.chat-header-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.header-section {
  display: flex;
  position: sticky;
  top: 0;
  background: white;
  z-index: 10;
  padding: 16px;
  height: 60px;
  width: 100%;
}

.left-header {
  width: 30%;
  font-size: 1.4em;
  font-weight: bold;
}

.right-header {
  width: 70%;
  font-size: 1.4em;
  font-weight: bold;
}

.main-content {
  display: flex;
  height: calc(100vh - 136px);
  overflow: hidden;
  position: relative;
}

.left-section {
  width: 30%;
  overflow-y: auto;
  border-right: 1px solid #e0e0e0;
  height: 100%;
}

.right-section {
  width: 70%;
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
}
</style>

