<template>
  <div class="page-container">
    <!-- Fixed Header Section -->
    <div class="fixed-header">
      <div class="header-section">
        <div class="row justify-end">
          <div>
            <h4 class="text-h4 text-weight-medium q-mb-none text-primary">
              Lesson Plans
            </h4>
            <div class="subtitle q-mt-sm text-grey-7">
              Manage and track all lesson plans
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scrollable Table Section -->
    <div class="scrollable-content">
      <q-card class="table-card" bordered flat>
        <q-table
          v-if="flattenedLessonPlans && flattenedLessonPlans.length"
          square
          class="no-shadow elegant-table"
          :rows="flattenedLessonPlans"
          :columns="columns"
          row-key="project"
          :filter="filter"
          :rows-per-page-options="[10, 15, 20, 25, 30]"
          rows-per-page-label="Lesson Plans Per Page"
          flat
          bordered
          :pagination-label="paginationLabel"
          v-model:pagination="pagination"
        >
          <!-- Search and Filter Section -->
          <template v-slot:top>
            <div class="row full-width items-center q-pb-md">
              <div class="col-6">
                <q-input
                  v-if="showFilter"
                  v-model="filter"
                  placeholder="Search lesson plans..."
                  dense
                  outlined
                  class="search-input"
                >
                  <template v-slot:prepend>
                    <q-icon name="search" color="primary"/>
                  </template>
                  <template v-slot:append v-if="filter">
                    <q-icon name="close" color="primary" class="cursor-pointer" @click="filter = ''"/>
                  </template>
                </q-input>
              </div>
              <div class="col-6 text-right">
                <q-btn
                  color="primary"
                  :icon="showFilter ? 'filter_alt_off' : 'filter_alt'"
                  @click="showFilter = !showFilter"
                  flat
                  round
                />
              </div>
            </div>
          </template>

          <!-- Status Cell Template -->
          <template v-slot:body-cell-finalStatus="props">
            <q-td :props="props" class="text-center">
              <q-chip
                v-bind:class="{
                  'status-chip': true,
                  'status-completed': props.row.finalStatus === 'Completed',
                  'status-in-progress': props.row.finalStatus === 'In Progress',
                  'status-failed': props.row.finalStatus === 'Failed'
                }"
                text-color="white"
                dense
                class="text-weight-medium"
              >
                <q-icon
                  :name="getStatusIcon(props.row.finalStatus)"
                  size="16px"
                  class="q-mr-xs"
                />
                {{ props.row.finalStatus }}
              </q-chip>
            </q-td>
          </template>

          <!-- Actions Cell Template -->
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <div class="row q-gutter-sm justify-center">
                <q-btn
                  flat
                  round
                  dense
                  color="primary"
                  icon="edit"
                  class="action-btn"
                >
                  <q-tooltip anchor="center right" self="center left" :offset="[10, 0]">
                    Edit Lesson Plan
                  </q-tooltip>
                </q-btn>
                <q-btn
                  flat
                  round
                  dense
                  color="negative"
                  icon="delete"
                  class="action-btn"
                >
                  <q-tooltip anchor="center right" self="center left" :offset="[10, 0]">
                    Delete Lesson Plan
                  </q-tooltip>
                </q-btn>
              </div>
            </q-td>
          </template>
        </q-table>
      </q-card>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import LessonPlan from './LessonPlan.vue';

