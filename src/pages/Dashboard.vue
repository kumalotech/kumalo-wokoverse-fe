<template>
  <q-page class="q-pa-md no-shadow">
    <!-- Stats Cards First -->
    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-md-3 col-sm-6 col-xs-12">
        <q-card class="stat-card">
          <q-card-section>
            <div class="row items-center">
              <div class="col-auto">
                <div class="icon-wrapper bg-blue-1">
                  <q-icon name="fas fa-project-diagram" size="sm" class="text-blue" />
                </div>
              </div>
              <div class="col q-pl-md">
                <div class="text-subtitle2 text-grey-7">Total Projects</div>
                <div class="text-h4 text-blue q-mt-sm" v-if="counters">{{ formatNumber(counters.projects) }}</div>
                <div class="text-caption text-grey-8 q-mt-sm">
                  <q-icon name="trending_up" size="16px" class="text-positive q-mr-xs" />
                  <span>12% increase</span>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-md-3 col-sm-6 col-xs-12">
        <q-card class="stat-card">
          <q-card-section>
            <div class="row items-center">
              <div class="col-auto">
                <div class="icon-wrapper bg-red-1">
                  <q-icon name="fas fa-chart-bar" size="sm" class="text-red" />
                </div>
              </div>
              <div class="col q-pl-md">
                <div class="text-subtitle2 text-grey-7">Cancelled</div>
                <div class="text-h4 text-red q-mt-sm" v-if="counters">{{ formatNumber(counters.cancelled) }}</div>
                <div class="text-caption text-grey-8 q-mt-sm">
                  <q-icon name="trending_down" size="16px" class="text-negative q-mr-xs" />
                  <span>3% decrease</span>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-md-3 col-sm-6 col-xs-12">
        <q-card class="stat-card">
          <q-card-section>
            <div class="row items-center">
              <div class="col-auto">
                <div class="icon-wrapper bg-green-1">
                  <q-icon name="fas fa-chart-line" size="sm" class="text-green" />
                </div>
              </div>
              <div class="col q-pl-md">
                <div class="text-subtitle2 text-grey-7">Completed</div>
                <div class="text-h4 text-green q-mt-sm" v-if="counters">{{ formatNumber(counters.completed) }}</div>
                <div class="text-caption text-grey-8 q-mt-sm">
                  <q-icon name="trending_up" size="16px" class="text-positive q-mr-xs" />
                  <span>8% increase</span>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-md-3 col-sm-6 col-xs-12">
        <q-card class="stat-card">
          <q-card-section>
            <div class="row items-center">
              <div class="col-auto">
                <div class="icon-wrapper bg-orange-1">
                  <q-icon name="people" size="sm" class="text-orange" />
                </div>
              </div>
              <div class="col q-pl-md">
                <div class="text-subtitle2 text-grey-7">Students</div>
                <div class="text-h4 text-orange q-mt-sm" v-if="counters">{{ formatNumber(counters.students) }}</div>
                <div class="text-caption text-grey-8 q-mt-sm">
                  <q-icon name="trending_up" size="16px" class="text-positive q-mr-xs" />
                  <span>15% increase</span>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Latest Activities Section -->
    <q-card class="q-mb-md shadow-2" bordered>
      <q-card-section class="text-h6 q-pb-none">
        <q-item>
          <q-item-section avatar>
            <q-icon color="primary" name="movie" size="44px"/>
          </q-item-section>
          <q-item-section>
            <div class="text-h6">Latest Project Activities</div>
            <q-item-label caption>Recent updates from ongoing projects</q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>

      <q-card-section>
        <div class="row q-col-gutter-md">
          <!-- First Card - Electric Train -->
          <div class="col-12 col-sm-6 col-md-3">
            <q-card class="project-card">
              <q-carousel
                v-model="slide1"
                arrows
                animated
                height="200px"
                class="rounded-borders"
              >
                <q-carousel-slide :name="1">
                  <q-img
                    :src="toyTrain1"
                    height="200px"
                    style="width: 100%"
                    fit="cover"
                    @error="handleImageError"
                  >
                    <template v-slot:error>
                      <div class="absolute-full flex flex-center bg-negative text-white">
                        Image 1 Failed to Load
                      </div>
                    </template>
                  </q-img>
                </q-carousel-slide>
                <q-carousel-slide :name="2">
                  <q-img
                    :src="toyTrain2"
                    height="200px"
                    style="width: 100%"
                    fit="cover"
                  />
                </q-carousel-slide>
              </q-carousel>

              <q-card-section>
                <div class="text-subtitle2 text-weight-bold">Electric Train Project</div>
                <div class="text-caption">
                  <q-icon name="person" size="xs"/> Beatrice Apiyo
                </div>
                <div class="text-caption">
                  <q-icon name="schedule" size="xs"/> In Progress
                </div>
                <q-linear-progress
                  :value="0.7"
                  color="primary"
                  class="q-mt-sm"
                />
              </q-card-section>
            </q-card>
          </div>

          <!-- Second Card - Toy Jet -->
          <div class="col-12 col-sm-6 col-md-3">
            <q-card class="project-card">
              <q-carousel
                v-model="slide2"
                arrows
                animated
                height="200px"
                class="rounded-borders"
              >
                <q-carousel-slide :name="1">
                  <q-img
                    :src="toyJet1"
                    height="200px"
                    style="width: 100%"
                    fit="cover"
                  />
                </q-carousel-slide>
                <q-carousel-slide :name="2">
                  <q-img
                    :src="toyJet2"
                    height="200px"
                    style="width: 100%"
                    fit="cover"
                  />
                </q-carousel-slide>
              </q-carousel>

              <q-card-section>
                <div class="text-subtitle2 text-weight-bold">Toy Jet Model</div>
                <div class="text-caption">
                  <q-icon name="person" size="xs"/> Lawrence Kitara
                </div>
                <div class="text-caption">
                  <q-icon name="schedule" size="xs"/> Completed
                </div>
                <q-linear-progress
                  :value="1"
                  color="positive"
                  class="q-mt-sm"
                />
              </q-card-section>
            </q-card>
          </div>

          <!-- Third Card - Toy Car -->
          <div class="col-12 col-sm-6 col-md-3">
            <q-card class="project-card">
              <q-carousel
                v-model="slide3"
                arrows
                animated
                height="200px"
                class="rounded-borders"
              >
                <q-carousel-slide :name="1">
                  <q-img
                    :src="studentCar1"
                    height="200px"
                    style="width: 100%"
                    fit="cover"
                  />
                </q-carousel-slide>
                <q-carousel-slide :name="2">
                  <q-img
                    :src="studentCar2"
                    height="200px"
                    style="width: 100%"
                    fit="cover"
                  />
                </q-carousel-slide>
              </q-carousel>

              <q-card-section>
                <div class="text-subtitle2 text-weight-bold">Remote Control Car</div>
                <div class="text-caption">
                  <q-icon name="person" size="xs"/> Mayor Wokorach
                </div>
                <div class="text-caption">
                  <q-icon name="schedule" size="xs"/> Just Started
                </div>
                <q-linear-progress
                  :value="0.3"
                  color="warning"
                  class="q-mt-sm"
                />
              </q-card-section>
            </q-card>
          </div>

          <!-- Fourth Card with Video -->
          <div class="col-12 col-sm-6 col-md-3">
            <q-card class="project-card">
              <div class="video-container">
                <iframe
                  width="100%"
                  height="200"
                  src="https://www.youtube.com/embed/x86eTdPwnjU"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>

              <q-card-section>
                <div class="text-subtitle2 text-weight-bold">Video Tutorial: Toy Making</div>
                <div class="text-caption">
                  <q-icon name="person" size="xs"/> Tutorial Guide
                </div>
                <div class="text-caption">
                  <q-icon name="schedule" size="xs"/> Latest Update
                </div>
                <q-linear-progress
                  value="1"
                  color="positive"
                  class="q-mt-sm"
                />
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- Charts Section Last -->
    <q-card class="q-mt-sm shadow-2 dashboard-charts" bordered>
      <q-card-section class="text-h6 q-pb-none">
        <q-item>
          <q-item-section avatar class="">
            <q-icon color="blue" name="fas fa-chart-line" size="44px"/>
          </q-item-section>

          <q-item-section>
            <div class="text-h6">Recent Project Completion Stats</div>
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-card-section class="row">
        <div class="col-lg-7 col-sm-12 col-xs-12 col-md-7">
          <div class="row">
            <div class="col-lg-3 col-md-3 col-xs-6 col-sm-6">
              <q-item>
                <q-item-section top avatar>
                  <q-avatar color="green-8" text-color="white" icon="build"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-h6 text-green-8 text-bold">9876</q-item-label>
                  <q-item-label caption>Completed</q-item-label>
                </q-item-section>
              </q-item>
            </div>
            <div class="col-lg-3 col-md-3 col-xs-6 col-sm-6">
              <q-item>
                <q-item-section top avatar>
                  <q-avatar color="blue" text-color="white" icon="build"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-h6 text-blue text-bold">321</q-item-label>
                  <q-item-label caption>In Progress</q-item-label>
                </q-item-section>
              </q-item>
            </div>
            <div class="col-lg-3 col-md-3 col-xs-6 col-sm-6">
              <q-item>
                <q-item-section top avatar>
                  <q-avatar color="orange-8" text-color="white" icon="build"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-h6 text-orange-8 text-bold">1021</q-item-label>
                  <q-item-label caption>Not Started</q-item-label>
                </q-item-section>
              </q-item>
            </div>
            <div class="col-lg-3 col-md-3 col-xs-6 col-sm-6">
              <q-item>
                <q-item-section top avatar>
                  <q-avatar color="red-6" text-color="white" icon="build"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-h6 text-red-6 text-bold">345</q-item-label>
                  <q-item-label caption>On Hold</q-item-label>
                </q-item-section>
              </q-item>
            </div>

          </div>
          <div>
            <ECharts
              :option="salesOption"
              class="q-mt-md"
              :resizable="true"
              autoresize style="height: 180px;"
            />
          </div>
        </div>
        <div class="col-lg-5 col-sm-12 col-xs-12 col-md-5">
          <q-item>
            <q-item-section avatar class="">
              <q-icon color="blue" name="fas fa-gift" class="q-pl-md" size="24px"/>
            </q-item-section>

            <q-item-section>
              <div class="text-h6">Current Projects' Stats</div>
            </q-item-section>
          </q-item>
          <div>
            <ECharts
              :option="pieOptions"
              :resizable="true"
              class="q-mb-md"
              autoresize style="height: 150px;"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import {defineComponent, defineAsyncComponent, ref, onMounted} from 'vue';
