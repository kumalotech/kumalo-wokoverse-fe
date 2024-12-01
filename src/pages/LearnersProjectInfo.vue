<template>
  <q-card-section class="row student-project-info">

    <!-- Project Information Section -->
    <div class="col-12 row q-gutter-sm q-mb-sm">

      <!-- Project Title -->
      <q-item class="col-lg-3 col-md-3 col-sm-12 col-12">
        <q-item-section>
          <q-input
            v-model="projectInfo.projectTitle"
            label="Project Title"
            dense
            outlined
            color="grey"
            round
          />
        </q-item-section>
      </q-item>

      <!-- Project Description -->
      <q-item class="col-lg-3 col-md-3 col-sm-12 col-12">
        <q-item-section>
          <q-input
            v-model="projectInfo.projectDescription"
            label="Project Description"
            type="textarea"
            autogrow
            dense
            outlined
            color="grey"
            round
          />
        </q-item-section>
      </q-item>

      <!-- Project Start Date -->
      <q-item class="col-lg-3 col-md-3 col-sm-12 col-12">
        <q-item-section>
          <q-input
            v-model="projectInfo.projectStartDate"
            label="Project Start Date"
            type="date"
            dense
            outlined
            color="grey"
            round
          />
        </q-item-section>
      </q-item>

      <!-- Project End Date -->
      <q-item class="col-lg-3 col-md-3 col-sm-12 col-12">
        <q-item-section>
          <q-input
            v-model="projectInfo.projectEndDate"
            label="Project End Date"
            type="date"
            dense
            outlined
            color="grey"
            round
          />
        </q-item-section>
      </q-item>

      <!-- Project Supervisor/Facilitator -->
      <q-item class="col-lg-3 col-md-3 col-sm-12 col-12">
        <q-item-section>
          <q-select
            v-model="projectInfo.projectSupervisor"
            :options="projectInfo.projectSupervisor"
            label="Supervisor/Facilitator"
            dense
            outlined
            color="grey"
            round
          />
        </q-item-section>
      </q-item>

      <!-- Project Objectives -->
      <q-item class="col-lg-3 col-md-3 col-sm-12 col-12">
        <q-item-section>
          <q-input
            v-model="projectInfo.projectObjectives"
            label="Project Objectives"
            type="textarea"
            autogrow
            dense
            outlined
            color="grey"
            round
          />
        </q-item-section>
      </q-item>

      <!-- Tools and Resources -->
      <q-item class="col-lg-3 col-md-3 col-sm-12 col-12">
        <q-item-section>
          <q-input
            v-model="projectInfo.toolsResources"
            label="Tools and Resources"
            type="textarea"
            autogrow
            dense
            outlined
            color="grey"
            round
          />
        </q-item-section>
      </q-item>

      <!-- Project Deliverables -->
      <q-item class="col-lg-3 col-md-3 col-sm-12 col-12">
        <q-item-section>
          <q-input
            v-model="projectInfo.projectDeliverables"
            label="Project Deliverables"
            type="textarea"
            autogrow
            dense
            outlined
            color="grey"
            round
          />
        </q-item-section>
      </q-item>

      <!-- Estimated Budget -->
      <q-item class="col-lg-3 col-md-3 col-sm-12 col-12">
        <q-item-section>
          <q-input
            v-model="projectInfo.estimatedBudget"
            label="Estimated Budget"
            type="number"
            dense
            outlined
            color="grey"
            round
          />
        </q-item-section>
      </q-item>
    </div>

    <!-- Project Milestones Section -->
    <h6>Project Milestones</h6>
    <div class="col-12 row">
      <div
        v-for="(milestone, index) in projectInfo.projectMilestones"
        :key="index"
        class="row col-12 q-gutter-md q-mb-sm"
      >
        <div class="col-lg-3 col-12">
          <q-input
            v-model="milestone.name"
            label="Milestone"
            placeholder="Enter Milestone"
            dense
            outlined
            color="grey"
            round
          />
        </div>
        <div class="col-lg-3 col-12">
          <q-input
            v-model="milestone.description"
            label="Description"
            placeholder="Enter Description"
            type="textarea"
            autogrow
            dense
            outlined
            color="grey"
            round
          />
        </div>
        <div class="col-1 flex flex-left">
          <q-btn
            color="negative"
            icon="delete"
            flat
            dense
            @click="removeMilestone(index)"
          />
        </div>
      </div>
      <q-btn
        color="primary"
        icon="add"
        label="Add Milestone"
        flat
        dense
        @click="addMilestone"
      />
    </div>

    <div class="col-12 text-center">

      <q-btn
        v-if="isStep"
        label="Previous"
        icon="arrow_back"
        @click="$emit('back')"
        class="previous-button"
        style="margin-right: 1rem;"
      />
      <q-btn
        v-if="isStep"
        label="Submit"
        icon="send"
        @click="$emit('next')"
        class="next-button"
      />
      <q-btn
        v-else
        label="Submit"
        icon="send"
        @click="submitProject"
        class="next-button"
      />
</div>
  </q-card-section>
</template>

<script>
export default {
  name: "LearnerProjectInfo",
  props: {
    projectInfo: {
      type: Object,
      required: true,
    },
    addMilestone: {
      type: Function,
      required: true
    },
    removeMilestone: {
      type: Function,
      required: true
    },
    isStep: {
      type: Boolean,
      required: false
    },
    submitProject: {
      type: Function,
      required: false
    }
  },
  data() {
    return {
    };
  },
  methods: {
  },
};
</script>

<style scoped>
.student-project-info {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.row {
  padding: 0 !important;
}
.next-button,
.previous-button {
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

.next-button:before,
.previous-button:before {
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

.next-button:hover,
.previous-button:hover {
  color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(21, 57, 102, 0.15);
  border-color: transparent;
}

.next-button:hover:before,
.previous-button:hover:before {
  width: 100%;
}

.next-button:active,
.previous-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(21, 57, 102, 0.1);
}
</style>
