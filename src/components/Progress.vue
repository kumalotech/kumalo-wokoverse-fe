<template>
  <div class="row">
    <div class="col-12 milestone-wrapper">
      <!-- Left scroll button -->
      <q-btn
        v-show="canScrollLeft"
        round
        flat
        dense
        color="teal"
        icon="chevron_left"
        class="scroll-button scroll-left"
        @click="scrollLeft"
      />

      <div class="milestone-container" ref="container">
        <div v-for="(milestone, index) in milestones"
              :key="index"
              class="milestone-item"
        >
          <q-card flat bordered>
            <q-card-section>
              <div class="row items-center no-wrap">
                <q-icon
                  :name="milestone.completed ? 'check_circle' : 'radio_button_unchecked'"
                  :color="milestone.completed ? 'teal' : 'gray'"
                  size="20px"
                  class="q-mr-sm"
                />
                <div class="text-body2 ellipsis" :class="{ 'text-teal': milestone.completed }">
                  {{ milestone.title }}
                </div>
              </div>
              <div class="milestone-content q-mt-sm">
                <div class="text-caption text-grey">{{ milestone.date }}</div>
                <div class="text-caption q-mt-xs">{{ milestone.description }}</div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <!-- Right scroll button -->
      <q-btn
        v-show="canScrollRight"
        round
        flat
        dense
        color="teal"
        icon="chevron_right"
        class="scroll-button scroll-right"
        @click="scrollRight"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Progress',
  props: {
    milestones: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      canScrollLeft: false,
      canScrollRight: false
    }
  },

  mounted() {
    this.checkScroll()
    this.$refs.container.addEventListener('scroll', this.checkScroll)
  },

  beforeDestroy() {
    this.$refs.container.removeEventListener('scroll', this.checkScroll)
  },

  methods: {
    checkScroll() {
      const container = this.$refs.container
      this.canScrollLeft = container.scrollLeft > 0
      this.canScrollRight = container.scrollLeft < (container.scrollWidth - container.clientWidth)
    },

    scrollLeft() {
      this.$refs.container.scrollBy({
        left: -200,
        behavior: 'smooth'
      })
    },

    scrollRight() {
      this.$refs.container.scrollBy({
        left: 200,
        behavior: 'smooth'
      })
    }
  }
}
</script>

<style scoped>
.milestone-wrapper {
  position: relative;
}

.milestone-container {
  display: flex;
  overflow-x: auto;
  gap: 16px;
  scroll-behavior: smooth;
  /* Hide scrollbar */
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.milestone-container::-webkit-scrollbar {
  display: none;
}

.scroll-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  background: rgba(33, 150, 243, 0.9) !important;
  color: white !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: background 0.3s ease;
}

.scroll-button:hover {
  background: rgba(25, 118, 210, 1) !important;
}

.scroll-left {
  left: -20px;
}

.scroll-right {
  right: -20px;
}

.milestone-item {
  min-width: 200px;
  max-width: 300px;
}

.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.q-card:hover {
  border: 1px teal solid;
  cursor: pointer;
}
</style>