import * as echarts from 'echarts';
import ECharts from "vue-echarts";
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

import toyTrain1 from '../assets/toyElectricTrain1.jpeg';
import toyTrain2 from '../assets/toyElectricTrain2.jpeg';
import toyJet1 from '../assets/toyJet1.jpeg';
import toyJet2 from '../assets/toyJet2.jpeg';

const messages = [
      {
        id: 1,
        name: "Alex Johnson",
        msg: "Reminder: You have a project assessment with the Robotics Team on Wednesday at 2:00 PM. Please review their progress on the toy prototype.",
        avatar: studentImage1,
        time: "9:00 AM"
      },
      {
        id: 2,
        name: "Sophia Lee",
        msg: "Reminder: Your meeting with the Robotics Club for the final review of the remote-controlled car project is scheduled for Friday at 10:00 AM.",
        avatar: studentImage2,
        time: "10:30 AM"
      },
      {
        id: 3,
        name: "David Williams",
        msg: "Reminder: The robotics mentorship session on the mechanical arm project is happening tomorrow at 3:30 PM. Please prepare your feedback for the students.",
        avatar: studentImage3,
        time: "11:45 AM"
      },
      {
        id: 4,
        name: "Emma Davis",
        msg: "Reminder: You are scheduled to review the latest toy robot prototype this Saturday at 1:00 PM. Please check the project guidelines beforehand.",
        avatar: studentImage4,
        time: "8:15 AM"
      },
      {
        id: 5,
        name: "Michael Brown",
        msg: "Reminder: You have a project meeting with the students working on the flying drone project next Monday at 4:00 PM. Don't forget to check the latest design updates.",
        avatar: studentImage5,
        time: "2:00 PM"
      }
    ];

