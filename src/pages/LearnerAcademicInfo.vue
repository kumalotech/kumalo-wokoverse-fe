<template>
  <q-card-section class="academic-info-form row">
    <q-card class="col-12 no-shadow">
      <q-card-section>
        <h5 class="school-heading">Nursery School</h5>
        <div v-for="(school, index) in nurserySchools" :key="index" class="row">
          <div class="q-pa-sm col-lg-3 col-sm-12">
            <q-input
              v-model="school.name"
              label="Name of the School"
              dense
              outlined
              color="grey"
              round
            />
          </div>
          <div class="q-pa-sm col-lg-3 col-sm-12">
            <q-input
              v-model="school.startDate"
              label="Start Date or Year"
              type="text"
              dense
              outlined
              color="grey"
              round
            />
          </div>
          <div class="q-pa-sm col-lg-3 col-sm-12">
            <q-input
              v-model="school.endDate"
              label="End Date or Year"
              type="text"
              dense
              outlined
              color="grey"
              round
            />
          </div>
          <div class="q-pa-sm col-lg-2 col-sm-12">
            <q-checkbox
              v-model="school.graduated"
              label="Graduated"
            />
          </div>
          <div class="q-pa-sm col-lg-1 col-sm-12">
            <q-btn
              @click="removeSchool('nursery', index)"
              color="negative"
              icon="delete"
              round
              dense
            />
          </div>
        </div>
        <q-btn
          @click="addSchool('nursery')"
          icon="add"
          round
          dense
          class="add-school-button"
        />
      </q-card-section>
    </q-card>

    <q-card class="col-12 no-shadow">
      <q-card-section>
        <h5 class="school-heading">Primary School</h5>
        <div v-for="(school, index) in primarySchools" :key="index" class="row">
          <div class="q-pa-sm col-lg-3 col-sm-12">
            <q-input
              v-model="school.name"
              label="Name of the School"
              dense
              outlined
              color="grey"
              round
            />
          </div>
          <div class="q-pa-sm col-lg-3 col-sm-12">
            <q-input
              v-model="school.startDate"
              label="Start Date or Year"
              type="text"
              dense
              outlined
              color="grey"
              round
            />
          </div>
          <div class="q-pa-sm col-lg-3 col-sm-12">
            <q-input
              v-model="school.endDate"
              label="End Date or Year"
              type="text"
              dense
              outlined
              color="grey"
              round
            />
          </div>
          <div class="q-pa-sm col-lg-2 col-sm-12">
            <q-checkbox
              v-model="school.graduated"
              label="Graduated"
            />
          </div>
          <div class="q-pa-sm col-lg-1 col-sm-12">
            <q-btn
              @click="removeSchool('primary', index)"
              color="negative"
              icon="delete"
              round
              dense
            />
          </div>
        </div>
        <q-btn
          @click="addSchool('primary')"
          icon="add"
          round
          dense
          class="add-school-button"
        />
      </q-card-section>
    </q-card>

    <q-card class="col-12 no-shadow">
      <q-card-section>
        <h5 class="school-heading">Secondary School</h5>
        <div v-for="(school, index) in secondarySchools" :key="index" class="row">
          <div class="q-pa-sm col-lg-3 col-sm-12">
            <q-input
              v-model="school.name"
              label="Name of the School"
              dense
              outlined
              color="grey"
              round
            />
          </div>
          <div class="q-pa-sm col-lg-3 col-sm-12">
            <q-input
              v-model="school.startDate"
              label="Start Date or Year"
              type="text"
              dense
              outlined
              color="grey"
              round
            />
          </div>
          <div class="q-pa-sm col-lg-3 col-sm-12">
            <q-input
              v-model="school.endDate"
              label="End Date or Year"
              type="text"
              dense
              outlined
              color="grey"
              round
            />
          </div>
          <div class="q-pa-sm col-lg-2 col-sm-12">
            <q-checkbox
              v-model="school.graduated"
              label="Graduated"
            />
          </div>
          <div class="q-pa-sm col-lg-1 col-sm-12">
            <q-btn
              @click="removeSchool('secondary', index)"
              color="negative"
              icon="delete"
              round
              dense
            />
          </div>
        </div>
        <q-btn
          @click="addSchool('secondary')"
          icon="add"
          round
          dense
          class="add-school-button"
        />
      </q-card-section>
    </q-card>

    <q-card class="col-12 no-shadow">
      <q-card-section>
        <h5 class="school-heading">Institution or University</h5>
        <div v-for="(school, index) in tertiarySchools" :key="index" class="row">
          <div class="q-pa-sm col-lg-3 col-sm-12">
            <q-input
              v-model="school.name"
              label="Name of the School"
              dense
              outlined
              color="grey"
              round
            />
          </div>
          <div class="q-pa-sm col-lg-3 col-sm-12">
            <q-input
              v-model="school.startDate"
              label="Start Date or Year"
              type="text"
              dense
              outlined
              color="grey"
              round
            />
          </div>
          <div class="q-pa-sm col-lg-3 col-sm-12">
            <q-input
              v-model="school.endDate"
              label="End Date or Year"
              type="text"
              dense
              outlined
              color="grey"
              round
            />
          </div>
          <div class="q-pa-sm col-lg-2 col-sm-12">
            <q-checkbox
              v-model="school.graduated"
              label="Graduated"
            />
          </div>
          <div class="q-pa-sm col-lg-1 col-sm-12">
            <q-btn
              @click="removeSchool('tertiary', index)"
              color="negative"
              icon="delete"
              round
              dense
            />
          </div>
        </div>
        <q-btn
          @click="addSchool('tertiary')"
          icon="add"
          round
          dense
          class="add-school-button"
        />
      </q-card-section>
    </q-card>

    <div class="text-center col-12 action-buttons">
      <q-btn
        label="Previous"
        icon="arrow_back"
        class="previous-button"
        @click="$emit('back')"
        style="margin-right: 1rem;"
      />
      <q-btn
        label="Next Step"
        icon="arrow_forward"
        @click="$emit('next')"
        class="next-button"
      />
    </div>
  </q-card-section>
