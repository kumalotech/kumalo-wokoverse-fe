<template>
  <q-card class="learner-card">
    <!-- Back to List button at the top-left -->
    <q-card-section class="top-action-bar">
      <q-btn flat label="Back to List" icon="arrow_back" @click="$emit('back')" class="back-btn" />
    </q-card-section>

    <!-- Learner Details: Profile, Basic Info, and Additional Info -->
    <q-card-section class="learner-details-container">
      <!-- Column 1: Profile Picture -->
      <div class="profile-column">
        <q-img :src="learner.profilePictureUrl" alt="Learner Picture" class="profile-picture"/>
      </div>

      <!-- Column 2: Basic Information -->
      <div class="info-column">
        <h6 class="section-heading">Personal Information</h6>
        <p><strong>Full Name:</strong> {{ learner.fullName }}</p>
        <p><strong>Date of Birth:</strong> {{ learner.dateOfBirth }}</p>
        <p><strong>Gender:</strong> {{ learner.gender }}</p>
        <p><strong>Learner ID:</strong> {{ learner.learnersId }}</p>
        <p><strong>Email:</strong> {{ learner.email }}</p>
        <p><strong>Contact Number:</strong> {{ learner.contactNumber }}</p>
      </div>

      <!-- Column 3: Additional Information -->
      <div class="info-column">
        <h6 class="section-heading">Additional Information</h6>
        <p><strong>Interests:</strong> {{ learner.interests }}</p>
        <p><strong>Previous Experience:</strong> {{ learner.previousExperience }}</p>
        <p><strong>Allergies:</strong> {{ learner.allergies }}</p>
        <p><strong>Emergency Contact:</strong> {{ learner.emergencyContactName }}</p>
        <p><strong>Emergency Contact Number:</strong> {{ learner.emergencyContactNumber }}</p>
        <p><strong>Preferred Hospital:</strong> {{ learner.preferredHospital }}</p>
      </div>
    </q-card-section>

    <!-- Projects List -->
    <q-card-section class="projects-section">
      <h6 class="section-heading">{{ learner.fullName.split(" ")[0] }}'s Projects</h6>
      <q-separator />

      <div v-for="(project, index) in learner.projectInfo" :key="index" class="project-card">
        <q-card flat bordered class="project-card-content">
          <q-card-section>
            <h6 class="project-title">{{ project.projectName }}</h6>
            <p>{{ project.description }}</p>
            <div class="project-dates">
              <span>Start Date: {{ project.startDate }}</span> |
              <span>End Date: {{ project.endDate }}</span>
            </div>
          </q-card-section>

          <!-- Project Progress Timeline -->
          <q-card-section>
            <div class="row flex justify-between items-center progress-label">
              <span>Project's Completion</span>
            </div>

            <project-progress  :milestones="project.projectMilestones"/>

            <div class="row flex justify-between items-center progress-label">
              <span>Project's Photos</span>
            </div>

            <!-- Image Gallery with Scrolling Arrows -->
            <div class="image-gallery-container">
              <button
                v-show="canScrollLeft[index]"
                class="scroll-button left"
                @click="scrollGallery(-1, index)">
                &#9664;
              </button>
              <div
                :id="`gallery-${index}`"
                class="image-gallery"
                @scroll="updateScrollButtons(index)"
                ref="galleries">
                <img
                  v-for="image in project.projectImages"
                  :key="image"
                  :src="image"
                  alt="Project Image"
                  class="gallery-image"
                  @click="openImageDialog(image)"
                />
              </div>
              <button
                v-show="canScrollRight[index]"
                class="scroll-button right"
                @click="scrollGallery(1, index)">
                &#9654;
              </button>
            </div>

            <!-- Action Buttons -->
            <div class="row items-center justify-between project-actions">
              <q-btn icon="assignment" label="Assess Project" flat class="action-btn" @click.prevent="() => toggleAddAssessmentModal(project)" />
              <q-btn icon="history" label="Previous Assessments" flat class="action-btn" @click="() => toggleAssessmentModal(project)" />
              <q-btn icon="book" label="Lesson Plan" flat class="action-btn" @click="() => toggleLessonPlanModal(project)" />
            </div>

            <!-- Dialogs -->
            <q-dialog v-model="isShowingAddAssessmentModal">
              <add-assessment
                :projectInfo="selectedProject"
                :assessmentInfo="assessmentInfo"
                :submitAssessment="submitAssessment"
                :toggleAddAssessmentModal="toggleAddAssessmentModal"
              />
            </q-dialog>
            <q-dialog v-model="isShowingAssessmentModal">
              <assessment
                :projectInfo="selectedProject"
                :reviewList="selectedProject.projectReviews"
                :toggleAssessmentModal="toggleAssessmentModal"
              />
            </q-dialog>
            <q-dialog v-model="isShowingLessonPlanModal">
              <lesson-plan
                :projectInfo="selectedProject"
                :toggleLessonPlanModal="toggleLessonPlanModal"
                :submitLessonPlan="submitLessonPlan"
              />
            </q-dialog>
          </q-card-section>
        </q-card>
      </div>
    </q-card-section>

    <!-- Back to List button at the bottom-right -->
    <q-card-actions align="right">
      <q-btn flat label="Back to List" icon="arrow_back" @click="$emit('back')" class="back-btn" />
    </q-card-actions>
  </q-card>

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
</template>


