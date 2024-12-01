<template>
  <q-page class="q-pa-sm">
    <learners :data="learnersInfoList"/>
  </q-page>
</template>

<script>
import { defineComponent, defineAsyncComponent } from 'vue';
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
import toyCar1 from '../assets/toyCar1.jpeg';
import toyBus1 from '../assets/toyBus1.webp';
import toyJet1 from '../assets/toyJet1.jpeg';
import toyJet2 from '../assets/toyJet2.jpeg';
import toyElectricCar1 from '../assets/toyElectricCar1.jpeg'
import toyElectricTrain1 from '../assets/toyElectricTrain1.jpeg'
import toyElectricTrain2 from '../assets/toyElectricTrain2.jpeg'

export default defineComponent({
  name: "LearnersPage",
  components: {
    Learners: defineAsyncComponent(() => import('components/tables/Learners.vue')),
  },
  setup() {
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

    const projectMilestones = [
      {
        title: "Concept Ideation",
        date: "2024-05-01",
        description: "Brainstormed initial ideas and created a concept outline for the toy, including target age range and key features.",
        color: "blue",
        completed: true
      },
      {
        title: "Prototype Requirements",
        date: "2024-06-01",
        description: "Finalized requirements for the prototype, including materials, safety standards, and design specifications.",
        color: "teal",
        completed: true
      },
      {
        title: "Design and Modeling",
        date: "2024-07-01",
        description: "Created 3D models and sketches for the toy's design, refining aesthetics and functionality.",
        color: "green",
        completed: true
      },
      {
        title: "Prototype Development",
        date: "2024-08-01",
        description: "Built the first working prototype of the toy using selected materials and conducted preliminary testing.",
        color: "orange",
        completed: true
      },
      {
        title: "Testing and Quality Assurance",
        date: "2024-09-01",
        description: "Ran extensive safety and durability tests on the prototype, making adjustments as necessary.",
        color: "purple",
        completed: true
      },
      {
        title: "Production Launch",
        date: "2024-10-01",
        description: "Started full-scale production and prepared for product launch, including packaging and marketing strategies.",
        color: "red",
        completed: false
      }
    ];

    const projectMilestonesCompleted = [
      {
        title: "Concept Ideation",
        date: "2024-05-01",
        description: "Brainstormed initial ideas and created a concept outline for the toy, including target age range and key features.",
        color: "blue",
        completed: true
      },
      {
        title: "Prototype Requirements",
        date: "2024-06-01",
        description: "Finalized requirements for the prototype, including materials, safety standards, and design specifications.",
        color: "teal",
        completed: true
      },
      {
        title: "Design and Modeling",
        date: "2024-07-01",
        description: "Created 3D models and sketches for the toy's design, refining aesthetics and functionality.",
        color: "green",
        completed: true
      },
      {
        title: "Prototype Development",
        date: "2024-08-01",
        description: "Built the first working prototype of the toy using selected materials and conducted preliminary testing.",
        color: "orange",
        completed: true
      },
      {
        title: "Testing and Quality Assurance",
        date: "2024-09-01",
        description: "Ran extensive safety and durability tests on the prototype, making adjustments as necessary.",
        color: "purple",
        completed: true
      },
      {
        title: "Production Launch",
        date: "2024-10-01",
        description: "Started full-scale production and prepared for product launch, including packaging and marketing strategies.",
        color: "red",
        completed: true
      }
    ];

    const projectData = [
      {
        projectName: 'Development of a Toy Electric Train',
        createdDate: '15/3/2020',
        student: 'Beatrice Apiyo',
        ageGroup: "3-10 Years",
        gender: "Female",
        projectMilestones: projectMilestones,
        projectImages:[toyCar1, toyBus1, toyElectricCar1, toyElectricTrain1, toyElectricTrain2, toyJet1, toyJet2],
        progress: 80,
        facilitator: 'Ben Wokorach',
        projectReviews: reviewList,
        institution: "Wokober Foundation",
        startDate: new Date().toISOString().slice(0, 10),
        endDate: new Date().toISOString().slice(0, 10),
        duration: "2 Weeks",
        description: 'A project focused on building a robot that can dance to programmed music sequences, showcasing synchronized movements and flexibility.'
      },
      {
        projectName: 'Development of a Toy Truck Using Sorgum Stems',
        createdDate: '10/2/2018',
        student: 'Mayor Wokorach Bismark',
        ageGroup: "10-20 Years",
        gender: "Male",
        projectReviews: reviewList,
        projectMilestones: projectMilestonesCompleted,
        projectImages:[toyCar1, toyBus1, toyElectricCar1, toyJet1, toyJet2],
        progress: 100,
        startDate: new Date().toISOString().slice(0, 10),
        endDate: new Date().toISOString().slice(0, 10),
        facilitator: 'Ben Wokorach',
        description: 'An advanced project dedicated to designing a highly responsive robot that mimics human dance moves and expressions.'
      },
      {
        projectName: 'Development of a Software For Monitoring Room Temperature',
        createdDate: '10/1/2020',
        student: 'James Rackara',
        ageGroup: "10-20 Years",
        gender: "Male",
        projectMilestones: projectMilestonesCompleted,
        projectImages:[toyElectricTrain1, toyElectricTrain2, toyJet1, toyJet2],
        progress: 100,
        facilitator: 'Ben Wokorach',
        startDate: new Date().toISOString().slice(0, 10),
        endDate: new Date().toISOString().slice(0, 10),
        projectReviews: reviewList,
        description: 'A fully autonomous dancing robot project that combines machine learning to adapt and create its own dance routines.'
      }
    ];
    const learnersInfoList = [
      {
        fullName: 'Beatrice Apiyo',
        dateOfBirth: '2005-06-15',
        gender: 'Female',
        learnersId: 'LA12345',
        email: 'beatrice.apiyo@example.com',
        contactNumber: '+256 701 234567',
        interests: 'Robotics, Dance',
        previousExperience: 'Participated in a regional science fair',
        allergies: 'None',
        emergencyContactName: 'John Apiyo',
        emergencyContactNumber: '+256 701 345678',
        preferredHospital: 'Mulago Hospital',
        profilePictureUrl: studentImage1,
        project: 'Development of a Dancing Robot',
        progress: 80,
        facilitator: 'Ben Wokorach',
        projectInfo: projectData
      },
      {
        fullName: 'Lawrence Kitara',
        dateOfBirth: '2006-02-10',
        gender: 'Male',
        learnersId: 'LA23456',
        email: 'lawrence.kitara@example.com',
        contactNumber: '+256 702 345678',
        interests: 'Programming, Electronics',
        previousExperience: 'Built a simple Arduino project',
        allergies: 'Dust',
        emergencyContactName: 'Sarah Kitara',
        emergencyContactNumber: '+256 702 456789',
        preferredHospital: 'Kampala Hospital',
        profilePictureUrl: studentImage2,
        project: 'Development of a Dancing Robot',
        progress: 50,
        facilitator: 'Ben Wokorach',
        projectInfo: projectData
      },
      {
        fullName: 'Mayor Wokorach Bismark',
        dateOfBirth: '2004-11-12',
        gender: 'Male',
        learnersId: 'LA34567',
        email: 'mayor.bismark@example.com',
        contactNumber: '+256 703 456789',
        interests: 'Artificial Intelligence, Robotics',
        previousExperience: 'Designed a chatbot using Python',
        allergies: 'Peanuts',
        emergencyContactName: 'Wokorach Ben',
        emergencyContactNumber: '+256 703 567890',
        preferredHospital: 'Nakasero Hospital',
        profilePictureUrl: studentImage3,
        project: 'Development of a Dancing Robot',
        progress: 100,
        facilitator: 'Ben Wokorach',
        projectInfo: projectData
      },
      {
        fullName: 'Kingston Kidega',
        dateOfBirth: '2005-09-08',
        gender: 'Male',
        learnersId: 'LA45678',
        email: 'kingston.kidega@example.com',
        contactNumber: '+256 704 567890',
        interests: 'Engineering, Music',
        previousExperience: 'Played with basic circuit boards',
        allergies: 'None',
        emergencyContactName: 'James Kidega',
        emergencyContactNumber: '+256 704 678901',
        preferredHospital: 'Lubaga Hospital',
        profilePictureUrl: studentImage4,
        project: 'Development of a Dancing Robot',
        progress: 60,
        facilitator: 'Ben Wokorach',
        projectInfo: projectData
      },
      {
        fullName: 'Maria Akello',
        dateOfBirth: '2007-03-02',
        gender: 'Female',
        learnersId: 'LA56789',
        email: 'maria.akello@example.com',
        contactNumber: '+256 705 678901',
        interests: 'Math, Robotics',
        previousExperience: 'Participated in math club competitions',
        allergies: 'None',
        emergencyContactName: 'Amina Akello',
        emergencyContactNumber: '+256 705 789012',
        preferredHospital: 'Case Clinic',
        profilePictureUrl: studentImage5,
        project: 'Development of a Dancing Robot',
        progress: 30,
        facilitator: 'Ben Wokorach',
        projectInfo: projectData
      },
      {
        fullName: 'Mercy Anena',
        dateOfBirth: '2006-12-25',
        gender: 'Female',
        learnersId: 'LA67890',
        email: 'mercy.anena@example.com',
        contactNumber: '+256 706 789012',
        interests: 'Science Experiments, Coding',
        previousExperience: 'Attended a coding bootcamp',
        allergies: 'Seafood',
        emergencyContactName: 'John Anena',
        emergencyContactNumber: '+256 706 890123',
        preferredHospital: 'International Hospital Kampala',
        profilePictureUrl: studentImage6,
        project: 'Development of a Dancing Robot',
        progress: 40,
        facilitator: 'Ben Wokorach',
        projectInfo: projectData
      },
      {
        fullName: 'Peace Nimaro',
        dateOfBirth: '2007-05-20',
        gender: 'Female',
        learnersId: 'LA78901',
        email: 'peace.nimaro@example.com',
        contactNumber: '+256 707 890123',
        interests: 'Music, Robotics',
        previousExperience: 'Member of school choir',
        allergies: 'None',
        emergencyContactName: 'Jane Nimaro',
        emergencyContactNumber: '+256 707 901234',
        preferredHospital: 'Mulago Hospital',
        profilePictureUrl: studentImage7,
        project: 'Development of a Dancing Robot',
        progress: 60,
        facilitator: 'Ben Wokorach',
        projectInfo: projectData
      },
      {
        fullName: 'Bright Brian Laloyo',
        dateOfBirth: '2005-04-14',
        gender: 'Male',
        learnersId: 'LA89012',
        email: 'bright.laloyo@example.com',
        contactNumber: '+256 708 901234',
        interests: 'Art, Electronics',
        previousExperience: 'Attended art workshops',
        allergies: 'None',
        emergencyContactName: 'Laloyo Alfred',
        emergencyContactNumber: '+256 708 012345',
        preferredHospital: 'Kampala Hospital',
        profilePictureUrl: studentImage8,
        project: 'Development of a Dancing Robot',
        progress: 25,
        facilitator: 'Ben Wokorach',
        projectInfo: projectData
      },
      {
        fullName: 'Juliet Lamaro',
        dateOfBirth: '2006-07-28',
        gender: 'Female',
        learnersId: 'LA90123',
        email: 'juliet.lamaro@example.com',
        contactNumber: '+256 709 012345',
        interests: 'Programming, Sports',
        previousExperience: 'Participated in a programming camp',
        allergies: 'Gluten',
        emergencyContactName: 'Lamaro Esther',
        emergencyContactNumber: '+256 709 123456',
        preferredHospital: 'Mulago Hospital',
        profilePictureUrl: studentImage9,
        project: 'Development of a Dancing Robot',
        progress: 15,
        facilitator: 'Ben Wokorach',
        projectInfo: projectData
      },
      {
        fullName: 'Pearl Lakica',
        dateOfBirth: '2005-11-17',
        gender: 'Female',
        learnersId: 'LA01234',
        email: 'pearl.lakica@example.com',
        contactNumber: '+256 710 123456',
        interests: 'Dance, Robotics',
        previousExperience: 'Performed in school dance events',
        allergies: 'None',
        emergencyContactName: 'Lakica Mary',
        emergencyContactNumber: '+256 710 234567',
        preferredHospital: 'Nakasero Hospital',
        profilePictureUrl: studentImage10,
        project: 'Development of a Dancing Robot',
        progress: 30,
        facilitator: 'Ben Wokorach',
        projectInfo: projectData
      },
      {
        fullName: 'Newton Bob Watmon',
        dateOfBirth: '2004-09-30',
        gender: 'Male',
        learnersId: 'LA12345',
        email: 'newton.watmon@example.com',
        contactNumber: '+256 711 234567',
        interests: 'Science, Engineering',
        previousExperience: 'Built small robotic models',
        allergies: 'None',
        emergencyContactName: 'Watmon Grace',
        emergencyContactNumber: '+256 711 345678',
        preferredHospital: 'Lubaga Hospital',
        profilePictureUrl: studentImage11,
        project: 'Development of a Dancing Robot',
        progress: 80,
        facilitator: 'Ben Wokorach',
        projectInfo: projectData
      },
      {
        fullName: 'Paul Omara',
        dateOfBirth: '2005-02-18',
        gender: 'Male',
        learnersId: 'LA23456',
        email: 'paul.omara@example.com',
        contactNumber: '+256 712 345678',
        interests: 'Physics, Robotics',
        previousExperience: 'Won physics competition',
        allergies: 'None',
        emergencyContactName: 'Omara Rose',
        emergencyContactNumber: '+256 712 456789',
        preferredHospital: 'Case Clinic',
        profilePictureUrl: studentImage12,
        project: 'Development of a Dancing Robot',
        progress: 70,
        facilitator: 'Ben Wokorach',
        projectInfo: projectData
      },
      {
        fullName: 'James Rackara',
        dateOfBirth: '2006-01-05',
        gender: 'Male',
        learnersId: 'LA34567',
        email: 'james.rackara@example.com',
        contactNumber: '+256 713 456789',
        interests: 'Technology, Music',
        previousExperience: 'Joined tech bootcamp',
        allergies: 'Pollen',
        emergencyContactName: 'Rackara Mary',
        emergencyContactNumber: '+256 713 567890',
        preferredHospital: 'International Hospital Kampala',
        profilePictureUrl: studentImage13,
        project: 'Development of a Dancing Robot',
        progress: 65,
        facilitator: 'Ben Wokorach',
        projectInfo: projectData
      },
    ];
    return {
      learnersInfoList,
    };
  },
});
</script>
