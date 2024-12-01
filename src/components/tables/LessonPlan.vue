<template>
  <div class="container">
    <q-page class="q-pa-md">
      <q-card flat bordered class="q-pa-md q-mt-lg">
        <!-- Header section with logo on the left and address on the right -->
        <div class="header-section row justify-between items-center">
          <div>
            <img src="../../assets/wokober-logo.png" alt="Your Logo" class="logo" />
          </div>

          <div class="text-right address">
            <div>Wokober Foundation</div>
            <div>P.O Box 360106, Gulu</div>
            <div>Tel: (+256) 784041804</div>
            <div>Email: <a href="mailto:info@wokober.com">info@wokober.com</a></div>
            <div>Website: <a href="https://www.wokober.com/" target="_blank">www.wokober.com</a></div>
          </div>
        </div>

        <!-- Three horizontal lines (black, yellow, red) -->
        <div class="horizontal-lines q-mt-sm">
          <div class="line black"></div>
          <div class="line yellow"></div>
          <div class="line red"></div>
        </div>

        <!-- Lesson Plan Title -->
        <div class="text-center q-mt-sm lesson-plan-title">
          <span>LESSON PLAN FOR WOKOBER TOY-MAKING MENTORSHIP</span>
        </div>

        <!-- Table For Generic Info -->
        <div class="q-mt-md">
          <table class="info-table">
            <tbody>
              <tr>
                <th>Institution</th>
                <td>
                  <template v-if="isEditing">
                    <input type="text" v-model="projectInfo.institution" placeholder="Enter institution" />
                  </template>
                  <template v-else>
                    <span>Wokober Foundation</span>
                  </template>
                </td>
                <th>Age Group</th>
                <td>
                  <template v-if="isEditing">
                    <input type="text" v-model="projectInfo.ageGroup" placeholder="Enter age group" />
                  </template>
                  <template v-else>
                    <span>{{ projectInfo.ageGroup }}</span>
                  </template>
                </td>
              </tr>
              <tr>
                <th>Project</th>
                <td>
                  <template v-if="isEditing">
                    <input type="text" v-model="projectInfo.projectName" placeholder="Enter project name" />
                  </template>
                  <template v-else>
                    <span>{{ projectInfo.projectName }}</span>
                  </template>
                </td>
                <th>Gender</th>
                <td>
                  <template v-if="isEditing">
                    <input type="text" v-model="projectInfo.gender" placeholder="Enter gender" />
                  </template>
                  <template v-else>
                    <span>{{ projectInfo.gender }}</span>
                  </template>
                </td>
              </tr>
              <tr>
                <th>Milestone</th>
                <td>
                  <template v-if="isEditing">
                    <input type="text" v-model="projectInfo.projectMilestones[0]" placeholder="Enter milestone" />
                  </template>
                  <template v-else>
                    <span>{{ projectInfo.projectMilestones[0].title }}</span>
                  </template>
                </td>
                <th>Date</th>
                <td>
                  <template v-if="isEditing">
                    <input type="date" v-model="projectInfo.date" placeholder="Enter date" />
                  </template>
                  <template v-else>
                    <span>{{ projectInfo.date }}</span>
                  </template>
                </td>
              </tr>
              <tr>
                <th>Facilitator</th>
                <td>
                  <template v-if="isEditing">
                    <input type="text" v-model="projectInfo.facilitator" placeholder="Enter facilitator" />
                  </template>
                  <template v-else>
                    <span>{{ projectInfo.facilitator }}</span>
                  </template>
                </td>
                <th>Time</th>
                <td>
                  <template v-if="isEditing">
                    <input type="time" v-model="projectInfo.time" placeholder="Enter time" />
                  </template>
                  <template v-else>
                    <span>{{ projectInfo.time }}</span>
                  </template>
                </td>
              </tr>
              <tr>
                <th>Student</th>
                <td>
                  <template v-if="isEditing">
                    <input type="text" v-model="projectInfo.student" placeholder="Enter student" />
                  </template>
                  <template v-else>
                    <span>{{ projectInfo.student }}</span>
                  </template>
                </td>
                <th>Duration</th>
                <td>
                  <template v-if="isEditing">
                    <input type="text" v-model="projectInfo.duration" placeholder="Enter duration" />
                  </template>
                  <template v-else>
                    <span>{{ projectInfo.duration }}</span>
                  </template>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Table For Lesson Plan Target Info -->
        <div class="q-mt-md">
          <table class="info-table">
            <tbody>
              <tr>
                <th>Theme</th>
                <td>
                  <template v-if="isEditing">
                    <input type="text" v-model="lessonPlan.theme" placeholder="Enter theme" />
                  </template>
                  <template v-else>
                    <span>{{ lessonPlan.theme }}</span>
                  </template>
                </td>
                <th>Topic</th>
                <td>
                  <template v-if="isEditing">
                    <input type="text" v-model="lessonPlan.topic" placeholder="Enter topic" />
                  </template>
                  <template v-else>
                    <span>{{ lessonPlan.topic }}</span>
                  </template>
                </td>
              </tr>
              <tr>
                <th>Competency</th>
                <td>
                  <template v-if="isEditing">
                    <input type="text" v-model="lessonPlan.competency" placeholder="Enter competency" />
                  </template>
                  <template v-else>
                    <span>{{ lessonPlan.competency }}</span>
                  </template>
                </td>
                <th>Learning Outcome(s)</th>
                <td>
                  <template v-if="isEditing">
                    <input type="text" v-model="lessonPlan.learningOutcomes" placeholder="Enter learning outcomes" />
                  </template>
                  <template v-else>
                    <span>{{ lessonPlan.learningOutcomes }}</span>
                  </template>
                </td>
              </tr>
              <tr>
                <th>Generic Skill(s)</th>
                <td>
                  <template v-if="isEditing">
                    <input type="text" v-model="lessonPlan.genericSkills" placeholder="Enter generic skills" />
                  </template>
                  <template v-else>
                    <span>{{ lessonPlan.genericSkills }}</span>
                  </template>
                </td>
                <th>Value(s)</th>
                <td>
                  <template v-if="isEditing">
                    <input type="text" v-model="lessonPlan.values" placeholder="Enter values" />
                  </template>
                  <template v-else>
                    <span>{{ lessonPlan.values }}</span>
                  </template>
                </td>
              </tr>
              <tr>
                <th>Cross-cutting Issue(s)</th>
                <td>
                  <template v-if="isEditing">
                    <input type="text" v-model="lessonPlan.crossCuttingIssues" placeholder="Enter cross-cutting issues" />
                  </template>
                  <template v-else>
                    <span>{{ lessonPlan.crossCuttingIssues }}</span>
                  </template>
                </td>
                <th>Key Learning Outcome(s)</th>
                <td>
                  <template v-if="isEditing">
                    <input type="text" v-model="lessonPlan.keyLearningOutcomes" placeholder="Enter key learning outcomes" />
                  </template>
                  <template v-else>
                    <span>{{ lessonPlan.keyLearningOutcomes }}</span>
                  </template>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Table For Activities For Learning -->
        <div class="q-mt-md">
          <table class="editable-table">
            <thead>
              <tr>
                <th>Mentor Activity</th>
                <th>Student Activity</th>
                <th>Duration (Hours)</th>
                <th v-if="isEditing">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(activity, index) in activities" :key="index">
                <td>
                  <template v-if="isEditing">
                    <input
                      type="text"
                      v-model="activity.mentorActivity"
                      placeholder="Enter mentor activity"
                    />
                  </template>
                  <template v-else>
                    <span>{{ activity.mentorActivity }}</span>
                  </template>
                </td>
                <td>
                  <template v-if="isEditing">
                    <input
                      type="text"
                      v-model="activity.studentActivity"
                      placeholder="Enter student activity"
                    />
                  </template>
                  <template v-else>
                    <span>{{ activity.studentActivity }}</span>
                  </template>
                </td>
                <td class="number-cell">
                  <template v-if="isEditing">
                    <input
                      type="number"
                      v-model="activity.duration"
                      min="0"
                      placeholder="Hours"
                    />
                  </template>
                  <template v-else>
                    <span>{{ activity.duration !== null ? activity.duration : '' }}</span>
                  </template>
                </td>
                <td v-if="isEditing">
                  <q-btn icon="remove" @click="removeActivity(index)" color="negative" round dense />
                </td>
              </tr>
            </tbody>
          </table>
          <q-btn v-if="isEditing" icon="add" @click="addActivity" color="primary" round class="add-button" />
        </div>

        <!-- Facilitator Self Assessment -->
        <div class="text-left q-mt-sm self-assessment-header">
          Facilitator Self Assessment:
        </div>
        <div class="self-assessment">
          <template v-if="isEditing">
            <textarea
              v-model="activitiesSelfAssessment"
              placeholder="Facilitator Self Assessment"
              rows="3"
              :class="isEditing? 'editing-textarea': ''"
            />
          </template>
          <template v-else>
            <div v-if="!activitiesSelfAssessment">
              <div class="underline"></div>
              <div class="underline"></div>
              <div class="underline"></div>
            </div>
            <div v-else>
              <p v-for="(line, index) in activitiesSelfAssessment.split('\n')" :key="index">
                {{ line }}
                <span class="underline"></span>
              </p>
            </div>
          </template>
        </div>

        <q-card-section>
          <div class="text-center">
            <q-btn
              label="Cancel"
              icon="cancel"
              color="primary"
              @click="toggleLessonPlanModal"
              class="q-mt-md q-mr-md"
            />
            <q-btn
              :icon="isEditing ? 'done' : 'edit'"
              :label="isEditing ? 'Done' : 'Edit Mode'"
              @click="toggleEditMode"
              color="secondary"
              class="q-mt-md q-mr-md"
            />
            <q-btn
              label="Save Plan"
              icon="send"
              @click="submitLessonPlan"
              class="q-mt-md next-button"
            />
          </div>
        </q-card-section>

      </q-card>
    </q-page>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: "LessonPlan",
  props: {
    projectInfo: {
      type: Object,
      required: true
    },
    submitLessonPlan: {
      type: Function,
      required: true,
    },
    toggleLessonPlanModal: {
      type: Function,
      required: true,
    }
  },
  setup(props) {
    console.log("Received projectInfo:: ", props.projectInfo)
    const lessonPlan = ref({
      theme: '',
      topic: '',
      competency: '',
      learningOutcomes: '',
      genericSkills: '',
      values: '',
      crossCuttingIssues: '',
      keyLearningOutcomes: '',
      selfAssessment: 'This lesson plan helped me recognize the importance of structured mentorship in toy-making. I successfully implemented activities that promoted hands-on learning, fostering student engagement and creativity. However, I encountered challenges in time management, leading to rushed conclusions. .'
    });

    const isEditing = ref(false);
    const activitiesSelfAssessment = ref('This lesson plan helped me recognize the importance of structured mentorship in toy-making. I successfully implemented activities that promoted hands-on learning, fostering student engagement and creativity. However, I encountered challenges in time management, leading to rushed conclusions. .');
    const activities = ref([
      { mentorActivity: '', studentActivity: '', duration: null },
      { mentorActivity: '', studentActivity: '', duration: null },
      { mentorActivity: '', studentActivity: '', duration: null }
    ]);

    const addActivity = () => {
      activities.value.push({ mentorActivity: '', studentActivity: '', duration: null });
    };

    const removeActivity = (index) => {
      if (activities.value.length > 1) {
        activities.value.splice(index, 1);
      }
    };

    const toggleEditMode = () => {
      isEditing.value = !isEditing.value;
    };

    return {
      lessonPlan,
      isEditing,
      activities,
      addActivity,
      removeActivity,
      toggleEditMode,
      activitiesSelfAssessment
    };
  }
};
</script>

