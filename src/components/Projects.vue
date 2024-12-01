<template>
  <q-card class="no-shadow project-card-container">
    <div>
    <q-card-section>
      <div class="flex-between align-center action-header">
        <div class="project-title">
          <div v-if="isCreatingNewProject" class="text-subtitle1 text-grey-8">Create Project</div>
          <div v-else v-if="!isSmallScreen" class="text-subtitle1 text-grey-8">Existing Projects</div>
        </div>
        <div class="action-buttons align-right">
          <q-input
            v-if="!isCreatingNewProject"
            filled
            dense
            debounce="300"
            v-model="searchQuery"
            placeholder="Search Projects..."
            class="q-mr-md search-input"
            :clearable="true"
          >
            <template v-slot:append>
              <q-icon name="search" class="cursor-pointer" @click="performSearch" />
            </template>
          </q-input>
          <q-btn
            :label="isCreatingNewProject ? 'Cancel Form' : 'Create Project'"
            :icon="isCreatingNewProject ? 'close' : 'add'"
            class="q-mr-md add-new-btn"
            @click="toggleCreateProjectDialog"
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
    <q-separator v-if="isCreatingNewProject" />
  </div>
    <!-- Create Project Section -->
    <div v-if="isCreatingNewProject" class="stepper-container styled-card">
      <student-project-info
        :projectInfo="projectInfo"
        :addMilestone="addMilestone"
        :removeMilestone="removeMilestone"
        :isStep="false"
        :submitProject="submitProject"
      />
    </div>
    <q-separator class="second-separator"/>
    <q-card-section class="q-pa-none card-vertical-spacing">
      <q-table
        grid
        :rows="paginatedData"
        :columns="columns"
        :pagination.sync="pagination"
        :rows-per-page-options="[4, 8, 12, 16]"
        rows-per-page-label="Projects Per Page"
      >
        <template v-slot:item="props">
          <div class="q-pa-sm col-12 project-card">
            <q-card class="project-profile-card">
              <q-card-section class="row items-center">
                <div class="project-info">
                  <div class="gradient-text"><strong>{{ props.row.projectName }}</strong></div>
                </div>
              </q-card-section>

              <q-card-section class="project-description-section">
                <div class="text-caption text-grey-7">{{ props.row.description }}</div>
              </q-card-section>

              <q-card-section class="facilitator-team-section">
                <div class="flex justify-between items-center">
                  <div class="project-attributes">
                    Assigned Learner: <a class="gradient-text"><strong>{{ props.row.student }}</strong></a>
                  </div>
                </div>
                <div class="flex justify-between items-center">
                  <div class="project-attributes">
                    Project Duration: <a class="text-black"><strong>{{ props.row.duration }}</strong></a>
                  </div>
                </div>
                <div class="flex justify-between items-center">
                  <div class="project-attributes">
                    <span>Start Date: <strong>{{ props.row.startDate }}</strong></span> |
                    <span>End Date: <strong>{{ props.row.endDate }}</strong></span>
                  </div>
                </div>
              </q-card-section>

              <q-card-section class="progress-section">

                <div class="row flex justify-between items-center progress-label">
                  <span>Project's Completion</span>
                </div>

                <project-progress  :milestones="props.row.projectMilestones"/>


                <div class="row flex justify-between items-center progress-label">
                  <span>Project's Photos</span>
                </div>
                <!-- Image Gallery with Scrolling Arrows -->
                <div class="image-gallery-container">
                  <button
                    v-if="canScrollLeft[props.rowIndex]"
                    class="scroll-button left"
                    @click="scrollGallery(-1, props.rowIndex)">
                    &#9664;
                  </button>
                  <div
                    :id="`gallery-${props.rowIndex}`"
                    class="image-gallery"
                    @scroll="updateScrollButtons(props.rowIndex)"
                    ref="galleries">
                    <img
                      v-for="image in props.row.projectImages"
                      :key="image"
                      :src="image"
                      alt="Project Image"
                      class="gallery-image"
                      @click="openImageDialog(image)"
                    />
                  </div>
                  <button
                    v-if="canScrollRight[props.rowIndex]"
                    class="scroll-button right"
                    @click="scrollGallery(1, props.rowIndex)">
                    &#9654;
                  </button>
                </div>

                <div class="row items-center justify-between">
                  <q-btn
                    icon="assignment"
                    label="Assess Project"
                    flat
                    class="assess-project-btn"
                    style="text-transform: none; z-index: 10;"
                    @click.prevent="() => toggleAddAssessmentModal(props.row)"
                  />
                  <q-btn
                    icon="history"
                    label="View Previous Assessments"
                    flat
                    class="assessment-history-btn"
                    style="text-transform: none; z-index: 10;"
                    @click="() => toggleAssessmentModal(props.row)"
                  />

                  <q-btn
                    icon="book"
                    label="View Lesson Plan"
                    flat
                    class="lesson-plan-btn"
                    style="text-transform: none; z-index: 10;"
                    @click="() => toggleLessonPlanModal(props.row)"
                  />
                </div>
              </q-card-section>
            </q-card>
          </div>
        </template>
      </q-table>
      <q-dialog v-model="isShowingAddAssessmentModal">
        <add-assessment
          :projectInfo="selectedProject"
          :assessmentInfo="assessmentInfo"
          :submitAssessment="submitAssessment"
          :toggleAddAssessmentModal="toggleAddAssessmentModal"
        />
      </q-dialog>
      <!-- <q-dialog v-model="isShowingAssessmentModal">
        <assessment
          :projectInfo="selectedProject"
          :reviewList="selectedProject.projectReviews"
          :toggleAssessmentModal="toggleAssessmentModal"
        />
      </q-dialog> -->
      <q-dialog v-model="isShowingLessonPlanModal">
        <lesson-plan
          :projectInfo="selectedProject"
          :toggleLessonPlanModal="toggleLessonPlanModal"
          :submitLessonPlan="submitLessonPlan"
        />
      </q-dialog>

      <!-- Add this new dialog for image preview -->
      <q-dialog v-model="isShowingImageDialog">
        <q-card class="image-dialog">
          <q-card-section class="row items-center justify-end q-pa-none">
            <q-btn icon="close" flat round dense v-close-popup class="close-btn" />
          </q-card-section>
          <q-card-section class="q-pa-none">
            <img :src="selectedImage" alt="Project Image Preview" class="fullscreen-image"/>
          </q-card-section>
        </q-card>
      </q-dialog>
    </q-card-section>
  </q-card>
