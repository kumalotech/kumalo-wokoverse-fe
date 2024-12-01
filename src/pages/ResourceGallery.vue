<template>
  <q-page class="q-pa-md">
    <div class="container">
      <div class="row q-col-gutter-md">
        <div v-for="(item, index) in allMedia" :key="index" class="col-12 col-sm-6 col-md-4 col-lg-3">
          <q-card class="image-card">
            <!-- For images -->
            <q-img
              v-if="item.type === 'image'"
              :src="item.src"
              :ratio="1"
              class="gallery-image cursor-pointer"
              @click="handleMediaClick(item)"
            />
            <!-- For videos -->
            <q-img
              v-else-if="item.type === 'video'"
              :src="getYouTubeThumbnail(item.src)"
              :ratio="1"
              class="gallery-image cursor-pointer"
              @click="handleMediaClick(item)"
            >
              <div class="media-title">{{ item.title }}</div>
            </q-img>
            <!-- For PDFs -->
            <q-img
              v-else
              :src="getPdfThumbnail()"
              :ratio="1"
              class="gallery-image cursor-pointer"
              @click="handleMediaClick(item)"
            >
              <div class="media-title">{{ item.title }}</div>
            </q-img>
            <div class="overlay">
              <q-btn
                :label="getActionLabel(item.type)"
                :icon="getActionIcon(item.type)"
                color="white"
                text-color="black"
                class="view-btn"
                flat
                @click="handleMediaClick(item)"
              />
            </div>
          </q-card>
        </div>
      </div>
    </div>

    <!-- Modified Dialog -->
    <q-dialog v-model="isDialogOpen" maximized>
      <q-card class="image-dialog">
        <q-card-section class="row items-center justify-end q-pa-none">
          <q-btn icon="close" flat round dense v-close-popup class="close-btn" />
        </q-card-section>
        <q-card-section class="q-pa-none dialog-content">
          <!-- Image viewer -->
          <img
            v-if="selectedMedia?.type === 'image'"
            :src="selectedMedia.src"
            alt="Media Preview"
            class="fullscreen-image"
          />
          <!-- YouTube video player -->
          <iframe
            v-else-if="selectedMedia?.type === 'video'"
            :src="getYouTubeEmbedUrl(selectedMedia.src)"
            class="fullscreen-video"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import toyTruck1 from '../assets/toyTruck1.webp';
import toyBus1 from '../assets/toyBus1.webp';
import toyMary1 from '../assets/toyMary1.webp';
import toyRobot1 from '../assets/toyRobot1.jpeg';
import toySportsCar1 from '../assets/toySportsCar1.jpeg';
import toySewingMachine1 from '../assets/toySewingMachine1.jpeg';
import toyWaterDispensor1 from '../assets/toyWaterDispensor1.jpeg';
import toyCar1 from '../assets/toyCar1.jpeg';

import toyElectricCar1 from '../assets/toyElectricCar1.jpeg';
import toyElectricTrain1 from '../assets/toyElectricTrain1.jpeg';
import toyElectricTrain2 from '../assets/toyElectricTrain2.jpeg';
import toyJet1 from '../assets/toyJet1.jpeg';
import toyJet2 from '../assets/toyJet2.jpeg';
import toyPoliceTruck1 from '../assets/toyPoliceTruck1.jpeg';
import toyBoy1 from '../assets/toyBoy1.jpeg';
import toyBear1 from '../assets/toyBear1.jpeg';
import toyTowDownTruck1 from '../assets/toyTowDownTruck1.jpeg';
import toySquad1 from '../assets/toySquad1.jpeg';

