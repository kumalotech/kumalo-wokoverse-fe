<template>
  <q-page class="q-pa-lg bg-grey-1">
    <div class="row q-col-gutter-lg">
      <!-- Users Card -->
      <div class="col-12">
        <q-card class="app-card" flat bordered>
          <!-- Header Section with Gradient -->
          <div class="card-section q-pa-lg">
            <div class="row items-center justify-between">
              <div>
                <div class="text-h5 text-weight-medium text-dark">
                  Application Users
                </div>
                <div class="text-subtitle2 text-grey-7 q-mt-sm">
                  List of registered users in the system
                </div>
              </div>
              <q-btn
                color="primary"
                icon-right="person_add"
                label="Add User"
                class="q-px-lg"
                unelevated
              />
            </div>
          </div>

          <!-- Search Bar Section -->
          <q-card-section>
            <div class="row q-col-gutter-md">
              <div class="col-12 col-sm-4">
                <q-input
                  v-model="search"
                  dense
                  outlined
                  placeholder="Search users..."
                  class="search-input"
                  bg-color="white"
                >
                  <template v-slot:prepend>
                    <q-icon name="search" color="primary" />
                  </template>
                  <template v-slot:append>
                    <q-icon name="filter_list" class="cursor-pointer" color="primary">
                      <q-tooltip>Filter Results</q-tooltip>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div class="col-12 col-sm-8 row justify-end items-center q-gutter-sm">
                <q-btn flat color="primary" icon="refresh" round>
                  <q-tooltip>Refresh Data</q-tooltip>
                </q-btn>
                <q-btn flat color="primary" icon="download" round>
                  <q-tooltip>Export Users</q-tooltip>
                </q-btn>
              </div>
            </div>
          </q-card-section>

          <!-- Users Table -->
          <q-card-section class="q-pa-none">
            <q-table
              :rows="filteredUsers"
              :columns="userColumns"
              row-key="id"
              flat
              :pagination.sync="pagination"
              :rows-per-page-options="[5, 10, 15, 20]"
              class="elegant-table"
              :loading="false"
            >
              <template v-slot:loading>
                <q-inner-loading showing color="primary">
                  <q-spinner-dots size="50px" color="primary" />
                </q-inner-loading>
              </template>

              <template v-slot:body-cell-fullName="props">
                <q-td :props="props">
                  <div class="row items-center">
                    <q-avatar size="42px" class="user-avatar q-mr-sm">
                      {{ getInitials(props.row.fullName) }}
                    </q-avatar>
                    <div>
                      <div class="text-weight-medium text-primary">{{ props.row.fullName }}</div>
                      <div class="text-grey-7 text-caption">{{ props.row.username }}</div>
                    </div>
                  </div>
                </q-td>
              </template>

              <template v-slot:body-cell-actions="props">
                <q-td :props="props" class="q-gutter-sm">
                  <q-btn flat round size="sm" color="primary" icon="edit">
                    <q-tooltip>Edit User</q-tooltip>
                  </q-btn>
                  <q-btn flat round size="sm" color="teal" icon="visibility">
                    <q-tooltip>View Details</q-tooltip>
                  </q-btn>
                  <q-btn flat round size="sm" color="negative" icon="delete">
                    <q-tooltip>Delete User</q-tooltip>
                  </q-btn>
                </q-td>
              </template>
            </q-table>
          </q-card-section>
        </q-card>
      </div>

      <!-- System Logs Card -->
      <div class="col-12">
        <q-card class="app-card" flat bordered>
          <!-- Header Section with Different Gradient -->
          <div class="logs-header q-pa-md">
            <div class="row items-center justify-between">
              <div>
                <div class="text-h5 text-white text-weight-medium">
                  System Logs
                </div>
                <div class="text-subtitle2 text-white-7 q-mt-sm">
                  Logs of user activities organized by entity and date
                </div>
              </div>
              <div class="row q-gutter-sm">
                <q-btn color="white" text-color="deep-purple" icon="filter_list" label="Filter" unelevated />
                <q-btn color="white" text-color="deep-purple" icon="download" label="Export" outline />
              </div>
            </div>
          </div>

          <q-separator />

          <q-card-section class="q-pa-md">
            <custom-hierarchy :logs="processedLogs"></custom-hierarchy>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, defineAsyncComponent } from 'vue'

