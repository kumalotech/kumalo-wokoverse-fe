<template>
  <q-card-section class="parent-info-form row">
    <div class="col-12 row q-gutter-sm q-mb-sm">
      <q-item class="col-lg-3 col-md-3 col-sm-12 col-12">
        <q-item-section>
          <q-input
            v-model="parentInfo.fullName"
            label="Parent/Guardian Full Name"
            dense
            outlined
            color="grey"
            round
          />
        </q-item-section>
      </q-item>

      <q-item class="col-lg-3 col-md-3 col-sm-12 col-12">
        <q-item-section>
          <q-select
            v-model="parentInfo.relationship"
            :options="relationshipOptions"
            label="Relationship To Student"
            dense
            outlined
            color="grey"
            round
          />
        </q-item-section>
      </q-item>

      <q-item class="col-lg-3 col-md-3 col-sm-12 col-12">
        <q-item-section>
          <q-input
            v-model="parentInfo.contactNumber"
            label="Contact Number"
            type="tel"
            dense
            outlined
            color="grey"
            round
          />
        </q-item-section>
      </q-item>

      <q-item class="col-lg-3 col-md-3 col-sm-12 col-12">
        <q-item-section>
          <q-input
            v-model="parentInfo.email"
            label="Email Address"
            type="email"
            dense
            outlined
            color="grey"
            round
          />
        </q-item-section>
      </q-item>

      <q-item class="col-lg-3 col-md-3 col-sm-12 col-12">
        <q-item-section>
          <q-input
            v-model="parentInfo.occupation"
            label="Occupation"
            dense
            outlined
            color="grey"
            round
          />
        </q-item-section>
      </q-item>

      <q-item class="col-lg-3 col-md-3 col-sm-12 col-12">
        <q-item-section>
          <q-input
            v-model="parentInfo.workplace"
            label="Workplace/Organisation Name"
            dense
            outlined
            color="grey"
            round
          />
        </q-item-section>
      </q-item>

      <q-item class="col-lg-3 col-md-3 col-sm-12 col-12">
        <q-item-section>
          <q-input
            v-model="parentInfo.workAddress"
            label="Work Address"
            dense
            outlined
            color="grey"
            round
          />
        </q-item-section>
      </q-item>

      <q-item class="col-lg-3 col-md-3 col-sm-12 col-12">
        <q-item-section>
          <q-input
            v-model="parentInfo.bestTimeToContact"
            label="Best Time To Contact"
            dense
            outlined
            color="grey"
            round
          />
        </q-item-section>
      </q-item>

      <q-item class="col-lg-3 col-md-3 col-sm-12 col-12">
        <q-item-section>
          <q-input
            v-model="parentInfo.secondaryContact"
            label="Secondary Contact Number"
            type="tel"
            dense
            outlined
            color="grey"
            round
          />
        </q-item-section>
      </q-item>
    </div>

    <div class="col-12 text-center">
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
    parentInfo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      relationshipOptions: [
        { label: 'Mother', value: 'mother' },
        { label: 'Father', value: 'father' },
        { label: 'Guardian', value: 'guardian' },
      ],
    };
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
.row {
  padding: 0 !important;
}
.parent-info-form {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
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
