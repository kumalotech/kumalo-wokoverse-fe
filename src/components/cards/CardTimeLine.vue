<template>
  <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
    <q-card class="fit no-shadow" bordered>
      <q-card-section class="text-h6 q-pb-none">
        <q-item>
          <q-item-section avatar>
            <q-icon color="blue" name="access_time" style="font-size: 2em;"/>
          </q-item-section>

          <q-item-section>
            <div class="text-h6">Facilitator Assessment and Reviews</div>
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-card-section class="timeline-section">
        <q-timeline :layout="layout" :side="side" color="secondary">
          <q-timeline-entry
            v-for="(review, index) in reviewList"
            :key="index"
            :color="review.color"
            :icon="review.icon"
            :side="review.side"
          >
            <template v-slot:title>
              <div class="text-h6">{{ review.title }}</div>
            </template>

            <template v-slot:subtitle>
              <div class="text-subtitle1">{{ review.subtitle }}</div>
            </template>

            <div>{{ review.desc }}</div>
          </q-timeline-entry>
        </q-timeline>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CardTimeLine',
  props: {
    reviewList: {
      type: Array,
      required: true,
    },
  },
});
</script>

<style scoped>
.timeline-section {
  max-height: 400px; /* Adjust the height to fit your needs */
  overflow-y: auto; /* Enable vertical scrolling */
}

.text-h6 {
  margin-bottom: 4px; /* Adjust the spacing below the title */
}

.text-subtitle1 {
  margin-top: 0; /* Ensure there's no unnecessary margin at the top */
  color: grey; /* Optional: styling for the subtitle text */
}
</style>