</template>

<script>
export default {
  props: {
    nurserySchools: {
      type: Array,
      required: true,
    },
    primarySchools: {
      type: Array,
      required: true,
    },
    secondarySchools: {
      type: Array,
      required: true,
    },
    tertiarySchools: {
      type: Array,
      required: true,
    },
  },
  methods: {
    addSchool(level) {
      const newSchool = { name: '', startDate: '', endDate: '', graduated: false };
      if (level === 'nursery') {
        this.nurserySchools.push(newSchool);
      } else if (level === 'primary') {
        this.primarySchools.push(newSchool);
      } else if (level === 'secondary') {
        this.secondarySchools.push(newSchool);
      } else if (level === 'tertiary') {
        this.tertiarySchools.push(newSchool);
      }
      this.saveSchools();
    },
    removeSchool(level, index) {
      if (level === 'nursery') {
        this.nurserySchools.splice(index, 1);
      } else if (level === 'primary') {
        this.primarySchools.splice(index, 1);
      } else if (level === 'secondary') {
        this.secondarySchools.splice(index, 1);
      } else if (level === 'tertiary') {
        this.tertiarySchools.splice(index, 1);
      }
      this.saveSchools();
    },
    saveSchools() {
      this.$emit('updateSchools', {
        nursery: this.nurserySchools,
        primary: this.primarySchools,
        secondary: this.secondarySchools,
        tertiary: this.tertiarySchools,
      });
    },
  },
};
</script>

<style scoped>
@media (max-width: 568px) {
  .next-button {
    font-size: small;
    margin-right: 2px !important;
    margin-left: 2px !important;
    padding-right: 10px !important;
    height: 40px;
  }
  .previous-button {
    font-size: small;
    margin-right: 10px !important;
    margin-left: 2px !important;
    padding-right: 10px !important;
    height: 40px;
  }
}
/* Media query for large screens */
@media (min-width: 569px) {
  .school-entry {
    flex-direction: row; /* Horizontal layout on large screens */
    align-items: center;
    gap: 1rem;
  }

  .school-input, .school-checkbox {
    flex: 1;
    width: auto;
  }

  .remove-button {
    flex: 0 0 auto; /* Prevent the remove button from expanding */
    padding: 0.5rem 1rem; /* Add padding for a better look */
    margin-left: auto; /* Push button to the far right */
  }
}

.row {
  padding: 0 !important;
}

.school-entry {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
}

.school-input, .school-checkbox, .remove-button {
  width: 100%; /* Full width on small screens */
}

.remove-button {
  align-self: flex-end; /* Align to the right on small screens */
}

.school-heading {
  font-size: 1.25rem; /* Reduced font size for headings */
  margin-top: 0.5rem; /* Add margin on top of heading */
  margin-bottom: 0.5rem; /* Margin below the heading */
}

.button-container {
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
}

.action-buttons {
  margin-top: 15px;
}

.next-button,
.previous-button,
.add-school-button {
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
.previous-button:before,
.add-school-button:before {
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
.previous-button:hover,
.add-school-button:hover {
  color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(21, 57, 102, 0.15);
  border-color: transparent;
}

.next-button:hover:before,
.previous-button:hover:before,
.add-school-button:hover:before {
  width: 100%;
}

.next-button:active,
.previous-button:active,
.add-school-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(21, 57, 102, 0.1);
}
</style>