const contacts = [
  {
    name: "Pratik Patel",
    position: "Developer",
    avatar: "https://avatars2.githubusercontent.com/u/34883558?s=400&v=4"
  },
  {
    name: "Razvan Stoenescu",
    position: "Developer",
    avatar: "https://cdn.quasar.dev/team/razvan_stoenescu.jpeg"
  },
  {
    name: "Jeff Galbraith",
    position: "Developer",
    avatar: "https://cdn.quasar.dev/team/jeff_galbraith.jpg"
  },
  {
    name: "Brunhilde Panswick",
    position: "Administrator",
    avatar: "https://cdn.quasar.dev/img/avatar2.jpg"
  },
  {
    name: "Winfield Stapforth",
    position: "Administrator",
    avatar: "https://cdn.quasar.dev/img/avatar6.jpg"
  }
];

const reviewList = [
  {
    title: 'Initial Design Sketch',
    subtitle: 'Phase 1: Conceptualization',
    side: 'left',
    desc: 'Created the first sketch of the electric toy train, focusing on its dimensions and battery placement.',
    color: 'blue',
    icon: 'edit',
    status: 'Ongoing',
    reviewDate: '2024-10-01',  // October 1, 2024
  },
  {
    title: 'Battery Selection Pending',
    subtitle: 'Phase 1: Conceptualization',
    side: 'left',
    desc: 'Awaiting confirmation on the best battery type for optimal performance.',
    color: 'red',
    icon: 'error_outline',
    status: 'Stuck',
    reviewDate: '2024-10-05',  // October 5, 2024
  },
  {
    title: 'Concept Approved',
    subtitle: 'Phase 1: Conceptualization',
    side: 'left',
    desc: 'The design and materials for the electric train have been approved by the team.',
    color: 'green',
    icon: 'done_all',
    status: 'Completed',
    reviewDate: '2024-10-10',  // October 10, 2024
  },
  {
    title: 'Building the Train Chassis',
    subtitle: 'Phase 2: Construction',
    side: 'right',
    desc: 'Started constructing the chassis of the toy train, focusing on durability and aesthetics.',
    color: 'blue',
    icon: 'build',
    status: 'Ongoing',
    reviewDate: '2024-10-12',  // October 12, 2024
  },
  {
    title: 'Wiring and Circuit Setup',
    subtitle: 'Phase 2: Construction',
    side: 'right',
    desc: 'Completed the wiring process, ensuring the battery and motor are connected for smooth operation.',
    color: 'green',
    icon: 'electric_bolt',
    status: 'Completed',
    reviewDate: '2024-10-15',  // October 15, 2024
  },
  {
    title: 'Battery and Motor Testing',
    subtitle: 'Phase 3: Testing',
    side: 'left',
    desc: 'Testing the battery-motor connection to verify the power supply and motor speed control.',
    color: 'blue',
    icon: 'bolt',
    status: 'Ongoing',
    reviewDate: '2024-10-18',  // October 18, 2024
  },
  {
    title: 'Motor Overheating Issue',
    subtitle: 'Phase 3: Testing',
    side: 'left',
    desc: 'Encountered an issue with motor overheating after prolonged use. Investigating solutions.',
    color: 'red',
    icon: 'warning',
    status: 'Stuck',
    reviewDate: '2024-10-20',  // October 20, 2024
  },
  {
    title: 'Safety Testing Passed',
    subtitle: 'Phase 3: Testing',
    side: 'left',
    desc: 'All safety checks passed, ensuring the toy train is safe for children to play with.',
    color: 'green',
    icon: 'verified',
    status: 'Completed',
    reviewDate: '2024-10-22',  // October 22, 2024
  },
  {
    title: 'Assembly and Finishing Touches',
    subtitle: 'Phase 4: Assembly',
    side: 'right',
    desc: 'Assembling all the parts and applying final touches such as painting and detailing.',
    color: 'blue',
    icon: 'build_circle',
    status: 'Ongoing',
    reviewDate: '2024-10-24',  // October 24, 2024
  },
  {
    title: 'Final Packaging for Delivery',
    subtitle: 'Phase 4: Assembly',
    side: 'right',
    desc: 'Preparing the toy train for packaging and delivery to retailers.',
    color: 'blue',
    icon: 'local_shipping',
    status: 'Ongoing',
    reviewDate: '2024-10-26',  // October 26, 2024
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
    projectImages: [toyJet1, toyJet2, studentCar3, studentCar4],
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
    projectImages: [toyTrain1, studentImage2, studentImage7, studentImage13],
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
    projectImages: [toyTrain2, studentImage4, studentImage9, studentImage7, studentImage2, studentImage5, studentImage12, studentImage6, studentImage8],
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

const flattenedReviews = projectData.flatMap(project => {
  return project.projectReviews.reverse().map(projectReview => ({
    ...projectReview,
    projectName: project.projectName,
    projectMilestone: projectReview.subtitle,
    studentName: project.student,
    status: projectReview.status,
    finalStatus: projectReview.status,
    dateGenerated: project.createdDate,
    ageGroup: project.ageGroup,
    institution: project.institution
  }));
});

const reviewColumns = [
  {
    name: "Project",
    label: "Project",
    field: "projectName",
    sortable: true,
    align: "left"
  },
  {
    name: "Milestone",
    label: "Project Miletone",
    field: "projectMilestone",
    sortable: true,
    align: "left"
  },
  {
    name: "studentName",
    label: "Student",
    field: "studentName",
    sortable: true,
    align: "left"
  },
  {
    name: "Review",
    label: "Review Remarks",
    field: "title",
    sortable: true,
    align: "left"
  },
  {
    name: "Status",
    label: "Completion Status",
    field: "status",
    sortable: true,
    align: "left"
  },
  {
    name: "ReviewDate",
    label: "Review Date",
    field: "reviewDate",
    sortable: true,
    align: "left"
  }
]

export default defineComponent({
  name: "Dashboard2",
  components: {ECharts},
  setup() {
    const counters = ref({
      projects: 0,
      cancelled: 0,
      completed: 0,
      students: 0
    })

    const targetNumbers = {
      projects: 900,
      cancelled: 10,
      completed: 800,
      students: 720
    }

    const formatNumber = (num) => {
      if (num === undefined || num === null) return '0'
      return Math.round(num).toLocaleString()
    }

    const startCounter = (key, endValue, duration = 2000) => {
      const startValue = 0
      const startTime = Date.now()

      const animate = () => {
        const currentTime = Date.now()
        const elapsed = currentTime - startTime

        if (elapsed < duration) {
          const progress = elapsed / duration
          const easeProgress = 1 - Math.pow(1 - progress, 2)
          const currentValue = startValue + (endValue - startValue) * easeProgress

          counters.value[key] = currentValue
          requestAnimationFrame(animate)
        } else {
          counters.value[key] = endValue
        }
      }

      animate()
    }

    onMounted(() => {
      Object.keys(targetNumbers).forEach(key => {
        counters.value[key] = 0
      })

      Object.entries(targetNumbers).forEach(([key, value], index) => {
        setTimeout(() => {
          startCounter(key, value, 2000)
        }, index * 200)
      })
    })

    const getProgressColor = (progress) => {
      if (progress >= 75) return 'positive'
      if (progress >= 50) return 'warning'
      return 'negative'
    }

    projectData.forEach(project => {
      project.activeSlide = 0
    })

    const slide1 = ref(1)
    const slide2 = ref(1)
    const slide3 = ref(1)

    const handleImageError = (err) => {
      console.error('Image failed to load:', err)
    }

    console.log('Image paths:', {
      toyTrain1,
      toyTrain2,
      toyJet1,
      toyJet2,
      studentCar1,
      studentCar2
    })

    return {
      slide: ref(1),
      tab: ref("contact"),
      messages,
      contacts,
      flattenedReviews,
      reviewColumns,
      salesOption:{
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderColor: 'rgba(255, 255, 255, 0.3)',
          borderWidth: 1,
          padding: [12, 16],
          textStyle: {
            color: '#2c3e50',
            fontSize: 13
          },
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          extraCssText: 'backdrop-filter: blur(10px); border-radius: 12px;'
        },
        grid: {
          left: "3%",
          right: "3%",
          top: "5%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: ["2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"]
          }
        ],
        yAxis: [
          {
            type: "value",
            splitLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: "In Progress",
            type: "bar",
            data: [40, 45, 27, 50, 32, 50, 70, 30, 30, 40, 67, 29],
            itemStyle: {
              borderRadius: [4, 4, 0, 0],
              color: {
                type: 'linear',
                x: 0, y: 0, x2: 0, y2: 1,
                colorStops: [
                  {offset: 0, color: '#12c2e9'},
                  {offset: 0.5, color: '#c471ed'},
                  {offset: 1, color: '#f64f59'}
                ]
              }
            }
          },
          {
            name: "Completed",
            type: "bar",
            data: [124, 100, 20, 120, 117, 70, 110, 90, 50, 90, 20, 50],
            color: "#3a9688"
          },
          {
            name: "On Hold",
            type: "bar",
            data: [17, 2, 0, 29, 20, 10, 23, 0, 8, 20, 11, 30],
            color: "#F44336"
          },
          {
            name: "Not Started",
            type: "bar",
            data: [20, 100, 80, 14, 90, 86, 100, 70, 120, 50, 30, 60],
            color: "#f88c2b"
          }
        ]
      },
      pieOptions:{
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderColor: 'rgba(255, 255, 255, 0.3)',
          borderWidth: 1,
          padding: [12, 16],
          textStyle: {
            color: '#2c3e50',
            fontSize: 13
          },
          extraCssText: 'backdrop-filter: blur(10px); border-radius: 12px;'
        },
        series: [{
          type: 'pie',
          radius: ['55%', '70%'],
          avoidLabelOverlap: true,
          itemStyle: {
            borderRadius: 10,
            borderColor: 'rgba(255, 255, 255, 0.5)',
            borderWidth: 2
          },
          label: {
            show: true,
            position: 'outside',
            fontSize: 14,
            fontWeight: 500,
            formatter: '{b}: {d}%'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 16,
              fontWeight: 'bold'
            },
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          data: [
            {
              value: 335,
              name: 'In Progress',
              itemStyle: {
                color: {
                  type: 'linear',
                  x: 0, y: 0, x2: 1, y2: 1,
                  colorStops: [
                    {offset: 0, color: '#12c2e9'},
                    {offset: 0.5, color: '#c471ed'},
                    {offset: 1, color: '#f64f59'}
                  ]
                }
              }
            },
            {
              value: 480,
              name: 'Completed',
              itemStyle: {
                color: {
                  type: 'linear',
                  x: 0, y: 0, x2: 1, y2: 1,
                  colorStops: [
                    {offset: 0, color: '#84fab0'},
                    {offset: 0.5, color: '#8fd3f4'},
                    {offset: 1, color: '#42e695'}
                  ]
                }
              }
            },
            {
              value: 300,
              name: 'Not Started',
              itemStyle: {
                color: {
                  type: 'linear',
                  x: 0, y: 0, x2: 1, y2: 1,
                  colorStops: [
                    {offset: 0, color: '#f6d365'},
                    {offset: 0.5, color: '#fda085'},
                    {offset: 1, color: '#fbc2eb'}
                  ]
                }
              }
            },
            {
              value: 220,
              name: 'On Hold',
              itemStyle: {
                color: {
                  type: 'linear',
                  x: 0, y: 0, x2: 1, y2: 1,
                  colorStops: [
                    {offset: 0, color: '#ff6b6b'},
                    {offset: 0.5, color: '#ff8e8e'},
                    {offset: 1, color: '#ff4757'}
                  ]
                }
              }
            }
          ]
        }]
      },
      sales_chart:null,
      pie_chart:null,

      getColor(val) {
        if (val > 70 && val <= 100) {
          return "green";
        } else if (val > 50 && val <= 70) {
          return "blue";
        }
        return "red";
      },
      getChipColor(status) {
        if (status == "Stuck") {
          return "negative";
        } else if (status == "Ongoing") {
          return "info";
        } else if (status == "Completed") {
          return "positive";
        } else {
          return "dark";
        }
      },
      formatNumber,
      counters,
      getProgressColor,
      projectData,
      slide1,
      slide2,
      slide3,
      handleImageError,
      toyJet1,
      toyJet2,
      toyTrain1,
      toyTrain2,
      studentCar1,
      studentCar2
    }
  },
})
</script>

