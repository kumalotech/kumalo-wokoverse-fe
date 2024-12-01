<template>
  <div>
    <q-item style="max-width: 420px" v-for="msg in messages" :key="msg.id" clickable v-ripple>
      <q-item-section avatar>
        <q-avatar>
          <img :src="msg.avatar">
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ msg.name }}</q-item-label>
        <q-item-label caption lines="1">{{ msg.msg }}</q-item-label>
      </q-item-section>

      <q-item-section side>
        {{ msg.time }}
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
import {defineComponent} from 'vue'
import studentImage1 from '../assets/student1.jpeg';
import studentImage2 from '../assets/student2.jpeg';
import studentImage3 from '../assets/student3.jpeg';
import studentImage4 from '../assets/student4.jpeg';
import studentImage5 from '../assets/student5.jpeg';

export default defineComponent({
  name: "Messages",
  setup() {
    const messages = [
      {
        id: 1,
        name: "Sophia Laker",
        msg: "Reminder: You have a project assessment with the Robotics Team on Wednesday at 2:00 PM. Please review their progress on the toy prototype.",
        avatar: studentImage1,
        time: "9:00 AM"
      },
      {
        id: 2,
        name: "Alex Okwera",
        msg: "Reminder: Your meeting with the Robotics Club for the final review of the remote-controlled car project is scheduled for Friday at 10:00 AM.",
        avatar: studentImage2,
        time: "10:30 AM"
      },
      {
        id: 3,
        name: "David Williams Komakech",
        msg: "Reminder: The robotics mentorship session on the mechanical arm project is happening tomorrow at 3:30 PM. Please prepare your feedback for the students.",
        avatar: studentImage3,
        time: "11:45 AM"
      },
      {
        id: 4,
        name: "Emmanuel Oyugi",
        msg: "Reminder: You are scheduled to review the latest toy robot prototype this Saturday at 1:00 PM. Please check the project guidelines beforehand.",
        avatar: studentImage4,
        time: "8:15 AM"
      },
      {
        id: 5,
        name: "Marry Browns Lanyero",
        msg: "Reminder: You have a project meeting with the students working on the flying drone project next Monday at 4:00 PM. Don't forget to check the latest design updates.",
        avatar: studentImage5,
        time: "2:00 PM"
      }
    ];
    return {
      messages,
    }
  }
})
</script>

<style scoped>

</style>
