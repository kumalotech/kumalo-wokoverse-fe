<template>
  <q-card-section class="student-info-form row">
    <div class="col-lg-8 col-sm-12 row q-gutter-sm q-mb-sm">
      <q-item class="col-lg-3 col-md-3 col-sm-12 col-12">
        <q-item-section>
          <q-input
            type="text"
            dense
            outlined
            color="grey"
            round
            v-model="learnersInfo.fullName"
            label="Full Name"
          />
        </q-item-section>
      </q-item>

      <q-item class="col-lg-3 col-md-3 col-sm-12 col-12">
        <q-item-section>
          <q-input
            v-model="learnersInfo.dateOfBirth"
            label="Date of Birth"
            type="date"
            dense
            outlined
            color="grey"
            round
          />
        </q-item-section>
      </q-item>

      <q-item class="col-lg-3 col-md-3 col-sm-12 col-12">
        <q-item-section>
          <span class="gender-label">Gender</span>
          <q-option-group
            v-model="learnersInfo.gender"
            :options="genderOptions"
            inline
            dense
            class="styled-gender"
          />
        </q-item-section>
      </q-item>

      <q-item class="col-lg-3 col-md-3 col-sm-12 col-12">
        <q-item-section>
          <q-input
            v-model="learnersInfo.studentId"
            label="Student ID"
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
            v-model="learnersInfo.email"
            label="Email"
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
            v-model="learnersInfo.contactNumber"
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
            v-model="learnersInfo.interests"
            label="Interests"
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
            v-model="learnersInfo.previousExperience"
            label="Previous Experience"
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
            v-model="learnersInfo.allergies"
            label="Allergies / Medical Conditions"
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
            v-model="learnersInfo.emergencyContactName"
            label="Emergency Contact Name"
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
            v-model="learnersInfo.emergencyContactNumber"
            label="Emergency Contact Number"
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
            v-model="learnersInfo.preferredHospital"
            label="Preferred Hospital/Clinic for Emergencies"
            dense
            outlined
            color="grey"
            round
          />
        </q-item-section>
      </q-item>
    </div>
    <div class="col-lg-3 col-sm-12 row">
      <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div class="avatar-wrapper">
          <q-avatar size="130px" class="profile-avatar">
            <img :src="photoPreview || 'https://cdn.quasar.dev/img/boy-avatar.png'" />
            <q-badge floating color="teal" rounded>
              <q-icon name="edit" size="xs" class="cursor-pointer" @click="triggerFileUpload">
                <q-tooltip>Edit Profile Picture</q-tooltip>
              </q-icon>
            </q-badge>
          </q-avatar>
          <input
            type="file"
            ref="fileInput"
            accept="image/*"
            style="display: none"
            @change="onFileSelected"
          />
        </div>
      </q-item>
    </div>

    <div class="col-12 text-center">
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
  name: "StudentBasicInfo",
  props: {
    learnersInfo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      genderOptions: [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
      ],
    };
  },
  methods: {
    selectProfilePicture() {
      // Logic for selecting a profile picture (you can implement a file input dialog)
    },
  },
};
</script>

<style scoped>
.row {
  padding: 0 !important;
}
.student-info-form {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.gender-label {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.photo-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.profile-picture-placeholder {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 2px dashed #007bff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-picture-placeholder img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.next-button {
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

.next-button:before {
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

.next-button:hover {
  color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(21, 57, 102, 0.15);
  border-color: transparent;
}

.next-button:hover:before {
  width: 100%;
}

.next-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(21, 57, 102, 0.1);
}

.profile-avatar {
  border: 4px solid #E3F2FD;
  box-shadow: 0 2px 12px rgba(25, 118, 210, 0.1);
}

.avatar-wrapper {
  position: relative;
  display: inline-flex;
  justify-content: center;
  width: 100%;
  padding: 20px 0;
}
</style>