<style scoped>

@media (max-width: 568px) {
  .container {
    min-width: 420px !important;
  }
  .lesson-plan-title {
    font-size: smaller !important;
  }
}

.lesson-plan-title {
  margin-bottom: 0.5rem; /* Adjust margin-bottom */
  font-size: large;
  font-weight: bold;
}

.self-assessment-text {
  padding: 2px;
}

.underline {
  border-bottom: 1px dotted #666;
  padding-bottom: 4px;
  margin-bottom: 8px;
  display: block; /* Change from flex to block */
}

.underline span {
  display: block; /* Make spans display as blocks */
  width: 100%; /* Make spans full width */
  border-bottom: 1px dotted #666;
}

.self-assessment-header {
  font-weight: bold;
  font-size: 16px; /* Adjust font size */
}

.editing-textarea {
  width: 100%;
  padding-left:30px;
  font-family: inherit;
  background-size: 100% 20px;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
}


.logo {
  width: 150px;
  height: auto;
}

.address {
  text-align: right;
  line-height: 1.5;
}

.q-card {
  max-width: 800px;
  margin: 0 auto;
}

h6 {
  font-weight: bold;
  margin-top: 0;
}

.horizontal-lines {
  display: flex;
  flex-direction: column;
  margin-bottom: 0;
}

.line {
  height: 5px;
}

.black {
  background-color: black;
}

.yellow {
  background-color: yellow;
}

.red {
  background-color: red;
}

.container {
  min-width: 800px;
}

/* Info Table Styles */
.info-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 8px;
}

.info-table th,
.info-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.info-table th {
  background-color: #f2f2f2;
  font-weight: bold;
  width: 150px; /* Optional: Set a fixed width for headers */
}

.info-table td {
  vertical-align: top; /* Align cell contents at the top */
}

/* Editable Table Styles */
.editable-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
}

.editable-table th,
.editable-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.editable-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.editable-table input {
  width: 100%;
  padding: 6px;
  box-sizing: border-box;
}

.number-cell {
  text-align: center;
}

.add-button {
  margin-top: 8px;
}

.next-button,
.card-header {
  background: linear-gradient(to right, #1B00FF, #030F65);
  color: white;
}

.editable-table td span {
  display: inline-block; /* Ensure spans take width */
  padding: 6px; /* Optional: Add padding for better visual spacing */
  min-width: 100px; /* Ensure a minimum width for alignment */
}

</style>