</template>


<script>
import { defineComponent, ref, computed, onMounted, nextTick } from 'vue';
import { QAvatar, QCard, QCardSection, QLinearProgress } from 'quasar';
import StudentProjectInfo from "../pages/LearnersProjectInfo.vue";
import Assessment from './Assessment.vue';
import AddAssessment from './AddAssessment.vue';
import LessonPlan from './tables/LessonPlan.vue';
import ProjectProgress from './Progress.vue';

export default defineComponent({
  name: 'Projects',
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  components: {
    QAvatar, QCard, QCardSection, QLinearProgress, StudentProjectInfo, Assessment, AddAssessment, LessonPlan, ProjectProgress
  },
  setup(props) {
    const searchQuery = ref('');
    const isCreatingNewProject = ref(false);
    const isShowingAssessmentModal = ref(false)
    const isShowingAddAssessmentModal = ref(false)
    const isShowingLessonPlanModal = ref(false)
    const selectedProject = ref(null);
    const isShowingImageDialog = ref(false);
    const selectedImage = ref('');
    const galleries = ref([]);
    const canScrollLeft = ref({});
    const canScrollRight = ref({});

    const projectMilestones = [
        { title: "Phase 1", date: "2024-05-01", description: "Project kickoff", color: "blue" },
        { title: "Phase 2", date: "2024-06-01", description: "Requirements finalized", color: "teal" },
        { title: "Phase 3", date: "2024-07-01", description: "Design phase", color: "green" },
        { title: "Phase 4", date: "2024-08-01", description: "Development begins", color: "orange" },
        { title: "Phase 5", date: "2024-09-01", description: "Testing and QA", color: "purple" },
        { title: "Phase 6", date: "2024-10-01", description: "Deployment", color: "red" },
      ]

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
      projectMilestones: projectMilestones
    });

    const assessmentInfo = ref({
      projectMilestone: "",
      status: null,
      assessmentDate: new Date().toISOString().split('T')[0],
      challenges: '',
      suggestions: ''
    })

    const columns = [
      { name: 'Name', label: 'Name', field: 'name', sortable: true, align: 'left' },
      { name: 'Created Date', label: 'Created Date', field: 'Created_Date', sortable: true, align: 'left' },
      { name: 'Project', label: 'Project', field: 'Project', sortable: true, align: 'left' },
      { name: 'Action', label: '', field: 'Action', sortable: false, align: 'center' }
    ];

    const getProgressColor = (progress) => {
      if (progress == 100) return 'green';
      if (progress >= 80) return 'blue';
      if (progress >= 50) return 'cyan';
      return 'orange';
    };

    const paginatedData = computed(() => {
      return props.data.filter(project =>
        project.projectName.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    const toggleCreateProjectDialog = () => {
      isCreatingNewProject.value = !isCreatingNewProject.value;
    };

    const exportToExcel = () => {
      console.log('Export to Excel Clicked');
    };

    const scrollGallery = (direction, id) => {
      const gallery = document.getElementById(`gallery-${id}`);
      const scrollAmount = 300;
      gallery.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
      });
      updateScrollButtons(id);
    };

    const updateScrollButtons = (id) => {
      const gallery = document.getElementById(`gallery-${id}`);
      if (!gallery) return;

      canScrollLeft.value[id] = gallery.scrollLeft > 0;
      canScrollRight.value[id] = gallery.scrollLeft < (gallery.scrollWidth - gallery.clientWidth);
    };

    const toggleAssessmentModal = (project) => {
      selectedProject.value = project;
      isShowingAssessmentModal.value = !isShowingAssessmentModal.value
    }

    const toggleAddAssessmentModal = (project) => {
      selectedProject.value = project;
      isShowingAddAssessmentModal.value = !isShowingAddAssessmentModal.value;
    }

    const toggleLessonPlanModal = (project) => {
      selectedProject.value = project;
      isShowingLessonPlanModal.value = !isShowingLessonPlanModal.value
    }

    const submitAssessment = () => {
      console.log("Submitting...")
    }

    const submitLessonPlan = () => {
      console.log("Submitting Plan...")
    }

    const isSmallScreen = computed(() => {
      return window.innerWidth < 768;
    });

    const openImageDialog = (image) => {
      selectedImage.value = image;
      isShowingImageDialog.value = true;
    };

    const initializeGalleries = () => {
      nextTick(() => {
        props.data.forEach((_, index) => {
          const gallery = document.getElementById(`gallery-${index}`);
          if (gallery) {
            canScrollLeft.value[index] = false;
            canScrollRight.value[index] = gallery.scrollWidth > gallery.clientWidth;
          }
        });
      });
    };

    onMounted(() => {
      initializeGalleries();
      window.addEventListener('resize', initializeGalleries);
    });

    return {
      columns,
      searchQuery,
      getProgressColor,
      paginatedData,
      toggleCreateProjectDialog,
      isCreatingNewProject,
      projectInfo,
      exportToExcel,
      scrollGallery,
      updateScrollButtons,
      openImageDialog,
      isShowingImageDialog,
      selectedImage,
      galleries,
      canScrollLeft,
      canScrollRight,
      toggleAssessmentModal,
      isShowingAssessmentModal,
      submitAssessment,
      assessmentInfo,
      isShowingAddAssessmentModal,
      toggleAddAssessmentModal,
      selectedProject,
      isShowingLessonPlanModal,
      toggleLessonPlanModal,
      submitLessonPlan,
      isSmallScreen
    };
  },
});
</script>

