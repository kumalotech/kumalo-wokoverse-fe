<template>
  <div class="hierarchy-wrapper">
    <q-hierarchy
      square
      id="user-hierarchy"
      :columns="columns"
      :data="data"
      class="custom-hierarchy"
    >
      <template v-slot:body="props">
        <td data-th="Label">
          <div
            :style="props.setPadding(props.item)"
            :class="['item-label', props.iconName(props.item) !== 'done' ? 'q-pl-lg' : '']"
          >
            <q-btn
              v-if="props.iconName(props.item) !== 'done'"
              @click="props.toggle(props.item)"
              :icon="props.iconName(props.item)"
              flat
              dense
              class="toggle-btn"
            />
            <span class="label-text q-ml-sm">{{ props.item.label }}</span>
          </div>
        </td>
        <td class="text-center description-cell">{{ props.item.description }}</td>
        <td class="text-left">
          <q-chip
            v-if="props.item.note"
            square
            size="sm"
            class="note-chip"
          >
            {{ props.item.note }}
          </q-chip>
        </td>
      </template>
    </q-hierarchy>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

const columns = [
{
  name: 'label',
  required: true,
  label: 'Label',
  align: 'left',
  field: 'label',
  sortable: true,
  filterable: true
},
{
  name: 'description',
  label: 'Description',
  sortable: true,
  field: 'description',
  align: 'center',
  filterable: false
},
{
  name: 'note',
  label: 'Note',
  sortable: true,
  field: 'note',
  align: 'left',
  filterable: false
}
];

const data = [
{
  label: "Ben Wokorach",
  description: "Activities Performed By User",
  note: "System Access Logs",
  children: [
    {
      label: "2024-10-20",
      description: "Date",
      note: "Date Note",
      children: [
        {
          label: "Water Project",
          description: "Entity",
          note: "Entity Note",
          children: [
            { label: "Updated Entity", description: "Activity", note: "Activity Note" },
            { label: "Added New Entity", description: "Activity", note: "Activity Note" }
          ]
        }
      ]
    }
  ]
},
{
  label: "Morris Opiyo",
  description: "Activities Performed By User",
  note: "System Access Logs",
  children: [
    {
      label: "2024-10-21",
      description: "Date",
      note: "Date Note",
      children: [
        {
          label: "Construction Project",
          description: "Entity",
          note: "Entity Note",
          children: [
            { label: "Added New Entity", description: "Activity", note: "Activity Note" },
            { label: "Modified Project Timeline", description: "Activity", note: "Activity Note" }
          ]
        }
      ]
    }
  ]
}
];

export default defineComponent({
name: "CustomHierarchy",
setup() {
  return {
    columns,
    data
  }
}
})
</script>

<style scoped>
.hierarchy-wrapper {
  padding: 1rem;
}

.custom-hierarchy {
  background: #283593 !important; /* indigo-8 equivalent */
  color: white;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
}

.item-label {
  display: flex;
  align-items: center;
}

.toggle-btn {
  opacity: 0.9;
  transition: opacity 0.2s;
}

.toggle-btn:hover {
  opacity: 1;
}

.label-text {
  font-weight: 500;
}

.description-cell {
  font-size: 0.95rem;
}

.note-chip {
  background: #827717 !important; /* lime-9 equivalent */
  color: white;
  font-weight: 500;
  transition: transform 0.2s;
}

.note-chip:hover {
  transform: translateY(-1px);
}
</style>