export default defineComponent({
  setup() {
    const isDialogOpen = ref(false);
    const selectedMedia = ref(null);

    const getYouTubeEmbedUrl = (url) => {
      // Add autoplay parameter to the embed URL
      return `${url}?autoplay=1`;
    };

    const getYouTubeThumbnail = (url) => {
      // Extract video ID from embed URL
      const videoId = url.split('/').pop();
      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    };

    const getPdfThumbnail = () => {
      // Return a default PDF icon from a CDN
      return 'https://cdn-icons-png.flaticon.com/512/337/337946.png';
    };

    const handleMediaClick = (media) => {
      if (media.type === 'pdf') {
        window.open(media.src, '_blank');
        return;
      }
      selectedMedia.value = media;
      isDialogOpen.value = true;
    };

    const getActionLabel = (type) => {
      switch (type) {
        case 'video': return 'Play';
        case 'pdf': return 'Open';
        default: return 'View';
      }
    };

    const getActionIcon = (type) => {
      switch (type) {
        case 'video': return 'play_circle';
        case 'pdf': return 'picture_as_pdf';
        default: return 'fullscreen';
      }
    };

    // Modified media array structure
    const allMedia = [
      { type: 'image', src: toyTruck1 },
      {
        type: 'video',
        src: 'https://www.youtube.com/embed/pO1cD-aX7p0',
        title: 'Toy Car Assembly Line'
      },
      { type: 'image', src: toyBus1 },
      {
        type: 'pdf',
        src: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        title: 'Sample Catalog'
      },
      { type: 'image', src: toyMary1 },
      {
        type: 'video',
        src: 'https://www.youtube.com/embed/N5ZrfLwxEWo',
        title: 'Toy Manufacturing Process'
      },
      { type: 'image', src: toyRobot1 },
      { type: 'image', src: toySportsCar1 },
      {
        type: 'pdf',
        src: 'https://www.africau.edu/images/default/sample.pdf',
        title: 'Product Guide'
      },
      { type: 'image', src: toySewingMachine1 },
      {
        type: 'video',
        src: 'https://www.youtube.com/embed/x86eTdPwnjU',
        title: 'Toy Factory Tour'
      },
      { type: 'image', src: toyWaterDispensor1 },
      {
        type: 'pdf',
        src: 'https://www.clickdimensions.com/links/TestPDFfile.pdf',
        title: 'Instructions Manual'
      },
      { type: 'image', src: toyCar1 },
      {
        type: 'video',
        src: 'https://www.youtube.com/embed/BTT14BcMSfQ',
        title: 'Toy Production Line'
      },
      { type: 'image', src: toyElectricCar1 },
      { type: 'image', src: toyElectricTrain1 },
      { type: 'image', src: toyElectricTrain2 },
      { type: 'image', src: toyJet1 },
      { type: 'image', src: toyJet2 },
      { type: 'image', src: toyPoliceTruck1 },
      { type: 'image', src: toyBoy1 },
      { type: 'image', src: toyBear1 },
      { type: 'image', src: toyTowDownTruck1 },
      { type: 'image', src: toySquad1 }
    ];

    return {
      allMedia,
      isDialogOpen,
      selectedMedia,
      handleMediaClick,
      getActionLabel,
      getActionIcon,
      getYouTubeThumbnail,
      getPdfThumbnail,
      getYouTubeEmbedUrl
    };
  },
});
</script>

<style scoped>
/* Card Styles */
.image-card {
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease;
  height: 100%;
}

.image-card:hover {
  transform: translateY(-5px);
}

.gallery-image {
  transition: transform 0.3s ease;
  background-color: #f5f5f5; /* Light background for thumbnails */
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.image-card:hover .overlay {
  opacity: 1;
}

.view-btn {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  padding: 8px 16px;
}

.fullscreen-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 8px;
}

.close-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 2;
  color: white;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
}

.fullscreen-video {
  width: 100%;
  height: 90vh;
  border: none;
  background: black;
}

.dialog-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.image-dialog {
  width: 95vw;
  height: 95vh;
  background: rgba(0, 0, 0, 0.9);
  border-radius: 12px;
}

/* Added styles for thumbnails */
.gallery-image {
  transition: transform 0.3s ease;
  background-color: #f5f5f5; /* Light background for thumbnails */
}

.image-card .q-img {
  min-height: 200px; /* Ensure consistent height */
}

/* Added styles for media titles */
.media-title {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 8px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  font-size: 0.9em;
  text-align: center;
}

</style>
