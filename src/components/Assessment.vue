<template>
  <div class="assessment-dialog">
    <q-card>
      <!-- Header Section -->
      <q-card-section class="card-header text-white q-pt-sm q-pb-sm">
        <div>{{ projectInfo.projectName }}</div>
      </q-card-section>
      <!-- Body Section -->
      <q-card-section>
        <card-time-line :reviewList="reviewList.reverse()"/>
        <div class="text-center">
          <q-btn
            label="Cancel"
            icon="cancel"
            color="primary"
            @click="toggleAssessmentModal"
            class="q-mt-md q-mr-md"
          />
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import {defineAsyncComponent} from 'vue'

export default {
  name: "AssessmentComponent",
  components: {
    CardTimeLine: defineAsyncComponent(() => import('./cards/CardTimeLine.vue')),
  },
  props: {
    projectInfo: {
      type: Object,
      required: true,
    },
    submitAssessment: {
      type: Function,
      required: true,
    },
    toggleAssessmentModal: {
      type: Function,
      required: true,
    },
    reviewList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      statusOptions: [
        { label: 'Completed', value: 'Completed' },
        { label: 'In Progress', value: 'In Progress' },
        { label: 'Delayed', value: 'Delayed' },
        { label: 'Not Started', value: 'Not Started' },
      ]
    };
  },
};
</script>

<style scoped>

  .container {
    max-height: 800px;
    padding-bottom: 20px;
  }
  .q-item {
    margin-bottom: 16px; /* Space between items */
  }

  .assessment-dialog {
    width: 800px;
  }

  .next-button, .card-header {
  background: linear-gradient(to right, #1B00FF, #030F65);
  color: white;
}
</style>