export default defineComponent({
  name: 'TreeTable',
  components: {
    CustomHierarchy: defineAsyncComponent(() => import('components/tree-table/CustomHierarchy.vue'))
  },
  data() {
    return {
      search: '',
      // Pagination configuration for users table
      pagination: {
        page: 1,
        rowsPerPage: 3, // adjust as needed
        pages: 2 // total pages
      },

      // Table for application users with new users added
      users: [
        { id: 1, username: 'ben_wokorach', fullName: 'Ben Wokorach', email: 'ben@example.com', phone: '+256786277071', address: 'Village A' },
        { id: 2, username: 'morris_opiyo', fullName: 'Morris Opiyo', email: 'morris@example.com', phone: '+256786277072', address: 'Village B' },
        { id: 3, username: 'jesse_omara', fullName: 'Jesse Omara', email: 'jesse@example.com', phone: '+256786277073', address: 'Village C' },
        { id: 4, username: 'lawrence_kidega', fullName: 'Lawrence Kidega', email: 'lawrence@example.com', phone: '+256786277074', address: 'Village D' },
        { id: 5, username: 'moses_komakech', fullName: 'Moses Komakech', email: 'moses@example.com', phone: '+256786277075', address: 'Village E' }
      ],
      userColumns: [
        { name: 'username', required: true, label: 'Username', align: 'left', field: 'username' },
        { name: 'fullName', label: 'Full Name', align: 'left', field: 'fullName' },
        { name: 'email', label: 'Email', align: 'left', field: 'email' },
        { name: 'phone', label: 'Phone Number', align: 'left', field: 'phone' },
        { name: 'address', label: 'Address', align: 'left', field: 'address' },
        { name: 'actions', label: 'Actions', align: 'center' }
      ],

      // Data for system logs, updated to include dates and actions
      processedLogs: [
        {
          id: 1,
          label: 'Ben Wokorach',
          entities: [
            {
              id: 101,
              name: 'Water Project',
              date: '2024-10-22',
              actions: ['Updated Entity', 'Added New Entity']
            },
            {
              id: 102,
              name: 'Maintenance Project',
              date: '2024-10-21',
              actions: ['Deleted Entity', 'Created Maintenance Record']
            }
          ]
        },
        {
          id: 2,
          label: 'Morris Opiyo',
          entities: [
            {
              id: 201,
              name: 'Construction Project',
              date: '2024-10-20',
              actions: ['Added New Entity', 'Modified Project Timeline']
            }
          ]
        },
        {
          id: 3,
          label: 'Jesse Omara',
          entities: [
            {
              id: 301,
              name: 'Community Outreach',
              date: '2024-10-18',
              actions: ['Started Outreach Program', 'Updated Event Details']
            }
          ]
        },
        {
          id: 4,
          label: 'Lawrence Kidega',
          entities: [
            {
              id: 401,
              name: 'Water Treatment Project',
              date: '2024-10-19',
              actions: ['Created Treatment Plan', 'Reviewed Treatment Reports']
            }
          ]
        },
        {
          id: 5,
          label: 'Moses Komakech',
          entities: [
            {
              id: 501,
              name: 'Sanitation Project',
              date: '2024-10-22',
              actions: ['Modified Sanitation Guidelines', 'Added New Sanitation Rules']
            }
          ]
        }
      ]
    }
  },

  computed: {
    filteredUsers() {
      const searchLower = this.search.toLowerCase()
      return this.users.filter(user =>
        user.fullName.toLowerCase().includes(searchLower) ||
        user.username.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower)
      )
    },

    getTotalActions() {
      return this.processedLogs.reduce((total, user) => {
        return total + user.entities.reduce((sum, entity) =>
          sum + entity.actions.length, 0)
      }, 0)
    },

    getTotalEntities() {
      return this.processedLogs.reduce((total, user) =>
        total + user.entities.length, 0)
    }
  },

  methods: {
    getInitials(name) {
      return name.split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
    }
  }
})
</script>

<style scoped>
.app-card {
  border-radius: 16px;
  transition: all 0.3s ease;
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
}

.app-card:hover {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);
}

.card-section {
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.user-avatar {
  background: linear-gradient(145deg, var(--q-primary), #1976D2);
  color: white;
  font-weight: 600;
  font-size: 1rem;
}

.search-input {
  .q-field__control {
    height: 44px;
    border-radius: 12px;
    background: white;
    border: 1px solid rgba(0, 0, 0, 0.08);
  }

  &.q-field--focused .q-field__control {
    border-color: var(--q-primary);
    box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.08);
  }
}

.elegant-table {
  :deep(.q-table__card) {
    box-shadow: none;
    background: transparent;
  }

  :deep(.q-table thead tr) {
    th {
      padding: 16px;
      font-weight: 600;
      font-size: 0.875rem;
      color: #344767;
      border-bottom: 1px solid rgba(0, 0, 0, 0.08);
      background: transparent;
      transition: all 0.3s ease;
    }
  }

  :deep(.q-table tbody tr) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.04);
    transition: all 0.2s ease;

    td {
      padding: 16px;
      color: #344767;
    }

    &:hover {
      background-color: rgba(0, 0, 0, 0.02);
    }
  }

  :deep(.q-table__bottom) {
    border-top: 1px solid rgba(0, 0, 0, 0.08);
  }
}

/* Smooth scrolling */
.q-page {
  scroll-behavior: smooth;
}

/* Table row animations */
:deep(.q-table tbody tr) {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Button hover effects */
.q-btn {
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .q-page {
    padding: 16px !important;
  }

  .app-card {
    border-radius: 12px;
  }

  .card-section {
    padding: 16px !important;
  }
}
</style>

