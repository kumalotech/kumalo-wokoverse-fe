<template>
  <q-card class="no-shadow">
    <q-card-section class="header-section q-pb-none">
      <div class="flex-between align-center">
        <div v-if="isStepperVisible" class="text-h6 text-grey-8">Enroll Learner</div>
        <div v-else class="text-h6 text-grey-8"></div>
        <div class="action-buttons">
          <q-input
            v-if="!isStepperVisible"
            filled
            dense
            debounce="300"
            v-model="searchQuery"
            placeholder="Search Learners..."
            class="q-mr-md search-input"
            :clearable="true"
          >
            <template v-slot:append>
              <q-icon name="search" class="cursor-pointer" @click="performSearch" />
            </template>
          </q-input>
          <q-btn
            :label="isStepperVisible ? 'Cancel Enrollment' : 'Enroll Learner'"
            :icon="isStepperVisible ? 'close' : 'add'"
            class="q-mr-md add-new-btn"
            @click="toggleStepper"
            dense
          />
          <q-btn
            label="Export to Excel"
            icon="save"
            class="export-btn"
            @click="exportToExcel"
          />
        </div>
      </div>
    </q-card-section>
    <q-separator v-if="isStepperVisible && !selectedLearner"/>

    <!-- Stepper Section -->
    <div v-if="isStepperVisible && !selectedLearner" class="stepper-container styled-card">
      <q-stepper v-model="step" class="no-shadow form-styles" vertical>
        <q-step name="basic-info" title="Basic Info" :done="step > 2">
          <LearnersBasicInfo
            :learnersInfo="data"
            @next="setStep('parents-info')"
          />
        </q-step>

        <q-step name="parents-info" title="Parents Info" :done="step > 2">
          <LearnerParentInfo
            :parentInfo="learnersParentInfo"
            @next="setStep('academic-info')"
            @back="setStep('basic-info')"
          />
        </q-step>

        <q-step name="academic-info" title="Academic Background" :done="step > 2">
          <LearnerAcademicInfo
            :nurserySchools="nurserySchools"
            :primarySchools="primarySchools"
            :secondarySchools="secondarySchools"
            :tertiarySchools="tertiarySchools"
            @updateSchools="handleSchoolUpdate"
            @next="setStep('project-info')"
            @back="setStep('parents-info')"
          />
        </q-step>

        <q-step name="project-info" title="Project Info" :done="step > 3">
          <LearnerProjectInfo
            :projectInfo="projectInfo"
            :addMilestone="addMilestone"
            :removeMilestone="removeMilestone"
            :isStep="true"
            @submit="submitLearnerInfo"
            @back="setStep('academic-info')"
          />
        </q-step>
      </q-stepper>
    </div>

    <!-- Enrolled Learners Section -->
     <div v-if="!selectedLearner">
      <div v-if="!isSmallScreen || (!isSmallScreen && !isStepperVisible)" class="flex-between align-center text-enrol">
        <div v-if="!isSmallScreen || (!isSmallScreen && !isStepperVisible)" class="text-h6 text-grey-8">Enrolled Learners</div>
      </div>
      <q-separator v-if="!isSmallScreen || (isSmallScreen && !isStepperVisible)" class="learners-view"/>
      <div v-if="!isSmallScreen || (isSmallScreen && !isStepperVisible)" class="scrollable-content learners-view">
        <q-card-section class="q-pa-none learnerss">
          <q-table
            grid
            :rows="paginatedData"
            :columns="columns"
            :pagination.sync="pagination"
            :rows-per-page-options="[6, 9, 12, 15, 18, 21]"
            rows-per-page-label="Learners Per Page"
          >
            <template v-slot:item="props">
              <div class="q-pa-sm" @click="showLearnerDetails(props.row)">
                <q-card class="learners-profile-card">
                  <q-card-section class="q-pa-none learners-profile-img">
                    <q-img
                      :src="props.row.profilePictureUrl"
                      alt="Learner Avatar"
                      class="img-fluid rounded full-card-image"
                    />
                    <div class="learner-details">
                      <div class="text-h6">{{ props.row.fullName }}</div>
                      <div class="text-caption">
                        <q-icon name="interests" size="xs" />
                        Interests: {{ props.row.interests || 'Programming, Design' }}
                      </div>
                      <div class="text-caption">
                        <q-icon name="event" size="xs" />
                        Date Of Birth: {{ props.row.dateOfBirth }}
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </template>
          </q-table>
        </q-card-section>
      </div>
    </div>

    <!-- Learner Details Section -->
    <learner-details v-if="selectedLearner" :learner="selectedLearner" @back="clearSelection" />
  </q-card>
