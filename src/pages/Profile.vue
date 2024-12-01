<template>
  <q-page class="q-pa-md">
    <!-- Profile Header -->
    <div class="row q-col-gutter-md">
      <div class="col-12">
        <q-card class="profile-header">
          <q-parallax :height="200" :speed="0.5">
            <template v-slot:media>
              <img src="https://cdn.quasar.dev/img/parallax2.jpg">
            </template>
          </q-parallax>
          <div class="profile-avatar-container">
            <q-avatar size="130px" class="profile-avatar">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
              <q-badge floating color="teal" rounded>
                <q-icon name="edit" size="xs" class="cursor-pointer">
                  <q-tooltip>Edit Profile Picture</q-tooltip>
                </q-icon>
              </q-badge>
            </q-avatar>
          </div>
        </q-card>
      </div>
    </div>

    <!-- Profile Info -->
    <div class="row q-col-gutter-md q-mt-md">
      <!-- Left Column - Personal Info -->
      <div class="col-12 col-md-4">
        <q-card class="profile-card">
          <q-card-section>
            <div class="text-h6">Personal Information</div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <div class="row q-gutter-sm">
              <div class="col-12">
                <div class="text-subtitle2 text-grey-7">Full Name</div>
                <div class="text-body1">John Doe</div>
              </div>
              <div class="col-12">
                <div class="text-subtitle2 text-grey-7">Email</div>
                <div class="text-body1">john.doe@example.com</div>
              </div>
              <div class="col-12">
                <div class="text-subtitle2 text-grey-7">Phone</div>
                <div class="text-body1">+1 234 567 890</div>
              </div>
              <div class="col-12">
                <div class="text-subtitle2 text-grey-7">Location</div>
                <div class="text-body1">New York, USA</div>
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- Skills Card -->
        <q-card class="profile-card q-mt-md">
          <q-card-section>
            <div class="text-h6">Skills</div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <div class="row q-gutter-sm">
              <q-chip v-for="skill in skills" :key="skill.name"
                     :color="skill.color" text-color="white" outline
                     class="skill-chip">
                {{ skill.name }}
              </q-chip>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Right Column - Activity & Projects -->
      <div class="col-12 col-md-8">
        <q-card class="profile-card">
          <q-tabs v-model="tab" class="text-blue-7">
            <q-tab name="activity" label="Activity" icon="history" />
            <q-tab name="projects" label="Projects" icon="work" />
            <q-tab name="about" label="About" icon="person" />
          </q-tabs>
          <q-separator />
          <q-tab-panels v-model="tab" animated>
            <!-- Activity Panel -->
            <q-tab-panel name="activity">
              <div class="text-h6 q-mb-md">Recent Activity</div>
              <q-timeline color="primary">
                <q-timeline-entry v-for="activity in activities"
                                :key="activity.id"
                                :title="activity.title"
                                :subtitle="activity.date"
                                :icon="activity.icon">
                  {{ activity.description }}
                </q-timeline-entry>
              </q-timeline>
            </q-tab-panel>

            <!-- Projects Panel -->
            <q-tab-panel name="projects">
              <div class="text-h6 q-mb-md">Current Projects</div>
              <div class="row q-col-gutter-md">
                <div v-for="project in projects" :key="project.id"
                     class="col-12 col-sm-6">
                  <q-card flat bordered>
                    <q-card-section>
                      <div class="text-h6">{{ project.name }}</div>
                      <div class="text-subtitle2">{{ project.status }}</div>
                    </q-card-section>
                    <q-card-section>
                      <q-linear-progress :value="project.progress"
                                       color="primary" />
                    </q-card-section>
                  </q-card>
                </div>
              </div>
            </q-tab-panel>

            <!-- About Panel -->
            <q-tab-panel name="about">
              <div class="text-h6 q-mb-md">About Me</div>
              <p>{{ aboutMe }}</p>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'ProfilePage',
  setup () {
    return {
      tab: ref('activity'),
      skills: [
        { name: 'Vue.js', color: 'blue-7' },
        { name: 'JavaScript', color: 'blue-5' },
        { name: 'HTML5', color: 'blue-8' },
        { name: 'CSS3', color: 'blue-6' },
        { name: 'Node.js', color: 'blue-9' },
        { name: 'Python', color: 'blue-4' },
        { name: 'Git', color: 'blue-7' },
        { name: 'Agile', color: 'blue-5' }
      ],
      activities: [
        {
          id: 1,
          title: 'Project Milestone Achieved',
          date: '2 hours ago',
          icon: 'star',
          description: 'Completed the frontend implementation of the dashboard.'
        },
        {
          id: 2,
          title: 'Code Review',
          date: 'Yesterday',
          icon: 'code',
          description: 'Reviewed and approved 5 pull requests.'
        },
        {
          id: 3,
          title: 'Team Meeting',
          date: '3 days ago',
          icon: 'groups',
          description: 'Participated in weekly sprint planning.'
        }
      ],
      projects: [
        {
          id: 1,
          name: 'Dashboard Redesign',
          status: 'In Progress',
          progress: 0.7
        },
        {
          id: 2,
          name: 'API Integration',
          status: 'Planning',
          progress: 0.2
        },
        {
          id: 3,
          name: 'Mobile App',
          status: 'Completed',
          progress: 1
        }
      ],
      aboutMe: 'Passionate software developer with 5+ years of experience in web development. Focused on creating efficient and user-friendly applications. Always eager to learn new technologies and share knowledge with the team.'
    }
  }
})
</script>

<style scoped>
.profile-header {
  position: relative;
  margin-bottom: 60px;
  background: linear-gradient(to right, #1976D2, #64B5F6);
}

.profile-avatar-container {
  position: absolute;
  bottom: -60px;
  left: 50%;
  transform: translateX(-50%);
}

.profile-avatar {
  border: 4px solid #E3F2FD;
  box-shadow: 0 2px 12px rgba(25, 118, 210, 0.1);
}

.profile-card {
  border-radius: 12px;
  transition: all 0.3s ease;
  background: linear-gradient(to bottom right, #ffffff, #f5f9ff);
}

.profile-card .text-h6 {
  color: #1976D2;
  font-weight: 600;
}

.text-subtitle2.text-grey-7 {
  color: #2196F3 !important;
  font-weight: 500;
}

.profile-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.q-timeline__title {
  color: #1976D2 !important;
  font-weight: 500;
}

.q-timeline__subtitle {
  color: #64B5F6 !important;
}

.q-chip {
  transition: all 0.2s ease;
}

.q-chip:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(25, 118, 210, 0.15);
}

.q-linear-progress {
  transition: all 0.8s ease;
}

.q-linear-progress:hover {
  transform: scaleY(1.2);
}

.q-card.flat.bordered {
  transition: all 0.3s ease;
}

.q-card.flat.bordered:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(25, 118, 210, 0.1);
}
</style>