export default defineComponent({
  name: "LessonPlansTable",
  props: {
    projectInfo: {
      type: Array,
      required: true
    },
    lessonPlans: {
      type: Array,
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
  components: { LessonPlan },
  setup(props) {
    const pagination = ref({
      sortBy: 'dateGenerated',
      descending: true,
      page: 1,
      rowsPerPage: 10
    });

    const paginationLabel = (firstRowIndex, endRowIndex, totalRowNumber) => {
      return `Showing ${firstRowIndex} to ${endRowIndex} of ${totalRowNumber} lesson plans`
    };

    const showFilter = ref(false);

    const columns = [
      {
        name: 'projectName',
        align: 'left',
        label: 'Project',
        field: 'projectName',
        sortable: true
      },
      {
        name: 'studentName',
        align: 'left',
        label: 'Student',
        field: 'studentName',
        sortable: true
      },
      {
        name: 'dateGenerated',
        align: 'center',
        label: 'Date Generated',
        field: 'dateGenerated',
        sortable: true
      },
      {
        name: 'finalStatus',
        align: 'center',
        label: 'Status',
        field: 'finalStatus',
        sortable: true
      },
      {
        name: 'actions',
        align: 'center',
        label: 'Actions',
        field: 'actions'
      }
    ];

    const getStatusColor = (status) => {
      switch (status) {
        case 'Completed':
          return 'green';
        case 'In Progress':
          return 'blue';
        case 'Failed':
          return 'red';
        default:
          return 'grey';
      }
    };

    const viewLessonPlan = (row) => {
      // Code to open dialog for viewing lesson plan details
      console.log('Viewing lesson plan:', row);
    };

    const deleteLessonPlan = (row) => {
      console.log('Deleting lesson plan:', row);
    };

    const isShowingLessonPlanModal = ref(false)
    const selectedProject = ref(null)

    const toggleLessonPlanModal = (project) => {
      if (project) {
        isShowingLessonPlanModal.value = !isShowingLessonPlanModal.value;
        selectedProject.value = project;
      }
    }

    const submitLessonPlan = () => {
      console.log("Submitting...")
    }

    const flattenedLessonPlans = props.projectInfo.flatMap(project => {
      return project.lessonPlans.map(lessonPlan => ({
        ...lessonPlan,
        projectName: project.projectName,
        studentName: project.student,
        status: project.status,
        finalStatus: lessonPlan.finalStatus,
        dateGenerated: lessonPlan.dateGenerated,
        institution: project.institution
      }));
    });

    const getStatusIcon = (status) => {
      switch (status) {
        case 'Completed':
          return 'check_circle';
        case 'In Progress':
          return 'schedule';
        case 'Failed':
          return 'error';
        default:
          return 'help';
      }
    };

    return {
      filter: ref(''),
      showFilter,
      columns,
      getStatusColor,
      viewLessonPlan,
      deleteLessonPlan,
      isShowingLessonPlanModal,
      toggleLessonPlanModal,
      submitLessonPlan,
      flattenedLessonPlans,
      pagination,
      paginationLabel,
      getStatusIcon
    };
  }
});
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.fixed-header {
  position: sticky;
  top: 0;
  z-index: 2;
  background: #fff;
  padding: 0 24px;
  flex-shrink: 0;
}

.header-section {
  padding: 0 0 16px 0;
}

.scrollable-content {
  flex: 1;
  overflow-y: auto;
  padding: 0 24px 24px 24px;
  min-height: 0;
}

.table-card {
  display: flex;
  flex-direction: column;
}

:deep(.q-table__container) {
  flex: 1;
  display: flex;
  flex-direction: column;
}

:deep(.q-table__middle) {
  flex: 1;
  overflow: auto;
}

.search-input {
  width: 300px;
}

.elegant-table {
  background: white;
  border-radius: 12px;
}

:deep(.q-table__top) {
  padding: 16px 24px;
  background: #f8fafc;
}

:deep(.q-table__bottom) {
  padding: 16px 24px;
  background: #f8fafc;
}

:deep(.q-table thead tr) {
  background: #f8fafc;
  height: 40px;
  border-bottom: 2px solid #e2e8f0;
}

:deep(.q-table thead th) {
  font-weight: 600;
  font-size: 0.875rem;
  color: #1e293b;
  text-transform: uppercase;
  letter-spacing: 0.7px;
  padding: 12px 20px;
}

:deep(.q-table tbody tr) {
  height: 40px;
  transition: all 0.25s ease;
}

:deep(.q-table tbody tr:hover) {
  background-color: #f8fafc;
  transform: translateY(-1px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

:deep(.q-table tbody td) {
  font-size: 0.875rem;
  color: #334155;
  border-bottom: 1px solid #f1f5f9;
  padding: 4px 20px;
}

.status-chip {
  min-width: 110px;
  height: 28px;
  font-size: 0.8rem;
  font-weight: 500;
  transition: all 0.3s ease;
  border: none;
  backdrop-filter: blur(8px);
}

.status-completed {
  background: linear-gradient(135deg, #059669 0%, #10b981 100%);
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.25);
}

.status-in-progress {
  background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.25);
}

.status-failed {
  background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%);
  box-shadow: 0 2px 8px rgba(239, 68, 68, 0.25);
}

.action-btn {
  opacity: 0.85;
  transition: all 0.2s ease;
  position: relative;
  width: 32px;
  height: 32px;
  margin: 0 2px;
}

.action-btn:hover {
  opacity: 1;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.action-btn:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  transition: all 0.2s ease;
  z-index: -1;
}

:deep(.action-btn.q-btn--flat.text-primary:hover) {
  background: rgba(37, 99, 235, 0.15) !important;
}

:deep(.action-btn.q-btn--flat.text-negative:hover) {
  background: rgba(239, 68, 68, 0.15) !important;
}

:deep(.q-tooltip) {
  font-size: 0.75rem;
  padding: 4px 8px;
  background: #334155;
  border-radius: 4px;
}

:deep(.q-table__container) {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

:deep(.q-table__bottom) {
  background: #f8fafc;
  border-top: 1px solid #e2e8f0;
  padding: 8px 16px;
}

:deep(.q-table__control) {
  font-size: 0.875rem;
  color: #64748b;
}

.search-input :deep(.q-field__control) {
  height: 40px;
  background: white;
}

.search-input :deep(.q-field__marginal) {
  height: 40px;
}

/* Add smooth scrolling */
.scrollable-content {
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}

/* Add shadow to fixed header when scrolled */
.fixed-header::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 8px;
  background: linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0) 100%);
  pointer-events: none;
}

/* Ensure the table header stays visible */
:deep(.q-table thead) {
  position: sticky;
  top: 0;
  z-index: 1;
  background: #f1f5f9;
}

/* Optional: Add transition for smooth shadow effect */
.fixed-header {
  transition: box-shadow 0.3s ease;
}

/* Adjust icon sizes if needed */
:deep(.q-icon) {
  font-size: 1.2rem;
}

/* Added new styles for action buttons */
:deep(.action-btn .q-icon) {
  font-size: 1.1rem;
  transition: transform 0.2s ease;
}

:deep(.action-btn:hover .q-icon) {
  transform: scale(1.1);
}
</style>
