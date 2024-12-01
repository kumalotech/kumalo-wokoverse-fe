<template>
  <div class="add-assessment-dialog">
    <q-card>
      <!-- Header Section -->
      <q-card-section class="card-header text-white q-pt-sm q-pb-sm">
        <div>{{ projectInfo.projectName }}</div>
      </q-card-section>
      <!-- Body Section -->
      <q-card-section class="row">
        <div class="row col-12">
          <!-- Milestone Title -->
          <div class="col-4">
            <q-select
              v-model="selectedMilestone"
              label="Milestone"
              :options="projectInfo.projectMilestones"
              dense
              outlined
              color="grey"
              round
              style="width: 95%;"
              required
              class="q-mb-md select-style"
              option-value="id"
              option-label="title"
            />
          </div>
          <!-- Status -->
          <div class="col-4">
            <q-select
              v-model="assessmentInfo.status"
              label="Status"
              :options="statusOptions"
              dense
              outlined
              color="grey"
              round
              required
              style="width: 95%;"
              class="select-style"
            />
          </div>
          <!-- Date of Assessment -->
          <div class="col-4">
            <q-input
              v-model="assessmentInfo.assessmentDate"
              label="Date of Assessment"
              type="date"
              dense
              outlined
              color="grey"
              round
              required
            />
          </div>
        </div>
        <div class="row col-12">
          <!-- Challenges Faced -->
          <div class="col-12 position-relative">
            <q-input
              v-model="assessmentInfo.challenges"
              label="Challenges Faced"
              type="textarea"
              rows="8"
              dense
              outlined
              color="grey"
              round
              placeholder="Record any challenges faced during this milestone"
              class="q-mb-md challenges"
            />
            <!-- Ask AI Button / Spinner -->
            <div class="ask-ai-btn-container">
              <q-btn
                v-if="!isProcessing"
                label="Ask Wokoverse! "
                size="sm"
                round
                icon="lightbulb"
                padding="5px 5px"
                dense
                no-caps
                inner-class="q-pl-xs q-pr-xs"
                class="gradient-button"
                @click="startProcessing"
              />
              <q-spinner
                v-else
                color="primary"
                size="20px"
              />
            </div>
          </div>
          <!-- Suggested Ways Forward -->
          <div class="col-12">
            <q-input
              v-model="assessmentInfo.suggestions"
              label="Suggested Ways Forward"
              type="textarea"
              rows="8"
              dense
              outlined
              color="grey"
              round
              placeholder="Suggest solutions or improvements for overcoming the challenges"
            />
          </div>
        </div>
        <div class="text-center col-12">
          <q-btn
            label="Cancel"
            icon="cancel"
            color="primary"
            @click="toggleAddAssessmentModal"
            class="q-mt-md q-mr-md"
          />
          <q-btn
            label="Submit"
            icon="send"
            @click="submitAssessment"
            class="q-mt-md next-button"
          />
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: "AddAssessmentComponent",
  props: {
    assessmentInfo: {
      type: Object,
      required: true,
    },
    projectInfo: {
      type: Object,
      required: true,
    },
    submitAssessment: {
      type: Function,
      required: true,
    },
    toggleAddAssessmentModal: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      selectedMilestone: null,
      statusOptions: [
        { label: 'Completed', value: 'Completed' },
        { label: 'In Progress', value: 'In Progress' },
        { label: 'Delayed', value: 'Delayed' },
        { label: 'Not Started', value: 'Not Started' },
      ],
      isProcessing: false,
    };
  },
  methods: {
    startProcessing() {
      this.isProcessing = true;
      setTimeout(() => {
        this.isProcessing = false;
      }, 10000);
    },
  },
};
</script>

<style scoped>
@media (max-width: 768px) {
  .add-assessment-dialog {
    width: 100%;
  }
}

  .position-relative {
    position: relative;
    margin-right: 10px;
  }

  .ask-ai-btn-container {
    position: absolute;
    bottom: 5px;
    right: 3px;
    display: flex;
    align-items: center;
  }

  .gradient-button {
    background: linear-gradient(to right, #1B00FF, #030F65);
    color: white;
  }

  .q-item {
    margin-bottom: 16px; /* Space between items */
  }

  .add-assessment-dialog {
    width: 100%;
  }

  .next-button, .card-header {
    background: linear-gradient(to right, #1B00FF, #030F65);
    color: white;
  }

  .q-input textarea {
    resize: none;
  }

  .challenges {
    margin-bottom: 37px;
  }

  .select-style .q-field__native {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }


</style>