<style scoped>
@media (max-width: 568px) {
  .export-btn {
    display: none;
  }
  .add-new-btn {
    font-size: x-small;
    margin-right: 2px !important;
    margin-left: 2px !important;
    padding-right: 10px !important;
    height: 40px;
  }
}
.project-card-container {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.action-header {
  display: flex; /* Use Flexbox for the header */
  justify-content: space-between; /* Space between title and buttons */
  align-items: center; /* Center items vertically */
}

.project-title {
  flex-grow: 1; /* Allow title to take available space */
}

.action-buttons {
  display: flex; /* Use Flexbox for button alignment */
  align-items: center; /* Center items vertically */
  justify-content: flex-end; /* Align buttons to the right */
  margin-top: 16px; /* Add some spacing at the top if needed */
}

.search-input {
  flex: 1; /* Allow input to take available space */
  max-width: 300px; /* Optional: limit maximum width */
  margin-right: 16px; /* Add spacing between input and buttons */
}


.project-profile-card {
  width: 100%;
  height: auto;
  min-height: 335px;
  position: relative;
  background: linear-gradient(145deg, #ffffff, #f8fafc);
  border: 1px solid rgba(226, 232, 240, 0.6);
  border-radius: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.project-profile-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 20px -8px rgba(0, 0, 0, 0.15);
  border-color: rgba(226, 232, 240, 0.8);
}

.facilitator-team-section {
  margin-top: 8px; /* Add spacing above this section */
}

.avatar-position {
  margin-left: 8px; /* Space between attributes and avatar */
}
.project-description-section {
  margin-top: -30px;
  margin-bottom: 15px;
  font-size: 16px;
}

.facilitator-team-section {
  margin-top: -38px;
}

.progress-section {
  margin-top: 0;
}

.second-separator {
  margin-bottom: 10px;
}

.card-vertical-spacing {
  margin-bottom: 10px;
}

.gradient-text {
  background: linear-gradient(to right, #1B00FF, #030F65); /* Change these colors as needed */
  background-clip: text; /* Standard property */
  -webkit-background-clip: text; /* Fallback for older browsers */
  color: transparent; /* Standard property to make text transparent */
  -webkit-text-fill-color: transparent; /* Makes the text transparent for the gradient to show */
  cursor: pointer;
}

.gradient-text:hover {
  background: linear-gradient(to right, #153966, #0000FF); /* Change these colors as needed */
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent; /* Makes the text transparent so the gradient shows */
}

.title-text {
  color: #153966;
}


.image-gallery-container {
  position: relative;
  display: flex;
  align-items: center;
  margin: 16px 0;
  background: rgba(0, 0, 0, 0.02);
  padding: 12px;
  border-radius: 12px;
}

.image-gallery {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  padding: 8px;
}

.image-gallery::-webkit-scrollbar {
  display: none; /* Chrome, Safari and Opera */
}

.gallery-image {
  min-width: 150px; /* Ensure consistent width */
  height: 150px;
  border-radius: 8px;
  object-fit: cover;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.gallery-image:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.scroll-button {
  position: absolute;
  background: rgba(37, 99, 235, 0.9);
  border: none;
  color: white;
  font-size: 1.25rem;
  cursor: pointer;
  transition: all 0.2s;
  padding: 8px;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.scroll-button:hover {
  background: rgba(37, 99, 235, 1);
  transform: scale(1.1);
}

.scroll-button.left {
  left: 4px;
}

.scroll-button.right {
  right: 4px;
}

.export-btn {
  background: linear-gradient(to right, #1B00FF, #030F65);
  color: white;
}

.assess-project-btn {
  margin-top: 10px;
  color: #0000FF;
}

.assessment-history-btn {
  margin-top: 10px;
  color: green;
}

.project-timeline {
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  padding-bottom: 8px;
}

.timeline-entry {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-width: 150px;
  max-width: 200px;
  margin: 0 4px;
  position: relative;
}

.timeline-entry .q-timeline-line {
  display: none; /* Hide the vertical lines */
}

.timeline-content {
  font-size: 0.85rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
}

.timeline-entry h6 {
  font-size: 0.85rem;
  font-weight: 500;
}

.timeline-entry p {
  font-size: 0.75rem;
  margin: 0;
}

.milestone {
  font-size: medium;
  font-weight: bold;
  color: #1d4ed8;
}

.project-attributes {
  font-size: 0.85rem;
  color: #64748b;
  margin-top: 4px;
}

.image-dialog {
  width: 70vw;
  max-width: 1000px;
  background: rgba(0, 0, 0, 0.9);
  border-radius: 12px;
}

.fullscreen-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 8px;
}

.close-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 2;
  color: white;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
}


.project-dates {
  font-size: 0.85rem;
  color: #64748b;
  margin-bottom: -20px;
}

.progress-label {
  font-size: 0.85rem;
  color: #6b7280;
  margin-bottom: 12px;
  margin-top: 12px;
  font-weight: bold;
}

/* Update the search input styles */
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

/* Update button styles */
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

</style>