</template>


<script>
import { defineComponent, ref, computed } from 'vue';
import { QAvatar, QCard, QCardSection, QLinearProgress, QStepper, QStep } from 'quasar';
import LearnersBasicInfo from '../../pages/LearnerBasicInfo.vue';
import LearnerParentInfo from '../../pages/LearnersParentInfo.vue';
import LearnerAcademicInfo from '../../pages/LearnerAcademicInfo.vue';
import LearnerProjectInfo from "../../pages/LearnersProjectInfo.vue";
import LearnerDetails from './LearnerDetails.vue';

export default defineComponent({
  name: 'Learners',
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  components: {
    QAvatar, QCard, QCardSection, QLinearProgress,
    QStepper, QStep, LearnersBasicInfo, LearnerParentInfo,
    LearnerAcademicInfo, LearnerProjectInfo, LearnerDetails
  },
  setup(props) {
    const searchQuery = ref('');
    const isStepperVisible = ref(false);
    const step = ref("basic-info");
    const selectedLearner = ref(null)

    // Parent Info
    const learnersParentInfo = ref({
      fullName: '',
      relationship: '',
      contactNumber: '',
      email: '',
      occupation: '',
      workplace: '',
      workAddress: '',
      bestTimeToContact: '',
      secondaryContact: '',
    });

    // Academic Info: Initialize school-related data
    const nurserySchools = ref([]);
    const primarySchools = ref([]);
    const secondarySchools = ref([]);
    const tertiarySchools = ref([]);

    // Project Info
    const projectInfo = ref({
        projectTitle: "My Awesome Project",
        projectDescription: "This project aims to solve XYZ problem.",
        projectStartDate: "2024-01-01",
        projectEndDate: "2024-12-31",
        projectSupervisor: ["Ben Wokorach", "Morris Opiyo"],
        projectObjectives: "To achieve ABC outcomes.",
        toolsResources: "Tools include A, B, and C.",
        projectDeliverables: "Deliverables will be D and E.",
        estimatedBudget: 5000,
        projectMilestones: [
          { name: "Milestone 1", description: "Description of milestone 1." },
          { name: "Milestone 2", description: "Description of milestone 2." }
        ]
      })

    const columns = [
      { name: 'Name', label: 'Name', field: 'name', sortable: true, align: 'left' },
      { name: 'Created Date', label: 'Created Date', field: 'Created_Date', sortable: true, align: 'left' },
      { name: 'Project', label: 'Project', field: 'Project', sortable: true, align: 'left' },
      { name: 'Action', label: '', field: 'Action', sortable: false, align: 'center' }
    ];

    const getProgressColor = (progress) => {
      if (progress >= 80) return 'green';
      if (progress >= 50) return 'blue';
      return 'orange';
    };

    const paginatedData = computed(() => {
      return props.data.filter(learners =>
        learners.fullName.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    function setStep(stepValue) {
      step.value = stepValue;
    }

    const toggleStepper = () => {
      isStepperVisible.value = !isStepperVisible.value;
      if (isStepperVisible.value) {
        step.value = "basic-info";
        clearSelection()
      }
    };

    const submitLearnerInfo = () => {
      isStepperVisible.value = !isStepperVisible.value;
      toggleStepper();
    };

    const exportToExcel = () => {
      console.log('Export to Excel Clicked');
    };

    const addMilestone = () => {
      projectInfo.value.projectMilestones.push({ name: "", description: "" });
    }

    const removeMilestone = (index) =>{
      if (projectInfo.value.projectMilestones.length > 1) {
        projectInfo.value.projectMilestones.splice(index, 1);
      }
    }

    const isSmallScreen = computed(() => {
      return window.innerWidth < 768;
    });

    const showLearnerDetails = (learner) => {
      selectedLearner.value = learner;
    }

    const clearSelection = ()=> {
      selectedLearner.value = null;
    }

    return {
      columns,
      searchQuery,
      getProgressColor,
      paginatedData,
      toggleStepper,
      learnersParentInfo,
      nurserySchools,
      primarySchools,
      secondarySchools,
      tertiarySchools,
      step,
      setStep,
      submitLearnerInfo,
      isStepperVisible,
      projectInfo,
      addMilestone,
      removeMilestone,
      exportToExcel,
      isSmallScreen,
      selectedLearner,
      showLearnerDetails,
      clearSelection
    };
  },
});
</script>


<style scoped>
@media (max-width: 568px) {
  /* Resize buttons */
  .export-btn {
    display: none;
  }

  .add-new-btn {
    font-size: 0.5rem !important; /* Smallest readable font */
    padding: 1px 4px !important; /* Minimal padding */
    min-height: 20px !important; /* Smallest practical height */
    margin-right: 0 !important;

    :deep(.q-btn__content) {
      padding: 0 !important;
    }
  }

  /* Adjust search input size */
  .search-input {
    width: 140px;
  }
}

/* Override default button styles */
.add-new-btn,
.export-btn {
  background: #ffffff;
  color: #64748b;
  border: 2px solid transparent;
  border-radius: 12px;
  padding: 8px 20px;
  font-weight: 600;
  letter-spacing: 0.3px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1;
  min-height: 40px;
}

.add-new-btn:before,
.export-btn:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 100%;
  background: linear-gradient(135deg, #153966, #2563eb);
  transition: 0.5s ease;
  z-index: -1;
}

.add-new-btn:hover,
.export-btn:hover {
  color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(21, 57, 102, 0.15);
  border-color: transparent;
}

.add-new-btn:hover:before,
.export-btn:hover:before {
  width: 100%;
}

.add-new-btn:active,
.export-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(21, 57, 102, 0.1);
}

.add-new-btn :deep(.q-icon),
.export-btn :deep(.q-icon) {
  font-size: 1.2em;
  margin-right: 8px;
  transition: transform 0.3s ease;
}

.add-new-btn:hover :deep(.q-icon),
.export-btn:hover :deep(.q-icon) {
  transform: scale(1.1);
}

.header-section {
  position: sticky;
  top: 0; /* Keep it at the top */
  z-index: 10; /* Ensure it stays above other content */
  background: white; /* Background color to match the card */
}

.stepper-container {
  margin: 20px 0;
  padding: 24px;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
}

:deep(.q-stepper) {
  background: transparent;
  border: none;
}

:deep(.q-stepper__header) {
  box-shadow: none;
}

:deep(.q-stepper__tab) {
  padding: 24px 32px;
  min-height: 72px;
  margin-bottom: 12px;
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  border: 1px solid transparent;
  backdrop-filter: blur(8px);
}

:deep(.q-stepper__label) {
  display: block !important;
}

:deep(.q-stepper__title) {
  font-size: 0.95rem;
  font-weight: 500;
  color: #475569;
  letter-spacing: 0.3px;
  display: block !important;
  margin-bottom: 4px;
  transition: color 0.3s ease;
  text-transform: uppercase;
}

:deep(.q-stepper__caption) {
  color: #64748b;
  font-size: 0.875rem;
  display: block !important;
  opacity: 0.8;
  transition: opacity 0.3s ease;
  font-weight: 400;
  letter-spacing: 0.2px;
}

:deep(.q-stepper__tab--active) {
  background: linear-gradient(145deg, #f8fafc, #ffffff);
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
}

:deep(.q-stepper__tab--active) .q-stepper__title {
  color: #153966;
  font-weight: 600;
  transform: translateX(4px);
  text-shadow: 0 1px 2px rgba(21, 57, 102, 0.1);
}

:deep(.q-stepper__tab--active) .q-stepper__caption {
  opacity: 1;
  transform: translateX(4px);
}

:deep(.q-stepper__tab--active)::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 4px;
  background: linear-gradient(to bottom, #153966, #2563eb);
  border-radius: 4px;
  box-shadow: 0 0 8px rgba(21, 57, 102, 0.2);
}

:deep(.q-stepper__dot) {
  width: 32px;
  height: 32px;
  font-size: 14px;
  background: #e2e8f0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
}

:deep(.q-stepper__dot)::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(145deg, rgba(255,255,255,0.2), transparent);
  border-radius: 50%;
}

:deep(.q-stepper__tab--active) .q-stepper__dot {
  background: linear-gradient(145deg, #153966, #2563eb);
  transform: scale(1.1) rotate(180deg);
  box-shadow:
    0 0 0 4px rgba(21, 57, 102, 0.1),
    0 2px 4px rgba(0, 0, 0, 0.1);
  animation: glowPulse 2s infinite;
}

:deep(.q-stepper__tab--done) .q-stepper__dot {
  background: linear-gradient(145deg, #059669, #10b981);
  box-shadow:
    0 0 0 4px rgba(16, 185, 129, 0.1),
    0 2px 4px rgba(0, 0, 0, 0.1);
  transform: scale(1) rotate(0deg);
}

:deep(.q-stepper__line) {
  display: none;
}

:deep(.q-stepper__tab:hover:not(.q-stepper__tab--active)) {
  background: linear-gradient(145deg, #f8fafc, #ffffff);
  border: 1px solid #e2e8f0;
  transform: translateX(4px) translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

:deep(.q-stepper__step-content) {
  padding: 32px 32px 32px 88px;
  position: relative;
  animation: fadeIn 0.3s ease-in-out;
  background: linear-gradient(to right, rgba(248, 250, 252, 0.5), transparent);
  border-radius: 8px;
}

:deep(.q-stepper__step:not(:last-child)) {
  border-bottom: 1px solid rgba(241, 245, 249, 0.6);
  margin-bottom: 8px;
  padding-bottom: 8px;
}

:deep(.q-stepper__tab:focus) {
  outline: none;
  box-shadow: 0 0 0 2px rgba(21, 57, 102, 0.2);
}

/* Enhanced animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px) scale(0.98);
    filter: blur(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
}

@keyframes glowPulse {
  0% {
    box-shadow:
      0 0 0 0 rgba(21, 57, 102, 0.2),
      0 2px 4px rgba(0, 0, 0, 0.1);
  }
  70% {
    box-shadow:
      0 0 0 6px rgba(21, 57, 102, 0),
      0 2px 4px rgba(0, 0, 0, 0.1);
  }
  100% {
    box-shadow:
      0 0 0 0 rgba(21, 57, 102, 0),
      0 2px 4px rgba(0, 0, 0, 0.1);
  }
}

/* Hover effects for done steps */
:deep(.q-stepper__tab--done:hover) .q-stepper__dot {
  transform: scale(1.05);
  box-shadow:
    0 0 0 4px rgba(16, 185, 129, 0.15),
    0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Active step enhanced styles */
:deep(.q-stepper__tab--active) {
  background: linear-gradient(145deg, #f8fafc, #ffffff);
  border: 1px solid rgba(226, 232, 240, 0.8);
  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.03),
    inset 0 2px 4px rgba(255, 255, 255, 0.7);
}

/* Enhanced focus state */
:deep(.q-stepper__tab:focus-visible) {
  outline: none;
  box-shadow:
    0 0 0 2px rgba(21, 57, 102, 0.2),
    0 4px 12px rgba(0, 0, 0, 0.05);
}

/* Smooth transition for all elements */
:deep(.q-stepper__tab *) {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.action-buttons {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  gap: 16px;
}

.search-input {
  width: 280px;
}

.search-input :deep(.q-field__control) {
  border-radius: 12px;
  background: #f8f9fa;
  border: 2px solid transparent;
  transition: all 0.3s ease;
  min-height: 40px;
}

.search-input :deep(.q-field__control:before),
.search-input :deep(.q-field__control:after) {
  display: none;
}

.search-input :deep(.q-field__marginal) {
  color: #153966;
  transition: all 0.3s ease;
  height: 40px;
}

.search-input :deep(.q-field__native),
.search-input :deep(.q-field__prefix),
.search-input :deep(.q-field__suffix) {
  padding: 0 4px;
  min-height: 40px;
}

.search-input :deep(.q-field__native::placeholder) {
  color: #94a3b8;
  font-size: 0.95em;
}

.search-input :deep(.q-field__control:hover) {
  background: #ffffff;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.search-input :deep(.q-field__control:focus-within) {
  background: #ffffff;
  border: 2px solid #153966;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(21, 57, 102, 0.1);
}

.search-input :deep(.q-field__control:focus-within) .q-field__marginal {
  color: #2563eb;
}

.learners-profile-img {
  position: relative;
  width: 100%;
  padding: 5px;
}

.full-card-image {
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  transition: transform 0.3s;
}

.learner-details {
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: white;
  width: 100%;
  padding: 10px;
}

.learners-profile-card {
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid #f0f0f0;
}

.learners-profile-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  cursor: pointer;
}

.progress-section {
  margin-top: 8px;
}

.learnerss {
  margin-left: 8px;
  margin-right: 8px;
  padding: 0;
}

.basic-info {
  border: #153966 1px solid;
}

.styled-card {
  border-radius: 12px; /* Consistent rounded corners */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Consistent shadow with learners cards */
}

.q-card-section.no-border {
  border: none; /* Ensure no borders on card section */
  box-shadow: none; /* Remove any shadows */
  background: transparent; /* Transparent background */
}

.form-styles {
  border-radius: 12px;
  padding: 0 !important;
}

.text-enrol {
  margin-left: 15px;
}

/* Learners Grid and Cards */
:deep(.q-table__grid-content) {
  display: grid !important;
  gap: 4px; /* Significantly reduced gap */
  padding: 4px; /* Minimal padding around the grid */
}

/* Desktop: Three cards per row with larger sizes */
@media (min-width: 568px) {
  :deep(.q-table__grid-content) {
    grid-template-columns: repeat(3, minmax(350px, 1fr)) !important; /* Kept 3 columns, increased min width */
  }
}

/* Adjust image container for larger height */
.learners-profile-img {
  position: relative;
  padding-top: 100%; /* Square aspect ratio */
  overflow: hidden;
}

/* Mobile adjustments */
@media (max-width: 567px) {
  :deep(.q-table__grid-content) {
    gap: 2px; /* Minimal gap for mobile */
    padding: 2px;
  }

  .learners-profile-img {
    padding-top: 90%;
  }
}

/* Mobile: One card per row */
@media (max-width: 567px) {
  :deep(.q-table__grid-content) {
    grid-template-columns: 1fr !important;
    padding: 8px !important;
    gap: 8px;
  }

  .learnerss {
    margin-left: 4px;
    margin-right: 4px;
  }

  .q-pa-sm {
    padding: 6px !important;
  }

  /* Adjust image container */
  .learners-profile-img {
    padding-top: 80%;
  }

  /* Make cards fill width */
  .learners-profile-card {
    width: 100%;
    margin: 0;
  }

  /* Ensure image fills container properly */
  .full-card-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

/* Remove the default q-table grid classes */
:deep(.q-table__grid-content > div) {
  width: 100% !important;
  max-width: 100% !important;
  flex: none !important;
}

/* Card Styles */
.learners-profile-card {
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(226, 232, 240, 0.6);
  background: linear-gradient(145deg, #ffffff, #f8fafc);
  position: relative;
  cursor: pointer;
  height: 100%;
}

.learners-profile-img {
  position: relative;
  padding-top: 85%;
  overflow: hidden;
}

.full-card-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.5s ease;
}

.learner-details {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.7),
    rgba(0, 0, 0, 0.3)
  );
  backdrop-filter: blur(4px);
  padding: 15px;
  transform: translateY(0);
  transition: all 0.3s ease;
}

.learner-details .text-h6 {
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.learner-details .text-caption {
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.8rem;
  line-height: 1.4;
  margin-bottom: 2px;
  display: flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Responsive text adjustments */
@media (max-width: 767px) {
  .learner-details {
    padding: 10px;
  }

  .learner-details .text-h6 {
    font-size: 0.9rem;
    margin-bottom: 2px;
  }

  .learner-details .text-caption {
    font-size: 0.75rem;
    margin-bottom: 1px;
  }

  .learner-details .q-icon {
    font-size: 0.9rem !important;
  }
}

/* Hover effects */
.learners-profile-card:hover .full-card-image {
  transform: scale(1.1);
}

.learners-profile-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 20px -8px rgba(0, 0, 0, 0.15);
}

/* Keep other styles as they were... */

/* Pagination Container */
:deep(.q-table__bottom) {
  padding: 24px;
  background: linear-gradient(to right, #f8fafc, #ffffff);
  border-top: 1px solid rgba(226, 232, 240, 0.6);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

/* Rows per page select */
:deep(.q-table__select) {
  background: white;
  border-radius: 12px;
  padding: 4px 12px;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
}

:deep(.q-table__select:hover) {
  border-color: #cbd5e1;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

/* Pagination Buttons */
:deep(.q-pagination) {
  .q-btn {
    border-radius: 10px;
    padding: 8px 16px;
    min-height: 38px;
    font-weight: 500;
    border: 1px solid transparent;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    background: transparent;
    color: #64748b;

    &:hover:not(.disabled) {
      background: #f1f5f9;
      color: #1e293b;
      transform: translateY(-1px);
    }

    &.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* Active page */
    &.q-btn--active {
      background: #153966;
      color: white;
      font-weight: 600;
      border: none;
      box-shadow: 0 4px 12px rgba(21, 57, 102, 0.15);

      &:hover {
        background: #1e4b8a;
        transform: translateY(-1px);
      }
    }
  }

  /* Navigation arrows */
  .q-btn[aria-label="First page"],
  .q-btn[aria-label="Previous page"],
  .q-btn[aria-label="Next page"],
  .q-btn[aria-label="Last page"] {
    background: white;
    border: 1px solid #e2e8f0;

    &:hover:not(.disabled) {
      border-color: #cbd5e1;
      background: #f8fafc;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }
  }
}

/* Rows per page label */
:deep(.q-table__bottom-item) {
  font-size: 0.875rem;
  color: #64748b;
  font-weight: 500;
}

/* Mobile Responsive Adjustments */
@media (max-width: 567px) {
  :deep(.q-table__bottom) {
    flex-direction: column;
    gap: 12px;
    padding: 16px;
  }

  :deep(.q-pagination) {
    .q-btn {
      padding: 6px 12px;
      min-height: 34px;
      font-size: 0.875rem;
    }
  }

  /* Hide some elements on very small screens */
  :deep(.q-table__bottom-item) {
    font-size: 0.813rem;
  }
}

/* Hover Animations */
:deep(.q-pagination .q-btn) {
  &:not(.disabled):active {
    transform: translateY(0);
  }
}

/* Transition for page changes */
:deep(.q-pagination) {
  .q-btn__content {
    transition: transform 0.2s ease;
  }

  .q-btn:not(.disabled):active .q-btn__content {
    transform: scale(0.95);
  }
}

/* Optional: Add smooth transitions between pages */
.q-table__grid-content {
  transition: opacity 0.3s ease;
}

.q-table__grid-content--loading {
  opacity: 0.6;
}
</style>