<style scoped>
@media (min-width: 768px) {

}

@media (max-width: 568px) {
  /* Hide table and charts on smaller screens */
  .dashboard-charts, .dashboard-reviews {
    display: none;
  }
  /* Add vertical spacing between cards on smaller screens */
  .card-spacing {
    margin-bottom: 20px;
  }

  .row {
    display: flex;
    gap: 16px; /* Adjust this value as needed */
    flex-wrap: wrap;
  }

}
  .box_1 {
    color: #0dceec;
  }

  .box_2 {
    color: #fe434f;
  }

  .box_3 {
    color: #15ca20;
  }

  .box_4 {
    color: #ff9700;
  }

  .shadow {
    -webkit-box-shadow: 0 0 10px #bfbfbf !important;
    box-shadow: 0 0 10px #bfbfbf !important;
  }

  .progress-base {
    height: 8px;
    border-radius: 3px;
    background-color: #e9ecef;
  }

  .progress-bar-1 {
    height: 8px;
    border-radius: 3px;
    background: #17ead9;
    background: -webkit-linear-gradient(45deg, #17ead9, #6078ea) !important;
    background: linear-gradient(45deg, #17ead9, #6078ea) !important;
  }

  .progress-bar-2 {
    height: 8px;
    border-radius: 3px;
    background: #f54ea2;
    background: -webkit-linear-gradient(45deg, #f54ea2, #ff7676) !important;
    background: linear-gradient(45deg, #f54ea2, #ff7676) !important;
  }

  .progress-bar-3 {
    height: 8px;
    border-radius: 3px;
    background: #42e695;
    background: -webkit-linear-gradient(45deg, #42e695, #3bb2b8) !important;
    background: linear-gradient(45deg, #42e695, #3bb2b8) !important;
  }

  .progress-bar-4 {
    height: 8px;
    border-radius: 3px;
    background: #ffdf40;
    background: -webkit-linear-gradient(45deg, #ffdf40, #ff8359) !important;
    background: linear-gradient(45deg, #ffdf40, #ff8359) !important;
  }

  .border-top {
    border-top: 1px solid #efefef;
  }

  .chip_pending {
    background: #ffdf40;
    background: -webkit-linear-gradient(45deg, #ffdf40, #ff8359) !important;
    background: linear-gradient(45deg, #ffdf40, #ff8359) !important;
  }

  .chip_completed {
    background: #42e695;
    background: -webkit-linear-gradient(45deg, #42e695, #3bb2b8) !important;
    background: linear-gradient(45deg, #42e695, #3bb2b8) !important;
  }

  /* Enhanced Card Styling */
  .q-card {
    transition: all 0.3s ease;
    border-radius: 12px !important;
  }

  .q-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12) !important;
  }

  /* Enhanced Stats Cards */
  .box_1, .box_2, .box_3, .box_4 {
    transition: all 0.3s ease;
  }

  .card-spacing {
    padding: 12px;
  }

  .text-h4 {
    font-weight: 600 !important;
    background: linear-gradient(45deg, #2c3e50, #3498db);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  /* Enhanced Progress Bars */
  .progress-base {
    height: 10px;
    border-radius: 5px;
    background-color: rgba(233, 236, 239, 0.3);
    overflow: hidden;
  }

  .progress-bar-1 {
    height: 10px;
    border-radius: 5px;
    background: linear-gradient(45deg, #00c6fb, #005bea) !important;
    transition: width 0.8s ease-in-out;
  }

  .progress-bar-2 {
    height: 10px;
    border-radius: 5px;
    background: linear-gradient(45deg, #f6d365, #fda085) !important;
    transition: width 0.8s ease-in-out;
  }

  .progress-bar-3 {
    height: 10px;
    border-radius: 5px;
    background: linear-gradient(45deg, #84fab0, #8fd3f4) !important;
    transition: width 0.8s ease-in-out;
  }

  .progress-bar-4 {
    height: 10px;
    border-radius: 5px;
    background: linear-gradient(45deg, #a18cd1, #fbc2eb) !important;
    transition: width 0.8s ease-in-out;
  }

  /* Enhanced Charts Container */
  .dashboard-charts {
    padding: 20px;
    background: linear-gradient(to right, rgba(255,255,255,0.8), rgba(255,255,255,0.9));
    backdrop-filter: blur(10px);
  }

  /* Enhanced Table Styling */
  .q-table {
    border-radius: 12px;
    overflow: hidden;
  }

  .q-table th {
    font-weight: 600;
    background: linear-gradient(45deg, #f6f8fa, #f1f4f6) !important;
    color: #2c3e50 !important;
  }

  .q-table tr:hover {
    background: rgba(0,0,0,0.02) !important;
  }

  /* Enhanced Chips */
  .q-chip {
    font-weight: 500;
    letter-spacing: 0.5px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  /* Dark Mode Adjustments */
  .body--dark {
    .q-card {
      background: linear-gradient(45deg, #1a1a1a, #2d2d2d);
    }

    .text-h4 {
      background: linear-gradient(45deg, #ecf0f1, #bdc3c7);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .dashboard-charts {
      background: linear-gradient(to right, rgba(30,30,30,0.8), rgba(40,40,40,0.9));
    }

    .q-table th {
      background: linear-gradient(45deg, #2c3e50, #34495e) !important;
      color: #ecf0f1 !important;
    }
  }

  /* Responsive Adjustments */
  @media (max-width: 768px) {
    .card-spacing {
      padding: 8px;
    }

    .text-h4 {
      font-size: 1.8rem;
    }
  }

  .text-h4 {
    transition: all 0.1s ease-out;
    animation: numberPop 0.5s ease-out;
  }

  @keyframes numberPop {
    0% {
      transform: scale(0.8);
      opacity: 0;
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  .project-card {
    transition: transform 0.2s;
  }

  .project-card:hover {
    transform: translateY(-5px);
  }

  .project-card .q-carousel {
    background-color: #f5f5f5;
  }

  .project-card .q-carousel__slide {
    padding: 0;
  }

  .stats-card {
    transition: all 0.3s ease;
    border-radius: 12px;
    overflow: hidden;
  }

  .stats-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.1);
  }

  .stats-header {
    padding: 20px;
    background-image: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 100%);
  }

  .stats-content {
    padding: 20px;
    background-color: white;
  }

  :root[data-theme="dark"] .stats-content {
    background-color: rgba(255, 255, 255, 0.05);
  }

  .stats-card .text-h4 {
    font-weight: 700;
    letter-spacing: 1px;
    animation: numberPop 0.5s ease-out;
  }

  .stats-card .q-linear-progress {
    opacity: 0.8;
    transition: all 0.3s ease;
  }

  .stats-card:hover .q-linear-progress {
    opacity: 1;
    transform: scaleY(1.2);
  }

  .stat-card {
    border-radius: 12px;
    transition: all 0.3s ease;
    border: 1px solid rgba(0, 0, 0, 0.06);
  }

  .stat-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  }

  .icon-wrapper {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .text-h4 {
    font-weight: 600;
    font-size: 1.8rem;
    line-height: 1.2;
    color: #2c3e50;
  }

  /* Dark mode adjustments */
  :root[data-theme="dark"] .stat-card {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.1);
  }

  :root[data-theme="dark"] .text-h4 {
    color: #ecf0f1;
  }

  :root[data-theme="dark"] .icon-wrapper {
    background: rgba(255, 255, 255, 0.1);
  }

  /* Add these new styles */
  .video-container {
    position: relative;
    width: 100%;
    height: 200px;
    overflow: hidden;
    border-radius: 12px 12px 0 0;
  }

  .video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }

  .project-card {
    transition: transform 0.2s;
    border-radius: 12px;
    overflow: hidden;
  }

  .project-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  }
</style>