<script>
import {ref, onMounted} from 'vue'
import Assessment from '../Assessment.vue';
import AddAssessment from '../AddAssessment.vue';
import LessonPlan from './LessonPlan.vue';
import ProjectProgress from '../Progress.vue';

export default {
  name: 'LearnerDetails',
  props: {
    learner: Object,
    projects: Array,
  },
  components: {
    Assessment, AddAssessment, LessonPlan, ProjectProgress
  },
  setup() {
    const isShowingAssessmentModal = ref(false)
    const isShowingAddAssessmentModal = ref(false)
    const isShowingLessonPlanModal = ref(false)
    const selectedProject = ref(null);
    const isShowingImageDialog = ref(false);
    const selectedImage = ref('');
    const galleries = ref([]);
    const canScrollLeft = ref({});
    const canScrollRight = ref({});

    const scrollGallery = (direction, index) => {
      const gallery = galleries.value[index];
      const scrollAmount = 300; // Adjust this value to control scroll distance
      gallery.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
      });
    };

    const updateScrollButtons = (index) => {
      const gallery = galleries.value[index];
      if (!gallery) return;

      canScrollLeft.value[index] = gallery.scrollLeft > 0;
      canScrollRight.value[index] = gallery.scrollLeft < (gallery.scrollWidth - gallery.clientWidth);
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

    const getProgressColor = (progress) => {
      if (progress == 100) return 'green';
      if (progress >= 80) return 'blue';
      if (progress >= 50) return 'cyan';
      return 'orange';
    };

    const assessmentInfo = ref({
      projectMilestone: "",
      status: null,
      assessmentDate: new Date().toISOString().split('T')[0],
      challenges: '',
      suggestions: ''
    })

    const submitAssessment = () => {
      console.log("Submitting...")
    }

    const submitLessonPlan = () => {
      console.log("Submitting Plan...")
    }

    const openImageDialog = (image) => {
      selectedImage.value = image;
      isShowingImageDialog.value = true;
    };

    onMounted(() => {
      // Initialize scroll buttons state for each gallery
      galleries.value.forEach((_, index) => {
        updateScrollButtons(index);
      });
    });

    return {
      toggleLessonPlanModal,
      toggleAddAssessmentModal,
      toggleAssessmentModal,
      isShowingAssessmentModal,
      isShowingAddAssessmentModal,
      isShowingLessonPlanModal,
      selectedProject,
      getProgressColor,
      scrollGallery,
      assessmentInfo,
      submitAssessment,
      submitLessonPlan,
      isShowingImageDialog,
      selectedImage,
      openImageDialog,
      galleries,
      canScrollLeft,
      canScrollRight,
      updateScrollButtons,
     };
  }
}
</script>

<style scoped>
.learner-card {
  background: linear-gradient(145deg, #f5f8fa, #e2e8f0);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 16px;
}

.top-action-bar, .projects-section, .project-card {
  padding: 8px 0;
}

.section-heading {
  font-size: 1.25rem;
  color: #3b82f6;
  margin-bottom: 8px;
  margin-top: 0;
}

.learner-details-container {
  display: flex;
  gap: 16px;
  flex-wrap: wrap; /* Allow items to wrap on smaller screens */
}

.profile-column {
  flex: 1;
  min-width: 250px; /* Ensure profile picture has minimum width */
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-picture {
  border-radius: 50%;
  width: 220px;
  height: 220px;
  object-fit: cover;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.info-column {
  flex: 1;
  min-width: 250px; /* Ensure info columns have minimum width */
  font-size: 0.9rem;
  line-height: 1.5;
}

.project-card-content {
  background: white;
  border-radius: 8px;
  padding: 0 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;
}

.project-card-content:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.project-title {
  font-size: 1.15rem;
  margin-top: 12px;
  font-weight: 600;
  color: #1e40af;
  margin-bottom: 4px;
  padding-bottom: 0;
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

.progress-bar {
  margin-top: 4px;
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

.project-actions {
  margin-top: 8px;
}

.action-btn {
  color: #1d4ed8;
  font-size: 0.85rem;
  text-transform: capitalize;
}

.project-timeline {
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  padding-bottom: 8px;
  position: relative;
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

:deep(.q-timeline__line) {
  margin: 0 !important;
  background: #ddd;
  width: 100% !important;
  height: 2px !important;
  top: 16px !important;
}

:deep(.q-timeline__dot) {
  z-index: 2;
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

.image-dialog {
  width: 70vw;
  max-width: 1000px;
  background: rgba(0, 0, 0, 0.9);
  border-radius: 12px;
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

.fullscreen-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 8px;
}

/* Media query for small screens */
@media (max-width: 768px) {
  .learner-details-container {
    flex-direction: column;
  }

  .profile-column, .info-column {
    flex: none;
    width: 100%;
  }

  .profile-picture {
    width: 180px; /* Slightly smaller profile picture on mobile */
    height: 180px;
  }
}

</style>

