<template>
  <q-page class="q-pa-sm">
    <lesson-plan-table :projectInfo="projectData" :lessonPlans="projectData.flatMap(project => project.lessonPlans)"/>
  </q-page>
</template>

<script>
import {defineComponent, defineAsyncComponent} from 'vue';
import studentImage1 from '../assets/student1.jpeg';
import studentImage2 from '../assets/student2.jpeg';
import studentImage3 from '../assets/student3.jpeg';
import studentImage4 from '../assets/student4.jpeg';
import studentImage5 from '../assets/student5.jpeg';
import studentImage6 from '../assets/student6.jpeg';
import studentImage7 from '../assets/student7.jpeg';
import studentImage8 from '../assets/student8.jpeg';
import studentImage9 from '../assets/student9.jpeg';
import studentImage10 from '../assets/student10.jpeg';
import studentImage11 from '../assets/student11.jpeg';
import studentImage12 from '../assets/student12.jpeg';
import studentImage13 from '../assets/student13.jpeg';
import studentCar1 from '../assets/studentCar1.jpeg';
import studentCar2 from '../assets/studentCar2.jpeg';
import studentCar3 from '../assets/studentCar3.jpeg';
import studentCar4 from '../assets/studentCar4.jpeg';

export default defineComponent({
  name: "LessonPlan",
  components: {
    LessonPlanTable: defineAsyncComponent(() => import('components/tables/LessonPlanTable.vue'))
  },
  setup(props) {

    const reviewList = [
      {
        title: 'Initial Design Sketch',
        subtitle: 'Phase 1: Conceptualization',
        side: 'left',
        desc: 'Created the first sketch of the electric toy train, focusing on its dimensions and battery placement.',
        color: 'blue',
        icon: 'edit',
        status: 'Ongoing',
      },
      {
        title: 'Battery Selection Pending',
        subtitle: 'Phase 1: Conceptualization',
        side: 'left',
        desc: 'Awaiting confirmation on the best battery type for optimal performance.',
        color: 'red',
        icon: 'error_outline',
        status: 'Stuck',
      },
      {
        title: 'Concept Approved',
        subtitle: 'Phase 1: Conceptualization',
        side: 'left',
        desc: 'The design and materials for the electric train have been approved by the team.',
        color: 'green',
        icon: 'done_all',
        status: 'Completed',
      },
      {
        title: 'Building the Train Chassis',
        subtitle: 'Phase 2: Construction',
        side: 'right',
        desc: 'Started constructing the chassis of the toy train, focusing on durability and aesthetics.',
        color: 'blue',
        icon: 'build',
        status: 'Ongoing',
      },
      {
        title: 'Wiring and Circuit Setup',
        subtitle: 'Phase 2: Construction',
        side: 'right',
        desc: 'Completed the wiring process, ensuring the battery and motor are connected for smooth operation.',
        color: 'green',
        icon: 'electric_bolt',
        status: 'Completed',
      },
      {
        title: 'Battery and Motor Testing',
        subtitle: 'Phase 3: Testing',
        side: 'left',
        desc: 'Testing the battery-motor connection to verify the power supply and motor speed control.',
        color: 'blue',
        icon: 'bolt',
        status: 'Ongoing',
      },
      {
        title: 'Motor Overheating Issue',
        subtitle: 'Phase 3: Testing',
        side: 'left',
        desc: 'Encountered an issue with motor overheating after prolonged use. Investigating solutions.',
        color: 'red',
        icon: 'warning',
        status: 'Stuck',
      },
      {
        title: 'Safety Testing Passed',
        subtitle: 'Phase 3: Testing',
        side: 'left',
        desc: 'All safety checks passed, ensuring the toy train is safe for children to play with.',
        color: 'green',
        icon: 'verified',
        status: 'Completed',
      },
      {
        title: 'Assembly and Finishing Touches',
        subtitle: 'Phase 4: Assembly',
        side: 'right',
        desc: 'Assembling all the parts and applying final touches such as painting and detailing.',
        color: 'blue',
        icon: 'build_circle',
        status: 'Ongoing',
      },
      {
        title: 'Final Packaging for Delivery',
        subtitle: 'Phase 4: Assembly',
        side: 'right',
        desc: 'Preparing the toy train for packaging and delivery to retailers.',
        color: 'blue',
        icon: 'local_shipping',
        status: 'Ongoing',
      },
    ];


    const syncedData = [
      {
        finalStatus: 'In Progress',
        dateGenerated: '2024-10-20',
        ageGroup: '12-14 years',
        projectMilestone: "Development",
        keyLearningOutcomes: 'Mechanical assembly, Basic electronics',
        theme: 'Creative Robotics',
        topic: 'Building Toy Robots',
        competency: 'Hands-on mechanical skills and teamwork',
        learningOutcomes: 'Students will learn basic mechanical concepts and teamwork through practical activities.',
        genericSkills: 'Problem-solving, creativity, and collaboration',
        values: 'Patience, perseverance, and innovation',
        crossCuttingIssues: 'Environmental conservation by reusing materials',
        selfAssessment: 'This lesson plan helped me recognize the importance of structured mentorship in toy-making. I successfully implemented activities that promoted hands-on learning, fostering student engagement and creativity. However, I encountered challenges in time management, leading to rushed conclusions.'
      },
      {
        finalStatus: 'Completed',
        dateGenerated: '2024-09-15',
        ageGroup: '15-17 years',
        projectMilestone: "Development",
        keyLearningOutcomes: 'AI programming, Sensor integration',
        theme: 'Creative Robotics',
        topic: 'Building Toy Robots',
        competency: 'Hands-on mechanical skills and teamwork',
        learningOutcomes: 'Students will learn basic mechanical concepts and teamwork through practical activities.',
        genericSkills: 'Problem-solving, creativity, and collaboration',
        values: 'Patience, perseverance, and innovation',
        crossCuttingIssues: 'Environmental conservation by reusing materials',
        selfAssessment: 'This lesson plan helped me recognize the importance of structured mentorship in toy-making. I successfully implemented activities that promoted hands-on learning, fostering student engagement and creativity. However, I encountered challenges in time management, leading to rushed conclusions.'
      },
      {
        finalStatus: 'Failed',
        dateGenerated: '2024-08-10',
        projectMilestone: "Development",
        ageGroup: '12-14 years',
        keyLearningOutcomes: 'Pathfinding, Motor control',
        theme: 'Creative Robotics',
        topic: 'Building Toy Robots',
        competency: 'Hands-on mechanical skills and teamwork',
        learningOutcomes: 'Students will learn basic mechanical concepts and teamwork through practical activities.',
        genericSkills: 'Problem-solving, creativity, and collaboration',
        values: 'Patience, perseverance, and innovation',
        crossCuttingIssues: 'Environmental conservation by reusing materials',
        selfAssessment: 'This lesson plan helped me recognize the importance of structured mentorship in toy-making. I successfully implemented activities that promoted hands-on learning, fostering student engagement and creativity. However, I encountered challenges in time management, leading to rushed conclusions.'
      },
      {
        finalStatus: 'In Progress',
        dateGenerated: '2024-10-01',
        ageGroup: '15-17 years',
        keyLearningOutcomes: 'Sensor calibration, Autonomous systems',
        theme: 'Creative Robotics',
        topic: 'Building Toy Robots',
        projectMilestone: "Development",
        competency: 'Hands-on mechanical skills and teamwork',
        learningOutcomes: 'Students will learn basic mechanical concepts and teamwork through practical activities.',
        genericSkills: 'Problem-solving, creativity, and collaboration',
        values: 'Patience, perseverance, and innovation',
        crossCuttingIssues: 'Environmental conservation by reusing materials',
        selfAssessment: 'This lesson plan helped me recognize the importance of structured mentorship in toy-making. I successfully implemented activities that promoted hands-on learning, fostering student engagement and creativity. However, I encountered challenges in time management, leading to rushed conclusions.'
      }
    ];

    const projectData = [
      {
        projectName: 'Development of a Toy Electric Train',
        createdDate: '15/3/2020',
        student: 'Beatrice Apiyo',
        ageGroup: "3-10 Years",
        gender: "Female",
        avatar: studentImage1,
        projectImages: [studentCar1, studentCar2, studentCar3, studentCar4],
        progress: 80,
        facilitator: 'Ben Wokorach',
        projectReviews: reviewList,
        description: 'A project focused on building a robot that can dance to programmed music sequences, showcasing synchronized movements and flexibility.',
        duration: "2 Weeks",
        date: new Date().toISOString().slice(0, 10),
        time: new Date().toLocaleTimeString(),
        institution: "Wokober Foundation",
        lessonPlans: syncedData
      },
      {
        projectName: 'Molding Maria Using Clay',
        createdDate: '10/2/2018',
        student: 'Lawrence Kitara',
        ageGroup: "10-20 Years",
        gender: "Male",
        avatar: studentImage2,
        projectImages: [studentImage1, studentImage2, studentImage7, studentImage13],
        progress: 50,
        facilitator: 'Ben Wokorach',
        projectReviews: reviewList,
        description: 'The project aims at creating a dancing robot capable of performing various dance styles with precision and rhythm.',
        duration: "2 Weeks",
        date: new Date().toISOString().slice(0, 10),
        time: new Date().toLocaleTimeString(),
        institution: "Wokober Foundation",
        lessonPlans: syncedData
      },
      {
        projectName: 'Development of a Toy Truck Using Sorgum Stems',
        createdDate: '10/2/2018',
        student: 'Mayor Wokorach Bismark',
        ageGroup: "10-20 Years",
        gender: "Male",
        avatar: studentImage3,
        projectReviews: reviewList,
        projectImages: [studentImage11, studentImage4, studentImage9, studentImage7, studentImage2, studentImage5, studentImage12, studentImage6, studentImage8],
        progress: 100,
        facilitator: 'Ben Wokorach',
        description: 'An advanced project dedicated to designing a highly responsive robot that mimics human dance moves and expressions.',
        duration: "2 Weeks",
        date: new Date().toISOString().slice(0, 10),
        time: new Date().toLocaleTimeString(),
        institution: "Wokober Foundation",
        lessonPlans: syncedData
      },
      {
        projectName: 'Development of a Dancing Robot',
        createdDate: '10/2/2019',
        student: 'Kingston Kidega',
        ageGroup: "10-20 Years",
        gender: "Male",
        avatar: studentImage4,
        projectReviews: reviewList,
        projectImages: [studentImage6, studentImage4, studentImage7, studentImage13],
        progress: 60,
        facilitator: 'Ben Wokorach',
        description: 'A robotic innovation project with the goal of integrating artificial intelligence to enhance the robot’s dance choreography.',
        duration: "2 Weeks",
        date: new Date().toISOString().slice(0, 10),
        time: new Date().toLocaleTimeString(),
        institution: "Wokober Foundation",
        lessonPlans: syncedData
      },
      {
        projectName: 'Development of a Dancing Robot',
        createdDate: '10/1/2020',
        student: 'Maria Akello',
        ageGroup: "10-20 Years",
        gender: "Female",
        avatar: studentImage5,
        projectReviews: reviewList,
        projectImages: [studentImage1, studentImage2, studentImage7, studentImage13, studentImage4, studentImage6],
        progress: 30,
        facilitator: 'Ben Wokorach',
        description: 'Focused on creating a beginner-level dancing robot that can learn and adapt to simple dance moves through visual inputs.',
        duration: "2 Weeks",
        date: new Date().toISOString().slice(0, 10),
        time: new Date().toLocaleTimeString(),
        institution: "Wokober Foundation",
        lessonPlans: syncedData
      },
      {
        projectName: 'Development of a Dancing Robot',
        createdDate: '10/1/2020',
        student: 'Mercy Anena',
        ageGroup: "3-10 Years",
        gender: "Female",
        avatar: studentImage6,
        projectReviews: reviewList,
        projectImages: [studentImage11, studentImage12, studentImage7, studentImage9],
        progress: 40,
        facilitator: 'Ben Wokorach',
        description: 'An exploration into developing a robot with interactive dance capabilities, controlled remotely via a smartphone application.',
        duration: "2 Weeks",
        date: new Date().toISOString().slice(0, 10),
        time: new Date().toLocaleTimeString(),
        institution: "Wokober Foundation",
        lessonPlans: syncedData
      },
      {
        projectName: 'Development of a Dancing Robot',
        createdDate: '10/1/2020',
        student: 'Peace Nimaro',
        ageGroup: "10-20 Years",
        gender: "Female",
        avatar: studentImage7,
        projectReviews: reviewList,
        projectImages: [studentImage11, studentImage2, studentImage5, studentImage3],
        progress: 60,
        facilitator: 'Ben Wokorach',
        description: 'Designing a dance-performing robot that can move seamlessly in response to beats and rhythms played in the environment.',
        duration: "2 Weeks",
        date: new Date().toISOString().slice(0, 10),
        time: new Date().toLocaleTimeString(),
        institution: "Wokober Foundation",
        lessonPlans: syncedData
      },
      {
        projectName: 'Development of a Dancing Robot',
        createdDate: '10/1/2020',
        student: 'Bright Brian Laloyo',
        ageGroup: "3-10 Years",
        gender: "Male",
        avatar: studentImage8,
        projectImages: [studentImage1, studentImage2, studentImage7, studentImage13],
        progress: 25,
        facilitator: 'Ben Wokorach',
        projectReviews: reviewList,
        description: 'The focus of this project is to create a simple dancing robot that can perform pre-programmed routines in sync with music.',
        duration: "2 Weeks",
        date: new Date().toISOString().slice(0, 10),
        time: new Date().toLocaleTimeString(),
        institution: "Wokober Foundation",
        lessonPlans: syncedData
      },
      {
        projectName: 'Development of a Dancing Robot',
        createdDate: '10/1/2020',
        student: 'Juliet Lamaro',
        ageGroup: "10-20 Years",
        gender: "Female",
        avatar: studentImage9,
        projectImages: [studentImage7, studentImage13],
        progress: 15,
        facilitator: 'Ben Wokorach',
        projectReviews: reviewList,
        description: 'Developing a cost-effective robotic prototype that can learn basic dance steps and improve its movements over time.',
        duration: "2 Weeks",
        date: new Date().toISOString().slice(0, 10),
        time: new Date().toLocaleTimeString(),
        institution: "Wokober Foundation",
        lessonPlans: syncedData
      },
      {
        projectName: 'Development of a Dancing Robot',
        createdDate: '10/1/2020',
        student: 'Pearl Lakica',
        ageGroup: "3-10 Years",
        gender: "Female",
        avatar: studentImage10,
        projectImages: [studentImage1, studentImage2, studentImage3, studentImage4, studentImage10],
        progress: 30,
        facilitator: 'Ben Wokorach',
        projectReviews: reviewList,
        description: 'This project aims to create a customizable dancing robot, allowing users to modify its dance routines using a mobile app.',
        duration: "2 Weeks",
        date: new Date().toISOString().slice(0, 10),
        time: new Date().toLocaleTimeString(),
        institution: "Wokober Foundation",
        lessonPlans: syncedData
      }
    ];

    return {
      projectData
    }
  }
})
</script>

<style>

</style>
